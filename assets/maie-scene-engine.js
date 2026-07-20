/**
 * maie-scene-engine.js  —  Scene Controller + Transition Engine   v1.0
 *
 * PHASE 1 INFRASTRUCTURE. Replaces the inline `navigate()` + ad hoc
 * class-toggling in the portal shell with a real controller.
 *
 * Responsibilities:
 *   1. Own the authoritative scene graph (groups → scenes, in order).
 *   2. Drive ALL cinematic transitions between scenes (curtain flash +
 *      blur/scale fade) instead of leaving timing to CSS class swaps
 *      that race with each other.
 *   3. Provide a stable API surface that Phase 2 can extend without
 *      touching the shell HTML: registerGroup(), goTo(), next(), prev().
 *   4. Keep the "one viewport = one scene" contract: every scene
 *      mounts into a single full-viewport stage, never stacks, never
 *      scrolls past 100vh.
 *
 * NOT in this phase (left for Phase 2 handoff — see bottom of file):
 *   - Splitting individual chapters into multiple sub-scenes.
 *   - Per-slide content recomposition (header/thesis/cards → discrete
 *     "Scene 1: core statement / Scene 2: architecture / Scene 3: impact").
 *   - Slide-level progress sub-indicator (dots within a chapter).
 *
 * Scene graph shape:
 *   group = {
 *     id:        'platform',          // matches existing chapter id
 *     label:     'Meet MAIE',         // sidenav label
 *     scenes:    ['platform'],        // ordered scene ids within this group
 *                                     // (length 1 today; >1 in Phase 2)
 *   }
 *
 * A "scene" today is 1:1 with a chapter <section class="module" id="mod-X">.
 * Phase 2 will register multiple scene ids per group, each pointing at a
 * sub-section living inside (or generated for) that chapter.
 */

(function (root) {
  'use strict';

  const TRANSITION_MS = 620;      // total time the curtain is "down"
  const CURTAIN_HOLD_MS = 260;    // time curtain is fully opaque before next scene paints

  function SceneEngine(opts) {
    this.groups = [];                 // [{id,label,scenes:[sceneId,...]}]
    this.sceneIndex = {};             // sceneId -> {groupId, groupIdx, sceneIdxInGroup}
    this.flatScenes = [];             // ordered list of sceneIds (linear nav order)
    this.currentScene = null;
    this.isTransitioning = false;
    this.queuedTarget = null;         // last-wins queue while mid-transition

    this.stageEl = opts.stageEl;             // the viewport-stage container
    this.curtainEl = opts.curtainEl;         // .stage-curtain element
    this.getSceneEl = opts.getSceneEl;       // (sceneId) => HTMLElement | null
    this.onSceneChange = opts.onSceneChange || function () {}; // (sceneId, meta) => void
    this.onBeforeChange = opts.onBeforeChange || function () {}; // (fromId, toId) => void
  }

  SceneEngine.prototype.registerGroup = function (group) {
    const groupIdx = this.groups.length;
    this.groups.push(group);
    group.scenes.forEach((sceneId, i) => {
      this.sceneIndex[sceneId] = { groupId: group.id, groupIdx, sceneIdxInGroup: i };
      this.flatScenes.push(sceneId);
    });
    return this;
  };

  SceneEngine.prototype.registerGroups = function (groups) {
    groups.forEach(g => this.registerGroup(g));
    return this;
  };

  SceneEngine.prototype.totalScenes = function () {
    return this.flatScenes.length;
  };

  SceneEngine.prototype.sceneMeta = function (sceneId) {
    const idx = this.sceneIndex[sceneId];
    if (!idx) return null;
    const flatPos = this.flatScenes.indexOf(sceneId);
    return {
      sceneId,
      groupId: idx.groupId,
      groupIdx: idx.groupIdx,
      sceneIdxInGroup: idx.sceneIdxInGroup,
      flatPos,                                   // 0-indexed overall position
      flatTotal: this.flatScenes.length,
      group: this.groups[idx.groupIdx],
      isFirstInGroup: idx.sceneIdxInGroup === 0,
      isLastInGroup: idx.sceneIdxInGroup === this.groups[idx.groupIdx].scenes.length - 1,
    };
  };

  /* ── Navigation primitives ──────────────────────────────────── */

  SceneEngine.prototype.next = function () {
    const pos = this.flatScenes.indexOf(this.currentScene);
    if (pos < this.flatScenes.length - 1) this.goTo(this.flatScenes[pos + 1]);
  };

  SceneEngine.prototype.prev = function () {
    const pos = this.flatScenes.indexOf(this.currentScene);
    if (pos > 0) this.goTo(this.flatScenes[pos - 1]);
  };

  SceneEngine.prototype.nextGroup = function () {
    const meta = this.sceneMeta(this.currentScene);
    if (!meta) return;
    const nextGroup = this.groups[meta.groupIdx + 1];
    if (nextGroup) this.goTo(nextGroup.scenes[0]);
  };

  SceneEngine.prototype.prevGroup = function () {
    const meta = this.sceneMeta(this.currentScene);
    if (!meta) return;
    const prevGroup = this.groups[meta.groupIdx - 1];
    if (prevGroup) this.goTo(prevGroup.scenes[0]);
  };

  /**
   * goTo(sceneId, { instant }) — the only place transition orchestration happens.
   * If a transition is already running, the new target is queued and fired
   * the moment the in-flight one settles (last write wins; this prevents
   * rapid arrow-key presses from stacking overlapping animations).
   */
  SceneEngine.prototype.goTo = function (sceneId, options) {
    options = options || {};
    if (!this.sceneIndex[sceneId]) {
      console.warn('[scene-engine] unknown scene id:', sceneId);
      return;
    }
    if (sceneId === this.currentScene) return;

    if (this.isTransitioning) {
      this.queuedTarget = sceneId;
      return;
    }

    if (options.instant || !this.currentScene) {
      this._commit(sceneId);
      return;
    }

    this._runTransition(sceneId);
  };

  SceneEngine.prototype._runTransition = function (toId) {
    const fromId = this.currentScene;
    const self = this;
    this.isTransitioning = true;
    this.onBeforeChange(fromId, toId);

    const fromEl = this.getSceneEl(fromId);
    const curtain = this.curtainEl;

    if (curtain) {
      curtain.classList.remove('flash');
      // force reflow so the animation can restart cleanly on rapid nav
      void curtain.offsetWidth;
      curtain.classList.add('flash');
    }

    if (fromEl) {
      fromEl.classList.remove('active');
      fromEl.classList.add('leaving');
    }

    // Swap content at the dark midpoint of the curtain flash, not at t=0,
    // so the outgoing scene's blur-out is visible and the incoming scene
    // only ever paints behind full black.
    setTimeout(function () {
      if (fromEl) {
        fromEl.classList.remove('leaving');
      }
      self._commit(toId);
    }, CURTAIN_HOLD_MS);

    setTimeout(function () {
      self.isTransitioning = false;
      if (curtain) curtain.classList.remove('flash');
      if (self.queuedTarget && self.queuedTarget !== self.currentScene) {
        const next = self.queuedTarget;
        self.queuedTarget = null;
        self.goTo(next);
      } else {
        self.queuedTarget = null;
      }
    }, TRANSITION_MS);
  };

  SceneEngine.prototype._commit = function (sceneId) {
    const toEl = this.getSceneEl(sceneId);
    if (toEl) toEl.classList.add('active');
    this.currentScene = sceneId;
    this.onSceneChange(sceneId, this.sceneMeta(sceneId));
  };

  /* ── Keyboard wiring (optional convenience) ─────────────────── */

  SceneEngine.prototype.bindKeyboard = function (target) {
    const self = this;
    (target || document).addEventListener('keydown', function (e) {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        self.next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        self.prev();
      } else if (e.key === 'Home') {
        self.goTo(self.flatScenes[0]);
      } else if (e.key === 'End') {
        self.goTo(self.flatScenes[self.flatScenes.length - 1]);
      }
    });
    return this;
  };

  root.MAIE = root.MAIE || {};
  root.MAIE.SceneEngine = SceneEngine;

}(typeof window !== 'undefined' ? window : this));

