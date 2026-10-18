# Algorithm Documentation — Too Maaa Zooo Recommendation Engine

> Technical documentation for the multi-signal recommendation scoring system.

---

## 1. Architecture Overview

```
┌─────────────────────────────────┐
│         USER CONTEXT            │
│  (mood, budget, cuisine, diet,  │
│   ETA, distance, history)       │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│     CANDIDATE GENERATION        │
│  • Previous restaurants         │
│  • Preferred cuisines           │
│  • Nearby restaurants           │
│  • Highly rated restaurants     │
│  • Trending restaurants         │
│  • New restaurants              │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│       ELIGIBILITY FILTER        │
│  • Open / available             │
│  • Deliverable to location      │
│  • Within acceptable ETA        │
│  • Meets quality threshold      │
│  • Dietary compatibility        │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│     PERSONALIZED SCORING        │
│  7 scoring dimensions           │
│  (see Section 2)                │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│    BUSINESS CONSTRAINTS         │
│  • Diversity (cuisine, price)   │
│  • Exploration slots (10-15%)   │
│  • Exposure caps                │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│    FINAL RANKED RESULTS         │
│  Top 10 recommendations        │
│  with scores + explanations     │
└─────────────────────────────────┘
```

---

## 2. Scoring Dimensions

### 2.1 Score Function

```javascript
function calculateRecommendationScore(user, restaurant, context) {
  // Each dimension returns a score from 0-100
  const scores = {
    preference:      calcPreferenceScore(user, restaurant, context),
    quality:         calcQualityScore(restaurant),
    etaReliability:  calcETAScore(restaurant),
    priceFit:        calcPriceFitScore(user, restaurant, context),
    distance:        calcDistanceScore(restaurant, context),
    availability:    calcAvailabilityScore(restaurant),
    novelty:         calcNoveltyScore(user, restaurant)
  };

  // Weighted combination
  const weights = getWeights(context);
  const totalWeight = sum(Object.values(weights));
  
  const finalScore = sum(
    Object.keys(scores).map(k => scores[k] * weights[k])
  ) / totalWeight;

  return { scores, finalScore, weights };
}
```

### 2.2 Dimension Details

#### Preference Score (Default: 30%)
**Purpose:** How well does this restaurant match the user's personal taste?

**Signals:**
- Cuisine affinity: +30 if user's preferred cuisine matches
- Order history: +15 if user previously ordered from this restaurant
- Past ratings: +3 per star given to this restaurant
- Mood-cuisine map: +25 × affinity score (0-1) based on mood→cuisine mapping

**Normalization:** Capped at 0-100

#### Quality Score (Default: 20%)
**Purpose:** How good is this restaurant objectively?

**Calculation:**
```
quality = (rating / 5.0) × 100
```

**Rationale:** Simple, transparent. Rating is a well-understood signal. In production, this would incorporate review recency, photo quality, and menu completeness.

#### ETA Reliability Score (Default: 15%)
**Purpose:** How likely is the restaurant to deliver on time?

**Calculation:**
```
etaReliability = historical_on_time_rate × 100
```

**Rationale:** Delivery reliability is a key driver of repeat orders. A restaurant with 95% on-time rate scores 95.

#### Price Fit Score (Default: 15%)
**Purpose:** Does this restaurant fit the user's budget?

**Signals:**
- Budget alignment: 95 if within selected budget, decreasing with distance from budget
- AOV match: Penalty proportional to difference from user's typical order value
- Floor: 20 (never completely exclude)

#### Distance Score (Default: 10%)
**Purpose:** How close is this restaurant?

**Calculation:**
```
distance_score = 100 - (distance_km × 10)
```
With distance filter:
```
if within filter: 95 - (distance × 5)
else: max(10, 50 - (excess_distance × 15))
```

#### Availability Score (Default: 10%)
**Purpose:** Is the restaurant currently available?

**Calculation:**
```
availability = restaurant.available ? 95 : 10
```

**Rationale:** Binary with small buffer. Unavailable restaurants get near-zero score but aren't completely excluded in case of data lag.

#### Novelty Score (Default: 0%, activated for exploration)
**Purpose:** How new/unexplored is this restaurant for the user?

**Signals:**
- Not in order history: +85 (base for unexplored)
- In order history: 20 (base for familiar)
- New restaurant flag: +15
- Trending flag: +10

**Activation:**
- "Something New" discovery mode: novelty weight = 20%
- "Surprise Me" discovery mode: novelty weight = 30%
- "My Usuals": novelty weight = 0%, preference weight += 15%

