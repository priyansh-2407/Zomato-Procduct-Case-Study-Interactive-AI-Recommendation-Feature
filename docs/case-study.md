# Case Study: Increasing Profitable Order Frequency at Zomato

> **"How can Zomato increase profitable food-order frequency among existing users without becoming overly dependent on discounts?"**

---

## Executive Summary

Zomato (Eternal Limited) serves 22.9M monthly transacting users with ₹10,769 Cr quarterly food delivery GOV (Q1 FY26). Despite strong market leadership (~56-57% share), per-user order frequency remains a key growth lever as the business matures.

This case study identifies **discovery friction and choice overload** as the highest-priority problem preventing higher order frequency among the "Occasional Users" segment (36% of base, 1.8 orders/month, ₹55 contribution/order). The proposed solution — **Too Maaa Zooo** — is an intent-based food discovery experience that converts vague food cravings into personalized restaurant recommendations.

**Key Numbers (Illustrative Scenario Estimate):**
- Target segment: 5M occasional users
- Frequency lift: +0.2 orders/user/month
- Cannibalization adjustment: 25%
- Net incremental orders: 750K/month
- Annual contribution impact: ~₹50 Cr

---

## 1. Context

### 1.1 Company Overview
Eternal Limited (formerly Zomato) is India's leading food-tech company. In FY25, consolidated revenue reached ₹20,243 Cr with ₹527 Cr PAT — the company's first profitable year. The business now operates three segments:
- **Food Delivery** — The core marketplace connecting restaurants, delivery partners, and consumers
- **Quick Commerce (Blinkit)** — Grocery/essentials delivery
- **Going Out (District)** — Dining, events, experiences

### 1.2 Business Performance (Q1 FY26)
- Food Delivery GOV: ₹10,769 Cr (+21% YoY)
- Revenue: ₹2,657 Cr (+16% YoY)
- Adjusted EBITDA margin: 5.0% of NOV
- Monthly Transacting Users: 22.9M

### 1.3 Strategic Context
- Food delivery growth moderating while Blinkit accelerates
- Investor focus shifting decisively toward profitability
- ONDC emerging as competitive threat with lower commission rates
- Zomato Gold driving subscription revenue and user lock-in

---

## 2. Problem Discovery

### 2.1 The Core Question
Why don't Zomato's existing users order more frequently?

### 2.2 Hypothesis Tree
I explored 9 hypotheses across 4 categories:

**Demand-Side:**
1. ✅ **Discovery friction & choice overload** — High confidence
2. ✅ Price perception — Medium-high confidence
3. ⬜ Habituation to specific restaurants — Medium confidence

**Supply-Side:**
4. ⬜ Inconsistent quality experience — Medium confidence
5. ⬜ Delivery unreliability — Medium confidence

**Product/UX:**
6. ✅ **Poor personalization** — High confidence
7. ⬜ Checkout friction — Low-medium confidence

**Market/External:**
8. ⬜ Competition from cooking/alternatives — Medium confidence
9. ⬜ Macroeconomic constraints — Low confidence

### 2.3 Why Discovery Friction?

Evidence supporting this hypothesis:
- **Public observation:** Zomato lists 300K+ restaurants; most cities show 50-100+ options
- **Behavioral research:** Choice overload literature shows >7-10 options increase decision fatigue and abandonment
- **Product observation:** ~60%+ sessions likely begin without a specific restaurant in mind (based on general food delivery industry research)
- **Funnel analysis:** The largest conversion drop-offs occur in the discovery phase (app open → restaurant selection)

---

## 3. Data Analysis

### 3.1 Methodology
Synthetic datasets generated for analysis:
- 5,000+ users across 6 behavioral segments
- 50,000+ orders with full economic attributes
- 500+ restaurants with quality, delivery, and pricing data
- 100,000+ sessions with funnel events

> ⚠️ All data is synthetic — created for portfolio analysis, not from Zomato's internal systems.