/**
 * ── PHASE 2 HANDOFF NOTES ────────────────────────────────────────
 *
 * To split a chapter into multiple cinematic scenes:
 *
 *   1. In maie-chapters.js, a chapter config's `body` array currently
 *      renders as one continuous .mod-body. Phase 2 should add an
 *      optional `scenes: [...]` array as a sibling of `body`, where
 *      each entry is itself a {header, body} pair — i.e. the same
 *      shape a whole chapter has today, just nested.
 *
 *   2. In maie-chapter-renderer.js, renderChapter() should detect
 *      `config.scenes` and, if present, render N <div class="scene">
 *      children inside the chapter's <section class="module">,
 *      instead of one flat .mod-body. Only one .scene is visible at
 *      a time (display:flex vs none), toggled by a *local* sub-index
 *      that this SceneEngine should also own — extend sceneIndex to
 *      carry `subScenes: [...]` per group entry, and getSceneEl()
 *      should resolve to the specific .scene div, not just the
 *      .module wrapper.
 *
 *   3. The chapter-nav footer (prev/next chapter buttons) needs a
 *      second tier: "next scene within this chapter" vs "next
 *      chapter." SceneEngine.next()/prev() already walk the flat
 *      scene list correctly for this — group boundaries are already
 *      tracked via isFirstInGroup/isLastInGroup — so the chapter-nav
 *      buttons just need to call next()/prev() instead of
 *      hardcoded navigate('nextChapterId') calls, and use
 *      sceneMeta().isLastInGroup to decide button label ("Next
 *      Scene →" vs "Marketplace →").
 *
 *   4. A slide-progress sub-indicator (small dots under the topbar
 *      progress bar, one per scene in the current group) can be
 *      built directly from group.scenes.length + sceneIdxInGroup —
 *      no new state needed, the data is already on sceneMeta().
 *
 * To resume: read this engine, then read MODULE_ORDER / buildSidenav()
 * in the portal shell <script> block — that's the only place that
 * still assumes 1 chapter = 1 scene, and it's already written against
 * this engine's API so the swap is additive, not a rewrite.
 */
