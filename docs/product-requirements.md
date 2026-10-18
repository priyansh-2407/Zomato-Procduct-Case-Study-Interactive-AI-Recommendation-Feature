# Product Requirements Document — Too Maaa Zooo

> Version 1.0 | September 2026
> Status: Concept / Portfolio Case Study

---

## 1. Overview

### 1.1 Product Name
**Too Maaa Zooo**

### 1.2 Core Promise
> "Tell us what you're craving. We'll figure out what you should eat."

### 1.3 Alternative Positioning
> "You don't need to know what you want. We do."

### 1.4 Problem Statement
Users often open Zomato without knowing what they want to order. With 300,000+ restaurant partners, the paradox of choice creates discovery friction and decision fatigue — leading to session abandonment, suboptimal orders, or discount-dependent ordering behavior.

### 1.5 Business Objective
Increase profitable food-order frequency among existing users (specifically the "Occasional" segment) without becoming overly dependent on discounts.

### 1.6 Success Metric (North Star)
**Successful food orders per monthly transacting customer**

---

## 2. Target User

### 2.1 Primary Segment: Occasional Users
- **Size:** ~36% of user base
- **Behavior:** 1.8 orders/month, ₹380 AOV
- **Price Sensitivity:** Medium
- **Contribution/Order:** ₹55 (illustrative)
- **Key Characteristic:** Proven platform engagement with headroom for frequency growth

### 2.2 User Persona

**Priya, 28, Marketing Manager, Bangalore**
- Orders food delivery 4-5 times a month
- Usually opens Zomato around 7:30 PM after work
- Scrolls through 10-15 restaurants before deciding
- Often ends up ordering from the same 3 restaurants
- Wants to try new things but gets overwhelmed by options
- Budget: ₹300-500 per order
- Not discount-dependent but appreciates good deals

---

## 3. User Journey

```
Open Zomato
    ↓
Too Maaa Zooo (entry point on home screen)
    ↓
"What are you feeling?" — Select mood/intent
    ↓
Fine-tune constraints (optional)
    ↓
Receive personalized recommendations
    ↓
Understand WHY each restaurant was recommended
    ↓
Order from recommended restaurant
    ↓
Rate experience
    ↓
Feedback improves future recommendations
```

---

## 4. Feature Specification

### 4.1 Entry Point
- Prominent card/widget on Zomato home screen
- Below the search bar, above restaurant listings
- Visual treatment: Playful but premium, consistent with TMZ branding
- Copy: "Not sure what to eat?" → Tap to launch TMZ

### 4.2 Intent Capture (Step 1)

**Mood / Intent Selection** — 11 options:

| Mood | Icon | Description | Cuisine Affinity |
|------|------|-------------|-----------------|
| Comfort Food | 🍲 | Warm, familiar, satisfying | North Indian, Biryani, Chinese |
| Healthy | 🥗 | Light, nutritious, clean | Healthy Bowls, Cafe, Japanese |
| Spicy | 🌶️ | Kick of heat | Korean, Thai, Mexican, Chinese |
| Quick & Filling | ⚡ | Fast, no-fuss meal | Burgers, Wraps, Pizza, Street Food |
| Something Light | 🍃 | Snack or small meal | Cafe, Healthy Bowls, Bakery |
| Late Night | 🌙 | Midnight cravings | Pizza, Burgers, Chinese, Biryani |
| For Sharing | 👥 | Group-friendly meals | Pizza, Chinese, North Indian |
| Treat Yourself | ✨ | Something special | Italian, Japanese, Continental |
| Something New | 🆕 | Explore unfamiliar options | Japanese, Korean, Thai, Mexican |
| My Usuals | 🔁 | What I always order | Based on order history |
| Trending Nearby | 🔥 | Popular right now | Based on local trends |

### 4.3 Constraint Setting (Step 2 — Optional)

| Constraint | Options |
|-----------|---------|
| Budget | Under ₹200 · ₹200–300 · ₹300–500 · ₹500–800 · ₹800+ |
| Cuisine | North Indian · South Indian · Chinese · Italian · Japanese · Mexican · Burgers · Pizza · Biryani · Desserts · Any |
| Max ETA | <20 min · <30 min · <45 min |
| Dietary | Vegetarian · Non-vegetarian · Egg · Vegan · No preference |
| Distance | <2 km · <5 km · <8 km |
| Discovery Mode | My usuals · Something new · Surprise me |

### 4.4 Recommendation Results (Step 3)

**Top Pick** — Visually dominant card:
- Restaurant name, cuisine, rating
- ETA, distance, price indicator
- Recommendation score (0-100)
- "Why this recommendation?" expandable
- Popular dishes (3-4 items)
- "Order Now" primary CTA

