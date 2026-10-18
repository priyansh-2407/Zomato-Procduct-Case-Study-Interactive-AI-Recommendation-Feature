// ============================================================
// ZOMATO PM CASE STUDY — DATA LAYER
// Too Maaa Zooo — All embedded data for the interactive website
// ============================================================
// ⚠ SYNTHETIC DATA DISCLAIMER:
// Synthetic dataset created for portfolio analysis.
// It does not represent Zomato's internal data.
// ============================================================

// ============================================================
// 1. ZOMATO PUBLIC RESEARCH DATA
// ============================================================
const ZOMATO_RESEARCH = {
  company: {
    name: 'Eternal Limited (formerly Zomato)',
    rebrand_date: 'March 2025',
    verticals: ['Zomato (Food Delivery)', 'Blinkit (Quick Commerce)', 'District (Going-out)', 'Hyperpure (B2B Supplies)'],
    market_share_food: '56-57%',
    source: 'Industry reports, 2026'
  },
  financials: {
    fy25_revenue: '₹20,243 Cr',
    fy25_pat: '₹527 Cr',
    q1fy26_food_gov: '₹10,769 Cr',
    q1fy26_food_revenue: '₹2,657 Cr',
    food_ebitda_margin: '~5.0% of NOV',
    contribution_margin_per_order: '~6-7%',
    sources: [
      { text: 'Eternal FY25 Annual Report', date: 'May 2025' },
      { text: 'Q1 FY26 Shareholders\' Letter', date: 'July 2025' },
      { text: 'Industry research', date: '2026' }
    ]
  },
  customers: {
    mtc_q1fy26: '22.9M',
    active_delivery_partners: '600,000+',
    active_restaurants: '300,000+',
    annual_order_frequency_fy24: '11.9',
    source: 'Eternal Investor Disclosures, 2025-2026'
  },
  fees: {
    platform_fee: '₹14.90 pre-GST (₹17.58 incl. GST)',
    commission_range: '18-28%',
    effective_restaurant_deduction: '25-35%+',
    source: 'Public observation, March 2026'
  },
  competition: {
    swiggy_share: '43-44%',
    ondc_commission: '2-4%',
    source: 'Industry reports, 2026'
  },
  product_features: [
    'Zomato Gold membership with AI features',
    'Personalized Match Scores',
    'Zomato AI chatbot (Gold exclusive)',
    'Graph-based collaborative filtering',
    'Predictive craving suggestions',
    'Behavioral push notifications'
  ]
};

// ============================================================
// 2. PRODUCT TEARDOWN DATA
// ============================================================
const TEARDOWN_STAGES = [
  {
    id: 'acquisition', name: 'Acquisition', icon: '📲',
    user_goal: 'Download and start using Zomato for the first time',
    business_goal: 'Acquire users at lowest CAC with highest quality',
    current_experience: 'Multi-channel acquisition via digital ads, referrals, organic search. Onboarding captures location, preferences.',
    friction: 'High competition for attention; Swiggy offers similar value prop; ONDC offers lower prices',
    opportunity: 'Better preference capture during onboarding to enable personalization from order #1',
    primary_metric: 'Cost per Acquisition (CPA)',
    secondary_metrics: ['Install-to-first-order rate', 'Day-7 retention', 'Channel-wise quality']
  },
  {
    id: 'home', name: 'Home Screen', icon: '🏠',
    user_goal: 'Get inspired about what to eat, or quickly find a known restaurant',
    business_goal: 'Maximize engagement and conversion to restaurant view',
    current_experience: 'Banners, cuisine carousels, trending restaurants, reorder widget, collections, personalized suggestions',
    friction: 'Information overload; too many elements competing for attention; unclear hierarchy of intent',
    opportunity: 'Intent-based entry point that reduces browsing time and surfaces high-probability matches',
    primary_metric: 'Home-to-restaurant-view CTR',
    secondary_metrics: ['Session depth', 'Time to first click', 'Scroll depth']
  },
  {
    id: 'discovery', name: 'Discovery', icon: '🔍',
    user_goal: 'Explore food options when you don\'t know what you want',
    business_goal: 'Surface relevant restaurants to maximize conversion',
    current_experience: 'Collections, cuisine filters, trending, nearby popular. Match scores for Gold users.',
    friction: 'Paradox of choice with 300K+ restaurants; browsing without intent leads to decision fatigue',
    opportunity: 'Convert vague food intent into actionable, personalized suggestions — the core Too Maaa Zooo opportunity',
    primary_metric: 'Discovery-to-order conversion',
    secondary_metrics: ['Restaurants viewed per session', 'Time in discovery', 'Discovery-driven order share']
  },
  {
    id: 'search', name: 'Search', icon: '🔎',
    user_goal: 'Find a specific dish, cuisine, or restaurant',
    business_goal: 'Help users with clear intent reach their target quickly',
    current_experience: 'Text search with suggestions, dish search, restaurant search, cuisine filters',
    friction: 'Works well for specific intent; fails when intent is vague ("something quick")',
    opportunity: 'Semantic search understanding mood/context, not just keywords',
    primary_metric: 'Search-to-order conversion',
    secondary_metrics: ['Zero-result rate', 'Refinement rate', 'Search abandonment']
  },
  {
    id: 'listing', name: 'Restaurant Listing', icon: '📋',
    user_goal: 'Scan and compare restaurants to find the best option',
    business_goal: 'Drive high-quality restaurant views; balance organic vs sponsored listings',
    current_experience: 'Cards with rating, ETA, cuisine, price range, offers. Filters for sort/diet/cuisine.',
    friction: 'Sorting defaults may not match personal priorities; promoted restaurants may dilute relevance',
    opportunity: 'Personalized ranking that weights user-specific priorities (ETA, price, quality)',
    primary_metric: 'Listing-to-restaurant-view CTR',
    secondary_metrics: ['Position bias', 'Filter usage', 'Scroll-to-click depth']
  },
  {
    id: 'restaurant', name: 'Restaurant Detail', icon: '🍽️',
    user_goal: 'Evaluate if this restaurant is worth ordering from',
    business_goal: 'Convert restaurant view into menu engagement',
    current_experience: 'Photos, rating, reviews, delivery time, distance, offers, menu preview',
    friction: 'Rating may not reflect personal taste; delivery time uncertainty',
    opportunity: 'Personal match score explaining WHY this restaurant fits the user',
    primary_metric: 'Restaurant-to-menu view rate',
    secondary_metrics: ['Time on page', 'Photo engagement', 'Review reads']
  },
  {
    id: 'menu', name: 'Menu', icon: '📖',
    user_goal: 'Select items to order',
    business_goal: 'Maximize cart additions and AOV',
    current_experience: 'Categorized menu, item photos, descriptions, customizations, recommended items',
    friction: 'Long menus; unclear what\'s popular or fresh; no personal dish recommendations',
    opportunity: 'Highlight dishes aligned with user\'s mood/preferences from Too Maaa Zooo context',
    primary_metric: 'Menu-to-cart conversion',
    secondary_metrics: ['Items per order', 'Average cart value', 'Customization rate']
  },
  {
    id: 'cart', name: 'Cart', icon: '🛒',
    user_goal: 'Review selection before committing',
    business_goal: 'Minimize cart abandonment; maximize AOV through upsells',
    current_experience: 'Item summary, quantity controls, add more items, delivery fee preview',
    friction: 'Surprise fees at checkout stage; price higher than expected',
    opportunity: 'Transparent pricing earlier in journey; smart upsell suggestions',
    primary_metric: 'Cart-to-checkout rate',
    secondary_metrics: ['Cart abandonment rate', 'Cart modification rate', 'Upsell conversion']
  },
  {
    id: 'checkout', name: 'Checkout', icon: '💳',
    user_goal: 'Complete the order with final pricing clarity',
    business_goal: 'Maximize payment conversion; manage discount burn',
    current_experience: 'Address, delivery fee, platform fee, taxes, coupons, payment options, tips',
    friction: 'Sticker shock from cumulative fees; coupon codes that don\'t work; payment failures',
    opportunity: 'Fee transparency; better coupon UX; one-tap reorder checkout',
    primary_metric: 'Checkout-to-payment conversion',
    secondary_metrics: ['Coupon usage rate', 'Payment failure rate', 'Tip rate']
  },
  {
    id: 'payment', name: 'Payment', icon: '💰',
    user_goal: 'Pay quickly and securely',
    business_goal: 'Minimize payment failures; optimize payment cost',
    current_experience: 'UPI, cards, wallets, COD, Zomato Pay',
    friction: 'UPI failures during peak hours; session timeouts',
    opportunity: 'Payment success optimization; preferred method memory',
    primary_metric: 'Payment success rate',
    secondary_metrics: ['Payment method mix', 'Retry rate', 'Time to complete']
  },
  {
    id: 'delivery', name: 'Delivery & Tracking', icon: '🚴',
    user_goal: 'Know when food will arrive; track in real-time',
    business_goal: 'Deliver on-time to protect customer satisfaction',
    current_experience: 'Live tracking, ETA updates, delivery partner details, contact option',
    friction: 'Late deliveries damage trust; cold food; missing items',
    opportunity: 'Better ETA accuracy; proactive delay communication',
    primary_metric: 'On-time delivery rate',
    secondary_metrics: ['ETA accuracy', 'Contact rate', 'Delivery partner rating']
  },
  {
    id: 'post_order', name: 'Post-Order', icon: '⭐',
    user_goal: 'Rate experience; resolve issues if any',
    business_goal: 'Collect feedback; manage refunds; protect NPS',
    current_experience: 'Rating prompt, review, photo upload, issue reporting, refund',
    friction: 'Refund process frustration; limited resolution options',
    opportunity: 'Fast issue resolution; feedback that improves recommendations',
    primary_metric: 'Rating submission rate',
    secondary_metrics: ['Average rating', 'Issue report rate', 'Resolution satisfaction']
  },
  {
    id: 'reorder', name: 'Reorder', icon: '🔄',
    user_goal: 'Quickly repeat a previous satisfying order',
    business_goal: 'Increase order frequency through habitual behavior',
    current_experience: 'Reorder widget on home screen, past orders section',
    friction: 'Limited to exact reorders; no "similar to what I liked" suggestions',
    opportunity: 'Smart reorder with variations; "You haven\'t tried X from this restaurant"',
    primary_metric: 'Reorder rate',
    secondary_metrics: ['Reorder-to-total order ratio', 'Time since last order', 'Repeat restaurant rate']
  },
  {
    id: 'retention', name: 'Retention', icon: '🔒',
    user_goal: 'Continue finding value in Zomato over time',
    business_goal: 'Maximize LTV through sustained engagement',
    current_experience: 'Notifications, emails, offers, Zomato Gold, seasonal campaigns',
    friction: 'Notification fatigue; value proposition vs cooking/competing apps',
    opportunity: 'Personalized re-engagement based on lapsed behavior patterns',
    primary_metric: '30-day retention rate',
    secondary_metrics: ['DAU/MAU ratio', 'Churn rate', 'Reactivation rate']
  },
  {
    id: 'offers', name: 'Offers & Promotions', icon: '🏷️',
    user_goal: 'Get the best deal possible',
    business_goal: 'Drive incremental orders without excessive discount burn',
    current_experience: 'Restaurant coupons, Zomato coupons, bank offers, Gold benefits',
    friction: 'Users trained to expect discounts; margin pressure; discount dependency',
    opportunity: 'Shift value perception from "cheapest" to "most relevant" — core TMZ thesis',
    primary_metric: 'Offer-driven order share',
    secondary_metrics: ['Discount per order', 'Incremental orders from offers', 'Margin impact']
  },
  {
    id: 'loyalty', name: 'Loyalty (Zomato Gold)', icon: '👑',
    user_goal: 'Get premium benefits for loyalty commitment',
    business_goal: 'Lock in high-frequency users; increase ARPU',
    current_experience: 'Free delivery, priority support, AI features, exclusive restaurants',
    friction: 'Non-Gold users feel second-class; Gold cost may not justify for low-frequency users',
    opportunity: 'TMZ as a lightweight "Gold preview" — give non-Gold users a taste of personalization',
    primary_metric: 'Gold subscriber count',
    secondary_metrics: ['Gold retention rate', 'Gold vs non-Gold order frequency', 'Gold ARPU']
  },
  {
    id: 'personalization', name: 'Personalization', icon: '🎯',
    user_goal: 'See content tailored to my tastes and context',
    business_goal: 'Increase relevance → conversion → frequency',
    current_experience: 'Match scores, AI chatbot (Gold), personalized home feed, push notifications',
    friction: 'Cold start for new users; personalization limited to Gold; accuracy depends on order history',
    opportunity: 'Too Maaa Zooo extends personalization to ALL users via explicit intent signals',
    primary_metric: 'Recommendation CTR',
    secondary_metrics: ['Recommendation-to-order rate', 'Personalization coverage', 'User satisfaction']
  }
];