### 3.2 Funnel Analysis
From 100K app opens:
| Stage | Users | % | Drop-off |
|-------|-------|---|----------|
| App Open | 100K | 100% | — |
| Discovery | 78K | 78% | -22% |
| Restaurant View | 52K | 52% | -26pp |
| Menu View | 38K | 38% | -14pp |
| Cart Created | 28K | 28% | -10pp |
| Checkout | 22K | 22% | -6pp |
| Order Placed | 18K | 18% | -4pp |
| Successful Order | 15K | 15% | -3pp |

**Key Insight:** Discovery (78% → 52%) and menu exploration (52% → 38%) represent the largest drops. These are product-addressable friction points.

### 3.3 User Segmentation
| Segment | % Base | Orders/Mo | AOV | Contribution/Order | 30d Retention |
|---------|--------|-----------|-----|-------------------|---------------|
| Heavy Users | 10% | 6.2 | ₹420 | ₹68 | 92% |
| **Occasional Users** | **36%** | **1.8** | **₹380** | **₹55** | **58%** |
| Discount-Driven | 16% | 2.8 | ₹310 | ₹18 | 45% |
| Premium Users | 8% | 4.5 | ₹650 | ₹95 | 85% |
| Churn Risk | 18% | 0.4 | ₹340 | ₹38 | 18% |
| New Users | 12% | 1.2 | ₹350 | ₹28 | 42% |

### 3.4 Key Data Insights
1. **Orders rated 4.5+ have ~2x repeat probability vs orders rated below 3.5.** Quality drives retention.
2. **High discount-dependency correlates with lower 30-day retention.** Users trained on discounts leave when discounts stop.
3. **The "Occasional" segment has the widest frequency distribution** — some order 1x/month, some 3x/month. There's headroom.

---

## 4. Problem Prioritization

### 4.1 RICE Framework
| Problem | Reach | Impact | Confidence | Effort | Strategic | RICE |
|---------|-------|--------|-----------|--------|-----------|------|
| **Discovery friction** | **9** | **8** | **7** | **7** | **9** | **396** |
| Price perception | 7 | 7 | 6 | 5 | 6 | 176 |
| Delivery reliability | 8 | 6 | 8 | 4 | 5 | 192 |
| Restaurant quality | 6 | 7 | 7 | 5 | 6 | 176 |
| Checkout friction | 5 | 4 | 8 | 8 | 4 | 128 |
| Habituation | 6 | 5 | 5 | 6 | 5 | 90 |
| Competition | 4 | 5 | 4 | 3 | 7 | 56 |

### 4.2 Why This Problem × This Segment × Now?
- **Problem:** Discovery friction affects 78% of sessions and is product-solvable
- **Segment:** Occasional users (36% of base) have proven platform value and frequency headroom
- **Now:** Profitability focus demands frequency growth without discount dependency

---

## 5. Solution: Too Maaa Zooo

### 5.1 Core Concept
> "You don't need to know what you want. We do."

Too Maaa Zooo converts vague food intent into a small set of personalized, context-aware restaurant recommendations.

### 5.2 User Flow
1. User selects a mood/intent (11 options)
2. Optionally fine-tunes with budget, cuisine, ETA, diet, distance
3. Recommendation engine generates personalized results
4. Each result explains WHY it was recommended
5. User feedback improves future recommendations

### 5.3 Recommendation Algorithm
7-dimension weighted scoring:
- Personal Preference (30%) — Cuisine affinity, order history, mood match
- Restaurant Quality (20%) — Rating, review count
- ETA Reliability (15%) — Historical on-time delivery rate
- Price Fit (15%) — Budget alignment, AOV match
- Distance (10%) — Physical proximity
- Availability (10%) — Currently open
- Novelty (0-20%) — For exploration modes

### 5.4 Diversity Constraints
- Top 5 cannot all be same cuisine or price segment
- 10-15% slots reserved for new/underrepresented restaurants
- Exposure caps to prevent popularity bias

### 5.5 Edge Cases
- **New user:** Location + time + popular restaurants + stated preferences
- **New restaurant:** Quality signals + cuisine match + exploration slots
- **No preference:** Contextual signals (time, location, trending)
- **Wants novelty:** Increase novelty weight, suppress frequently ordered

