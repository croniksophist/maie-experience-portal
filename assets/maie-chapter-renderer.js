/**
 * maie-chapter-renderer.js
 *
 * Converts a MODULE_CONFIG-shaped object into the same DOM structure the
 * portal's hand-authored chapters use. Output is visually identical to
 * the hand-authored HTML — this only changes the source of truth from
 * "HTML someone wrote" to "config someone filled in."
 *
 * Block vocabulary (the fixed set every chapter is built from):
 *   header        — eyebrow + title + subtitle
 *   thesis        — quoted pull-statement, optional source tag
 *   cardGrid      — N-column grid of { eyebrow, title, body }
 *   diffTable     — header row + data rows, fixed-width grid
 *   stackRow      — wrapped chip list
 *   flowSteps     — N-stage horizontal arrow flow (Goal → Plan → Execute style)
 *   tierStack     — stacked colored blocks (used for 3-tier identity, also
 *                   reusable for any "layered system" chapter)
 *   timeline      — horizon-labeled rows (Now / Near / Mid / Future)
 *   calloutBox    — single emphasized text block, optional label
 *   closingBlock  — centered final statement + pill row
 *   raw           — escape hatch: pre-authored HTML string, used sparingly
 *
 * Usage:
 *   renderChapter(MODULE_CONFIG) → returns an HTMLElement <section class="module">
 *   append it into #content, wire its id into MODULE_ORDER / PROGRESS / LABELS.
 */