// ============================================================
// 3. CUSTOMER JOURNEY DATA
// ============================================================
const CUSTOMER_JOURNEY = [
  { name: 'Open App', icon: '📱', motivation: 'Hungry, bored, habitual check, received notification', friction: 'App load time, competing apps open', decision_vars: 'Time of day, hunger level, social context', abandonment: 'Low — already opened app', metric: 'DAU / MAU' },
  { name: 'Discover', icon: '🔍', motivation: 'Find something appealing to eat', friction: 'Too many options, unclear starting point, decision fatigue', decision_vars: 'Mood, craving, budget, time available', abandonment: 'Moderate — exits if overwhelmed', metric: 'Discovery engagement rate' },
  { name: 'Search', icon: '🔎', motivation: 'Find specific dish/restaurant or refine intent', friction: 'Vague queries return poor results, filter complexity', decision_vars: 'Specificity of craving, past experience', abandonment: 'Moderate — zero results trigger exit', metric: 'Search-to-view conversion' },
  { name: 'Compare', icon: '⚖️', motivation: 'Find the best option among candidates', friction: 'Information overload, inconsistent ratings, unclear differentiation', decision_vars: 'Rating, ETA, price, distance, offers', abandonment: 'High — comparison paralysis common', metric: 'Restaurants viewed per session' },
  { name: 'Select', icon: '✅', motivation: 'Commit to a restaurant', friction: 'Fear of suboptimal choice, FOMO on better options', decision_vars: 'Trust signals (rating, reviews), delivery estimate', abandonment: 'Moderate — may restart comparison', metric: 'Select-to-menu view rate' },
  { name: 'Browse Menu', icon: '📖', motivation: 'Choose specific items to order', friction: 'Long menus, poor photos, unclear descriptions', decision_vars: 'Price, photos, descriptions, recommendations', abandonment: 'Moderate — menu doesn\'t match expectation', metric: 'Menu-to-cart conversion' },
  { name: 'Add to Cart', icon: '🛒', motivation: 'Build the order', friction: 'Customization complexity, minimum order requirements', decision_vars: 'Item price, quantity, add-ons', abandonment: 'Low once committed', metric: 'Cart creation rate' },
  { name: 'Checkout', icon: '💳', motivation: 'Review final order and pricing', friction: 'Sticker shock from fees, coupon failure, address issues', decision_vars: 'Total price, delivery fee, platform fee, discounts', abandonment: 'High — fee surprise is #1 drop-off point', metric: 'Checkout completion rate' },
  { name: 'Order', icon: '✨', motivation: 'Confirm and pay', friction: 'Payment failures, UPI timeouts', decision_vars: 'Payment method, final price confirmation', abandonment: 'Moderate — payment failure induced', metric: 'Payment success rate' },
  { name: 'Track Delivery', icon: '🚴', motivation: 'Know when food arrives', friction: 'Inaccurate ETA, delayed pickup, no updates', decision_vars: 'ETA accuracy, real-time tracking', abandonment: 'N/A — already ordered', metric: 'On-time delivery rate' },
  { name: 'Consume', icon: '🍽️', motivation: 'Enjoy the food', friction: 'Cold food, missing items, quality mismatch', decision_vars: 'Food quality, packaging, completeness', abandonment: 'N/A — post-delivery', metric: 'Issue report rate' },
  { name: 'Rate', icon: '⭐', motivation: 'Share experience, resolve issues', friction: 'Rating fatigue, unclear impact of feedback', decision_vars: 'Experience quality, ease of feedback', abandonment: 'N/A — optional', metric: 'Rating submission rate' },
  { name: 'Repeat', icon: '🔄', motivation: 'Return for next order', friction: 'Habit not formed, competition offers, cooking at home', decision_vars: 'Satisfaction, value perception, convenience', abandonment: 'High — churn point', metric: '30-day retention / repeat rate' }
];

// ============================================================
// 4. PRODUCT FUNNEL DATA (Synthetic — illustrative)
// ============================================================
const FUNNEL_DATA = {
  disclaimer: 'Synthetic dataset created for portfolio analysis. It does not represent Zomato\'s internal data.',
  steps: [
    { name: 'App Open', users: 100000, pct: 100 },
    { name: 'Restaurant Discovery', users: 78000, pct: 78 },
    { name: 'Restaurant View', users: 52000, pct: 52 },
    { name: 'Menu View', users: 38000, pct: 38 },
    { name: 'Add to Cart', users: 24000, pct: 24 },
    { name: 'Checkout', users: 19000, pct: 19 },
    { name: 'Payment', users: 16500, pct: 16.5 },
    { name: 'Successful Order', users: 15000, pct: 15 },
    { name: 'Repeat Order (30d)', users: 6000, pct: 6 }
  ]
};

