# Interview Questions & Answers — Too Maaa Zooo

> 30+ likely interview questions with concise, strong answers.
> Prepared for PM campus recruitment at Zomato / Eternal.

---

## Strategic & Business Questions

### 1. Why Zomato?

Zomato/Eternal operates at the intersection of consumer behavior, logistics, and marketplace economics. Food delivery has achieved product-market fit but now faces the harder challenge of profitable growth — the shift from "acquiring users" to "increasing value per user." With 22.9M monthly transacting users and 300K+ restaurants, even small improvements create massive business impact. The rebranding to Eternal and multi-vertical expansion (Blinkit, District) makes this an exciting time to think about core food delivery optimization.

### 2. Why order frequency as the key lever?

Order frequency has the highest combination of business impact and product solvability:
- **Acquiring new users** costs ₹200-300 CAC — expensive with diminishing returns
- **Increasing AOV** often means raising prices — consumer backlash risk
- **Increasing frequency** grows GMV without proportional CAC spend
- For 22.9M MTU, even +0.1 orders/user/month = 2.29M incremental orders/month

### 3. Why not GMV instead of frequency?

GMV can grow through price inflation or AOV manipulation, neither of which creates genuine user value. Frequency better captures whether we're solving a real user need. I use contribution per user as a guardrail to ensure frequency growth is profitable, not discount-driven.

### 4. Why discovery friction over delivery reliability?

Both matter, but:
- Delivery reliability is primarily an **operations/logistics** problem, requiring heavy infrastructure investment
- Discovery friction is a **product** problem, directly solvable through UX and algorithm changes
- The insight that 60%+ sessions begin without clear intent suggests a large conversion opportunity
- Delivery reliability improvements have **diminishing returns** once you reach 90%+ on-time

### 5. Why target occasional users specifically?

They're the "movable middle" — 36% of users with 1.8 orders/month:
- **Heavy users** (6.2/month): Little frequency headroom
- **Discount-driven**: Poor unit economics (₹18 contribution/order)
- **Churn-risk**: Need reactivation, not frequency features
- **Occasional users**: Proven platform value, ₹380 AOV, ₹55 contribution/order, moderate price sensitivity

### 6. Why now?

- Food delivery growth is moderating while Blinkit scales
- Investor focus shifting to profitability → frequency growth without discounts is strategically critical
- Zomato already investing in AI/personalization (Gold features) → TMZ extends this to all users
- Competition from ONDC forcing value differentiation beyond price

---

## Product Questions

### 7. Why "Too Maaa Zooo"? Why this name?

The name captures the universal moment of "I want to eat but I don't know what." It sounds like a natural expression of vague food intent — playful but memorable. The branding is conversational because the product translates an informal, fuzzy craving into a concrete recommendation. Playfulness ≠ childishness; the underlying system is sophisticated.

### 8. How does the product work?

1. User selects a mood/intent (11 options: Comfort Food, Healthy, Spicy, etc.)
2. Optionally fine-tunes with budget, cuisine, ETA, diet, distance
3. Recommendation engine generates personalized, ranked results
4. Each result explains WHY it was recommended
5. User feedback improves future recommendations

### 9. What would you build first?

**Phase 0: Instrumentation** (2-3 weeks) — Without proper event logging, we can't measure anything.
Then **Phase 1: Rule-based MVP** (4-6 weeks) — Simple intent cards + basic filtering. This validates the core hypothesis before investing in ML.

### 10. What would you remove if forced to cut scope?

Remove: "Surprise me" mode, algorithm explainability toggle, simplify to 3 budget tiers.
Keep: Mood → filters → personalized results (core loop), "Why this?" explanation (builds trust).

### 11. How would restaurants react?

Positively, if it drives orders. Key concern is fairness. Mitigation:
- Transparent ranking criteria
- Restaurant dashboard showing recommendation exposure
- Diversity constraints preventing systematic disadvantage
- New restaurant promotion slots (10-15% reserved)

---

## Algorithm Questions

### 12. How does the recommendation algorithm work?

