# How "Too Maaa Zooo" Actually Works
### A Complete Technical + Product Explainer

This document teaches you every mechanism in the project — from how the fake data is generated, to how the SQL queries compute real numbers, to how the recommendation engine picks restaurants, to how the browser renders it all. No shortcuts.

---

## Table of Contents

1. [The Big Picture: What Is This Project?](#1-the-big-picture)
2. [The Data Layer: How Synthetic Data Is Generated](#2-the-data-layer)
3. [The SQL Funnel Analysis: 10 Queries Explained Line by Line](#3-the-sql-funnel-analysis)
4. [The Recommendation Engine: Multi-Signal Scoring](#4-the-recommendation-engine)
5. [Unit Economics: How the Money Math Works](#5-unit-economics)
6. [The A/B Experiment Simulation](#6-the-ab-experiment)
7. [How the Browser Renders Everything](#7-browser-rendering)
8. [The End-to-End Narrative: How It All Connects](#8-the-end-to-end-narrative)

---

## 1. The Big Picture

**Core Problem:** How can Zomato increase profitable food-order frequency among existing users — *without* becoming dependent on discounts?

**The Product Answer:** "Too Maaa Zooo" (TMZ) — an intent-first recommendation system that helps users decide *what* to order before they even open the restaurant list. Instead of showing 200+ restaurants and hoping users pick one, TMZ asks: "What's your vibe right now?" and surfaces 3–5 high-confidence options.

**The Project Structure:**

```
Zomato PM/
├── src/
│   ├── data_generation.py      → Generates the 5 CSV datasets
│   ├── recommendation_engine.py → Python implementation of the TMZ algorithm
│   └── unit_economics.py       → Financial model
├── data/
│   ├── users.csv          (5,000 rows)
│   ├── orders.csv         (50,000 rows)
│   ├── sessions.csv       (100,000 rows)
│   ├── restaurants.csv    (500 rows)
│   └── experiments.csv    (2,000 rows)
└── web/
    ├── index.html          → The single-page app shell
    ├── app.js             → All interactive logic
    ├── data.js            → Static data for the UI (segments, teardown, etc.)
    ├── sql-data.js        → Pre-computed SQL results (auto-generated)
    ├── precompute_sql.py  → Python script that generates sql-data.js
    └── styles.css         → Design system
```

---

## 2. The Data Layer

### 2.1 Why Synthetic Data?

The project can't use real Zomato data. Instead, `src/data_generation.py` generates **behaviorally realistic** fake data using statistical distributions that mirror real food-tech platform patterns.

The key is the seed: `np.random.seed(42)` — this means every time you run the script, you get the exact same numbers. Reproducible fake data.

### 2.2 How Users Are Generated

```python
# From data_generation.py

SEGMENTS = ['Heavy', 'Occasional', 'Discount-Driven', 'Premium', 'Churn-Risk', 'New']
SEGMENT_WEIGHTS = [0.10, 0.36, 0.16, 0.08, 0.18, 0.12]
```

**What this means:** Each user is randomly assigned a segment. The weights determine the probability:
- 36% of users are `Occasional` (this is your target market for TMZ)
- 18% are `Churn-Risk`
- 16% are `Discount-Driven`
- 10% are `Heavy` users
- 12% are `New`
- 8% are `Premium`

Then each user gets attributes derived from their segment. For example, order frequency:

```python
freq_map = {
    'Heavy':          (4.0, 8.0),   # 4–8 orders/month
    'Occasional':     (1.0, 3.0),   # 1–3 orders/month ← TMZ target
    'Discount-Driven':(2.0, 4.0),
    'Premium':        (3.0, 6.0),
    'Churn-Risk':     (0.0, 1.0),   # basically gone
    'New':            (0.5, 2.0),
}
# A random value is drawn uniformly from that range
orders_30d = max(0, int(np.random.uniform(*freq_range)))
```

Discount dependency is similarly segment-driven:
```python
disc_map = {
    'Discount-Driven': (0.7, 1.0),  # 70–100% orders use a discount
    'Premium':         (0.0, 0.15), # almost never use discounts
    'Occasional':      (0.2, 0.5),  # moderate dependency
    ...
}
```

This is important because the SQL query Q5 (discount dependency vs. retention) relies on this field being realistic.

### 2.3 How Sessions Are Generated — The Funnel Logic

This is the most important part. Sessions simulate user behavior inside the app:

```python
INTENTS = ['specific_restaurant', 'specific_dish', 'cuisine_browse', 
           'vague_craving', 'reorder', 'deal_hunting', 'exploration']

# Intent probabilities:
intent = np.random.choice(INTENTS, p=[0.15, 0.10, 0.15, 0.25, 0.12, 0.13, 0.10])
```

**Key insight:** `vague_craving` has the highest probability (0.25 = 25% of sessions). This is deliberately designed to prove the TMZ hypothesis.

Then the funnel is simulated step by step:

```python
# Each intent type has a different click probability
click_prob = {
    'specific_restaurant': 0.85,  # knows where they're going
    'reorder':             0.90,  # definitely clicking
    'vague_craving':       0.50,  # uncertain → lower clicks
    'exploration':         0.55,
}

# How many restaurants actually get clicked?
restaurant_clicks = max(0, int(
    restaurants_shown * np.random.uniform(0, click_prob[intent]) * 0.3
))

# Each subsequent step has a conversion probability
menu_views       = max(0, int(restaurant_clicks * np.random.uniform(0.5, 0.9)))
cart_created     = 1 if menu_views > 0 and random.random() < 0.55 else 0
checkout_started = 1 if cart_created and random.random() < 0.75 else 0
order_completed  = 1 if checkout_started and random.random() < 0.80 else 0
```

**The math:** A `vague_craving` user has a 50% chance of clicking anything. A `specific_restaurant` user has an 85% chance. This generates the 14% vs. 20% conversion gap you see in Query Q2.

### 2.4 How Orders Are Generated — The Economics

```python
# Commission is drawn from a distribution (18–28%)
commission_rate = np.random.uniform(0.18, 0.28)
restaurant_commission = round(order_value * commission_rate, 2)

# Discount depends on user + restaurant
discount_prob = user['discount_dependency'] * 0.7 + restaurant['discount_rate'] / 100 * 0.3
if random.random() < discount_prob:
    discount = int(order_value * np.random.uniform(0.05, 0.25))
```

**The repeat_within_30_days field** is particularly clever — it simulates whether a user comes back within a month:

```python
repeat_base = 0.3                                          # 30% baseline
repeat_base += (rating - 3) * 0.1                         # +10% per star above 3
repeat_base += (restaurant['eta_reliability'] - 0.7) * 0.2 # ETA matters
repeat_base -= user['discount_dependency'] * 0.1           # discount users don't return organically
if user['customer_segment'] == 'Heavy':
    repeat_base += 0.15
elif user['customer_segment'] == 'Churn-Risk':
    repeat_base -= 0.15

repeat_within_30 = 1 if random.random() < max(0.05, min(0.85, repeat_base)) else 0
```

This is why Query Q6 finds that late deliveries have lower repeat rates — it's baked into the data generation logic.

---

## 3. The SQL Funnel Analysis

### 3.1 How It Works Technically

The browser can't run SQL against files. Instead, `web/precompute_sql.py` is a Python script that:
1. Loads all 5 CSVs using Python's `csv.DictReader`
2. Runs 10 "queries" as Python aggregations
3. Writes the results to `web/sql-data.js` as a JavaScript constant
4. The website just reads that pre-computed JSON

```
data/sessions.csv  ──→  precompute_sql.py  ──→  sql-data.js  ──→  Chart.js renders it
```

The SQL you see on screen is **display-only** — it's the exact query you'd run in PostgreSQL, but the numbers come from the Python aggregation.

### 3.2 Query Q1: Funnel Analysis

**Product Question:** Where do users drop off?

```sql
SELECT 'App Open' AS stage, COUNT(*) AS users, 100.0 AS pct FROM sessions
UNION ALL
SELECT 'Restaurant Click', COUNT(*), ROUND(COUNT(*)*100.0/(SELECT COUNT(*) FROM sessions),1)
FROM sessions WHERE restaurant_clicks > 0
UNION ALL
SELECT 'Menu View'   ... WHERE menu_views > 0
UNION ALL
SELECT 'Cart Created' ... WHERE cart_created = 1
UNION ALL
SELECT 'Checkout'    ... WHERE checkout_started = 1
UNION ALL
SELECT 'Order Completed' ... WHERE order_completed = 1
```

**Python equivalent (what actually runs):**
```python
total_sessions  = len(sessions)                                          # 100,000
discovery       = sum(1 for s in sessions if int(s['restaurant_clicks']) > 0)  # 73,039
restaurant_view = sum(1 for s in sessions if int(s['menu_views']) > 0)         # 52,415
cart            = sum(1 for s in sessions if int(s['cart_created']) == 1)      # 28,864
checkout        = sum(1 for s in sessions if int(s['checkout_started']) == 1)  # 21,749
order_completed = sum(1 for s in sessions if int(s['order_completed']) == 1)   # 17,344
```

**Results:** 100% → 73% → 52.4% → 28.9% → 21.7% → 17.3%

**PM Insight:** The biggest single drop (27pp) happens at the very first step — App Open to Restaurant Click. This is *before* any restaurant is even engaged. This is the "discovery friction" that TMZ attacks.

### 3.3 Query Q2: Intent vs. Conversion

**Product Question:** Do users with vague intent convert less?

```sql
SELECT
  intent,
  COUNT(*) AS sessions,
  SUM(order_completed) AS orders,
  ROUND(SUM(order_completed)*100.0/COUNT(*), 2) AS conversion_rate
FROM sessions
GROUP BY intent
ORDER BY conversion_rate ASC;
```

**Python equivalent:**
```python
intent_stats = defaultdict(lambda: {'total': 0, 'converted': 0})
for s in sessions:
    intent_stats[s['intent']]['total'] += 1
    if int(s['order_completed']) == 1:
        intent_stats[s['intent']]['converted'] += 1
```

**Results:**
| Intent | Conversion |
|--------|-----------|
| vague_craving | 14.1% ← **lowest** |
| exploration | 14.9% |
| cuisine_browse | 17.4% |
| deal_hunting | 17.9% |
| specific_dish | 19.0% |
| specific_restaurant | 20.1% |
| reorder | 20.7% ← **highest** |

**PM Insight:** The 47% relative gap between vague_craving and reorder confirms the hypothesis. TMZ specifically targets vague_craving sessions. If we lift those from 14.1% to just 17%, that's ~750 extra orders per 100K sessions.

### 3.4 Query Q3: Segment Analysis (The "Movable Middle")

This is a JOIN-style aggregation: for each user, find all their orders, then group stats by segment.

```python
# Build a lookup: user_id → segment
user_segment_map = {u['user_id']: u['customer_segment'] for u in users}

# Accumulate stats per segment from orders table
segment_stats = defaultdict(lambda: {'users': 0, 'total_orders': 0, 'repeat_orders': 0, ...})
for o in orders:
    seg = user_segment_map.get(o['user_id'], 'Unknown')
    segment_stats[seg]['total_orders'] += 1
    if int(o['successful_order']) == 1:
        segment_stats[seg]['total_gmv'] += float(o['order_value'])
        if int(o['repeat_within_30_days']) == 1:
            segment_stats[seg]['repeat_orders'] += 1

# Count users per segment
for u in users:
    segment_stats[u['customer_segment']]['users'] += 1
```

**Key finding:** Occasional users (35.6% of base) have ₹16 avg discount/order vs. ₹37 for Discount-Driven users — and a 31.8% repeat rate vs. 28.0%. This proves they're the most profitable target: they're engaged, not discount-dependent, and have genuine frequency headroom.

### 3.5 Query Q4: Browsing Depth vs. Conversion (Decision Fatigue)

```python
click_buckets = defaultdict(lambda: {'sessions': 0, 'converted': 0})
for s in sessions:
    clicks = int(s['restaurant_clicks'])
    if clicks == 0:          bucket = '0 clicks'
    elif clicks <= 2:        bucket = '1-2 clicks'
    elif clicks <= 5:        bucket = '3-5 clicks'
    elif clicks <= 10:       bucket = '6-10 clicks'
    else:                    bucket = '11+ clicks'
    click_buckets[bucket]['sessions'] += 1
    if int(s['order_completed']) == 1:
        click_buckets[bucket]['converted'] += 1
```

**Results:**
- 0 clicks → 0% conversion (obviously)
- 1-2 clicks → 14% conversion
- 3-5 clicks → **33% conversion** ← peak
- 6-10 clicks → 33% (plateaus)
- 11+ clicks → 35% (tiny sample)

**PM Insight:** The optimal browsing depth is 3-5 restaurants. Fewer = not enough options. More = decision paralysis but no marginal gain. This is why TMZ shows exactly 3-5 curated options, not a scroll-forever feed.

### 3.6 Query Q5: Discount Dependency vs. Retention

Each user has a `discount_dependency` float (0.0–1.0). The query buckets them:

```python
for u in users:
    dd = float(u['discount_dependency'])
    if dd < 0.2:   bucket = 'Low (<20%)'
    elif dd < 0.4: bucket = 'Medium (20-40%)'
    elif dd < 0.6: bucket = 'High (40-60%)'
    elif dd < 0.8: bucket = 'Very High (60-80%)'
    else:          bucket = 'Extreme (80%+)'
    
    status = u['retention_status']  # 'Active', 'At Risk', 'Churned'
```

**Results:**
| Dependency | Active % | At Risk % | Churned % |
|-----------|---------|----------|----------|
| Low (<20%) | **100%** | 0% | 0% |
| Medium | 65% | 29% | 6% |
| High | 47% | 33% | 20% |
| Very High | 34% | 40% | 27% |

**PM Insight:** Discount dependency is a leading indicator of churn. Growing order frequency through more discounts would be self-defeating. This justifies TMZ's design constraint: improve discovery quality, not discount depth.

### 3.7 Query Q6: ETA Reliability vs. Repeat

```python
for o in orders:
    if int(o['successful_order']) != 1:
        continue
    key = 'late' if int(o['late_delivery']) == 1 else 'on_time'
    eta_stats[key]['orders'] += 1
    if int(o['repeat_within_30_days']) == 1:
        eta_stats[key]['repeats'] += 1
```

**Results:** On-time = 33.7% repeat. Late = 27.4% repeat. A 19% relative difference.

**PM Decision:** TMZ weights `eta_reliability` at 15% in the restaurant scoring formula. Restaurants that consistently deliver late get de-ranked — protecting user experience and preventing the exact repeat-order drop-off shown here.

### 3.8 Query Q7: Cuisine Repeat Rate

```python
for o in orders:
    if int(o['successful_order']) != 1: continue
    cuisine_stats[o['cuisine']]['orders'] += 1
    if int(o['repeat_within_30_days']) == 1:
        cuisine_stats[o['cuisine']]['repeats'] += 1
```

North Indian leads (34.3%), followed by Bakery (32.6%), Healthy Bowls (32.5%). Street Food is lowest (27.9%).

**PM Decision:** TMZ's "Comfort" mood card maps to North Indian and Biryani (highest affinity = 0.9, 0.85 respectively in the MOOD_CUISINE_MAP). The algorithm is directly informed by these repeat-rate patterns.

### 3.9 Query Q8: TMZ Target User Identification

This is the most analytically sophisticated query — it computes per-user session statistics and then filters for the "high browse, low convert" profile:

```python
# Step 1: Compute per-user session stats
user_session_stats = defaultdict(lambda: {'sessions': 0, 'clicks_total': 0, 'orders': 0})
for s in sessions:
    uid = s['user_id']
    user_session_stats[uid]['sessions'] += 1
    user_session_stats[uid]['clicks_total'] += int(s['restaurant_clicks'])
    user_session_stats[uid]['orders'] += int(s['order_completed'])

# Step 2: Filter Occasional users only, apply the TMZ profile criteria
for u in users:
    if u['customer_segment'] != 'Occasional':
        continue
    ss = user_session_stats.get(u['user_id'])
    avg_clicks = ss['clicks_total'] / ss['sessions']
    conversion = ss['orders'] / ss['sessions']
    
    # HIGH BROWSE + LOW CONVERT = decision friction
    if avg_clicks > 2 and conversion < 0.3:
        tmz_candidates += 1
```

**Result:** 1,103 out of 1,779 Occasional users (62%) match this profile. They browse an average of 2.6 restaurants per session but only convert 16.9% of the time.

**PM Insight:** These users are engaged (they browse), but struggling (they don't commit). They aren't uninterested — they're paralyzed by choice. TMZ is built for them.

### 3.10 Query Q9: Unit Economics

```python
successful = [o for o in orders if int(o['successful_order']) == 1]

# Revenue = commission + delivery fee + platform fee
avg_revenue = sum(
    float(o['restaurant_commission']) + float(o['delivery_fee']) + float(o['platform_fee'])
    for o in successful
) / len(successful)

# Cost = delivery + payment + discount + refund + support
avg_cost = sum(
    float(o['delivery_cost']) + float(o['payment_cost']) + float(o['discount']) + 
    float(o['refund_cost']) + float(o['support_cost'])
    for o in successful
) / len(successful)

avg_contribution = avg_revenue - avg_cost
```

**Results:**
- Avg Order Value: ₹409
- Revenue/order: ₹142 (commission ₹94.1 + delivery fee ₹32.9 + platform fee ₹15)
- Cost/order: ₹80.9 (delivery ₹48.3 + discount ₹20.1 + payment ₹8.2 + refund/support ₹4.4)
- **Contribution: ₹61.1/order (14.9% margin)**

The UI business calculator uses ₹55 as a conservative assumption — the actual data shows ₹61, giving headroom for error.

### 3.11 Query Q10: A/B Experiment Results

```python
exp_groups = defaultdict(lambda: {'users': 0, 'total_orders': 0, 'converted': 0, ...})
for e in experiments:
    g = e['experiment_group']  # 'treatment' or 'control'
    exp_groups[g]['users'] += 1
    exp_groups[g]['total_orders'] += int(e['orders'])
    if int(e['converted']) == 1:
        exp_groups[g]['converted'] += 1
```

**Results:**
| Group | Users | Avg Orders | Conversion |
|-------|-------|-----------|-----------|
| Treatment | 1,028 | 1.58 | **39.2%** |
| Control | 972 | 1.50 | 37.7% |

+5.3% relative lift in orders. +1.5pp absolute lift in conversion.

Note: This is simulated with a 2–12% lift built into the data generation:
```python
if group == 'treatment':
    conv *= np.random.uniform(1.02, 1.12)  # 2-12% lift
```

---

## 4. The Recommendation Engine

The algorithm lives in `src/recommendation_engine.py` (Python reference) and is re-implemented in `web/app.js` as `initAlgorithmPlayground()` for the browser demo.

### 4.1 The Pipeline

```
User Selects Mood + Budget + Cuisine + ETA + Distance
         ↓
Step 1: Filter Candidates  (hard constraints)
         ↓
Step 2: Adjust Weights     (based on discovery mode)
         ↓
Step 3: Score Each Restaurant (7 signals)
         ↓
Step 4: Apply Diversity    (max 2 same cuisine in top 5)
         ↓
Return Top 5–10 Results
```

### 4.2 Step 1: Filtering

```python
def _filter_candidates(self, context):
    df = self.restaurants.copy()
    
    # Only available restaurants (>50% uptime)
    df = df[df['availability'] > 0.5]
    
    # If user selected a cuisine AND there are 3+ matches → filter
    if context.get('cuisine') and context['cuisine'] != 'Any':
        cuisine_df = df[df['cuisine'] == context['cuisine']]
        if len(cuisine_df) >= 3:
            df = cuisine_df
    
    # ETA filter — only if enough restaurants survive
    if context.get('eta'):
        max_eta = ETA_OPTIONS[context['eta']]
        total_time = df['avg_prep_time'] + df['avg_delivery_time']
        eta_df = df[total_time <= max_eta]
        if len(eta_df) >= 3:
            df = eta_df
    
    return df
```

**Key design:** Every filter has a "soft exit" — if applying the filter would leave fewer than 3 restaurants, the filter is skipped. This prevents empty results.

### 4.3 Step 2: Weight Adjustment by Discovery Mode

```python
def _adjust_weights(self, context):
    w = dict(self.weights)  # Start with defaults
    
    if context.get('discovery') == 'new':
        w['novelty'] = max(w['novelty'], 20)   # Boost novelty
        w['preference'] -= 10                   # Reduce past preference
    elif context.get('discovery') == 'usuals':
        w['preference'] += 15                   # Boost familiarity
        w['novelty'] = 0                        # Kill novelty
    elif context.get('discovery') == 'surprise':
        w['novelty'] = 30                       # Max novelty
        w['preference'] = 10                    # Minimal familiarity
    
    return w
```

This is the "discovery mode" UI element in the app: "My Usuals / Discover New / Surprise Me". Each mode shifts the weight distribution, producing fundamentally different recommendation lists from the same restaurant pool.

### 4.4 Step 3: The Scoring Formula

```python
# Default weights:
DEFAULT_WEIGHTS = {
    'preference':     30,   # How well it matches user's history + mood
    'quality':        20,   # Restaurant rating
    'eta_reliability': 15,  # % of orders delivered on time
    'price_fit':      15,   # Budget match
    'distance':       10,   # Proximity
    'availability':   10,   # Is the restaurant currently open/accepting?
    'novelty':         0    # (0 by default, activated by discovery mode)
}

# Final score formula:
final_score = (
    pref_score * 30 +
    quality_score * 20 +
    eta_score * 15 +
    price_score * 15 +
    dist_score * 10 +
    avail_score * 10 +
    novelty_score * 0
) / 100  # total weight
```

**Preference Score (the most complex):**

```python
def _calc_preference(self, restaurant, context):
    score = 50  # Baseline: everyone starts at 50/100
    
    # +30 if cuisine matches user's preferred cuisines
    if restaurant['cuisine'] in self.user.preferred_cuisines:
        score += 30
    
    # +15 if user has ordered from here before
    if restaurant['restaurant_id'] in self.user.order_history:
        score += 15
    
    # +3 per star given (from user's own ratings)
    if restaurant['restaurant_id'] in self.user.top_rated:
        score += self.user.top_rated[restaurant['restaurant_id']] * 3
    
    # MOOD AFFINITY: the core of TMZ
    mood = context.get('mood')
    if mood and mood in MOOD_CUISINE_MAP:
        affinity = MOOD_CUISINE_MAP[mood].get(restaurant['cuisine'], 0)
        score += affinity * 25   # max +25 if affinity = 1.0
    
    return min(100, max(0, score))
```

**The Mood-Cuisine Affinity Map** is the intellectual core of TMZ:

```python
MOOD_CUISINE_MAP = {
    'comfort':   {'North Indian': 0.9, 'Biryani': 0.85, 'Chinese': 0.7, 'Pizza': 0.6, ...},
    'healthy':   {'Healthy Bowls': 0.95, 'Japanese': 0.7, 'Cafe': 0.6, ...},
    'spicy':     {'Korean': 0.85, 'Thai': 0.8, 'North Indian': 0.8, 'Chinese': 0.75, ...},
    'quick':     {'Burgers': 0.9, 'Wraps & Rolls': 0.85, 'Street Food': 0.8, ...},
    'latenight': {'Pizza': 0.85, 'Burgers': 0.8, 'Chinese': 0.75, 'Biryani': 0.7, ...},
    'sharing':   {'Pizza': 0.9, 'North Indian': 0.85, 'Chinese': 0.8, ...},
    'treat':     {'Italian': 0.85, 'Japanese': 0.8, 'Continental': 0.75, ...},
    'new':       {'Korean': 0.85, 'Japanese': 0.8, 'Thai': 0.8, 'Mexican': 0.75, ...},
}
```

When a user picks "Comfort" mood, every North Indian restaurant gets +22.5 points (0.9 affinity × 25) on top of everything else. When they pick "Healthy," Healthy Bowls restaurants get +23.75 points. This is what makes the recommendations feel personalized without needing click history.

**Price Fit Score:**

```python
BUDGET_OPTIONS = {
    'b200': {'max': 200},
    'b300': {'min': 200, 'max': 300},
    'b500': {'min': 300, 'max': 500},
    'b800': {'min': 500, 'max': 800},
    'b999': {'min': 800},
}

def _calc_price_fit(self, restaurant, context):
    score = 70  # Baseline
    
    aov = restaurant['avg_order_value']
    opts = BUDGET_OPTIONS[context['budget']]
    
    if 'max' in opts and aov <= opts['max']:
        score = 95   # Perfect fit (under budget)
    elif in_range:
        score = 90   # In range
    else:
        # Penalty: further from budget → lower score
        target = opts.get('max', opts.get('min', 500))
        score = max(20, 90 - abs(aov - target) / 5)
    
    return min(100, max(0, score))
```

### 4.5 Step 4: Diversity Constraints

```python
def _apply_diversity(self, scored, top_n):
    result_indices = [scored.index[0]]  # Always include the #1 restaurant
    cuisine_counts = {scored.iloc[0]['cuisine']: 1}
    
    for idx in scored.index[1:]:
        if len(result_indices) >= top_n: break
        
        r = scored.loc[idx]
        count = cuisine_counts.get(r['cuisine'], 0)
        
        if len(result_indices) < 5 and count >= 2:
            continue  # Skip: already have 2 of this cuisine in top 5
        if count >= 3:
            continue  # Skip: already have 3 of this cuisine overall
        
        cuisine_counts[r['cuisine']] = count + 1
        result_indices.append(idx)
    
    return scored.loc[result_indices]
```

This prevents the problem where a high-scoring cuisine monopolizes all 5 slots. Even if all 5 top-scored restaurants are North Indian, the algorithm will only include 2 of them in the top 5, then pull in the best-scored restaurant from a different cuisine.

---

## 5. Unit Economics

### 5.1 Per-Order Model

`src/unit_economics.py` defines the financial skeleton. At AOV = ₹380:

```
REVENUE (₹138.60/order)
  Commission:      ₹380 × 22% = ₹83.60
  Delivery Fee:    ₹35.00
  Platform Fee:    ₹15.00
  Ad Revenue:      ₹5.00

COSTS (₹98.00/order)
  Delivery Payout: ₹45.00  ← largest cost
  Discount:        ₹40.00  ← second largest (and controllable)
  Payment Proc:    ₹7.60  (2% of ₹380)
  Refund:          ₹5.00
  Support:         ₹3.00
  Rest. Incentive: ₹5.00

CONTRIBUTION: ₹40.60/order (~10.7% margin)
```

The SQL data from Query Q9 shows slightly different numbers (₹61.1 contribution on ₹409 AOV) because the CSV data uses a wider commission range (18–28%) and different discount distributions. The unit economics UI uses ₹55 as a conservative estimate.

### 5.2 Business Impact Formula

```python
def business_impact(self, eligible_users, current_freq, new_freq, ...):
    freq_lift = new_freq - current_freq          # e.g., 2.0 - 1.8 = +0.2

    gross_incremental_orders = eligible_users * freq_lift
    #   = 5,000,000 × 0.2 = 1,000,000 orders/month
    
    cannibalized = gross_incremental_orders * cannibalization_rate
    #   = 1,000,000 × 0.25 = 250,000 (orders that would've happened anyway)
    
    net_incremental_orders = 1,000,000 - 250,000 = 750,000/month
    
    monthly_contribution = 750,000 × ₹55 = ₹412.5M/month
    annual_contribution  = ₹412.5M × 12 = ₹4.95B/year
```

The **cannibalization rate** (25% in base case) accounts for the possibility that some of the "new" orders TMZ drives are orders the user would have placed anyway through the existing UI. A higher cannibalization rate means TMZ is less additive.

### 5.3 Three Scenarios

| Input | Conservative | Base | Upside |
|-------|-------------|------|--------|
| Eligible Users | 3M | 5M | 8M |
| Freq Lift | +0.1 | +0.2 | +0.3 |
| Contribution/Order | ₹50 | ₹55 | ₹60 |
| Cannibalization | 35% | 25% | 15% |
| **Annual Contribution** | **₹1.2B** | **₹4.95B** | **₹15.6B** |

The base case assumes 5M eligible Occasional users × a 0.2 lift in monthly orders. This is the number the interactive slider in the UI adjusts.

---

## 6. The A/B Experiment Simulation

### 6.1 How the Fake Experiment Works

```python
# From data_generation.py

base_conv = {
    'Heavy': 0.65, 'Occasional': 0.35, 'Discount-Driven': 0.45,
    'Premium': 0.55, 'Churn-Risk': 0.15, 'New': 0.30
}

for _, user in experiment_users.iterrows():
    group = np.random.choice(['control', 'treatment'])
    conv = base_conv[user['customer_segment']]
    
    if group == 'treatment':
        conv *= np.random.uniform(1.02, 1.12)  # 2–12% lift baked in
    
    ordered = 1 if random.random() < conv else 0
```

The **treatment group** has a multiplicative lift (1.02–1.12×) applied to their base conversion probability. This mimics what a real recommendation feature might do.

### 6.2 How to Design the Real Experiment

**Target:** Occasional users who show `vague_craving` intent sessions (the 1,103 candidates from Q8)

**Assignment:**
- Control: No TMZ, standard Zomato homepage
- Treatment: TMZ mood selector appears at session start

**Primary Metric:** Orders per user per month (frequency)

**Guardrail Metrics:**
- Contribution per order (must not decrease — no discount-driven orders)
- Session duration (should decrease — TMZ should speed up decisions)
- Unsubscribe rate (should not increase)

**Sample Size:** Need ~50K users per arm for 80% power to detect a 5% lift at 95% confidence. Run for 4–6 weeks.

**Launch Decision Thresholds:**
- ✅ Launch: Frequency lift >3%, contribution flat or up, no UX regression
- 🔄 Iterate: Lift <3% but positive trend — improve the algorithm
- ❌ Kill: No lift after 6 weeks, or contribution/order drops >10%

---

## 7. Browser Rendering

### 7.1 How the Page Initializes

`index.html` loads three JS files in order:
```html
<script src="data.js"></script>    <!-- Static data constants -->
<script src="sql-data.js"></script> <!-- Pre-computed SQL results -->
<script src="app.js"></script>      <!-- All the logic + Chart.js calls -->
```

On `DOMContentLoaded`, `app.js` runs 15 init functions sequentially:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();        // Scroll-spy nav, mobile toggle
  initHeroAnimations();    // Fade-in counter animations
  initFunnel();            // Funnel chart from data.js constants
  initSQLAnalysis();       // SQL cards from sql-data.js
  initNorthStar();         // Metric comparison table
  initHypothesisTree();    // Clickable hypothesis cards
  initDataCharts();        // Growth engine charts
  initSegmentation();      // Segment comparison bars
  initTMZDemo();           // Mood/budget selector UI
  initAlgorithmPlayground(); // Weight sliders + live re-ranking
  initExperiment();        // A/B experiment results
  initUnitEconomics();     // Per-order waterfall chart
  initBusinessImpact();    // Scenario calculator
  initRoadmap();           // Timeline phases
  initRisks();             // Risk accordion
  initFinalDecision();     // Decision threshold cards
});
```

### 7.2 How initSQLAnalysis() Works

```javascript
function initSQLAnalysis() {
  const container = document.getElementById('sql-query-cards');

  // Render all 10 cards from SQL_QUERIES (defined in sql-data.js)
  container.innerHTML = SQL_QUERIES.map((q, i) => `
    <div class="sql-query-card">
      <div class="sql-query-header">
        <div class="sql-query-number">${i + 1}</div>
        <h3 class="sql-query-question">${q.question}</h3>
        <button onclick="toggleSqlPanel(this)">Show SQL</button>
        <button onclick="toggleSqlInsight(this)">What did this tell us?</button>
      </div>
      
      <!-- Dark code panel, hidden by default -->
      <div class="sql-code-panel">
        <pre class="sql-code">${formatSQL(q.sql)}</pre>
      </div>
      
      <!-- Chart or table rendered from SQL_RESULTS[q.resultKey] -->
      <div class="sql-result-area">
        ${renderSqlResult(q)}
      </div>
      
      <!-- Finding → Interpretation → Decision panel -->
      <div class="sql-insight-panel">
        Finding: ${q.finding}
        Interpretation: ${q.interpretation}
        Decision: ${q.decision}
      </div>
    </div>
  `).join('');

  // After DOM is built, draw Chart.js charts
  setTimeout(() => {
    SQL_QUERIES.forEach(q => renderSqlChart(q));
  }, 100);
}
```

The `toggleSqlPanel` and `toggleSqlInsight` functions just add/remove a `.visible` CSS class, which triggers a CSS `max-height` transition:

```css
.sql-code-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
.sql-code-panel.visible { max-height: 600px; }
```

### 7.3 How the Algorithm Playground Works

In `initAlgorithmPlayground()`, the browser holds a local copy of the restaurants array (from `data.js`). When a user moves any slider:

```javascript
function rankRestaurants() {
  const scored = RESTAURANTS.map(r => {
    const pref = calcPreference(r);     // mood affinity + cuisine match + history
    const quality = (r.rating / 5) * 100;
    const eta = r.etaReliability * 100;
    const price = calcPriceFit(r);      // budget match
    const dist = 100 - r.distance * 10;
    const avail = r.availability > 0.7 ? 95 : 30;
    const novelty = calcNovelty(r);

    const totalWeight = Object.values(STATE.weights).reduce((a, b) => a + b, 0);
    const score = (
      pref * STATE.weights.preference +
      quality * STATE.weights.quality +
      eta * STATE.weights.etaReliability +
      price * STATE.weights.priceFit +
      dist * STATE.weights.distance +
      avail * STATE.weights.availability +
      novelty * STATE.weights.novelty
    ) / totalWeight;

    return { ...r, score: Math.round(score * 10) / 10 };
  });

  // Sort, then apply diversity constraint
  const sorted = scored.sort((a, b) => b.score - a.score);
  return applyDiversity(sorted);
}
```

The "Break the Algorithm" button stores the current rankings, then zeros out all weights except one (e.g., set price_fit to 100, everything else to 0) and re-runs `rankRestaurants()`. The UI then shows the delta — which restaurants moved up, which fell.

---

## 8. The End-to-End Narrative

Here's how every piece of the project connects:

```
TEARDOWN OBSERVATION
"Zomato shows 200+ restaurants with no intent filtering"
                 ↓
SQL Q1 (Funnel)
"27% of users drop off before clicking any restaurant"
                 ↓
SQL Q2 (Intent Analysis)
"vague_craving sessions convert 47% worse than reorder sessions"
                 ↓
SQL Q4 (Browsing Depth)
"Optimal decision depth = 3-5 options. More = no gain."
                 ↓
SQL Q3 + Q8 (Segmentation + Targeting)
"35.6% of users are Occasional. 62% of them are high-browse, low-convert."
                 ↓
HYPOTHESIS
"Discovery friction (not pricing, not delivery) causes low frequency"
                 ↓
PRODUCT SOLUTION: TOO MAAA ZOOO
Mood → Cuisine Affinity Map → Multi-Signal Scoring → Diversity Constraint
                 ↓
SQL Q5 (Design Constraint)
"Discount dependency predicts churn. Don't use discounts to drive frequency."
                 ↓
SQL Q6 (Feature: ETA Ranking)
"Late deliveries cut repeat rate by 19%. Weight eta_reliability at 15%."
                 ↓
SQL Q9 (Viability)
"₹61.1 contribution per order. Discount is the biggest controllable cost."
                 ↓
UNIT ECONOMICS MODEL
"Base case: +₹4.95B annual contribution at 5% frequency lift"
                 ↓
SQL Q10 (Validation Plan)
"Synthetic A/B shows +5.3% lift. Real test needs 50K users/arm, 6 weeks."
```

Every SQL query feeds a specific product decision. No query is there for show.

---

## Key Numbers to Know Cold

| Metric | Value | Source |
|--------|-------|--------|
| Sessions in dataset | 100,000 | Synthetic |
| Session-to-order rate | 17.3% | Q1 Funnel |
| vague_craving conversion | 14.1% | Q2 |
| reorder conversion | 20.7% | Q2 |
| Occasional users (% of base) | 35.6% | Q3 |
| TMZ candidate users | 1,103 (62% of Occasional) | Q8 |
| On-time repeat rate | 33.7% | Q6 |
| Late delivery repeat rate | 27.4% | Q6 |
| Avg contribution/order (data) | ₹61.1 | Q9 |
| Avg contribution/order (model) | ₹55 (conservative) | Unit Economics |
| Base case annual contribution | ₹4.95B | Business Impact |
| Experiment lift (synthetic) | +5.3% orders | Q10 |

---

> ⚠ **All data in this project is synthetic.** It was generated by `src/data_generation.py` using statistical distributions designed to produce realistic but entirely fictional patterns. No internal Zomato data was used.