// ============================================================
// 5. HYPOTHESIS TREE
// ============================================================
const HYPOTHESIS_TREE = [
  {
    id: 'intent', name: 'Lack of Food Intent', icon: '🤔',
    hypothesis: 'Users open Zomato without a clear idea of what they want, leading to browsing without conversion.',
    evidence: 'Observable: Zomato\'s home screen is browse-first, not intent-first. Academic research on decision fatigue (Schwartz, 2004) shows choice overload reduces satisfaction. Industry analogues (Netflix\'s "what to watch" problem) suggest a large fraction of sessions begin without specific intent. Hypothesis requires internal validation via session intent classification.',
    data_required: 'Session intent classification, browse-only session rate, time-to-first-action distribution',
    metric: 'Session-to-order conversion rate by intent type',
    confidence: 'Medium-High (hypothesis, not validated)',
    rating: 80
  },
  {
    id: 'choice', name: 'Choice Overload', icon: '😵',
    hypothesis: 'Too many restaurant options creates paradox of choice, increasing decision time and reducing conversion.',
    evidence: 'Zomato has 300K+ restaurants. Behavioral research confirms more options can reduce decision quality. Platforms with curated options show higher conversion.',
    data_required: 'Restaurants-shown-per-session vs conversion, session duration by outcome, filter usage patterns',
    metric: 'Conversion rate by number of restaurants viewed',
    confidence: 'High',
    rating: 82
  },
  {
    id: 'discovery', name: 'Discovery Friction', icon: '🔍',
    hypothesis: 'The current discovery experience doesn\'t efficiently match user context to relevant restaurants.',
    evidence: 'Current discovery is browse-first, not intent-first. Users must scroll and filter rather than express intent. Zomato AI (Gold-only) addresses this partially.',
    data_required: 'Discovery-path-to-order conversion, filter usage vs direct navigation, recommendation CTR',
    metric: 'Discovery-to-order conversion, time-to-restaurant-selection',
    confidence: 'Medium-High',
    rating: 78
  },
  {
    id: 'price', name: 'Price Sensitivity', icon: '💰',
    hypothesis: 'Cumulative costs (food + delivery fee + platform fee) reduce order frequency for price-sensitive users.',
    evidence: 'Platform fee increased to ₹14.90+GST. Research confirms price sensitivity is top-3 factor. Discount-dependent users order less without offers.',
    data_required: 'Price elasticity curves, order frequency by price sensitivity, discount-removal behavior',
    metric: 'Order frequency change per ₹10 price increase',
    confidence: 'High',
    rating: 80
  },
  {
    id: 'delivery', name: 'Delivery Friction', icon: '🚴',
    hypothesis: 'Long or unreliable delivery times reduce reorder probability.',
    evidence: 'Late deliveries are negatively correlated with repeat orders in synthetic data. Quick commerce growth suggests users want faster fulfillment.',
    data_required: 'Repeat rate by delivery time accuracy, NPS by on-time vs late',
    metric: 'Repeat order rate segmented by delivery experience',
    confidence: 'High',
    rating: 75
  },
  {
    id: 'experience', name: 'Poor Previous Experience', icon: '😞',
    hypothesis: 'Bad past experiences (wrong items, cold food, poor quality) reduce future ordering.',
    evidence: 'Observable: low-rated orders correlate with longer gaps between orders. Refunds may retain but don\'t fully restore trust.',
    data_required: 'Days-to-next-order by previous rating, churn rate post-refund',
    metric: 'Churn probability by last order rating',
    confidence: 'Medium-High',
    rating: 72
  },
  {
    id: 'availability', name: 'Restaurant Availability', icon: '🏪',
    hypothesis: 'Users in certain areas/times have limited quality restaurant options, reducing ordering occasions.',
    evidence: 'Zomato restaurant density varies significantly by city tier. Off-peak availability may be limited.',
    data_required: 'Available restaurants by location/time, conversion by option count',
    metric: 'Order rate by restaurant availability density',
    confidence: 'Medium',
    rating: 60
  },
  {
    id: 'competition', name: 'Competition & Alternatives', icon: '⚔️',
    hypothesis: 'Users split orders between Zomato, Swiggy, ONDC, and cooking at home.',
    evidence: 'Swiggy holds 43-44% share. ONDC growing at lower commission. Multi-homing is common in food delivery.',
    data_required: 'Cross-platform usage, share-of-stomach analysis',
    metric: 'Exclusive vs multi-platform user share',
    confidence: 'Medium',
    rating: 65
  },
  {
    id: 'reorder', name: 'Lack of Reorder Habit', icon: '🔄',
    hypothesis: 'Users don\'t develop habitual reorder patterns because the app doesn\'t reinforce positive order loops.',
    evidence: 'Reorder widget exists but is limited to exact repeats. No "similar to what you loved" suggestions.',
    data_required: 'Reorder widget usage, repeat restaurant rate, habit formation cohorts',
    metric: 'Reorder share of total orders, days between orders by segment',
    confidence: 'Medium',
    rating: 68
  }
];

// ============================================================
// 6. USER SEGMENTS (Synthetic)
// ============================================================
const USER_SEGMENTS = {
  disclaimer: 'Synthetic dataset created for portfolio analysis. It does not represent Zomato\'s internal data.',
  segments: [
    {
      name: 'Heavy Users', color: '#2ed573', icon: '🚀',
      users: 500, pct: 10, orders_month: 6.2, aov: 420, discount_per_order: 35,
      contribution_per_order: 68, retention_30d: 92, est_ltv: 12500,
      price_sensitivity: 'Low', description: 'Power users who order frequently. High value, low discount dependency.'
    },
    {
      name: 'Occasional Users', color: '#4dabf7', icon: '🎯',
      users: 1800, pct: 36, orders_month: 1.8, aov: 380, discount_per_order: 42,
      contribution_per_order: 55, retention_30d: 58, est_ltv: 4200,
      price_sensitivity: 'Medium', description: 'THE TARGET SEGMENT. Moderate frequency with headroom for growth. Not discount-dependent.'
    },
    {
      name: 'Discount-Driven', color: '#ffd93d', icon: '💸',
      users: 800, pct: 16, orders_month: 2.8, aov: 310, discount_per_order: 85,
      contribution_per_order: 18, retention_30d: 45, est_ltv: 1800,
      price_sensitivity: 'Very High', description: 'Order only with significant discounts. High volume but low/negative contribution.'
    },
    {
      name: 'Premium Users', color: '#a78bfa', icon: '👑',
      users: 400, pct: 8, orders_month: 4.5, aov: 650, discount_per_order: 20,
      contribution_per_order: 95, retention_30d: 85, est_ltv: 15800,
      price_sensitivity: 'Very Low', description: 'High AOV, low discount needs. Likely Zomato Gold subscribers.'
    },
    {
      name: 'Churn Risk', color: '#e23744', icon: '⚠️',
      users: 900, pct: 18, orders_month: 0.4, aov: 340, discount_per_order: 55,
      contribution_per_order: 38, retention_30d: 18, est_ltv: 800,
      price_sensitivity: 'High', description: 'Rapidly declining engagement. At risk of permanent churn.'
    },
    {
      name: 'New Users', color: '#22d3ee', icon: '🌱',
      users: 600, pct: 12, orders_month: 1.2, aov: 350, discount_per_order: 65,
      contribution_per_order: 28, retention_30d: 42, est_ltv: 2200,
      price_sensitivity: 'Medium-High', description: 'Early in lifecycle. Onboarding quality determines long-term value.'
    }
  ]
};

// ============================================================
// 7. RICE PRIORITIZATION
// ============================================================
const PRIORITIZATION = {
  problems: [
    { name: 'Discovery Friction', reach: 9, impact: 8, confidence: 7, effort: 6, strategic: 9, rice: 0 },
    { name: 'Delivery Reliability', reach: 10, impact: 7, confidence: 8, effort: 3, strategic: 7, rice: 0 },
    { name: 'Checkout Pricing', reach: 8, impact: 6, confidence: 8, effort: 7, strategic: 5, rice: 0 },
    { name: 'Reorder Experience', reach: 6, impact: 7, confidence: 6, effort: 8, strategic: 7, rice: 0 },
    { name: 'Rating/Review UX', reach: 5, impact: 4, confidence: 7, effort: 8, strategic: 4, rice: 0 },
    { name: 'Offers Optimization', reach: 7, impact: 5, confidence: 6, effort: 5, strategic: 3, rice: 0 },
    { name: 'Restaurant Availability', reach: 4, impact: 6, confidence: 5, effort: 2, strategic: 6, rice: 0 }
  ]
};

// Calculate RICE scores
PRIORITIZATION.problems.forEach(p => {
  p.rice = Math.round(((p.reach * p.impact * p.confidence) / (11 - p.effort)) * (p.strategic / 10) * 10) / 10;
});
PRIORITIZATION.problems.sort((a, b) => b.rice - a.rice);

// ============================================================
// 8. RESTAURANT DATABASE (Synthetic — 100 restaurants for prototype)
// ============================================================
const CUISINE_TYPES = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Burgers', 'Pizza', 'Biryani', 'Desserts', 'Continental', 'Thai', 'Korean', 'Street Food', 'Healthy Bowls', 'Wraps & Rolls', 'Cafe', 'Bakery'];

const RESTAURANT_NAMES = [
  'Punjab Grill', 'Spice Route', 'The Biryani Project', 'Noodle Bar', 'Pizza Republic',
  'Bowl & Co', 'The Curry House', 'Sushi Masters', 'Burger Junction', 'Tandoori Nights',
  'Masala Box', 'Green Kitchen', 'Royal Dhaba', 'Dragon Wok', 'Pasta La Vista',
  'The Breakfast Club', 'Kebab Express', 'Rice Bowl', 'Wrap Star', 'Chaat Street',
  'Momo Point', 'The Grill Room', 'Dosa Plaza', 'Fried & True', 'Salad Days',
  'Tikka Town', 'Naan Stop', 'Wonton House', 'Margherita Magic', 'Taco Bell Express',
  'The Poke Bowl', 'Chai & More', 'Biryaniwala', 'Chopstick Express', 'Olive Garden Lite',
  'Hokkaido Ramen', 'Seoul Kitchen', 'Bombay Sandwich Co', 'Fit Meals', 'Roll Maal',
  'Coffee & Bakes', 'Sweet Tooth', 'Chole Bhature Corner', 'Indo-Chinese Hub', 'Thin Crust Co',
  'The Health Nut', 'Midnight Munchies', 'Idli Factory', 'BBQ Nation Express', 'Crepe & Co',
  'Delhi Darbar', 'Madras Cafe', 'Golden Dragon', 'Roma Kitchen', 'Sakura Sushi',
  'El Mexicano', 'Patty King', 'Slice of Heaven', 'Dum Biryani House', 'Gelato Dreams',
  'The Continental', 'Bangkok Bites', 'K-Food', 'Chowpatty Express', 'Grain Bowl',
  'Kathi Junction', 'Brew & Bite', 'Cake Walk', 'Butter Chicken Co', 'Szechuan Express',
  'Alfredo\'s', 'Morning Glory', 'Seekh & Shake', 'Fried Rice Factory', 'The Wrap Co',
  'Pani Puri House', 'Steamed & Stuffed', 'Flame & Grill', 'South Spice', 'Crispy Crust',
  'Smoothie Station', 'Late Night Bites', 'Uttapam House', 'Smoky BBQ', 'Macaron House',
  'Punjab Kitchen', 'Medu Vada Express', 'Noodle Nation', 'La Pizzeria', 'Temaki Roll',
  'Burrito Bros', 'Smash Burger', 'Wood Fire Pizza', 'Hyderabadi Pot', 'Pastry Palace',
  'Euro Kitchen', 'Pad Thai Place', 'Kimchi Corner', 'Vada Pav King', 'Acai Bar'
];