Multi-stage pipeline:
1. **Candidate generation** — filter by cuisine affinity, location, availability
2. **Eligibility filtering** — open, deliverable, quality threshold
3. **Personalized scoring** — 7 dimensions (preference 30%, quality 20%, ETA reliability 15%, price fit 15%, distance 10%, availability 10%, novelty if applicable)
4. **Diversity constraints** — prevent cuisine/price/chain concentration
5. **Final ranking** — weighted combination → transparent score

### 13. Why these specific weights?

They reflect a hypothesis about what drives **successful orders** (not just clicks):
- **Preference (30%)**: Personal relevance is the strongest predictor of satisfaction
- **Quality (20%)**: Protects against poor experiences
- **ETA Reliability (15%)**: Delivery promise is a key trust signal
- These are starting weights — I would validate through A/B testing

### 14. How would you validate the weights?

- Multi-arm bandit testing with different weight configurations
- Measure **conversion-to-order**, not just CTR
- Build supervised model predicting successful orders from restaurant features
- Compare model's learned feature importance against hand-tuned weights

### 15. How do you solve the cold start problem?

**New users:** Location + time-of-day + popular restaurants + stated preferences during onboarding.
**New restaurants:** Quality signals (rating, prep time, cuisine) + exploration slots with guaranteed exposure.

### 16. How do you avoid popularity bias?

Three mechanisms:
1. **Exposure caps** — no restaurant gets >X% of total impressions
2. **Diversity constraints** — top 5 can't all be same cuisine/chain/price
3. **Exploration slots** — reserved positions for new/underrepresented restaurants
Plus HHI monitoring as a guardrail metric.

### 17. How do you handle conflicting preferences?

When "Healthy" mood + "Under ₹200" budget has limited overlap, the algorithm finds the best available match through weighted scoring. We show WHY results might differ: "We found the best healthy options in your budget range." Transparency prevents frustration.

---

## Data & Analytics Questions

### 18. What if recommendations increase clicks but not orders?

This means recommendations are "interesting but not actionable." I'd analyze the drop-off point (restaurant view → menu → cart → checkout). Possible causes: too novel, wrong price point, or menu doesn't match expectation. This is exactly why our primary metric is **orders**, not CTR.

### 19. What if orders increase but contribution falls?

We're buying orders with company money (discounts). Check discount-per-order in treatment vs control. May add a minimum contribution floor to recommendations. **Contribution per order is an explicit guardrail metric.**

### 20. How do you measure cannibalization?

Two approaches:
1. In A/B test: measure **total orders** per user (not just TMZ-attributed). Difference vs control = true incremental lift.
2. Analyze whether TMZ orders replace orders from existing discovery paths (direct search, reorder).

### 21. How do you calculate LTV?

`LTV = Contribution/order × Orders/month × Expected lifetime (months)`

Using contribution (not revenue) because it reflects actual economic value after variable costs. Discount future contributions to present value.

### 22. How do you calculate CAC payback?

`Payback (months) = CAC / (Contribution/order × Orders/month)`

Illustrative: ₹250 / (₹55 × 2.0) = ~2.3 months. Very healthy — most consumer businesses target <12 months.

---

## Experimentation Questions

### 23. How would you design the A/B test?

- **Randomization:** User-level (not session, to capture frequency effects)
- **Split:** 50/50
- **Sample:** Min 50K users per arm
- **Primary metric:** Incremental successful orders/user/month (MDE: 3-5%)
- **Duration:** 4-6 weeks
- **Guardrails:** Cancellation, refund, late delivery, restaurant concentration

### 24. How would you choose MDE?

MDE = business impact threshold. 3% lift × 1.8 orders/month × 5M users = 270K incremental orders/month × ₹55 = ₹14.85 Cr/month. Engineering cost is ₹2-3 Cr. ROI clears easily → 3-5% MDE is reasonable.

### 25. What if the experiment fails?

Understand WHY:
- **Low engagement** with TMZ → iterate on UI/UX
- **High engagement, no conversion** lift → improve algorithm
- **High cannibalization** → rethink value proposition

An experiment that generates clear learning is never a failure.

---

## Competitive & Strategic Questions

### 26. How does this compare with Swiggy?

Swiggy has discovery features but no explicit intent-based entry point. TMZ's differentiation: explicit intent capture (mood + constraints) generates stronger signals than passive browsing. If TMZ works, Swiggy would likely copy → speed of execution matters.

