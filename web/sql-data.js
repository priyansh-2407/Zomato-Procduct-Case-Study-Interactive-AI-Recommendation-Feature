// ============================================================
// SQL ANALYTICS — PRE-COMPUTED QUERY RESULTS
// Generated from synthetic CSV data (5K users, 50K orders, 100K sessions)
// ⚠ SYNTHETIC DATA — Does not represent Zomato internal data
// ============================================================

const SQL_RESULTS = {
  "q1_funnel": {
    "steps": [
      {
        "stage": "App Open (Sessions)",
        "count": 100000,
        "pct": 100.0
      },
      {
        "stage": "Restaurant Click",
        "count": 73039,
        "pct": 73.0
      },
      {
        "stage": "Menu View",
        "count": 52415,
        "pct": 52.4
      },
      {
        "stage": "Cart Created",
        "count": 28864,
        "pct": 28.9
      },
      {
        "stage": "Checkout Started",
        "count": 21749,
        "pct": 21.7
      },
      {
        "stage": "Order Completed",
        "count": 17344,
        "pct": 17.3
      }
    ]
  },
  "q2_intent": [
    {
      "intent": "vague_craving",
      "sessions": 24971,
      "converted": 3517,
      "conversion_rate": 14.08
    },
    {
      "intent": "exploration",
      "sessions": 9840,
      "converted": 1466,
      "conversion_rate": 14.9
    },
    {
      "intent": "cuisine_browse",
      "sessions": 15176,
      "converted": 2636,
      "conversion_rate": 17.37
    },
    {
      "intent": "deal_hunting",
      "sessions": 12974,
      "converted": 2323,
      "conversion_rate": 17.91
    },
    {
      "intent": "specific_dish",
      "sessions": 9986,
      "converted": 1894,
      "conversion_rate": 18.97
    },
    {
      "intent": "specific_restaurant",
      "sessions": 15056,
      "converted": 3028,
      "conversion_rate": 20.11
    },
    {
      "intent": "reorder",
      "sessions": 11997,
      "converted": 2480,
      "conversion_rate": 20.67
    }
  ],
  "q3_segments": [
    {
      "segment": "Occasional",
      "users": 1779,
      "pct_base": 35.6,
      "total_orders": 17886,
      "avg_orders_per_user": 10.1,
      "avg_aov": 397.0,
      "avg_discount": 16.0,
      "repeat_rate": 31.8
    },
    {
      "segment": "Churn-Risk",
      "users": 889,
      "pct_base": 17.8,
      "total_orders": 8963,
      "avg_orders_per_user": 10.1,
      "avg_aov": 397.0,
      "avg_discount": 22.0,
      "repeat_rate": 16.7
    },
    {
      "segment": "Heavy",
      "users": 476,
      "pct_base": 9.5,
      "total_orders": 4766,
      "avg_orders_per_user": 10.0,
      "avg_aov": 398.0,
      "avg_discount": 9.0,
      "repeat_rate": 48.0
    },
    {
      "segment": "Discount-Driven",
      "users": 873,
      "pct_base": 17.5,
      "total_orders": 8717,
      "avg_orders_per_user": 10.0,
      "avg_aov": 398.0,
      "avg_discount": 37.0,
      "repeat_rate": 28.0
    },
    {
      "segment": "New",
      "users": 586,
      "pct_base": 11.7,
      "total_orders": 5793,
      "avg_orders_per_user": 9.9,
      "avg_aov": 401.0,
      "avg_discount": 20.0,
      "repeat_rate": 30.3
    },
    {
      "segment": "Premium",
      "users": 397,
      "pct_base": 7.9,
      "total_orders": 3875,
      "avg_orders_per_user": 9.8,
      "avg_aov": 399.0,
      "avg_discount": 5.0,
      "repeat_rate": 35.2
    }
  ],
  "q4_browsing": [
    {
      "bucket": "0 clicks",
      "sessions": 26961,
      "converted": 0,
      "conversion_rate": 0.0
    },
    {
      "bucket": "1-2 clicks",
      "sessions": 35643,
      "converted": 4970,
      "conversion_rate": 13.94
    },
    {
      "bucket": "3-5 clicks",
      "sessions": 26014,
      "converted": 8579,
      "conversion_rate": 32.98
    },
    {
      "bucket": "6-10 clicks",
      "sessions": 10901,
      "converted": 3624,
      "conversion_rate": 33.24
    },
    {
      "bucket": "11+ clicks",
      "sessions": 481,
      "converted": 171,
      "conversion_rate": 35.55
    }
  ],
  "q5_discount": [
    {
      "bucket": "Low (<20%)",
      "users": 626,
      "active_pct": 100.0,
      "at_risk_pct": 0.0,
      "churned_pct": 0.0
    },
    {
      "bucket": "Medium (20-40%)",
      "users": 1795,
      "active_pct": 65.0,
      "at_risk_pct": 29.2,
      "churned_pct": 5.8
    },
    {
      "bucket": "High (40-60%)",
      "users": 1469,
      "active_pct": 47.0,
      "at_risk_pct": 33.2,
      "churned_pct": 19.9
    },
    {
      "bucket": "Very High (60-80%)",
      "users": 522,
      "active_pct": 33.9,
      "at_risk_pct": 39.5,
      "churned_pct": 26.6
    },
    {
      "bucket": "Extreme (80%+)",
      "users": 588,
      "active_pct": 57.3,
      "at_risk_pct": 42.7,
      "churned_pct": 0.0
    }
  ],
  "q6_eta": {
    "on_time": {
      "orders": 26986,
      "repeat_rate": 33.7
    },
    "late": {
      "orders": 21662,
      "repeat_rate": 27.4
    }
  },
  "q7_cuisine": [
    {
      "cuisine": "North Indian",
      "orders": 2609,
      "repeat_rate": 34.3
    },
    {
      "cuisine": "Bakery",
      "orders": 2739,
      "repeat_rate": 32.6
    },
    {
      "cuisine": "Healthy Bowls",
      "orders": 2713,
      "repeat_rate": 32.5
    },
    {
      "cuisine": "South Indian",
      "orders": 2659,
      "repeat_rate": 32.3
    },
    {
      "cuisine": "Chinese",
      "orders": 2646,
      "repeat_rate": 31.9
    },
    {
      "cuisine": "Biryani",
      "orders": 2779,
      "repeat_rate": 31.8
    },
    {
      "cuisine": "Desserts",
      "orders": 2831,
      "repeat_rate": 31.4
    },
    {
      "cuisine": "Burgers",
      "orders": 2814,
      "repeat_rate": 31.2
    },
    {
      "cuisine": "Pizza",
      "orders": 2603,
      "repeat_rate": 31.1
    },
    {
      "cuisine": "Cafe",
      "orders": 2701,
      "repeat_rate": 31.0
    },
    {
      "cuisine": "Italian",
      "orders": 2825,
      "repeat_rate": 30.3
    },
    {
      "cuisine": "Continental",
      "orders": 2721,
      "repeat_rate": 30.2
    },
    {
      "cuisine": "Wraps & Rolls",
      "orders": 2671,
      "repeat_rate": 30.0
    },
    {
      "cuisine": "Korean",
      "orders": 2720,
      "repeat_rate": 29.7
    },
    {
      "cuisine": "Thai",
      "orders": 2785,
      "repeat_rate": 29.7
    },
    {
      "cuisine": "Japanese",
      "orders": 2596,
      "repeat_rate": 29.4
    },
    {
      "cuisine": "Mexican",
      "orders": 2497,
      "repeat_rate": 29.2
    },
    {
      "cuisine": "Street Food",
      "orders": 2739,
      "repeat_rate": 27.9
    }
  ],
  "q8_tmz_candidates": {
    "total_occasional": 1779,
    "high_browse_low_convert": 1103,
    "avg_clicks": 2.6,
    "avg_conversion": 16.9
  },
  "q9_economics": {
    "total_orders": 48648,
    "avg_order_value": 409.0,
    "avg_revenue": 142.0,
    "avg_cost": 80.9,
    "avg_contribution": 61.1,
    "contribution_margin_pct": 14.9,
    "avg_commission": 94.1,
    "avg_delivery_fee": 32.9,
    "avg_platform_fee": 15.0,
    "avg_delivery_cost": 48.3,
    "avg_payment_cost": 8.2,
    "avg_discount": 20.1,
    "avg_refund": 2.4,
    "avg_support": 2.0
  },
  "q10_experiment": {
    "treatment": {
      "users": 1028,
      "avg_sessions": 15.8,
      "avg_orders": 1.58,
      "avg_gmv": 661.0,
      "conversion_rate": 39.2,
      "avg_rec_clicks": 7.3
    },
    "control": {
      "users": 972,
      "avg_sessions": 16.7,
      "avg_orders": 1.5,
      "avg_gmv": 611.0,
      "conversion_rate": 37.7,
      "avg_rec_clicks": 0.0
    }
  }
};