function generateRestaurants() {
  const restaurants = [];
  const cities = ['Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur'];

  for (let i = 0; i < 100; i++) {
    const cuisine = CUISINE_TYPES[i % CUISINE_TYPES.length];
    const priceSegment = ['Budget', 'Mid-Range', 'Premium'][Math.floor(Math.random() * 3)];
    const baseRating = 3.2 + Math.random() * 1.7;
    const rating = Math.round(baseRating * 10) / 10;
    const avgPrep = 12 + Math.floor(Math.random() * 20);
    const avgDelivery = 8 + Math.floor(Math.random() * 15);
    const distance = 0.5 + Math.round(Math.random() * 9 * 10) / 10;

    // ETA reliability correlates with rating
    const etaReliability = Math.min(0.98, Math.max(0.6, 0.5 + rating * 0.1 + (Math.random() * 0.15)));

    const avgOV = priceSegment === 'Budget' ? 180 + Math.floor(Math.random() * 120) :
                  priceSegment === 'Mid-Range' ? 300 + Math.floor(Math.random() * 200) :
                  500 + Math.floor(Math.random() * 400);

    restaurants.push({
      id: `R${String(i + 1).padStart(3, '0')}`,
      name: RESTAURANT_NAMES[i],
      city: cities[i % cities.length],
      cuisine: cuisine,
      rating: rating,
      review_count: 50 + Math.floor(Math.random() * 2000),
      avg_order_value: avgOV,
      distance: distance,
      avg_prep_time: avgPrep,
      avg_delivery_time: avgDelivery,
      eta_total: avgPrep + avgDelivery,
      eta_reliability: Math.round(etaReliability * 100) / 100,
      available: Math.random() > 0.08,
      price_segment: priceSegment,
      discount_rate: Math.floor(Math.random() * 25),
      is_new: Math.random() > 0.85,
      is_trending: Math.random() > 0.75,
      veg: cuisine === 'South Indian' || cuisine === 'Desserts' || cuisine === 'Healthy Bowls' || cuisine === 'Cafe' || Math.random() > 0.5,
      non_veg: cuisine !== 'Desserts' && cuisine !== 'Cafe' && Math.random() > 0.3,
      vegan: cuisine === 'Healthy Bowls' || Math.random() > 0.7,
      popular_dishes: generatePopularDishes(cuisine),
      tags: generateTags(cuisine, priceSegment, rating)
    });
  }
  return restaurants;
}

function generatePopularDishes(cuisine) {
  const dishes = {
    'North Indian': ['Butter Chicken', 'Dal Makhani', 'Paneer Tikka', 'Naan Combo', 'Chole Bhature'],
    'South Indian': ['Masala Dosa', 'Idli Sambar', 'Uttapam', 'Filter Coffee', 'Medu Vada'],
    'Chinese': ['Hakka Noodles', 'Manchurian', 'Fried Rice', 'Spring Rolls', 'Hot & Sour Soup'],
    'Italian': ['Margherita Pizza', 'Pasta Alfredo', 'Bruschetta', 'Risotto', 'Tiramisu'],
    'Japanese': ['Sushi Platter', 'Ramen', 'Tempura', 'Edamame', 'Miso Soup'],
    'Mexican': ['Burrito Bowl', 'Tacos', 'Quesadilla', 'Nachos', 'Churros'],
    'Burgers': ['Classic Smash', 'Double Cheese', 'Chicken Burger', 'Veggie Burger', 'Loaded Fries'],
    'Pizza': ['Pepperoni', 'BBQ Chicken', 'Margherita', 'Four Cheese', 'Garlic Bread'],
    'Biryani': ['Chicken Biryani', 'Mutton Biryani', 'Veg Biryani', 'Egg Biryani', 'Raita'],
    'Desserts': ['Gulab Jamun', 'Brownie', 'Ice Cream', 'Cheesecake', 'Rasmalai'],
    'Continental': ['Grilled Chicken', 'Caesar Salad', 'Fish & Chips', 'Steak', 'Soup'],
    'Thai': ['Pad Thai', 'Green Curry', 'Tom Yum', 'Spring Rolls', 'Thai Iced Tea'],
    'Korean': ['Bibimbap', 'Korean Fried Chicken', 'Kimchi Rice', 'Japchae', 'Tteokbokki'],
    'Street Food': ['Pani Puri', 'Vada Pav', 'Pav Bhaji', 'Samosa', 'Bhel Puri'],
    'Healthy Bowls': ['Acai Bowl', 'Quinoa Salad', 'Protein Bowl', 'Smoothie Bowl', 'Grain Bowl'],
    'Wraps & Rolls': ['Chicken Kathi Roll', 'Paneer Wrap', 'Falafel Roll', 'Egg Roll', 'Seekh Roll'],
    'Cafe': ['Cappuccino', 'Croissant', 'Avocado Toast', 'Pancakes', 'Cold Brew'],
    'Bakery': ['Chocolate Cake', 'Danish Pastry', 'Muffin', 'Cookies', 'Cinnamon Roll']
  };
  return dishes[cuisine] || ['Chef\'s Special', 'Popular Combo', 'Best Seller', 'House Special', 'Signature Dish'];
}

function generateTags(cuisine, price, rating) {
  const tags = [];
  if (rating >= 4.3) tags.push('Top Rated');
  if (price === 'Budget') tags.push('Value for Money');
  if (price === 'Premium') tags.push('Premium Dining');
  if (['North Indian', 'South Indian', 'Chinese', 'Biryani'].includes(cuisine)) tags.push('Comfort Food');
  if (['Healthy Bowls', 'Cafe'].includes(cuisine)) tags.push('Healthy');
  if (['Pizza', 'Burgers', 'Street Food'].includes(cuisine)) tags.push('Quick Bite');
  if (['Japanese', 'Korean', 'Thai', 'Mexican'].includes(cuisine)) tags.push('Explore Cuisines');
  return tags;
}

const RESTAURANTS = generateRestaurants();

// ============================================================
// 9. USER PROFILES (Simulation)
// ============================================================
const USER_PROFILES = {
  disclaimer: 'Synthetic user profiles created for portfolio demonstration.',
  profiles: [
    {
      id: 'regular',
      name: 'The Regular',
      icon: '👤',
      description: 'Orders 3-4x/week, knows what they like',
      preferred_cuisines: ['North Indian', 'Chinese', 'Biryani'],
      price_preference: 'Mid-Range',
      avg_order_value: 380,
      eta_tolerance: 35,
      novelty_preference: 0.2,
      discount_sensitivity: 0.3,
      diet: 'No preference',
      order_history: ['R001', 'R003', 'R010', 'R004', 'R012', 'R001', 'R003'],
      top_rated: { 'R001': 5, 'R003': 4, 'R010': 4, 'R012': 5 }
    },
    {
      id: 'bargain',
      name: 'The Bargain Hunter',
      icon: '💸',
      description: 'Only orders with discounts, price-first',
      preferred_cuisines: ['Street Food', 'Chinese', 'North Indian'],
      price_preference: 'Budget',
      avg_order_value: 220,
      eta_tolerance: 45,
      novelty_preference: 0.1,
      discount_sensitivity: 0.95,
      diet: 'No preference',
      order_history: ['R020', 'R042', 'R020', 'R038', 'R020'],
      top_rated: { 'R020': 4, 'R042': 3 }
    },
    {
      id: 'explorer',
      name: 'The Food Explorer',
      icon: '🌍',
      description: 'Loves trying new cuisines and restaurants',
      preferred_cuisines: ['Japanese', 'Korean', 'Thai', 'Mexican', 'Italian'],
      price_preference: 'Mid-Range',
      avg_order_value: 520,
      eta_tolerance: 40,
      novelty_preference: 0.9,
      discount_sensitivity: 0.2,
      diet: 'No preference',
      order_history: ['R005', 'R055', 'R057', 'R006', 'R062'],
      top_rated: { 'R005': 5, 'R055': 5, 'R006': 4 }
    },
    {
      id: 'professional',
      name: 'The Busy Professional',
      icon: '💼',
      description: 'Needs fast, reliable delivery during work hours',
      preferred_cuisines: ['Burgers', 'Wraps & Rolls', 'Healthy Bowls', 'Cafe'],
      price_preference: 'Mid-Range',
      avg_order_value: 400,
      eta_tolerance: 20,
      novelty_preference: 0.3,
      discount_sensitivity: 0.1,
      diet: 'No preference',
      order_history: ['R007', 'R025', 'R040', 'R017', 'R007', 'R025'],
      top_rated: { 'R007': 4, 'R025': 5, 'R040': 4 }
    },
    {
      id: 'nightowl',
      name: 'The Late-Night Craver',
      icon: '🌙',
      description: 'Orders after 10 PM, wants comfort food fast',
      preferred_cuisines: ['Pizza', 'Burgers', 'Chinese', 'Biryani', 'Street Food'],
      price_preference: 'Budget',
      avg_order_value: 320,
      eta_tolerance: 30,
      novelty_preference: 0.15,
      discount_sensitivity: 0.5,
      diet: 'Non-vegetarian',
      order_history: ['R008', 'R047', 'R009', 'R082', 'R008'],
      top_rated: { 'R008': 4, 'R047': 5 }
    },
    {
      id: 'healthy',
      name: 'The Healthy Eater',
      icon: '🥗',
      description: 'Prioritizes healthy, clean eating options',
      preferred_cuisines: ['Healthy Bowls', 'Cafe', 'Japanese', 'Continental'],
      price_preference: 'Premium',
      avg_order_value: 550,
      eta_tolerance: 35,
      novelty_preference: 0.5,
      discount_sensitivity: 0.05,
      diet: 'Vegetarian',
      order_history: ['R025', 'R050', 'R095', 'R011', 'R065'],
      top_rated: { 'R025': 5, 'R050': 5, 'R095': 4 }
    }
  ]
};