---

## 3. Weight Configuration

### 3.1 Default Weights

| Dimension | Weight | Rationale |
|-----------|--------|-----------|
| Preference | 30% | Personal relevance is strongest satisfaction predictor |
| Quality | 20% | Protects against poor experiences |
| ETA Reliability | 15% | Delivery promise is key trust signal |
| Price Fit | 15% | Budget alignment prevents checkout abandonment |
| Distance | 10% | Proximity affects delivery time |
| Availability | 10% | Must be open to order |
| Novelty | 0% | Activated only in exploration modes |

### 3.2 Context-Adjusted Weights

The weights dynamically adjust based on context:

| Context | Adjustment |
|---------|-----------|
| "Something New" mode | Novelty → 20%, Preference → 20% |
| "My Usuals" mode | Preference → 45%, Novelty → 0% |
| "Surprise Me" mode | Novelty → 30%, Preference → 10% |
| "Quick & Filling" mood | ETA Reliability → 25% |
| User with high price sensitivity | Price Fit → 25% |

### 3.3 Weight Validation Approach

In production, weights would be validated through:
1. **Multi-arm bandit testing** — different weight configurations
2. **Supervised learning** — predict successful orders from restaurant features, compare learned weights
3. **Counterfactual analysis** — what would users have ordered without TMZ?

---

## 4. Diversity Constraints

### 4.1 Cuisine Diversity
- Maximum 2 restaurants of the same cuisine in top 5
- Maximum 3 of the same cuisine in top 10

### 4.2 Price Segment Diversity
- Top 5 must include at least 2 different price segments

### 4.3 Exploration Slots
- 10-15% of recommendation slots reserved for:
  - New restaurants (< 30 days old)
  - Restaurants with low exposure but high quality
  - Cuisines the user hasn't tried

### 4.4 Implementation
```javascript
function applyDiversityConstraints(ranked) {
  const result = [ranked[0]]; // Always keep #1
  const cuisineCounts = { [ranked[0].cuisine]: 1 };
  
  for (let i = 1; i < ranked.length && result.length < 10; i++) {
    const r = ranked[i];
    const count = cuisineCounts[r.cuisine] || 0;
    
    // In top 5: max 2 same cuisine
    if (result.length < 5 && count >= 2) continue;
    // In top 10: max 3 same cuisine
    if (count >= 3) continue;
    
    cuisineCounts[r.cuisine] = count + 1;
    result.push(r);
  }
  
  return result;
}
```

---

## 5. Fairness Considerations

### 5.1 Popularity Bias
**Problem:** Highly-ordered restaurants get more data → better scores → more orders (feedback loop)
**Mitigation:** Exposure caps, exploration slots, monitor HHI

### 5.2 Sponsored Content
**Problem:** Paid placements may dilute recommendation quality
**Mitigation:** In V1, no sponsored TMZ slots. If added later, clearly label and maintain quality threshold.

### 5.3 New Restaurant Cold Start
**Problem:** New restaurants lack data for scoring
**Mitigation:** Use quality signals (rating, cuisine, location), guarantee exploration exposure

### 5.4 Feedback Loops
**Problem:** Algorithm recommendations → user behavior → training data → algorithm (self-reinforcing)
**Mitigation:** Monitor exposure vs conversion by restaurant. Inject randomness. Track long-term diversity metrics.

---

## 6. Explainability

Every recommendation generates human-readable reasons by checking:

| Condition | Explanation |
|-----------|-------------|
| Cuisine matches preference | "You frequently order [cuisine] food" |
| AOV within ₹100 of user average | "Your typical order is ₹[X]. This fits at ₹[Y]" |
| ETA reliability ≥ 85% | "Delivers on time [X]% of the time" |
| Rating ≥ 4.2 | "Highly rated at [X]★ from [Y] reviews" |
| Within budget | "Fits your [budget range] budget" |
| Trending | "Currently trending in your area" |
| Previously ordered | "You've ordered here before and rated it well" |
| Close distance | "Very close at [X] km" |

All explanations generated from synthetic user profile data, not real Zomato data.

---

## 7. Performance Considerations (Production)

| Concern | Approach |
|---------|----------|
| Latency | Pre-compute scores for active users, cache top candidates |
| Scale | Distributed scoring service, batch + real-time |
| Freshness | Restaurant availability updates every 5 min |
| Model updates | Weekly weight retraining, daily feature updates |
| A/B testing | Feature flags per weight configuration |

---

*This algorithm documentation is part of a portfolio case study. The implementation is a simplified prototype.*
