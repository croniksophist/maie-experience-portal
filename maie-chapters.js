/**
 * maie-chapters.js
 *
 * The full 12-chapter MAIE Experience Platform content, as MODULE_CONFIG
 * objects. Each entry is fed to MAIE.renderChapter() to produce a
 * <section class="module"> identical in markup to the old hand-authored
 * chapters — only the source of truth changed.
 *
 * To edit any chapter: edit the relevant object below. No HTML editing
 * required. To add a chapter: add an object, then update navOrder /
 * prevId / nextId on its neighbors.
 */

window.MAIE_CHAPTERS = [

// ═══════════════════════════════════════════════════════════════
// CHAPTER 01 — VISION
// (kept as hand-authored hero markup — see portal shell, not migrated
//  here because the hero layout uses bespoke CSS classes (.vision-hero,
//  .vision-pillars) that don't map to the generic block vocabulary.
//  Listed here only for nav/order bookkeeping.)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// CHAPTER 02 — INDUSTRY CHALLENGES
// ═══════════════════════════════════════════════════════════════
{
  id: 'problem',
  navOrder: 2,
  navTotal: 12,
  navLabel: 'Industry Challenges',
  prevId: 'vision',     prevLabel: '← Vision',
  nextId: 'platform',   nextLabel: 'Meet MAIE →',
  audienceTags: ['executive', 'product'],
  header: {
    eyebrow: 'Chapter 02 · Industry Challenges',
    title: 'The Gap',
    subtitle: 'AI media capabilities have matured. The tooling to orchestrate them has not. Creative teams do that work by hand.',
  },
  body: [
    { type: 'cardGrid', columns: 2, marginBottom: '1.5rem', cards: [
      { eyebrow: 'The Traditional Suite', title: 'Powerful but operator-dependent',
        body: 'Timelines, layers, and panels that require the operator to already know which fifteen steps to perform, in what order, with which settings. The tool is expert. The operator must be too.' },
      { eyebrow: 'The Point-Solution AI Tool', title: 'One problem, well',
        body: 'A single-purpose model wrapped in a single-purpose interface. One tab for captioning, another for upscaling, another for transcription. Each unaware the others exist. The user does the gluing.' },
    ]},
    { type: 'thesis',
      quote: 'MAIE is built around a different premise: that the unit of work in modern media production is not a <strong>tool</strong>, but a <strong>goal</strong>.',
      source: 'Product Overview · §1' },
    { type: 'cardGrid', columns: 3, marginTop: '1.5rem', cards: [
      { eyebrow: "What's matured", title: 'AI capabilities',
        body: 'Scene segmentation, visual captioning, transcription, similarity search — genuinely useful, broadly available, scattered across disconnected APIs.' },
      { eyebrow: "What hasn't", title: 'Orchestration',
        body: 'Creative teams glue together uploads, model calls, and exports by hand. Every workflow is a bespoke manual process that cannot be shared, sold, or replayed.' },
      { eyebrow: 'The deeper gap', title: 'Creative identity',
        body: 'No platform treats the creator as a persistent entity whose reputation, history, and output have value that compounds over time. Every session starts fresh.' },
    ]},
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 03 — PLATFORM OVERVIEW
// (hero pillar layout with live Pixie kept hand-authored in shell —
//  same bespoke-CSS reason as Chapter 01. Listed for bookkeeping.)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// CHAPTER 04 — WORKSPACE & PRODUCTION ENVIRONMENT
// ═══════════════════════════════════════════════════════════════
{
  id: 'workspace',
  navOrder: 4,
  navTotal: 12,
  navLabel: 'Workspace & Production Environment',
  prevId: 'platform',     prevLabel: '← Meet MAIE',
  nextId: 'intelligence', nextLabel: 'Intelligence →',
  audienceTags: ['product', 'technical'],
  header: {
    eyebrow: 'Chapter 04 · Workspace & Production Environment',
    title: 'The Workspace',
    subtitle: 'The production hub a user returns to — not a landing page they pass through. Projects, media, AI tools, and activity all unified in a single screen.',
  },
  body: [
    { type: 'cardGrid', columns: 3, label: 'Three views — three questions', marginBottom: '1.5rem', cards: [
      { eyebrow: 'Workspace', title: '"What am I working on?"',
        body: 'Recent projects, upload surface, marketplace assets, and one-click launchers into every AI tool. The view returning users land in.' },
      { eyebrow: 'Tools', title: '"I know what I want to do."',
        body: 'Agent, Scene Detection, Metadata, Transcription, Image Analysis, Recommendations, and Asset Management — organized as tabs, directly accessible.' },
      { eyebrow: 'Analytics', title: '"Is anything stuck?"',
        body: 'Project-type distribution and processing-status counts — completed, pending, failed — rendered as a live operational summary, not a vanity chart.' },
    ]},
    { type: 'thesis',
      quote: 'Work in MAIE is organized into <strong>projects</strong> — the same container concept used in any serious production tool. A project holds media files, tracks processing state, and gives the agent and the marketplace a shared frame of reference.' },
    { type: 'cardGrid', columns: 2, marginTop: '1.5rem', cards: [
      { eyebrow: 'Zero blank-state friction', title: 'First-run experience',
        body: 'New users see a single "Create First Project" action rather than an empty grid. A drag-and-drop upload surface accepts video, image, and audio files and queues them for processing without a detour into a separate import tool.' },
      { eyebrow: 'Quick Launch grid', title: 'Five tools, one click',
        body: 'Agent, Scene Detection, Metadata, Transcription, and Image Analysis are surfaced as single-click entry points beneath the project carousel. A returning user with a clear task never navigates through a menu.' },
      { eyebrow: 'AI Recommendations', title: 'Natural next steps',
        body: 'Each recommendation is keyword-matched to the single most relevant tool: scene language routes to Scene Detection, metadata language routes to Metadata Enrichment. Every suggestion has one concrete, correctly-targeted Launch action.' },
      { eyebrow: 'Live activity feed', title: 'Always know what\'s happening',
        body: 'A persistent panel surfaces uploads completing, agent plans finishing, and assets publishing in real time. In a platform where the agent does multi-step work that takes minutes, the user should never have to wonder if something is happening.' },
    ]},
    { type: 'raw', html: `<div style="margin-top:1.5rem;background:rgba(255,255,255,0.018);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem 1.5rem;display:grid;grid-template-columns:auto 1fr;gap:1.5rem;align-items:start;">
      <div style="font-family:var(--font-display);font-size:2rem;letter-spacing:0.06em;text-transform:uppercase;color:var(--border-strong);line-height:1;padding-top:2px;">NLE</div>
      <div>
        <div style="font-size:0.82rem;font-weight:600;color:var(--text-1);margin-bottom:0.35rem;">Built like production software</div>
        <div style="font-size:0.8rem;color:var(--text-2);line-height:1.65;">MAIE's interface is modeled on the precision-chrome aesthetic of professional NLE software — DaVinci Resolve, Avid. Bebas Neue for wordmark and headers. DM Sans for body and controls. JetBrains Mono reserved for technical readouts — timestamps, counters, file paths — so the eye learns to read mono as "data" and display as "branding." A full light/dark theme system built on CSS tokens repaints every surface instantly with no flash and no stale colors.</div>
      </div>
    </div>` },
    { type: 'cardGrid', columns: 1, label: 'Image Hub', marginTop: '1.5rem', cards: [
      { title: 'A unified media library',
        body: 'Images can be uploaded directly or imported in bulk from Google Photos via the official Picker flow. Every image, regardless of origin, is normalized into the same internal representation and gains the same AI-enrichment fields — searchable, taggable, and agent-addressable the moment it lands. Most creative libraries don\'t start inside the tool being evaluated. Removing the re-upload friction closes the gap between "trying the product" and "using it on real work."' },
    ]},
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 05 — AGENT INTELLIGENCE & WORKFLOW
// Split: Scene A = planning model (thesis + flow + trust callout)
//        Scene B = execution detail (cards) + full tool suite
// ═══════════════════════════════════════════════════════════════
{
  id: 'intelligence',
  navOrder: 5,
  navTotal: 12,
  navLabel: 'Agent Intelligence & Workflow',
  prevId: 'workspace', prevLabel: '← Workspace',
  nextId: 'identity',  nextLabel: 'Identity →',
  audienceTags: ['technical', 'product'],
  header: {
    eyebrow: 'Chapter 05 · Agent Intelligence & Workflow',
    title: 'From Goal to Outcome',
    subtitle: 'The center of the MAIE experience is not a feature tab — it is a conversation. The agent converts a natural-language intent into a concrete, inspectable, executable plan.',
  },
  scenes: [
    {
      // Scene A — The planning model: why and how the agent thinks
      body: [
        { type: 'thesis',
          quote: 'The unit of work in modern media production is not a tool, but a <strong>goal</strong>. A producer states what they want. The agent figures out which capabilities to invoke, in what sequence — and presents a single coherent outcome.' },
        { type: 'flowSteps', label: 'How a plan executes', steps: [
          { label: 'Goal', desc: 'Natural language input. One text field.',
            color: 'rgba(165,42,42,0.1)', border: 'var(--border-brand)', textColor: 'var(--primary-light)' },
          { label: 'Plan', desc: 'Ordered steps. Risk classification. Inspectable before anything runs.' },
          { label: 'Execute', desc: 'Step-by-step. Live progress. Partial success handled.',
            color: 'rgba(34,197,94,0.07)', border: 'rgba(34,197,94,0.25)', textColor: 'rgba(34,197,94,0.8)' },
        ]},
        { type: 'calloutBox', tone: 'warn', label: 'Why this matters',
          body: 'Most AI agent demos optimize for the moment a model produces an impressive-looking action. MAIE optimizes for the moment after that — for whether a producer would actually trust the system with their footage, their client\'s files, or a batch of a hundred images. <span style="color:var(--text-1);font-weight:500;">Risk-gated approval is what makes that trust possible.</span> The agent can move fast on the safe, common case, and slow down exactly where a human should be in the loop.' },
      ],
    },
    {
      // Scene B — Execution details + full tool suite
      body: [
        { type: 'cardGrid', columns: 2, cards: [
          { eyebrow: 'Context awareness', title: 'The agent already knows your project',
            body: 'Before a plan is proposed, the agent already understands which project is active, which files belong to it, and which have been verified as healthy. It continuously re-verifies file availability — a file that goes stale is quietly excluded before the user can submit it to a plan that would fail.' },
          { eyebrow: 'Risk classification', title: 'Automatic vs. gated execution',
            body: 'Low-risk plans proceed automatically. Medium, high, or critical risk is held for explicit approval before a single step runs. A batch operation across many files is treated with more caution than a single targeted analysis — the blast radius of a mistake is larger.' },
          { eyebrow: 'Partial success', title: 'Failure doesn\'t discard work',
            body: 'Steps can complete partially. If three of four steps in a plan succeed and one fails, the user sees exactly that — not a blanket failure screen that throws away three steps of legitimate, usable work.' },
          { eyebrow: 'Plan → marketplace', title: 'Reusable by design',
            body: 'A completed agent plan can be exported directly as a marketplace asset. A workflow built once — for a specific kind of footage — becomes a packaged, reusable capability other users invoke against their own media. Doing the work and building the product are the same action.' },
        ]},
        { type: 'raw', html: `<div>
          <div class="card-eyebrow" style="margin-bottom:0.75rem;">The tool suite — every agent capability, also standalone</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;">
            <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.25rem;">Scene Detection</div><div style="font-size:0.72rem;color:var(--text-3);line-height:1.5;">Automatic scene boundary detection, keyframe extraction, proportional visual timeline, captioning, and visual similarity clustering.</div></div>
            <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.25rem;">Metadata Enrichment</div><div style="font-size:0.72rem;color:var(--text-3);line-height:1.5;">AI vision analysis — captions, object tags, color palettes, brightness signals, people-presence detection — powering every search and filter surface.</div></div>
            <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.25rem;">Transcription</div><div style="font-size:0.72rem;color:var(--text-3);line-height:1.5;">Audio and video to structured, searchable text. Foundation for captioning, content repurposing, and agent steps that reason about what was said.</div></div>
            <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.25rem;">Image Analysis</div><div style="font-size:0.72rem;color:var(--text-3);line-height:1.5;">Object recognition, classification, and visual characteristics as a standalone workflow for teams working primarily with still imagery.</div></div>
            <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.25rem;">Recommendations</div><div style="font-size:0.72rem;color:var(--text-3);line-height:1.5;">AI-generated suggestions personalized to recent activity. Each one resolved to a concrete next action — not an inert observation.</div></div>
            <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.25rem;">Asset Management</div><div style="font-size:0.72rem;color:var(--text-3);line-height:1.5;">Create, review, and publish marketplace assets. Status lifecycle from PENDING_APPROVAL to ACTIVE — the publish pipeline the agent feeds into.</div></div>
          </div>
        </div>` },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 06 — LIVING IDENTITY (PIXIE COMPANION)
// Split: Scene A = Pixie thesis + three-tier architecture model
//        Scene B = Customization palette + reputation echoes + why it matters
// ═══════════════════════════════════════════════════════════════
{
  id: 'identity',
  navOrder: 6,
  navTotal: 12,
  navLabel: 'Living Identity',
  prevId: 'intelligence', prevLabel: '← Intelligence',
  nextId: 'marketplace',  nextLabel: 'Marketplace →',
  audienceTags: ['executive', 'technical', 'product'],
  header: {
    eyebrow: 'Chapter 06 · Living Identity',
    title: 'Identity is Infrastructure',
    subtitle: 'A living creative presence that mirrors workflow state, accumulates reputation history, and carries creator provenance across every context — not a feature, the foundation.',
  },
  scenes: [
    {
      // Scene A — The architecture: why identity has three layers
      body: [
        { type: 'thesis', source: 'Product Overview · §3',
          quote: 'The agent is represented in the interface by an animated companion — the Pixie — that visibly shifts state as work progresses: <strong>idle</strong> while waiting, <strong>active</strong> while planning, <strong>progressing</strong> through execution. Giving that work a visible, continuously-updating presence is what makes "the agent is working" feel concrete and trustworthy rather than abstract.' },
        { type: 'tierStack', label: 'Three-tier identity architecture', tiers: [
          { tierLabel: 'Tier 1 · Permanent', title: 'UserIdentity',
            body: 'Immutable provenance. The glyph seed that stamps every asset the creator publishes. Changing archetype or theme never touches this layer — it is what other creators encounter when they find your work in the marketplace.',
            bg: 'rgba(165,42,42,0.1)', border: 'var(--border-brand)', labelColor: 'var(--primary-light)', tagBg: 'rgba(165,42,42,0.1)',
            tags: ['identity_id', 'glyph seed', 'provenance stamp'] },
          { tierLabel: 'Tier 2 · Expressive', title: 'Pixie Companion',
            body: 'Personality, appearance, and character. The archetype defines how the Pixie moves and what role it plays. Theme colors and marketplace skins layer on top. Fully replaceable — swapping archetype never affects creator provenance.',
            bg: 'rgba(168,85,247,0.07)', border: 'rgba(168,85,247,0.2)', labelColor: '#A855F7', tagBg: 'rgba(168,85,247,0.1)',
            tags: ['archetype', 'theme_id', 'pixie_name', 'preferences'] },
          { tierLabel: 'Tier 3 · Live', title: 'Runtime Intelligence',
            body: 'Ephemeral phase layer. Never persisted. Driven live from AgentWorkflowPanel callbacks — phase, mode, progress, and temperament change in real time as the agent works.',
            bg: 'rgba(34,197,94,0.05)', border: 'transparent', labelColor: 'rgba(34,197,94,0.7)', tagBg: 'rgba(34,197,94,0.08)',
            tags: ['phase', 'mode', 'progress %', 'temperament'] },
        ]},
      ],
    },
    {
      // Scene B — The experience layer: customization, echoes, retention value
      body: [
        { type: 'raw', html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="card">
            <div class="card-eyebrow">Customization — free tier</div>
            <div style="display:flex;flex-direction:column;gap:0;margin-top:0.75rem;">
              <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.78rem;"><span style="color:var(--text-2);">Archetype</span><span style="color:var(--text-1);font-weight:500;">5 options</span></div>
              <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.78rem;"><span style="color:var(--text-2);">Color theme</span><span style="color:var(--text-1);font-weight:500;">13 palettes</span></div>
              <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.78rem;"><span style="color:var(--text-2);">Animation style</span><span style="color:var(--text-1);font-weight:500;">orbit / wave / pulse / neural</span></div>
              <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.78rem;"><span style="color:var(--text-2);">Core shape</span><span style="color:var(--text-1);font-weight:500;">circle / hexagon / diamond</span></div>
              <div style="display:flex;justify-content:space-between;padding:0.4rem 0;font-size:0.78rem;"><span style="color:var(--text-2);">Marketplace skins</span><span style="color:var(--text-1);font-weight:500;">AGENT_SKIN composited</span></div>
            </div>
          </div>
          <div class="card">
            <div class="card-eyebrow">Living reputation echoes</div>
            <div class="card-body" style="margin-top:0.5rem;">Achievement and milestone events mint permanent echo marks that orbit the Pixie canvas. Fresher echoes pulse faster and sit closer in. Older ones drift outward and slow. Higher resonance renders larger and brighter.</div>
            <div style="display:flex;flex-direction:column;gap:0.4rem;margin-top:0.875rem;">
              <div style="display:flex;align-items:center;gap:8px;"><div style="width:8px;height:8px;border-radius:50%;background:#38BDF8;flex-shrink:0;"></div><span style="font-size:0.72rem;color:var(--text-2);">ACHIEVEMENT_ARTIFACT — production milestones</span></div>
              <div style="display:flex;align-items:center;gap:8px;"><div style="width:8px;height:8px;border-radius:50%;background:#A855F7;flex-shrink:0;"></div><span style="font-size:0.72rem;color:var(--text-2);">LEGACY_ECHO — career milestones, first approvals</span></div>
              <div style="display:flex;align-items:center;gap:8px;"><div style="width:8px;height:8px;border-radius:50%;background:#FFB400;flex-shrink:0;"></div><span style="font-size:0.72rem;color:var(--text-2);">Resonance value — drives glow intensity and orbit priority</span></div>
            </div>
          </div>
        </div>` },
        { type: 'calloutBox', tone: 'brand', label: 'Why identity is infrastructure, not a feature',
          body: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div><strong style="color:var(--text-1);">Creator retention.</strong> A Pixie that grows richer over time — more echoes, higher resonance, earned marketplace identity — gives creators a structural reason to return. Their identity is on the platform, not just their files.</div>
            <div><strong style="color:var(--text-1);">Earned lock-in.</strong> No competing production platform builds persistent creative identity into the infrastructure layer. The provenance stamp, the echo orbit, the archetype — these are things a creator would lose by leaving. That is the right kind of retention.</div>
          </div>` },
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 07 — MARKETPLACE & ECOSYSTEM
// ═══════════════════════════════════════════════════════════════
{
  id: 'marketplace',
  navOrder: 7,
  navTotal: 12,
  navLabel: 'Marketplace & Ecosystem',
  prevId: 'identity',  prevLabel: '← Identity',
  nextId: 'enterprise', nextLabel: 'Enterprise →',
  audienceTags: ['executive', 'product'],
  header: {
    eyebrow: 'Chapter 07 · Marketplace & Ecosystem',
    title: 'Doing the Work is Building the Product',
    subtitle: 'A platform-native token economy sits underneath a creator marketplace — giving every completed workflow a potential second life as a sellable asset.',
  },
  body: [
    { type: 'thesis',
      quote: 'In MAIE, doing the work and building the product are <strong>the same action</strong>. A completed agent plan exports directly as a marketplace asset. The system automatically infers the asset type from the tools used — no manual re-categorization in the common case.' },
    { type: 'cardGrid', columns: 2, label: 'The token economy', marginTop: '1.5rem', cards: [
      { eyebrow: 'One source of truth', title: 'Prices that can\'t drift',
        body: 'Every financial value — asset price, creator payout, platform commission — flows from a single environment-configured source. Asset prices are stored as whole-number MAIE Token counts. The dollar value is always computed at display time, never stored as a stale separate figure.' },
      { eyebrow: 'Atomic ledger', title: '80% to the creator',
        body: 'When a marketplace asset sells, the platform retains its commission and the remainder is credited to the creator — by default, an eighty-percent revenue share. Every balance change is written through a race-condition-safe ledger operation and recorded permanently in an append-only transaction log.' },
    ]},
    { type: 'raw', html: `<div style="margin-top:1.5rem;">
      <div class="card-eyebrow" style="margin-bottom:0.75rem;">What's for sale</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.625rem;">
        <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:1rem;margin-bottom:0.4rem;">⬡</div><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.2rem;">Workflow blueprints</div><div style="font-size:0.71rem;color:var(--text-3);line-height:1.5;">Reusable agent plan sequences tuned for specific kinds of footage.</div></div>
        <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:1rem;margin-bottom:0.4rem;">◎</div><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.2rem;">Identity themes</div><div style="font-size:0.71rem;color:var(--text-3);line-height:1.5;">Full animation + shape + palette bundles for the Pixie companion.</div></div>
        <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:1rem;margin-bottom:0.4rem;">◈</div><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.2rem;">Agent skins</div><div style="font-size:0.71rem;color:var(--text-3);line-height:1.5;">AGENT_SKIN images composited onto the Pixie canvas, validated server-side.</div></div>
        <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:1rem;margin-bottom:0.4rem;">◇</div><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.2rem;">Scene data packets</div><div style="font-size:0.71rem;color:var(--text-3);line-height:1.5;">Processed scene analysis outputs packaged as sellable datasets.</div></div>
        <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:1rem;margin-bottom:0.4rem;">⬢</div><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.2rem;">Achievement collections</div><div style="font-size:0.71rem;color:var(--text-3);line-height:1.5;">Curated echo sets recognizing specific career milestones.</div></div>
        <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.875rem;"><div style="font-size:1rem;margin-bottom:0.4rem;">△</div><div style="font-size:0.78rem;font-weight:600;color:var(--text-1);margin-bottom:0.2rem;">Creative recipes</div><div style="font-size:0.71rem;color:var(--text-3);line-height:1.5;">Opinionated production templates for a specific kind of output.</div></div>
      </div>
    </div>` },
    { type: 'cardGrid', columns: 2, marginTop: '1.5rem', cards: [
      { eyebrow: 'Tiered access', title: 'Monetization inside the core loop',
        body: 'Exporting agent work to the marketplace is gated by account tier. Casual users get full access to every AI tool. Marketplace participation — turning personal workflows into income — is part of what a more invested membership tier unlocks.' },
      { eyebrow: 'No login required to browse', title: 'Conversion by design',
        body: 'Marketplace pricing information is deliberately public and unauthenticated. A prospective user\'s first encounter with the platform\'s economic layer is never a login wall. Every new user also begins with a starting token balance at account creation.' },
    ]},
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 08 — ENTERPRISE PLATFORM   (new)
// ═══════════════════════════════════════════════════════════════
{
  id: 'enterprise',
  navOrder: 8,
  navTotal: 12,
  navLabel: 'Enterprise Platform',
  prevId: 'marketplace', prevLabel: '← Marketplace',
  nextId: 'architecture', nextLabel: 'Architecture →',
  audienceTags: ['executive', 'technical'],
  header: {
    eyebrow: 'Chapter 08 · Enterprise Platform',
    title: 'Built for Organizations, Not Just Individuals',
    subtitle: 'Multi-tenancy, identity authority, and access control are first-class concerns baked into the data model — not retrofitted once enterprise customers asked for them.',
  },
  body: [
    { type: 'thesis',
      quote: 'Every meaningful record in the system — media files, agent plans, token balances, content sources — is scoped to a tenant, and every endpoint that touches user data verifies project and tenant access before a single query runs. This is not a retrofit; tenant isolation is a first-class concern baked into the data model.',
      source: 'Product Overview · §6' },
    { type: 'cardGrid', columns: 2, label: 'Two distinct authorities', marginTop: '1.5rem', cards: [
      { eyebrow: 'Identity', title: '"Is this person who they claim to be?"',
        body: 'Firebase\'s authentication service handles sign-in, social login, and password recovery. A successful sign-in is never, by itself, treated as sufficient.' },
      { eyebrow: 'Membership', title: '"Does this person exist as a MAIE user, in good standing?"',
        body: 'MAIE\'s own backend answers role and standing separately. Every login exchanges a verified identity token for the platform\'s own user record before a session is considered active.' },
    ]},
    { type: 'calloutBox', tone: 'neutral', marginTop: '1.5rem', label: 'Why two authorities, one front door',
      body: 'New users move through the identical resolution path as returning users — account creation is simply that path\'s first-time case. That keeps the entire authentication surface, and every future improvement to it, to a single source of truth instead of two parallel systems that can silently drift apart.' },
    { type: 'cardGrid', columns: 2, marginTop: '1.5rem', cards: [
      { eyebrow: 'Role-based access', title: 'Admin requests as an auditable trail',
        body: 'Privilege escalation runs through a permanent, append-only request log — submit, review, approve or deny, with a documented reviewer note required on denial. Records are never deleted; the table is the audit trail.' },
      { eyebrow: 'Continuity across login', title: 'Intent survives authentication',
        body: 'A visitor who clicks a specific capability before signing in lands directly inside that exact tool after authenticating — not a generic post-login landing page. Friction between expressing intent and acting on it is absorbed by the platform, not passed to the user.' },
    ]},
    { type: 'raw', html: `<div style="margin-top:1.5rem;display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;">
      <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;text-align:center;"><div style="font-family:var(--font-display);font-size:1.4rem;color:var(--primary-light);margin-bottom:0.25rem;">Tenant</div><div style="font-size:0.7rem;color:var(--text-3);">Scoped isolation on every record</div></div>
      <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;text-align:center;"><div style="font-family:var(--font-display);font-size:1.4rem;color:var(--primary-light);margin-bottom:0.25rem;">Project</div><div style="font-size:0.7rem;color:var(--text-3);">Verified access on every endpoint</div></div>
      <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;text-align:center;"><div style="font-family:var(--font-display);font-size:1.4rem;color:var(--primary-light);margin-bottom:0.25rem;">Role</div><div style="font-size:0.7rem;color:var(--text-3);">Auditable elevation, never silent</div></div>
      <div style="background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;text-align:center;"><div style="font-family:var(--font-display);font-size:1.4rem;color:var(--primary-light);margin-bottom:0.25rem;">Ledger</div><div style="font-size:0.7rem;color:var(--text-3);">Append-only, independently verifiable</div></div>
    </div>` },
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 09 — TECHNOLOGY ARCHITECTURE
// Split: Scene A = stack overview (diffTable + async thesis)
//        Scene B = engineering quality (4 cards: health, theming, extensibility, discipline)
// ═══════════════════════════════════════════════════════════════
{
  id: 'architecture',
  navOrder: 9,
  navTotal: 12,
  navLabel: 'Technology Architecture',
  prevId: 'enterprise', prevLabel: '← Enterprise',
  nextId: 'roadmap',    nextLabel: 'Roadmap →',
  audienceTags: ['technical'],
  header: {
    eyebrow: 'Chapter 09 · Technology Architecture',
    title: 'Built on Conventional, Well-Understood Infrastructure',
    subtitle: 'Chosen deliberately for operational predictability over architectural novelty. Request handling is separated from heavy processing by design.',
  },
  scenes: [
    {
      // Scene A — The full stack: what's running and why
      body: [
        { type: 'diffTable', label: 'The stack', statusColumn: true,
          headers: ['Layer', 'Role', 'Technology', 'Status'],
          rows: [
            ['Frontend', 'Workspace, agent panel, tool suite', 'React / TypeScript SPA', 'Production'],
            ['API layer', 'REST endpoints + live WebSocket', 'FastAPI + Firebase Auth', 'Production'],
            ['Task queue', 'Video, transcription, AI enrichment', 'Celery / Redis', 'Production'],
            ['Data layer', 'System of record + cache', 'PostgreSQL / SQLAlchemy', 'Production'],
            ['Multi-tenancy', 'Every record scoped, every endpoint verified', 'First-class, not retrofit', '✓ Day one'],
            ['Storage', 'Media files and keyframes', 'Local → S3 migration path built in', 'Ready'],
          ]},
        { type: 'thesis',
          quote: 'User-facing requests are served by a FastAPI backend and answered immediately; anything computationally expensive — video analysis, transcription, AI enrichment, scheduled content polling — is handed off to a distributed task queue and processed asynchronously, with results streamed back as they complete.',
          source: 'Product Overview · §6' },
      ],
    },
    {
      // Scene B — Engineering quality signals: what the platform's discipline looks like in practice
      body: [
        { type: 'cardGrid', columns: 2, cards: [
          { eyebrow: 'File health', title: 'A model that knows what it doesn\'t know',
            body: 'Media files carry an explicit health and lifecycle state — pending, completed, failed, or stale. The platform actively, continuously verifies that a file recorded as available is still actually present and processable, rather than trusting a database row indefinitely.' },
          { eyebrow: 'Theming', title: 'Infrastructure, not a coat of paint',
            body: 'The light/dark theme system is built on CSS custom properties resolved at the moment of paint. Every surface updates instantly and correctly the moment a theme is toggled — no flash of stale color, no component left in the wrong mode.' },
          { eyebrow: 'Extensibility', title: 'New transaction types, no migration',
            body: 'New marketplace asset types plug into the existing integer-token pricing system with no schema changes. New content connectors follow one shared five-stage pipeline — additive work, not a parallel system.' },
          { eyebrow: 'Engineering discipline', title: 'Incidents become protocols',
            body: 'Real production issues — a silent error-handling fallback, a cross-project data contamination bug, a duplicate authentication endpoint — are turned into standing diagnostic protocols and documented architectural rules, not just patched and forgotten.' },
        ]},
      ],
    },
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 10 — FUTURE ROADMAP   (new — split from old Ch.08)
// ═══════════════════════════════════════════════════════════════
{
  id: 'roadmap',
  navOrder: 10,
  navTotal: 12,
  navLabel: 'Future Roadmap',
  prevId: 'architecture', prevLabel: '← Architecture',
  nextId: 'business',     nextLabel: 'Business Model →',
  audienceTags: ['executive', 'technical'],
  header: {
    eyebrow: 'Chapter 10 · Future Roadmap',
    title: 'A Foundation, Not a Ceiling',
    subtitle: 'Every direction below extends a capability that already exists in production today — the roadmap is mostly about turning on and scaling out systems already designed into the platform.',
  },
  body: [
    { type: 'timeline', label: 'Platform direction', items: [
      { horizon: 'Now', title: 'Full platform in production',
        desc: 'Agent pipeline, Pixie identity system, marketplace, token economy, multi-tenant architecture, scene detection, transcription, metadata enrichment, Image Hub, Community connectors.' },
      { horizon: 'Near term', title: 'Deeper visual intelligence',
        desc: 'The scene-detection pipeline is already wired to layer on automatic captioning and visual-similarity clustering wherever the underlying vision services are available. Turning this on is a configuration change, not a re-architecture.' },
      { horizon: 'Mid term', title: 'Larger, more liquid marketplace', horizonColor: 'rgba(255,180,0,0.7)',
        desc: 'The plug-in asset-type system and tier-gated export model are built to support categories well beyond the ones live today — a genuine library of reusable, purchasable production workflows.' },
      { horizon: 'Mid term', title: 'Multi-Pixie collaboration', horizonColor: 'rgba(255,180,0,0.7)',
        desc: 'Team environments where each member\'s Pixie appears in a shared canvas — visible co-presence during collaborative productions.' },
      { horizon: 'Future', title: 'Cloud-scale storage + enterprise deployment', horizonColor: 'var(--text-4)',
        desc: 'The media-serving layer is explicitly designed with an additive migration path to cloud object storage. No breaking changes to existing API contracts or frontend URL handling.' },
    ]},
    { type: 'calloutBox', tone: 'neutral', marginTop: '1.5rem', label: 'Engineering discipline as a trust signal',
      body: 'Across MAIE\'s internal documentation, a consistent pattern recurs: real production issues are not just fixed — they are turned into standing diagnostic protocols, troubleshooting playbooks, and documented architectural rules that prevent the same class of problem from recurring. A platform whose own team treats "why did this break, and how do we make sure it can\'t break this way again" as routine practice is a platform built to be operated, not just demonstrated.' },
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 11 — BUSINESS MODEL   (new)
// ═══════════════════════════════════════════════════════════════
{
  id: 'business',
  navOrder: 11,
  navTotal: 12,
  navLabel: 'Business Model',
  prevId: 'roadmap', prevLabel: '← Roadmap',
  nextId: 'cta',     nextLabel: 'Join Us →',
  audienceTags: ['executive'],
  header: {
    eyebrow: 'Chapter 11 · Business Model',
    title: 'A Compounding Asset, Not a Fixed Feature',
    subtitle: 'A point-solution AI tool\'s value is roughly fixed at the quality of its one model. MAIE\'s value compounds with usage.',
  },
  body: [
    { type: 'cardGrid', columns: 3, label: 'Revenue streams', cards: [
      { eyebrow: 'Subscriptions', title: 'Tiered membership',
        body: 'Casual users get full AI tool access. Marketplace participation — turning personal workflows into income — is part of what a more invested tier unlocks.' },
      { eyebrow: 'Marketplace commission', title: '20% platform share',
        body: 'Every asset sale retains a platform commission while crediting an 80% revenue share to the creator. Volume scales with the size and activity of the creator base, not headcount.' },
      { eyebrow: 'Enterprise & licensing', title: 'Multi-tenant from day one',
        body: 'Tenant isolation already exists as a first-class architectural concern — enterprise and agency-style multi-account deployment doesn\'t require a re-architecture to support.' },
    ]},
    { type: 'thesis', marginTop: '1.5rem',
      quote: 'Every other piece of the platform — the project and file model, the theming and design-token system, the multi-tenant data architecture, the agent\'s plan-and-approval contract, the token ledger — is infrastructure that gets <strong>more valuable</strong> as more workflows, more connectors, and more marketplace assets are built on top of it.',
      source: 'Product Overview · §8' },
    { type: 'diffTable', label: 'Why this compounds and a point solution does not', marginTop: '1.5rem',
      headers: ['Dimension', 'Point-solution AI tool', 'MAIE'],
      rows: [
        ['Value driver', 'Quality of one model', 'Platform + agent + marketplace + identity'],
        ['Grows with usage?', 'No — value is roughly fixed', 'Yes — every workflow built adds to the library'],
        ['Switching cost for users', 'Low', 'High — earned identity, history, marketplace presence'],
        ['Replicable by a competitor', 'Easily', 'Only by building the same platform underneath it'],
      ]},
  ],
},

// ═══════════════════════════════════════════════════════════════
// CHAPTER 12 — CALL TO ACTION   (was Ch.08 closing, now standalone)
// ═══════════════════════════════════════════════════════════════
{
  id: 'cta',
  navOrder: 12,
  navTotal: 12,
  navLabel: 'Call to Action',
  prevId: 'business', prevLabel: '← Business Model',
  nextId: null, nextLabel: '',
  audienceTags: ['executive', 'technical', 'product'],
  header: {
    eyebrow: 'Chapter 12 · Call to Action',
    title: 'Help Build the Operating System for AI-Powered Media Production',
    subtitle: 'This document has stayed inside the boundary of what MAIE is and how it works. The platform, on its own terms, is the case.',
  },
  body: [
    { type: 'closingBlock',
      eyebrow: 'In summary',
      headline: 'The platform\'s value compounds with usage, in a way a single-feature competitor structurally cannot replicate.',
      body: 'MAIE\'s roadmap is mostly about turning on and scaling out systems already designed into the platform — not closing fundamental gaps in what has been built.',
      pills: [
        { text: 'Midwest Media Alliance', variant: 'pill-brand' },
        { text: 'MAIE Framework 2.0', variant: 'pill-muted' },
        { text: 'Official Product Literature', variant: 'pill-muted' },
      ]},
  ],
},

];