// ============================================================
// 10. MOOD / INTENT OPTIONS
// ============================================================
const MOOD_OPTIONS = [
  { id: 'comfort', label: 'Comfort Food', icon: '🍲', description: 'Warm, familiar, satisfying' },
  { id: 'healthy', label: 'Healthy', icon: '🥗', description: 'Light, nutritious, clean' },
  { id: 'spicy', label: 'Spicy', icon: '🌶️', description: 'Kick of heat' },
  { id: 'quick', label: 'Quick & Filling', icon: '⚡', description: 'Fast, no-fuss meal' },
  { id: 'light', label: 'Something Light', icon: '🍃', description: 'Snack or small meal' },
  { id: 'latenight', label: 'Late Night', icon: '🌙', description: 'Midnight cravings' },
  { id: 'sharing', label: 'For Sharing', icon: '👥', description: 'Group-friendly meals' },
  { id: 'treat', label: 'Treat Yourself', icon: '✨', description: 'Something special' },
  { id: 'new', label: 'Something New', icon: '🆕', description: 'Explore unfamiliar options' },
  { id: 'usuals', label: 'My Usuals', icon: '🔁', description: 'What I always order' },
  { id: 'trending', label: 'Trending Nearby', icon: '🔥', description: 'Popular right now' }
];

const BUDGET_OPTIONS = [
  { id: 'b200', label: 'Under ₹200', max: 200 },
  { id: 'b300', label: '₹200–₹300', min: 200, max: 300 },
  { id: 'b500', label: '₹300–₹500', min: 300, max: 500 },
  { id: 'b800', label: '₹500–₹800', min: 500, max: 800 },
  { id: 'b999', label: '₹800+', min: 800 }
];

const CUISINE_OPTIONS = [
  'North Indian', 'South Indian', 'Chinese', 'Italian', 'Japanese',
  'Mexican', 'Burgers', 'Pizza', 'Biryani', 'Desserts', 'Any'
];

const ETA_OPTIONS = [
  { id: 'e20', label: '<20 min', max: 20 },
  { id: 'e30', label: '<30 min', max: 30 },
  { id: 'e45', label: '<45 min', max: 45 }
];

const DIET_OPTIONS = ['Vegetarian', 'Non-vegetarian', 'Egg', 'Vegan', 'No preference'];

const DISTANCE_OPTIONS = [
  { id: 'd2', label: '<2 km', max: 2 },
  { id: 'd5', label: '<5 km', max: 5 },
  { id: 'd8', label: '<8 km', max: 8 }
];

const DISCOVERY_MODES = ['My usuals', 'Something new', 'Surprise me'];

// ============================================================
// 11. MOOD → CUISINE AFFINITY MAP
// ============================================================
const MOOD_CUISINE_MAP = {
  comfort: { 'North Indian': 0.9, 'Biryani': 0.85, 'Chinese': 0.7, 'Pizza': 0.6, 'South Indian': 0.7, 'Street Food': 0.65 },
  healthy: { 'Healthy Bowls': 0.95, 'Cafe': 0.6, 'Japanese': 0.7, 'Continental': 0.65, 'South Indian': 0.5, 'Thai': 0.6 },
  spicy: { 'North Indian': 0.8, 'Chinese': 0.75, 'Korean': 0.85, 'Thai': 0.8, 'Mexican': 0.75, 'Biryani': 0.7, 'Street Food': 0.7 },
  quick: { 'Burgers': 0.9, 'Wraps & Rolls': 0.85, 'Pizza': 0.7, 'Street Food': 0.8, 'Chinese': 0.65, 'Cafe': 0.6 },
  light: { 'Cafe': 0.85, 'Healthy Bowls': 0.8, 'Bakery': 0.7, 'Desserts': 0.6, 'Japanese': 0.65, 'South Indian': 0.55 },
  latenight: { 'Pizza': 0.85, 'Burgers': 0.8, 'Chinese': 0.75, 'Biryani': 0.7, 'Street Food': 0.65, 'Wraps & Rolls': 0.6 },
  sharing: { 'Pizza': 0.9, 'Chinese': 0.8, 'North Indian': 0.85, 'Biryani': 0.8, 'Mexican': 0.7, 'Italian': 0.65 },
  treat: { 'Italian': 0.85, 'Japanese': 0.8, 'Continental': 0.75, 'Korean': 0.7, 'Bakery': 0.65, 'Desserts': 0.8, 'Premium': 0.9 },
  new: { 'Japanese': 0.8, 'Korean': 0.85, 'Thai': 0.8, 'Mexican': 0.75, 'Continental': 0.7 },
  usuals: {},
  trending: {}
};

// ============================================================
// 12. UNIT ECONOMICS MODEL (Illustrative Assumptions)
// ============================================================
const UNIT_ECONOMICS = {
  disclaimer: 'Illustrative assumptions. These do not represent Zomato\'s actual internal economics.',
  per_order: {
    revenue: {
      restaurant_commission_pct: 24, // Mid-range of 18-28% public range
      delivery_fee: 35,
      platform_fee: 15, // ~₹14.90 pre-GST (public)
      ad_revenue_allocation: 5,
      total_revenue: 0 // calculated
    },
    costs: {
      delivery_payout: 42,
      payment_processing_pct: 2,
      discount: 30, // Blended average; occasional users ≈₹42, heavy users ≈₹35, but platform funds only a portion
      refund_allocation: 4,
      customer_support: 2.5,
      restaurant_incentive: 5,
      total_cost: 0 // calculated
    },
    aov: 380
  },
  per_user: {
    orders_month: 1.8,
    cac: 250,
    lifetime_months: 18
  },
  scenarios: {
    base: { eligible_users: 5000000, freq_lift: 0.2, cannibalization: 0.25, contribution_per_order: 55 },
    conservative: { eligible_users: 3000000, freq_lift: 0.1, cannibalization: 0.35, contribution_per_order: 50 },
    upside: { eligible_users: 8000000, freq_lift: 0.3, cannibalization: 0.15, contribution_per_order: 60 }
  }
};

// Calculate revenue/cost per order
function calcUnitEconomics(aov, assumptions) {
  const a = assumptions || UNIT_ECONOMICS.per_order;
  const rev = {
    commission: aov * (a.revenue.restaurant_commission_pct / 100),
    delivery_fee: a.revenue.delivery_fee,
    platform_fee: a.revenue.platform_fee,
    ad_revenue: a.revenue.ad_revenue_allocation
  };
  rev.total = rev.commission + rev.delivery_fee + rev.platform_fee + rev.ad_revenue;

  const cost = {
    delivery_payout: a.costs.delivery_payout,
    payment: aov * (a.costs.payment_processing_pct / 100),
    discount: a.costs.discount,
    refund: a.costs.refund_allocation,
    support: a.costs.customer_support,
    restaurant_incentive: a.costs.restaurant_incentive
  };
  cost.total = cost.delivery_payout + cost.payment + cost.discount + cost.refund + cost.support + cost.restaurant_incentive;

  const contribution = rev.total - cost.total;
  const margin = (contribution / aov) * 100;

  return { revenue: rev, cost, contribution: Math.round(contribution * 100) / 100, margin: Math.round(margin * 100) / 100 };
}

// ============================================================
// 13. BUSINESS IMPACT CALCULATOR
// ============================================================
function calcBusinessImpact(params) {
  const {
    eligible_users = 5000000,
    current_freq = 1.8,
    new_freq = 2.0,
    aov = 380,
    contribution_per_order = 55,
    cannibalization = 0.25,
    discount_per_order = 40,
    lifetime_months = 18
  } = params;

  const freq_lift = new_freq - current_freq;
  const gross_incremental_orders = eligible_users * freq_lift;
  const cannibalized_orders = gross_incremental_orders * cannibalization;
  const net_incremental_orders = gross_incremental_orders - cannibalized_orders;
  const incremental_gmv = net_incremental_orders * aov;
  const incremental_revenue = net_incremental_orders * (contribution_per_order + discount_per_order);
  const incremental_contribution_monthly = net_incremental_orders * contribution_per_order;
  const annual_contribution = incremental_contribution_monthly * 12;
  const ltv_per_user = contribution_per_order * new_freq * lifetime_months;
  const cac = 250;
  const ltv_cac = ltv_per_user / cac;
  const payback_months = cac / (contribution_per_order * new_freq);

  return {
    gross_incremental_orders: Math.round(gross_incremental_orders),
    cannibalized_orders: Math.round(cannibalized_orders),
    net_incremental_orders: Math.round(net_incremental_orders),
    incremental_gmv: Math.round(incremental_gmv),
    incremental_revenue: Math.round(incremental_revenue),
    monthly_contribution: Math.round(incremental_contribution_monthly),
    annual_contribution: Math.round(annual_contribution),
    ltv: Math.round(ltv_per_user),
    ltv_cac: Math.round(ltv_cac * 100) / 100,
    payback_months: Math.round(payback_months * 10) / 10
  };
}