### 27. How could Zomato monetize TMZ?

1. **Premium placement** for restaurants (labeled as sponsored)
2. **Gold-exclusive** in Phase 1 → drive subscriptions
3. **Brand partnerships** (e.g., "Comfort Food" mood sponsored by a brand)
4. **Long-term:** Reduced discount dependency = monetization through frequency

### 28. What data would you need that you don't have?

Most critically:
- **Search query intent classification** — what % of sessions start with vague intent?
- **Recommendation exposure logs** — current baseline CTR
- **Customer-level contribution margin** — validate unit economics

### 29. What would you do in your first 30 days as PM?

- **Week 1-2:** Deep-dive into discovery funnel. Shadow support calls. Interview 10-15 users.
- **Week 2-3:** Build data dashboard on discovery-to-order conversion, segment by intent.
- **Week 3-4:** Write opportunity one-pager with sizing. Get alignment from eng & design.
- **Day 30:** Present scoped MVP proposal with clear success metrics.

### 30. What metrics would make you kill TMZ?

Kill signals:
1. TMZ engagement <5% of eligible sessions after 4 weeks
2. Negative impact on overall order frequency in treatment group
3. Significant increase in cancellation or refund rates
4. Restaurant concentration HHI increasing >20%

---

## Additional Questions

### 31. How do you prevent over-personalization?

Diversity constraints + exploration slots + monitoring cuisine variety per user. If a user only sees North Indian restaurants, we inject exploration. Long-term: measure "discovery breadth" as a product health metric.

### 32. What about restaurant partner dissatisfaction?

Transparent criteria, dashboard for restaurants to see their recommendation exposure, fair rotation policies, and dedicated new restaurant promotion slots. Treat restaurants as a key stakeholder, not just supply.

### 33. How would you think about TMZ on different platforms (web vs app)?

App-first because:
- Higher engagement signals (location, time, order history)
- Push notification integration for re-engagement
- Better touch interaction for mood selection
Web can be a simplified version for discovery, with full experience on app.

---

## Resume Bullets

### A. Product-Heavy Version
- Identified "vague food intent" as a key driver of low order frequency through systematic product teardown of 17 user journey stages, customer journey analysis, and hypothesis-driven problem prioritization using RICE framework
- Designed Too Maaa Zooo, an intent-based food discovery product concept converting mood/context signals into personalized restaurant recommendations, with complete PRD, user flows, and edge case analysis
- Built a full A/B experiment design with user-level randomization, 3-5% MDE, guardrail metrics (cancellation, refund, restaurant concentration), and statistical power analysis for a 50K+ user test
- Developed 6-phase product roadmap from instrumentation through predictive food intent, with clear success metrics, dependencies, and engineering requirements

### B. Analytics-Heavy Version
- Built a synthetic 50K-order behavioral dataset with realistic correlations (ETA reliability → repeat probability, price sensitivity → discount dependency) across 5,000 users and 500 restaurants
- Performed cohort retention analysis, funnel analysis (15% session-to-order conversion), and user segmentation identifying "occasional users" (36% of base, 1.8 orders/month) as the highest-ROI target segment
- Created interactive unit economics model calculating per-order contribution (₹55 illustrative), LTV/CAC analysis (7.1x), and business impact scenarios with cannibalization modeling (25-35%)
- Developed a weighted multi-signal recommendation engine with 7 scoring dimensions, diversity constraints, and an interactive algorithm playground allowing real-time weight modification and comparison

### C. Balanced PM Version
- Led end-to-end PM case study for Zomato food delivery: identified discovery friction as the top-priority problem through data-driven hypothesis testing and RICE prioritization across 7 problem areas
- Designed and prototyped Too Maaa Zooo — an intent-based food recommendation engine with 7-dimension weighted scoring, diversity constraints, cold-start handling, and transparent algorithm explainability
- Built interactive unit economics model with cannibalization analysis, projecting ₹36-100 Cr annualized incremental contribution across three scenarios — clearly labeled as illustrative estimates
- Created a complete interactive case study website with 13+ sections, recommendation simulator, algorithm playground, A/B test design, and 30+ interview Q&A