---

## 6. Experiment Design

### 6.1 Setup
- **Control:** Current Zomato discovery (50%)
- **Treatment:** Current + Too Maaa Zooo (50%)
- **Primary metric:** Incremental successful orders/user/month
- **Sample:** 50K users per arm
- **Duration:** 4-6 weeks
- **MDE:** 3-5% relative lift

### 6.2 Guardrails
Cancellation rate, refund rate, late delivery rate, restaurant concentration (HHI)

### 6.3 Decision Rules
- Ship if: Primary metric significant positive + guardrails pass
- Iterate if: Positive but not significant (extend 2 weeks)
- Kill if: Significant negative or engagement <5%

---

## 7. Unit Economics

### 7.1 Per-Order (Illustrative)
- Revenue/order: ~₹139 (commission ₹84 + delivery ₹35 + platform ₹15 + ads ₹5)
- Cost/order: ~₹106 (delivery ₹45 + payment ₹8 + discount ₹40 + refund ₹5 + support ₹3 + rest. incentive ₹5)
- **Contribution/order: ~₹33** (varies by segment: ₹18-95)

### 7.2 Business Impact (Scenario Estimate)

| Scenario | Eligible | Freq Lift | Cannibal. | Net Orders/Mo | Annual Contribution |
|----------|----------|-----------|-----------|---------------|-------------------|
| Conservative | 3M | +0.1 | 35% | 195K | ~₹12 Cr |
| **Base** | **5M** | **+0.2** | **25%** | **750K** | **~₹50 Cr** |
| Upside | 8M | +0.3 | 15% | 2.04M | ~₹110 Cr |

> ⚠️ All figures are illustrative scenario estimates.

---

## 8. Roadmap

| Phase | Duration | Focus |
|-------|----------|-------|
| P0: Instrumentation | 2-3 weeks | Event logging, funnel tracking |
| P1: Rule-based MVP | 4-6 weeks | Intent cards + basic filtering |
| P2: Personalized | 6-8 weeks | Weighted scoring, order history |
| P3: Context-aware | 6-8 weeks | Time, weather, occasion signals |
| P4: Real-time | 8-10 weeks | Live availability, dynamic ETA |
| P5: Predictive | 10-12 weeks | Pre-session craving prediction |

---

## 9. Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Low user engagement | Medium | High | Iterate UI, adjust prominence |
| Cannibalization >50% | Medium | High | Compare total orders, not just TMZ-attributed |
| Restaurant concentration | Low | Medium | Diversity constraints, HHI monitoring |
| Poor recommendation quality | Medium | Medium | A/B test, quality guardrails, user feedback |
| Novelty effect decay | Medium | Low | Monitor retention over 8+ weeks |
| Privacy concerns | Low | Medium | Transparent data usage, opt-out |

---

## 10. What I'd Do With Internal Data

If I joined Zomato as a PM, I would request:

1. **Search query intent classification** — What % of sessions start with vague intent?
2. **Session-level conversion by intent clarity** — Do vague-intent sessions convert less?
3. **Recommendation exposure logs** — Current recommendation CTR baseline
4. **Customer-level contribution margin** — Validate segment-level unit economics
5. **A/B test history** — Past discovery feature tests and results
6. **Restaurant churn data** — Impact of recommendation exposure on restaurant retention
7. **Cross-vertical behavior** — Blinkit/food delivery correlation patterns

---

## 11. Key Takeaways

1. **The problem isn't restaurant supply** — it's decision support for users with vague intent
2. **Frequency growth >> user acquisition** for a mature marketplace
3. **Personalization should reduce decision time**, not just increase engagement
4. **Algorithm fairness is a business requirement**, not just an ethical one
5. **Cannibalization must be measured and discounted** — not all TMZ orders are incremental
6. **Data integrity is non-negotiable** — clearly label every data source

---

*This case study was created for PM campus recruitment preparation. It uses publicly available data, industry research, and clearly labeled synthetic data. It is not affiliated with Zomato/Eternal Limited.*