// ============================================================
// SQL QUERY DEFINITIONS — Product Questions → SQL → Insight
// ============================================================
const SQL_QUERIES = [
  {
    id: 'q1',
    category: 'Funnel',
    question: 'Where exactly do users drop off?',
    sql: `SELECT
  'App Open' AS stage, COUNT(*) AS users,
  ROUND(COUNT(*) * 100.0 / COUNT(*), 1) AS pct
FROM sessions
UNION ALL
SELECT 'Restaurant Click', COUNT(*), ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sessions), 1)
FROM sessions WHERE restaurant_clicks > 0
UNION ALL
SELECT 'Menu View', COUNT(*), ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sessions), 1)
FROM sessions WHERE menu_views > 0
UNION ALL
SELECT 'Cart Created', COUNT(*), ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sessions), 1)
FROM sessions WHERE cart_created = 1
UNION ALL
SELECT 'Checkout', COUNT(*), ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sessions), 1)
FROM sessions WHERE checkout_started = 1
UNION ALL
SELECT 'Order Completed', COUNT(*), ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM sessions), 1)
FROM sessions WHERE order_completed = 1
ORDER BY pct DESC;`,
    resultKey: 'q1_funnel',
    chartType: 'funnel_bar',
    finding: 'Out of 100K sessions, only 73% click a restaurant, and only 17.3% complete an order. The largest single drop-off is from App Open → Restaurant Click (27pp lost).',
    interpretation: 'Over a quarter of all sessions end before any restaurant interaction. These are users who opened the app, browsed, but couldn\'t decide. This is the "vague intent" window.',
    decision: 'The pre-click discovery phase is the biggest conversion opportunity. Too Maaa Zooo inserts itself exactly here — before the user has to browse.',
  },
  {
    id: 'q2',
    category: 'Discovery',
    question: 'Do users with vague intent convert less?',
    sql: `SELECT
  intent,
  COUNT(*) AS sessions,
  SUM(order_completed) AS orders,
  ROUND(SUM(order_completed) * 100.0 / COUNT(*), 2) AS conversion_rate
FROM sessions
GROUP BY intent
ORDER BY conversion_rate ASC;`,
    resultKey: 'q2_intent',
    chartType: 'intent_bar',
    finding: '"Vague craving" sessions convert at only 14.1%, while "reorder" sessions convert at 20.7% — a 47% relative gap. "Vague craving" is also the single largest intent category (25K sessions).',
    interpretation: 'Users who know what they want (reorder, specific restaurant) convert well. Users who don\'t ("vague_craving", "exploration") are the ones the current UI fails. And they represent 35% of all sessions.',
    decision: 'Too Maaa Zooo directly targets the lowest-converting, highest-volume intent type. If we can lift vague_craving conversion by just 3pp (14% → 17%), that\'s ~750 incremental orders per 100K sessions.',
  },
  {
    id: 'q3',
    category: 'Segmentation',
    question: 'Which user segments have the most frequency headroom?',
    sql: `SELECT
  u.customer_segment,
  COUNT(DISTINCT u.user_id) AS users,
  ROUND(COUNT(DISTINCT u.user_id) * 100.0 / (SELECT COUNT(*) FROM users), 1) AS pct_base,
  COUNT(o.order_id) AS total_orders,
  ROUND(AVG(o.order_value), 0) AS avg_aov,
  ROUND(AVG(o.discount), 0) AS avg_discount,
  ROUND(AVG(o.repeat_within_30_days) * 100, 1) AS repeat_rate
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id AND o.successful_order = 1
GROUP BY u.customer_segment
ORDER BY COUNT(o.order_id) / COUNT(DISTINCT u.user_id) DESC;`,
    resultKey: 'q3_segments',
    chartType: 'segment_table',
    finding: 'Occasional users represent 35.6% of the user base. They have healthy AOVs (₹397) and moderate discount usage (₹16/order), but their 30-day repeat rate (31.8%) lags Heavy users (48.0%).',
    interpretation: 'This is the "movable middle" — users who are engaged enough to have placed orders, but haven\'t formed a frequency habit. They aren\'t discount-dependent (₹16 vs ₹37 for Discount-Driven), so frequency growth here is profitable.',
    decision: 'Target Occasional users for Too Maaa Zooo. They have proven engagement, healthy economics, and the most realistic frequency headroom.',
  },
  {
    id: 'q4',
    category: 'Discovery',
    question: 'Does more browsing mean more orders, or more confusion?',
    sql: `SELECT
  CASE
    WHEN restaurant_clicks = 0 THEN '0 clicks'
    WHEN restaurant_clicks BETWEEN 1 AND 2 THEN '1-2 clicks'
    WHEN restaurant_clicks BETWEEN 3 AND 5 THEN '3-5 clicks'
    WHEN restaurant_clicks BETWEEN 6 AND 10 THEN '6-10 clicks'
    ELSE '11+ clicks'
  END AS browse_depth,
  COUNT(*) AS sessions,
  SUM(order_completed) AS orders,
  ROUND(SUM(order_completed) * 100.0 / COUNT(*), 2) AS conversion_rate
FROM sessions
GROUP BY browse_depth
ORDER BY MIN(restaurant_clicks);`,
    resultKey: 'q4_browsing',
    chartType: 'browsing_line',
    finding: 'Conversion rises from 0% (no clicks) to ~33% (3-5 clicks), then plateaus around 33-35% for higher click counts. The biggest jump is from 0→1-2 clicks (0% → 14%).',
    interpretation: 'The first few restaurant clicks are critical for conversion. But after 3-5 clicks, more browsing doesn\'t significantly improve outcomes — it likely reflects indecision rather than informed comparison.',
    decision: 'Too Maaa Zooo should aim to get users to high-confidence restaurant selection within 3-5 options, not overwhelm them with 20+. The algorithm\'s diversity constraints and top-5 ranking support this.',
  },
  {
    id: 'q5',
    category: 'Retention',
    question: 'Does discount dependency predict churn?',
    sql: `SELECT
  CASE
    WHEN discount_dependency < 0.2 THEN 'Low (<20%)'
    WHEN discount_dependency < 0.4 THEN 'Medium (20-40%)'
    WHEN discount_dependency < 0.6 THEN 'High (40-60%)'
    WHEN discount_dependency < 0.8 THEN 'Very High (60-80%)'
    ELSE 'Extreme (80%+)'
  END AS dependency_level,
  COUNT(*) AS users,
  ROUND(SUM(CASE WHEN retention_status = 'Active' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS active_pct,
  ROUND(SUM(CASE WHEN retention_status = 'At Risk' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS at_risk_pct,
  ROUND(SUM(CASE WHEN retention_status = 'Churned' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS churned_pct
FROM users
GROUP BY dependency_level
ORDER BY MIN(discount_dependency);`,
    resultKey: 'q5_discount',
    chartType: 'discount_stacked',
    finding: 'Low-dependency users (<20%) have 100% active retention. At 40-60% dependency, active rate drops to 47% with 20% churned. Very high dependency (60-80%) shows only 34% active.',
    interpretation: 'Discount dependency is strongly anti-correlated with retention health. Users trained on discounts don\'t stay when discounts end. Growing order frequency through discounts is a losing strategy.',
    decision: 'Too Maaa Zooo must increase orders through better discovery, not bigger discounts. Contribution per order is an explicit guardrail metric in the A/B test.',
  },
  {
    id: 'q6',
    category: 'Operations',
    question: 'How much does late delivery damage repeat ordering?',
    sql: `SELECT
  CASE WHEN late_delivery = 1 THEN 'Late' ELSE 'On Time' END AS delivery_status,
  COUNT(*) AS orders,
  ROUND(AVG(repeat_within_30_days) * 100, 1) AS repeat_rate_pct,
  ROUND(AVG(rating), 2) AS avg_rating
FROM orders
WHERE successful_order = 1
GROUP BY delivery_status;`,
    resultKey: 'q6_eta',
    chartType: 'eta_comparison',
    finding: 'On-time orders have a 33.7% repeat rate; late orders drop to 27.4%. That\'s a 6.3pp gap — late delivery reduces repeat probability by ~19% in relative terms.',
    interpretation: 'Delivery reliability is a significant retention driver. However, it\'s primarily an operations/logistics problem, not a product-solvable one. TMZ can help indirectly by factoring ETA reliability into restaurant ranking.',
    decision: 'ETA Reliability is weighted at 15% in the TMZ algorithm. Restaurants with poor delivery track records are ranked lower — not punished, but de-prioritized to protect user experience.',
  },
  {
    id: 'q7',
    category: 'Preferences',
    question: 'Which cuisines drive the highest repeat orders?',
    sql: `SELECT
  cuisine,
  COUNT(*) AS orders,
  ROUND(AVG(repeat_within_30_days) * 100, 1) AS repeat_rate
FROM orders
WHERE successful_order = 1
GROUP BY cuisine
ORDER BY repeat_rate DESC
LIMIT 10;`,
    resultKey: 'q7_cuisine',
    chartType: 'cuisine_bar',
    finding: 'North Indian leads with 34.3% repeat rate, followed by Bakery (32.6%) and Healthy Bowls (32.5%). Street Food has the lowest repeat rate (27.9%).',
    interpretation: 'Comfort cuisines and habitual food types drive the strongest repeat behavior. This validates the TMZ "Comfort Food" mood card — it maps to the highest-retention cuisines.',
    decision: 'The mood → cuisine affinity map in TMZ weights comfort cuisines heavily. The "My Usuals" discovery mode leverages this repeat behavior directly.',
  },
  {
    id: 'q8',
    category: 'Targeting',
    question: 'How many users match the ideal TMZ candidate profile?',
    sql: `SELECT
  COUNT(*) AS tmz_candidates,
  ROUND(COUNT(*) * 100.0 / (
    SELECT COUNT(*) FROM users WHERE customer_segment = 'Occasional'
  ), 1) AS pct_of_occasional
FROM (
  SELECT u.user_id,
    AVG(s.restaurant_clicks) AS avg_clicks,
    AVG(s.order_completed) AS conversion_rate
  FROM users u
  JOIN sessions s ON u.user_id = s.user_id
  WHERE u.customer_segment = 'Occasional'
  GROUP BY u.user_id
  HAVING AVG(s.restaurant_clicks) > 2
    AND AVG(s.order_completed) < 0.3
) AS candidates;`,
    resultKey: 'q8_tmz_candidates',
    chartType: 'candidate_summary',
    finding: '1,103 out of 1,779 occasional users (62%) are "high-browse, low-convert" — they click an average of 2.6 restaurants per session but convert only 16.9% of the time.',
    interpretation: 'These users are actively engaged (they browse significantly) but struggle to decide. They aren\'t lazy or disengaged — they\'re experiencing decision friction. This is the exact user Too Maaa Zooo is designed for.',
    decision: 'TMZ\'s target audience is validated: 62% of occasional users exhibit the browsing-without-converting pattern that intent-based recommendations should solve.',
  },
  {
    id: 'q9',
    category: 'Economics',
    question: 'What is the per-order unit economics from the data?',
    sql: `SELECT
  COUNT(*) AS total_orders,
  ROUND(AVG(order_value), 0) AS avg_order_value,
  ROUND(AVG(restaurant_commission + delivery_fee + platform_fee), 1) AS avg_revenue,
  ROUND(AVG(delivery_cost + payment_cost + discount + refund_cost + support_cost), 1) AS avg_cost,
  ROUND(AVG((restaurant_commission + delivery_fee + platform_fee) -
    (delivery_cost + payment_cost + discount + refund_cost + support_cost)), 1) AS avg_contribution,
  ROUND(AVG((restaurant_commission + delivery_fee + platform_fee) -
    (delivery_cost + payment_cost + discount + refund_cost + support_cost))
    * 100.0 / AVG(order_value), 1) AS contribution_margin_pct
FROM orders
WHERE successful_order = 1;`,
    resultKey: 'q9_economics',
    chartType: 'economics_waterfall',
    finding: 'Average contribution per order: ₹61.1 (on ₹409 AOV). Revenue of ₹142/order minus variable costs of ₹80.9. Contribution margin: 14.9% of AOV.',
    interpretation: 'The unit economics are healthy. Each incremental order adds ~₹61 in contribution. Discount (₹20.1/order) is the largest controllable cost — reducing discount dependency directly increases margin.',
    decision: 'The business impact calculator uses ₹55 contribution/order (conservative vs the ₹61 from data). Even at ₹55, TMZ-driven incremental orders create significant value.',
  },
  {
    id: 'q10',
    category: 'Experiment',
    question: 'Does the recommendation experiment show lift?',
    sql: `SELECT
  experiment_group,
  COUNT(*) AS users,
  ROUND(AVG(sessions), 1) AS avg_sessions,
  ROUND(AVG(orders), 2) AS avg_orders,
  ROUND(AVG(gmv), 0) AS avg_gmv,
  ROUND(SUM(converted) * 100.0 / COUNT(*), 1) AS conversion_rate,
  ROUND(AVG(recommendation_clicks), 1) AS avg_rec_clicks
FROM experiments
GROUP BY experiment_group;`,
    resultKey: 'q10_experiment',
    chartType: 'experiment_table',
    finding: 'Treatment group: 1.58 orders/user, 39.2% conversion. Control: 1.50 orders/user, 37.7% conversion. Treatment shows +5.3% relative lift in orders and +1.5pp absolute conversion lift.',
    interpretation: 'The recommendation exposure in the treatment group correlates with modestly higher ordering. The 7.3 avg recommendation clicks suggest users engage with the feature. The lift is directionally positive but would need more users and duration for statistical significance.',
    decision: 'These synthetic experiment results provide a plausible base case for the A/B test design. The real experiment should target 50K+ users per arm and run 4-6 weeks for reliable conclusions.',
  }
];