// ============================================================
// 14. A/B TEST CONFIG
// ============================================================
const AB_TEST = {
  name: 'Too Maaa Zooo Discovery Experiment',
  control: 'Current Zomato discovery experience',
  treatment: 'Current discovery + Too Maaa Zooo intent-based recommendations',
  primary_metric: 'Incremental successful orders per eligible user per month',
  secondary_metrics: [
    'Recommendation CTR',
    'Restaurant view rate',
    'Menu view rate',
    'Cart conversion rate',
    'Checkout conversion rate',
    'Order frequency (30d)',
    '30-day retention'
  ],
  business_metrics: [
    'Contribution per user per month',
    'Contribution per order',
    'Discount per order'
  ],
  guardrails: [
    'Cancellation rate',
    'Refund rate',
    'Late delivery rate',
    'Customer complaint rate',
    'Restaurant concentration (HHI)'
  ],
  design: {
    randomization_unit: 'User-level',
    allocation: '50/50 split',
    mde: '3-5%',
    power: '80%',
    confidence: '95%',
    duration: '4-6 weeks',
    sample_per_arm: 'Minimum 50,000 users per arm',
    exclusions: 'New users (< 7 days), users in other active experiments'
  }
};

// ============================================================
// 15. ROADMAP
// ============================================================
const ROADMAP = [
  {
    phase: 0, name: 'Instrumentation', duration: '2-3 weeks',
    features: ['Session intent logging', 'Discovery path tracking', 'Recommendation exposure logging', 'Funnel event taxonomy'],
    data: 'Session events, funnel events, intent signals',
    engineering: 'Event SDK updates, data pipeline',
    dependencies: 'Analytics platform, data warehouse',
    metrics: ['Event coverage >95%', 'Data freshness <1 hour']
  },
  {
    phase: 1, name: 'Rule-Based MVP', duration: '4-6 weeks',
    features: ['Intent selection UI', 'Basic filters (budget, cuisine, ETA)', 'Rule-based restaurant matching', 'Simple recommendation cards'],
    data: 'Restaurant metadata, user location, basic order history',
    engineering: 'Frontend widget, backend API, rule engine',
    dependencies: 'Restaurant availability API, location service',
    metrics: ['Recommendation CTR >8%', 'A/B test launch readiness']
  },
  {
    phase: 2, name: 'Personalized Ranking', duration: '6-8 weeks',
    features: ['User preference model', 'Weighted scoring algorithm', 'Order history integration', '"Why this?" explainability', 'User profile simulation'],
    data: 'Order history, ratings, cuisine preferences, price patterns',
    engineering: 'ML feature store, scoring service, personalization API',
    dependencies: 'User data pipeline, feature engineering',
    metrics: ['Personalized CTR >12%', 'Order frequency +5% vs control']
  },
  {
    phase: 3, name: 'Context-Aware Ranking', duration: '6-8 weeks',
    features: ['Time-of-day context', 'Weather integration', 'Occasion detection', 'Social context signals', 'Discovery mode (explore/comfort)'],
    data: 'Temporal patterns, weather API, device signals',
    engineering: 'Context service, real-time feature computation',
    dependencies: 'Weather API, context inference model',
    metrics: ['Context-aware CTR >15%', 'Session-to-order +8%']
  },
  {
    phase: 4, name: 'Real-Time Recommendations', duration: '8-10 weeks',
    features: ['Real-time restaurant availability', 'Dynamic ETA adjustment', 'Live demand signals', 'Surge-aware recommendations', 'Delivery capacity awareness'],
    data: 'Real-time restaurant status, delivery partner availability, demand heatmaps',
    engineering: 'Streaming pipeline, real-time scoring, caching layer',
    dependencies: 'Restaurant availability service, logistics API',
    metrics: ['ETA accuracy >90%', 'Late delivery rate <8%']
  },
  {
    phase: 5, name: 'Predictive Food Intent', duration: '10-12 weeks',
    features: ['Proactive craving prediction', 'Pre-session recommendations', 'Smart notification timing', 'Predictive cart', 'Anticipatory preparation'],
    data: 'Historical ordering patterns, temporal models, engagement signals',
    engineering: 'Prediction model, notification optimization, edge computing',
    dependencies: 'Notification platform, prediction model training',
    metrics: ['Predicted intent accuracy >60%', 'Notification-to-order >3%']
  }
];

// ============================================================
// 16. RISKS
// ============================================================
const RISKS = [
  { risk: 'Over-personalization (Filter Bubble)', probability: 'Medium', impact: 'High', icon: '🔄',
    mitigation: 'Enforce diversity constraints. Include exploration slots. Monitor cuisine variety per user.' },
  { risk: 'Popularity Bias', probability: 'High', impact: 'Medium', icon: '📊',
    mitigation: 'Cap maximum exposure per restaurant. Reserve slots for new/underrepresented restaurants.' },
  { risk: 'Restaurant Fairness', probability: 'Medium', impact: 'High', icon: '⚖️',
    mitigation: 'Transparent ranking criteria. Equal opportunity for quality restaurants. Regular audits.' },
  { risk: 'Sponsored Content Conflict', probability: 'Medium', impact: 'Medium', icon: '💰',
    mitigation: 'Clearly label sponsored results. Ensure minimum quality threshold for promoted restaurants.' },
  { risk: 'Order Cannibalization', probability: 'High', impact: 'High', icon: '🔁',
    mitigation: 'Measure net incremental orders, not gross. Include cannibalization in all impact models.' },
  { risk: 'User Fatigue', probability: 'Low', impact: 'Medium', icon: '😴',
    mitigation: 'Make TMZ optional, not forced. Respect user preference for direct browsing.' },
  { risk: 'Cold Start Problem', probability: 'Medium', impact: 'Medium', icon: '🧊',
    mitigation: 'Use location, time, popular restaurants for new users. Explicit preference onboarding.' },
  { risk: 'Delivery Capacity Strain', probability: 'Low', impact: 'High', icon: '🚴',
    mitigation: 'Factor delivery partner availability into recommendations. Avoid clustering demand.' },
  { risk: 'Algorithmic Feedback Loops', probability: 'Medium', impact: 'High', icon: '🔄',
    mitigation: 'Monitor exposure vs conversion by restaurant. Inject randomness. Track long-term diversity.' },
  { risk: 'Low Recommendation Relevance', probability: 'Medium', impact: 'High', icon: '❌',
    mitigation: 'Continuous model evaluation. User feedback loops. A/B test all major changes.' },
  { risk: 'Restaurant Partner Dissatisfaction', probability: 'Low', impact: 'Medium', icon: '🏪',
    mitigation: 'Transparent criteria. Dashboard for restaurants. Fair rotation policies.' },
  { risk: 'Delivery Partner Routing Impact', probability: 'Medium', impact: 'Medium', icon: '🛵',
    mitigation: 'Monitor order clustering by geography. Factor delivery partner availability into ranking. Coordinate with logistics team to avoid demand spikes in concentrated areas.' }
];

// ============================================================
// 17. INTERNAL DATA WISHLIST
// ============================================================
const INTERNAL_DATA_WISHLIST = [
  { data: 'Search Query Logs', why: 'Understand actual user intent distribution — what fraction of sessions have clear vs vague intent', how: 'Validate whether discovery friction is indeed the top problem; size the vague-intent opportunity' },
  { data: 'Recommendation Exposure & CTR', why: 'Measure current recommendation relevance and identify improvement headroom', how: 'Set baseline CTR and benchmark for Too Maaa Zooo; understand position bias' },
  { data: 'Restaurant-Level Conversion Funnel', why: 'Identify where users drop off per restaurant type, cuisine, and price segment', how: 'Refine scoring algorithm weights based on actual conversion drivers' },
  { data: 'Cart Abandonment with Reason Codes', why: 'Understand whether pricing, delivery time, or other factors drive cart drops', how: 'Prioritize checkout vs. discovery optimizations; set guardrails for experiment' },
  { data: 'Order Frequency by Cohort', why: 'Map true order frequency curves and identify the "movable middle" segment', how: 'Size the target segment precisely; set realistic frequency lift targets' },
  { data: 'Customer-Level LTV', why: 'Understand actual contribution per user over lifetime to validate unit economics', how: 'Calculate true ROI of frequency improvements; set MDE for experiments' },
  { data: 'Delivery Cost Curves', why: 'Understand per-order delivery cost by distance, time, and city', how: 'Ensure recommended restaurants are economically viable to deliver' },
  { data: 'Restaurant Commission Data', why: 'Understand contribution variance by restaurant tier and commission bracket', how: 'Factor economics into recommendation ranking without purely optimizing for margin' },
  { data: 'Price Elasticity Data', why: 'Quantify how sensitive different user segments are to fee changes', how: 'Calibrate price-fit scoring in the recommendation engine' },
  { data: 'Discount Elasticity & Dependency', why: 'Measure true incremental value of discounts vs. habitual discount usage', how: 'Validate whether TMZ can reduce discount dependency; set discount guardrails' },
  { data: 'ETA Accuracy & Reliability Logs', why: 'Map promise vs. actual delivery times by restaurant and time slot', how: 'Build accurate ETA reliability score for ranking; improve user trust' },
  { data: 'Cancellation & Refund Logs', why: 'Understand cancellation patterns and their impact on user retention', how: 'Set guardrail metrics for the A/B test; identify restaurant quality issues' },
  { data: 'Restaurant Availability by Hour', why: 'Map when restaurants go offline and how it affects user experience', how: 'Only recommend restaurants likely to be available; reduce failed orders' }
];

