import { ageDays, summarize, title } from './core.mjs';

const tests = {
  creator_demo: 'Show the product solving one frustrating step in the first shot. Explain it after the demonstration.',
  comparison: 'Put two routines side by side. Compare one useful difference, then make the choice easy.',
  testimonial: 'Start with a specific customer situation. Use a real, supported quote and show the routine behind it.',
  founder: 'Explain the problem that made you build the product. Show one choice you made differently.',
  graphic: 'Make one benefit readable at a glance. Keep the product and next step in the same frame.',
  product: 'Show the product in context. Answer one objection instead of listing every feature.',
  frustration: 'Open on a problem your customer already recognizes, then show the step that changes it.',
  curiosity: 'Ask a specific unanswered question, then show the answer in the creative.',
  contradiction: 'Challenge one familiar assumption and demonstrate the alternative.',
  result: 'Name a specific outcome you can support and show what the product actually does.',
  direct: 'Introduce the product and the use case clearly, then show it in action.',
  offer: 'State the actual deal early and keep the conditions readable.',
  bundle: 'Explain why the items belong together. Test the routine as the offer, not just the discount.',
  discount: 'Test the deal against a version led by the customer problem, using the same product and audience.',
  none: 'Test a product demonstration without a promotional lead. Keep a clear next step.',
  trial: 'Lead with a low-commitment way to try the product. State the actual sample price and conditions clearly.',
  subscription: 'Explain what arrives, how often and how to cancel. Test convenience against a price-led version.',
  guarantee: 'Show the exact guarantee and its conditions. Test whether addressing the objection helps your own campaign.',
};

// All figures are derived from the current dataset, including the demo fixture.
export function researchFindings(ads) {
  const dated = ads.filter(a => a.status === 'complete' && a.active === true && ageDays(a) !== null);
  const baseline = dated.length ? dated.filter(a => ageDays(a) >= 60).length / dated.length : null;
  return ['format', 'hook', 'offer'].map(dimension => {
    const row = summarize(ads, dimension).find(r => r.dated >= 5 && r.key !== 'unknown');
    if (!row) return null;
    return {
      ...row, dimension, baseline,
      lift: baseline ? row.share / baseline : null,
      heading: `${title(row.key)} leads on ${dimension === 'format' ? 'format' : dimension === 'hook' ? 'opening' : 'offer'}`,
      observation: `${row.old.toLocaleString()} of ${row.dated.toLocaleString()} dated active ads in this group started at least 60 days earlier. Median age: ${Math.round(row.medianAge)} days.`,
      nextTest: tests[row.key] || `Test an original ${title(row.key).toLowerCase()} approach using your product facts and compare it with your current creative.`,
    };
  }).filter(Boolean);
}