(function (root) {
  'use strict';

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* ── Block renderers ─────────────────────────────────────────── */

  const AUDIENCE_LABELS = {
    executive: { label: 'Executive', color: '#C24E4E' },
    technical: { label: 'Technical', color: '#38BDF8' },
    product:   { label: 'Product',   color: '#A855F7' },
  };

  function blockAudiencePills(tags) {
    if (!tags || !tags.length) return '';
    return `<div class="audience-pills">${tags.map(t => {
      const a = AUDIENCE_LABELS[t];
      return a ? `<span class="audience-pill" style="color:${a.color};border-color:${a.color}40;">${a.label}</span>` : '';
    }).join('')}</div>`;
  }

  function blockHeader(b, audienceTags) {
    return `<div class="mod-header">
      <div>
        <div class="mod-eyebrow">${b.eyebrow}</div>
        ${blockAudiencePills(audienceTags)}
        <h2 class="mod-title">${b.title}</h2>
        ${b.subtitle ? `<p class="mod-subtitle">${b.subtitle}</p>` : ''}
      </div>
    </div>`;
  }

  function blockThesis(b) {
    return `<div class="platform-thesis">
      <div class="platform-thesis-quote">${b.quote}</div>
      ${b.source ? `<span class="platform-thesis-source">${b.source}</span>` : ''}
    </div>`;
  }

  function blockCardGrid(b) {
    const cols = b.columns || 2;
    const cards = b.cards.map(c => `
      <div class="card">
        ${c.eyebrow ? `<div class="card-eyebrow">${c.eyebrow}</div>` : ''}
        <div class="card-title">${c.title}</div>
        <div class="card-body">${c.body}</div>
      </div>`).join('');
    const mt = b.marginTop    ? `margin-top:${b.marginTop};`    : '';
    const mb = b.marginBottom ? `margin-bottom:${b.marginBottom};` : '';
    return `${b.label ? `<div class="card-eyebrow" style="margin-bottom:0.75rem;">${b.label}</div>` : ''}
      <div class="card-grid card-grid--${cols}" style="${mt}${mb}">
        ${cards}
      </div>`;
  }

  function blockDiffTable(b) {
    const headerCells = b.headers.map(h => `<div class="diff-cell">${h}</div>`).join('');
    const rows = b.rows.map(r => `
      <div class="diff-row">
        ${r.map((cell, i) => {
          const isFirst = i === 0;
          const isStatus = i === r.length - 1 && b.statusColumn;
          const cls = isStatus ? 'diff-cell diff-check' : 'diff-cell';
          const style = isFirst ? ' style="font-weight:500;color:var(--text-1);"' : '';
          return `<div class="${cls}"${style}>${cell}</div>`;
        }).join('')}
      </div>`).join('');
    return `${b.label ? `<div class="card-eyebrow" style="margin-bottom:0.75rem;">${b.label}</div>` : ''}
      <div class="diff-table">
        <div class="diff-row header">${headerCells}</div>
        ${rows}
      </div>`;
  }

  function blockStackRow(b) {
    const chips = b.chips.map(c =>
      `<span class="stack-chip${c.highlight ? ' highlight' : ''}">${c.text}</span>`
    ).join('');
    return `${b.label ? `<div class="card-eyebrow" style="margin-bottom:0.75rem;">${b.label}</div>` : ''}
      <div class="stack-row">${chips}</div>`;
  }

  // Layout (spacing, borders, radius, typography scale) lives in the
  // mod-* classes defined in the portal stylesheet. Only genuinely
  // per-instance, data-driven values — a tier's brand color, a step's
  // override color, an echo's hue — stay inline here, because those
  // vary per config entry and have no fixed home in a shared stylesheet.

  function blockFlowSteps(b) {
    const steps = b.steps.map((s, i) => {
      const boxStyle = (s.color || s.border)
        ? ` style="${s.color ? `background:${s.color};` : ''}${s.border ? `border-color:${s.border};` : ''}"`
        : '';
      const labelStyle = s.textColor ? ` style="color:${s.textColor};"` : ' style="color:var(--text-1);"';
      return `
      <div class="mod-flow-step">
        <div class="mod-flow-step-box"${boxStyle}>
          <div class="mod-flow-step-label"${labelStyle}>${s.label}</div>
        </div>
        <div class="mod-flow-step-desc">${s.desc}</div>
      </div>
      ${i < b.steps.length - 1 ? `<div class="mod-flow-arrow">→</div>` : ''}
    `;
    }).join('');
    return `${b.label ? `<div class="card-eyebrow" style="margin-bottom:0.75rem;">${b.label}</div>` : ''}
      <div class="flow-steps flow-steps--${b.steps.length}">${steps}</div>`;
  }

  function blockTierStack(b) {
    const tiers = b.tiers.map(t => `
      <div class="mod-tier" style="background:${t.bg};border-bottom-color:${t.border};">
        <div class="mod-tier-label" style="color:${t.labelColor};">${t.tierLabel}</div>
        <div class="mod-tier-title">${t.title}</div>
        <div class="mod-tier-body">${t.body}</div>
        ${t.tags ? `<div class="mod-tier-tags">
          ${t.tags.map(tag => `<span class="pill" style="background:${t.tagBg};border-color:${t.border};color:${t.labelColor};">${tag}</span>`).join('')}
        </div>` : ''}
      </div>`).join('');
    return `${b.label ? `<div class="card-eyebrow" style="margin-bottom:0.75rem;">${b.label}</div>` : ''}
      <div class="mod-tier-stack">${tiers}</div>`;
  }

  function blockTimeline(b) {
    const rows = b.items.map(item => `
      <div class="mod-timeline-row">
        <div class="mod-timeline-horizon"${item.horizonColor ? ` style="color:${item.horizonColor};"` : ''}>${item.horizon}</div>
        <div>
          <div class="mod-timeline-title">${item.title}</div>
          <div class="mod-timeline-desc">${item.desc}</div>
        </div>
      </div>`).join('');
    return `${b.label ? `<div class="card-eyebrow" style="margin-bottom:0.75rem;">${b.label}</div>` : ''}
      <div class="mod-timeline">${rows}</div>`;
  }

  function blockCalloutBox(b) {
    const tone = b.tone || 'neutral'; // 'neutral' | 'brand' | 'warn' | 'ok'
    const toneClass = tone === 'neutral' ? '' : ` mod-callout--${tone}`;
    const margins = `${b.marginTop ? 'margin-top:'+b.marginTop+';' : ''}${b.marginBottom ? 'margin-bottom:'+b.marginBottom+';' : ''}`;
    return `<div class="mod-callout${toneClass}"${margins ? ` style="${margins}"` : ''}>
      ${b.label ? `<div class="mod-callout-label">${b.label}</div>` : ''}
      <div class="mod-callout-body">${b.body}</div>
    </div>`;
  }

  function blockClosingBlock(b) {
    const pills = (b.pills || []).map(p =>
      `<span class="pill ${p.variant || 'pill-muted'}">${p.text}</span>`
    ).join('');
    return `<div class="mod-closing">
      ${b.eyebrow ? `<div class="mod-closing-eyebrow">${b.eyebrow}</div>` : ''}
      <div class="mod-closing-headline">${b.headline}</div>
      ${b.body ? `<div class="mod-closing-body">${b.body}</div>` : ''}
      ${pills ? `<div class="mod-closing-pills">${pills}</div>` : ''}
    </div>`;
  }

  const RENDERERS = {
    header:       blockHeader,
    thesis:       blockThesis,
    cardGrid:     blockCardGrid,
    diffTable:    blockDiffTable,
    stackRow:     blockStackRow,
    flowSteps:    blockFlowSteps,
    tierStack:    blockTierStack,
    timeline:     blockTimeline,
    calloutBox:   blockCalloutBox,
    closingBlock: blockClosingBlock,
    raw:          b => b.html,
  };

  /**
   * renderChapter(config) → HTMLElement
   *
   * config = {
   *   id:          'workspace',          // becomes mod-workspace
   *   navOrder:    4,                    // 1-indexed position
   *   navLabel:    'Workspace',
   *   prevId:      'platform',
   *   prevLabel:   '← Meet MAIE',
   *   nextId:      'intelligence',
   *   nextLabel:   'Intelligence →',
   *   header:      { eyebrow, title, subtitle },
   *   body:        [ ... ],              // used when config.scenes is absent
   *   scenes:      [                     // optional — splits chapter into sub-scenes
   *     { body: [...blocks] },           // scene 0 (shown on mount)
   *     { body: [...blocks] },           // scene 1, 2, …
   *   ],
   *   audienceTags: ['executive','technical','product'],  // optional
   * }
   *
   * When config.scenes is present, renders N <div class="scene" data-scene-id="id-N">
   * children inside .mod-body. Only scene-0 is visible on mount; the SceneEngine
   * drives visibility by resolving sceneId → the data-scene-id div via getSceneEl().
   */
  function renderBlocks(blocks) {
    return (blocks || []).map(block => {
      const renderer = RENDERERS[block.type];
      if (!renderer) {
        console.warn('[chapter-renderer] unknown block type:', block.type);
        return '';
      }
      return renderer(block);
    }).join('\n');
  }

  function renderChapter(config) {
    const section = el('section', 'module');
    section.id = 'mod-' + config.id;
    section.setAttribute('aria-label', `Chapter ${String(config.navOrder).padStart(2,'0')}: ${config.navLabel}`);

    const headerHtml = blockHeader(config.header, config.audienceTags);

    let bodyInner;
    if (config.scenes && config.scenes.length > 0) {
      // Multi-scene: wrap each scene's blocks in a data-scene-id div.
      // Only the first scene is visible on mount; the SceneEngine manages the rest.
      bodyInner = config.scenes.map((scene, i) => {
        const sceneId = config.id + '-' + i;
        const visibility = i === 0 ? '' : ' style="display:none;"';
        return `<div class="scene" data-scene-id="${sceneId}"${visibility}>${renderBlocks(scene.body)}</div>`;
      }).join('\n');
    } else {
      // Single-scene: flat body, backward-compatible
      bodyInner = renderBlocks(config.body);
    }

    const navTotal = config.navTotal || 12;
    const navNum = String(config.navOrder).padStart(2, '0');
    const totalStr = String(navTotal).padStart(2, '0');

    // Nav buttons delegate to engine.prev() / engine.next() so the scene
    // engine can decide whether "next" means the next sub-scene in this
    // chapter or crossing to the next chapter group. Hardcoding navigate(id)
    // here would bypass sub-scene logic entirely.
    const hasPrev = !!(config.prevId || (config.scenes && config.scenes.length > 1));
    const hasNext = !!(config.nextId || (config.scenes && config.scenes.length > 1));

    section.innerHTML = `${headerHtml}
      <div class="mod-body">${bodyInner}</div>
      <div class="chapter-nav">
        ${hasPrev
          ? `<button class="chapter-nav-btn" onclick="if(window.__engine)window.__engine.prev();">${config.prevLabel || '← Previous'}</button>`
          : `<button class="chapter-nav-btn" disabled>← Previous</button>`}
        <span style="font-family:var(--font-mono);font-size:0.62rem;color:var(--text-4);">${navNum} of ${totalStr}</span>
        ${hasNext
          ? `<button class="chapter-nav-btn primary" onclick="if(window.__engine)window.__engine.next();">${config.nextLabel || 'Next →'}</button>`
          : `<button class="chapter-nav-btn" disabled>End →</button>`}
      </div>`;

    return section;
  }

  root.MAIE = root.MAIE || {};
  root.MAIE.renderChapter = renderChapter;

}(typeof window !== 'undefined' ? window : this));