// ============================================================
// 18. SOURCES
// ============================================================
const SOURCES = [
  { category: 'Company Filings', items: [
    { text: 'Eternal Limited (formerly Zomato) FY25 Annual Report', date: 'May 2025', type: 'public' },
    { text: 'Eternal Q1 FY26 Shareholders\' Letter', date: 'July 2025', type: 'public' },
    { text: 'Eternal Q4 FY25 Earnings Release', date: 'April 2025', type: 'public' },
    { text: 'Zomato IPO Prospectus (DRHP)', date: 'July 2021', type: 'public' }
  ]},
  { category: 'Industry Research', items: [
    { text: 'Indian food delivery market share analysis — Zomato ~56-57%, Swiggy ~43-44%', date: '2026', type: 'industry' },
    { text: 'Food delivery contribution margin benchmarks (~6-7% per order)', date: '2025-2026', type: 'industry' },
    { text: 'ONDC food delivery commission structures (2-4%)', date: '2025-2026', type: 'industry' }
  ]},
  { category: 'Public Product Observation', items: [
    { text: 'Zomato platform fee: ₹14.90 pre-GST (₹17.58 incl. GST)', date: 'March 2026', type: 'observable' },
    { text: 'Zomato Gold AI features: Match Scores, AI Chatbot', date: '2025-2026', type: 'observable' },
    { text: 'Restaurant commission range: 18-28%', date: '2025-2026', type: 'observable' },
    { text: 'Zomato Gold membership benefits and pricing', date: '2025-2026', type: 'observable' }
  ]},
  { category: 'Academic & Behavioral Research', items: [
    { text: 'Choice overload and decision fatigue in food delivery platforms', date: '2023-2025', type: 'industry' },
    { text: 'Paradox of Choice — Barry Schwartz', date: '2004', type: 'industry' },
    { text: 'Recommendation systems in food delivery — collaborative filtering approaches', date: '2022-2025', type: 'industry' }
  ]}
];

// ============================================================
// 19. NORTH STAR ANALYSIS
// ============================================================
const NORTH_STAR_ANALYSIS = {
  candidate: 'Successful food orders per monthly transacting customer',
  comparison: [
    { metric: 'Orders/MTU', pros: 'Directly captures frequency; aligns with user value; actionable', cons: 'Doesn\'t capture AOV or margin', verdict: '★ Recommended' },
    { metric: 'GMV', pros: 'Captures total value; simple to track', cons: 'Can grow via price inflation; doesn\'t reflect profitability', verdict: 'Secondary' },
    { metric: 'Total Orders', pros: 'Simple; correlates with business scale', cons: 'Can grow via user acquisition, not frequency; ignores quality', verdict: 'Supporting' },
    { metric: 'Revenue', pros: 'Directly financial; captures monetization', cons: 'Can grow via fee increases, not user value; lagging', verdict: 'Business review' },
    { metric: 'Contribution/User', pros: 'Captures unit economics; sustainable growth', cons: 'Complex to compute; may conflict with growth investment', verdict: 'Guardrail' },
    { metric: '30-Day Retention', pros: 'Captures engagement; leading indicator', cons: 'Doesn\'t capture depth of engagement (frequency)', verdict: 'Guardrail' }
  ]
};