**Additional Results** — 5-9 more restaurants:
- Standard cards with same information
- Horizontally scrollable or vertical list

### 4.5 Explainability — "Why This?"
Every recommendation includes expandable reasons:
- "You frequently order [cuisine] food"
- "Your typical order value is ₹[X]. This restaurant fits at ₹[Y]"
- "This restaurant usually delivers on time ([X]% reliability)"
- "Highly rated at [X]★ from [Y] reviews"
- "This restaurant fits your [budget range] budget"

### 4.6 Algorithm Toggle — "Show Algorithm"
Optional toggle reveals score breakdown:
- Preference: XX/100
- Quality: XX/100
- ETA Reliability: XX/100
- Price Fit: XX/100
- Distance: XX/100
- Availability: XX/100
- Final Score: XX.X

---

## 5. Recommendation Algorithm

### 5.1 Architecture

```
USER CONTEXT (mood, constraints, history)
    ↓
CANDIDATE GENERATION (cuisine match, location, availability)
    ↓
ELIGIBILITY FILTER (open, deliverable, quality threshold)
    ↓
PERSONALIZATION (7-dimension scoring)
    ↓
BUSINESS CONSTRAINTS (diversity, exploration)
    ↓
FINAL RANKED RECOMMENDATIONS
```

### 5.2 Scoring Dimensions

| Dimension | Weight | Signal Source |
|-----------|--------|-------------|
| Personal Preference | 30% | Cuisine affinity, order history, mood-cuisine map |
| Restaurant Quality | 20% | Rating, review count |
| ETA Reliability | 15% | Historical on-time delivery rate |
| Price Fit | 15% | Budget alignment, AOV match |
| Distance | 10% | Physical proximity |
| Availability | 10% | Currently open and accepting orders |
| Novelty | 0-20%* | New restaurants, unexplored cuisines |

*Novelty weight activated when user selects "Something New" or "Surprise me"

### 5.3 Diversity Constraints
- Top 5 cannot all be same cuisine
- Top 5 cannot all be same price segment
- 10-15% of slots reserved for new/underrepresented restaurants
- Exposure cap per restaurant per day

---

## 6. Edge Cases

| Scenario | Handling |
|----------|----------|
| New user (no history) | Location + time + popular restaurants + stated preferences |
| New restaurant (no orders) | Quality signals + cuisine match + exploration slots |
| No preference selected | Contextual recommendations (time, location, trending) |
| "Something New" mode | Increase novelty weight, suppress frequently ordered |
| Low-price-only user | Increase price affinity, don't force premium options |
| Post-bad-delivery | Reduce weight for restaurants with similar reliability issues |
| No results match filters | Gracefully expand filters with explanation |

---

## 7. Metrics

### 7.1 Primary
- Incremental successful orders per eligible user per month

### 7.2 Secondary
- Recommendation CTR
- Restaurant view rate from TMZ
- Menu view rate
- Cart conversion rate
- Checkout conversion rate
- Order frequency (30-day)
- 30-day retention

### 7.3 Business
- Contribution per user per month
- Contribution per order
- Discount per order

### 7.4 Guardrails
- Cancellation rate
- Refund rate
- Late delivery rate
- Customer complaint rate
- Restaurant concentration (HHI)

---

## 8. Non-Goals (V1)

- Real-time delivery partner matching
- Predictive food intent (pre-session)
- Group ordering features
- Social recommendations ("friends ordered")
- Restaurant-side TMZ dashboard
- Monetization through sponsored TMZ slots

---

## 9. Dependencies

| Dependency | Owner | Status |
|-----------|-------|--------|
| Restaurant availability API | Platform team | Existing |
| User order history service | Data team | Existing |
| Location service | Platform team | Existing |
| Recommendation scoring service | ML team | New (TMZ) |
| Event logging updates | Analytics team | New (TMZ) |

---

## 10. Risks

See [Risk Analysis](../docs/sources.md) for full risk matrix with probability, impact, and mitigation strategies.

---

## 11. Launch Plan

| Phase | Duration | Scope |
|-------|----------|-------|
| P0: Instrumentation | 2-3 weeks | Event logging, funnel tracking |
| P1: Rule-based MVP | 4-6 weeks | Intent cards + basic filtering |
| P2: Personalized | 6-8 weeks | Weighted scoring, order history |
| P3: Context-aware | 6-8 weeks | Time, weather, occasion signals |
| P4: Real-time | 8-10 weeks | Live availability, dynamic ETA |
| P5: Predictive | 10-12 weeks | Pre-session craving prediction |

---

*This PRD is part of a portfolio case study and does not represent an actual Zomato product plan.*
