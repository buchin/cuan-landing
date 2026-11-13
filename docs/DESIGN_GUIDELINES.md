# Cuan Landing Design Guidelines

**Philosophy:** Calm Software (Things 3 & Bear Notes Inspired)  
**Main Reference:** `cuan/docs/design/design_guidelines.md` (v1.3.1)  
**Author:** Buchin <buchin@dropsugar.com>

---

## 1. Zero Visual Noise & Card Diet
- **Zero Nested Cards:** Never place cards or boxes inside another card (`no boxes inside boxes`). Avoid nesting `bg-muted/30 border border-border/60` containers within confirmation or hero cards.
- **Hairline Dividers:** Separate logical sections within a card using a subtle Things 3 hairline divider (`border-t border-border/40 pt-3`).
- **No Duplicate Status Badges:** Do not repeat the same status label at the top and bottom of a component.
- **No Badge / Micro-Tag Overload:** Avoid clustering multiple micro-tags (`#tag`, pills, badges) in a compact space. They cause cognitive friction and visual fatigue.

## 2. Confirmation & Success States
- Use a single, spacious card with `rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs`.
- Accent with a calm emerald left-border (`border-l-2 border-l-emerald-500`) matching Cuan's native `ApprovalCard` accepted state.
- Keep the confirmation header clean: a soft `CheckCircle2` icon, title, and concise message with monospaced email badge.
- Secondary actions (such as exploring the Founding Sponsor tiers) sit below a hairline divider with an un-hyped `action-secondary` button.

## 3. Brand Icon & SVG Integrity
- All third-party brand icons must maintain official aspect ratios and viewBox bounds. Never crop or vertically compress icon paths.
- Interactive brand hover states should adopt official brand hex tints.

## 4. Copywriting Tone
- Grounded, calm, humble, and strictly factual.
- No artificial urgency, no fake timers, and no manufactured scarcity.
- Clear value proposition: manage digital assets on your own server with your own AI subscriptions.