// ============================================================
// 20. INTERVIEW QUESTIONS
// ============================================================
const INTERVIEW_QA = [
  { q: 'Why Zomato?', a: 'Zomato/Eternal operates in a fascinating intersection of consumer behavior, logistics, and marketplace economics. Food delivery has achieved product-market fit but now faces the harder challenge of profitable growth. The shift from "acquiring users" to "increasing value per user" is exactly the kind of product problem I find compelling. Zomato\'s scale (22.9M MTU, 300K+ restaurants) means even small improvements have massive business impact.' },
  { q: 'Why this problem — order frequency?', a: 'Order frequency is the lever with the highest combination of business impact and product solvability. Acquiring new users is expensive (₹200-300 CAC), and increasing AOV often means raising prices. But increasing order frequency among existing users grows GMV without proportional CAC spend. For a platform with 22.9M monthly transacting users, even a 0.1 increase in orders/user/month creates millions of incremental orders annually.' },
  { q: 'Why not focus on GMV instead of frequency?', a: 'GMV can grow through price inflation or AOV manipulation, neither of which creates genuine user value. Frequency better captures whether we\'re solving a real user need — if users order more often, they\'re finding value. I use contribution per user as a guardrail to ensure frequency growth is profitable, not discount-driven.' },
  { q: 'Why discovery friction over delivery reliability?', a: 'Delivery reliability is critical, but it\'s primarily an operations/logistics problem, not a product problem. The infrastructure investment required is massive and returns are incremental. Discovery friction, however, is directly solvable through product — and the insight that most sessions begin without clear intent suggests there\'s a large conversion opportunity hiding in the browsing experience.' },
  { q: 'Why target occasional users specifically?', a: 'They represent the "movable middle" — 36% of users with 1.8 orders/month. Heavy users (6.2/month) have little headroom. Discount-driven users have poor unit economics. Churn-risk users need reactivation, not frequency. Occasional users have proven they value the platform, order at reasonable AOVs (₹380), and have moderate price sensitivity — meaning frequency growth can be profitable.' },
  { q: 'Why Too Maaa Zooo? Why this name?', a: 'The name captures the universal moment of "I want to eat but I don\'t know what." "Too Maaa Zooo" sounds like a natural expression of vague food intent — playful but memorable. The branding is deliberately conversational because the product is about translating an informal, fuzzy craving into a concrete recommendation. The playfulness makes it approachable while the underlying system is sophisticated.' },
  { q: 'How does the recommendation algorithm work?', a: 'It\'s a multi-stage pipeline: candidate generation (filter by cuisine affinity, location, availability) → eligibility filtering (open, deliverable, quality threshold) → personalized scoring across 7 dimensions (preference 30%, quality 20%, ETA reliability 15%, price fit 15%, distance 10%, availability 10%, novelty when applicable) → diversity constraints → final ranking. Each restaurant gets a transparent score that users can inspect.' },
  { q: 'Why these specific weights?', a: 'The weights reflect a testable hypothesis, not a final answer. Preference is highest (30%) because personal relevance is the strongest predictor of satisfaction — users who get food they like come back. Quality (20%) protects against poor experiences that damage retention. ETA reliability (15%) matters because delivery promise is a key trust signal in food delivery specifically. These weights are the starting point — I would validate them by running a multi-arm bandit test comparing 3-4 weight configurations and measuring downstream order completion and 7-day repeat rate, not just recommendation CTR.' },
  { q: 'How would you validate the weights?', a: 'Multi-arm bandit testing with different weight configurations, measuring conversion-to-order (not just CTR). I\'d also use historical data to build a supervised model predicting successful orders from restaurant features, which would reveal the "ground truth" feature importance. Then compare the model\'s learned weights against the hand-tuned weights.' },
  { q: 'How do you solve the cold start problem?', a: 'For new users: Use location + time-of-day + popular restaurants as default signals. Ask for cuisine preferences during onboarding. For new restaurants: Use quality signals (rating, preparation time, cuisine category) and allocate exploration slots where new restaurants get guaranteed exposure to gather initial interaction data.' },
  { q: 'How do you handle new restaurants?', a: 'Reserve 10-15% of recommendation slots for new/underrepresented restaurants. Use quality metrics (not historical order volume) for initial ranking. Gradually blend in order-based signals as data accumulates. Track whether new restaurant exposure leads to orders and satisfaction — if not, the restaurant naturally ranks lower.' },
  { q: 'How do you avoid popularity bias?', a: 'Three mechanisms: (1) Exposure caps — no restaurant gets more than X% of total impressions. (2) Diversity constraints — top 5 results can\'t all be same cuisine/chain/price. (3) Exploration slots — reserved positions for restaurants outside the user\'s typical pattern. I also monitor the Herfindahl-Hirschman Index (HHI) of restaurant order concentration as a guardrail metric.' },
  { q: 'What if recommendations increase clicks but not orders?', a: 'This would suggest the recommendations are "interesting but not actionable" — perhaps too novel, wrong price point, or the restaurant detail page doesn\'t close the sale. I\'d analyze the drop-off point (restaurant view → menu → cart → checkout) and adjust scoring weights. This is exactly why our primary metric is orders, not CTR.' },
  { q: 'What if orders increase but contribution falls?', a: 'This means we\'re driving orders through discounts or low-margin restaurants. I\'d check discount-per-order in treatment vs control. If discount is the driver, we\'re just buying orders with company money. I might add a minimum contribution floor to recommendations or reduce weight on discount-heavy restaurants. Contribution per order is an explicit guardrail metric.' },
  { q: 'How do you measure cannibalization?', a: 'I\'d use a two-pronged approach: (1) In the A/B test, measure total orders (not just TMZ-attributed orders) per user in treatment vs control. The difference is the true incremental lift — anything less than gross TMZ orders is cannibalized from existing discovery paths. (2) Analyze whether TMZ orders replace orders that would have happened through direct search/reorder.' },
  { q: 'How do you calculate LTV?', a: 'LTV = Contribution per order × Orders per month × Expected customer lifetime in months. I use contribution (not revenue) because it reflects the actual economic value after variable costs. Customer lifetime is estimated from cohort survival curves. I\'d also discount future contributions to present value for more accurate modeling.' },
  { q: 'How do you calculate CAC payback?', a: 'CAC Payback (months) = Customer Acquisition Cost / (Contribution per order × Orders per month). For our illustrative scenario: ₹250 / (₹55 × 2.0) = ~2.3 months. This is healthy — most consumer businesses target <12 months. The key question is whether TMZ-driven frequency increase reduces the effective payback period.' },
  { q: 'How would you design the experiment?', a: 'User-level randomization (not session-level, to capture frequency effects). 50/50 split. Minimum 50K users per arm. Primary metric: incremental successful orders per user per month, with 3-5% MDE. 4-6 week duration to capture full ordering cycles. Guardrails on cancellation, refund, late delivery, and restaurant concentration. Exclude new users and users in other experiments.' },
  { q: 'How would you choose MDE?', a: 'MDE is driven by business impact threshold. If a 3% frequency lift doesn\'t justify the engineering cost, we need a larger MDE. I\'d calculate: 3% lift × 1.8 orders/month × 5M users = 270K incremental orders/month × ₹55 contribution = ₹14.85 Cr/month. If engineering cost is ₹2-3 Cr, the ROI clears easily. So 3-5% MDE is reasonable.' },
  { q: 'What if the experiment fails?', a: 'First, understand why. Analyze whether the problem was (a) low engagement with TMZ, (b) high engagement but no conversion lift, or (c) conversion lift but cannibalization. Each has different implications. Low engagement → iterate on UI/UX. No conversion lift → improve algorithm. High cannibalization → rethink the value proposition. An experiment that generates clear learning is never a failure.' },
  { q: 'What would you build first?', a: 'Phase 0: Instrumentation (2-3 weeks). Without proper event logging, we can\'t measure anything. Then Phase 1: Rule-based MVP (4-6 weeks) — simple intent cards + basic filtering. This validates the core hypothesis (do users engage with intent-based discovery?) before investing in ML-based personalization.' },
  { q: 'What would you remove from the product?', a: 'If forced to cut: remove "Surprise me" mode (lowest clarity), remove the algorithm explainability toggle (interesting but not core), and simplify to 3 budget tiers instead of 5. The core experience — mood → filters → personalized results — must remain intact. Never cut the "Why this?" explanation, as it builds trust.' },
  { q: 'How would restaurants react to this?', a: 'Positively, if it drives more orders to them. The key concern is fairness — restaurants will worry about being excluded by the algorithm. Mitigation: (1) Transparent criteria, (2) dashboard showing their recommendation exposure, (3) diversity constraints ensuring no restaurant is systematically disadvantaged, (4) new restaurant promotion slots.' },
  { q: 'How does this compare with Swiggy?', a: 'Swiggy has similar discovery features but doesn\'t have an explicit intent-based entry point as described. Both platforms use collaborative filtering and personalization. TMZ\'s differentiation is the explicit intent capture (mood + constraints) which generates stronger signals than passive browsing behavior. If TMZ works, Swiggy would likely build something similar, so speed of execution matters.' },
  { q: 'How could Zomato monetize Too Maaa Zooo?', a: 'Several levers: (1) Premium placement for restaurants willing to pay for TMZ visibility (clearly labeled as sponsored). (2) TMZ as a Gold-exclusive feature in Phase 1, driving subscriptions. (3) Brand partnerships — e.g., "Comfort Food" mood sponsored by a specific brand. (4) Long-term: reduced discount dependency means TMZ monetizes through frequency growth, not direct monetization.' },
  { q: 'What data would you need that you don\'t have?', a: 'Most critically: search query intent classification (what % of sessions start with vague intent), recommendation exposure logs (current baseline CTR), and customer-level contribution margin (to validate unit economics). These three datasets would validate the core hypothesis, set experiment baselines, and size the business opportunity respectively.' },
  { q: 'What would you do in your first 30 days as PM?', a: 'Week 1-2: Understand the discovery funnel deeply — shadow customer support calls, analyze search logs, interview 10-15 users about their ordering decision process. Week 2-3: Build a data dashboard on discovery-to-order conversion, segment by intent type. Week 3-4: Write a one-pager on the opportunity with preliminary sizing, get alignment from engineering and design leads. Day 30: Present a scoped MVP proposal with clear success metrics.' },
  { q: 'Why not just improve the existing search?', a: 'Search works well for users with specific intent ("butter chicken near me"). But our hypothesis is that a large fraction of sessions begin without specific intent. Search requires you to know what you want; Too Maaa Zooo works when you don\'t. They\'re complementary — TMZ captures the "I don\'t know what I want" use case that search fundamentally can\'t address.' },
  { q: 'How do you handle conflicting user preferences?', a: 'When a user selects "Healthy" mood but "Under ₹200" budget, there may be limited overlap. The algorithm handles this through weighted scoring — it finds the best available match, even if no restaurant perfectly satisfies all constraints. We show the user why results might differ from expectations: "We found the best healthy options in your budget range." Transparency prevents frustration.' },
  { q: 'What metrics would make you kill this product?', a: 'Kill signals: (1) TMZ engagement <5% of eligible sessions after 4 weeks (no user interest). (2) Negative impact on overall order frequency in treatment group (TMZ is creating friction, not reducing it). (3) Significant increase in cancellation or refund rates (recommendations are misleading). (4) Restaurant concentration HHI increasing >20% (algorithmic unfairness).' }
];

// ============================================================
// 21. RESUME BULLETS
// ============================================================
const RESUME_BULLETS = {
  product_heavy: [
    'Identified "vague food intent" as a key driver of low order frequency through systematic product teardown of 17 user journey stages, customer journey analysis, and hypothesis-driven problem prioritization using RICE framework',
    'Designed Too Maaa Zooo, an intent-based food discovery product concept converting mood/context signals into personalized restaurant recommendations, with complete PRD, user flows, and edge case analysis',
    'Built a full A/B experiment design with user-level randomization, 3-5% MDE, guardrail metrics (cancellation, refund, restaurant concentration), and statistical power analysis for a 50K+ user test',
    'Developed 6-phase product roadmap from instrumentation through predictive food intent, with clear success metrics, dependencies, and engineering requirements for each phase'
  ],
  analytics_heavy: [
    'Built a synthetic 50K-order behavioral dataset with realistic correlations (ETA reliability → repeat probability, price sensitivity → discount dependency) across 5,000 users and 500 restaurants',
    'Performed cohort retention analysis, funnel analysis (15% session-to-order conversion), and user segmentation identifying "occasional users" (36% of base, 1.8 orders/month) as the highest-ROI target segment',
    'Created interactive unit economics model calculating per-order contribution (₹55 illustrative), LTV/CAC analysis (7.1x), and business impact scenarios with cannibalization modeling (25-35%)',
    'Developed a weighted multi-signal recommendation engine with 7 scoring dimensions, diversity constraints, and an interactive algorithm playground allowing real-time weight modification and result comparison'
  ],
  balanced: [
    'Led end-to-end PM case study for Zomato food delivery: identified discovery friction as the top-priority problem through data-driven hypothesis testing and RICE prioritization across 7 problem areas',
    'Designed and prototyped Too Maaa Zooo — an intent-based food recommendation engine with 7-dimension weighted scoring, diversity constraints, cold-start handling, and transparent algorithm explainability',
    'Built interactive unit economics model with cannibalization analysis, projecting ₹36-100 Cr annualized incremental contribution across three scenarios (conservative/base/upside) — clearly labeled as illustrative estimates',
    'Created a complete interactive case study website with 13 sections, recommendation simulator, algorithm playground, A/B test design, and 30+ interview Q&A — demonstrating product thinking, data analysis, and business judgment'
  ]
};

// ============================================================
// 22. FINAL DECISION THRESHOLDS
// ============================================================
const FINAL_DECISION = [
  {
    decision: 'LAUNCH',
    color: 'green',
    icon: '🚀',
    conditions: [
      'Stat. Sig. increase in orders/user/month',
      'Incremental contribution is positive',
      'Cannibalization rate < 40%',
      'Guardrails (cancellations/refunds) stable'
    ],
    action: 'Roll out to 100% of user base. Begin Phase 3 roadmap (Context-Aware Ranking).'
  },
  {
    decision: 'ITERATE',
    color: 'gold',
    icon: '🔄',
    conditions: [
      'Engagement (CTR) increases but orders flat',
      'Orders increase but contribution drops',
      'Cannibalization > 50%',
      'Minor negative impact on restaurant HHI'
    ],
    action: 'Keep experiment at 10% exposure. Tune algorithm weights to penalize low-margin/high-discount items. Re-run.'
  },
  {
    decision: 'KILL',
    color: 'red',
    icon: '🛑',
    conditions: [
      'Order frequency drops vs. Control',
      'Significant spike in cancellations/complaints',
      'Net incremental contribution is deeply negative',
      'Core engagement metrics tank'
    ],
    action: 'Deprecate feature. Reallocate team to different discovery hypothesis (e.g., improved search).'
  }
];
