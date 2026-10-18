# A/B Experiment Design — Too Maaa Zooo

> Complete experiment design document for validating the Too Maaa Zooo hypothesis.

---

## 1. Hypothesis

**Product Hypothesis:** Adding an intent-based food discovery experience (Too Maaa Zooo) to Zomato's home screen will increase the number of successful food orders per eligible user per month, without negatively impacting contribution per order or delivery quality.

**Null Hypothesis (H₀):** TMZ has no effect on order frequency — treatment group orders at the same rate as control.

**Alternative Hypothesis (H₁):** TMZ increases order frequency — treatment group orders at a higher rate than control.

---

## 2. Experiment Setup

### 2.1 Groups

| Group | Experience | Allocation |
|-------|-----------|-----------|
| **Control** | Current Zomato discovery experience | 50% |
| **Treatment** | Current discovery + Too Maaa Zooo entry point on home screen | 50% |

### 2.2 Key Design Decisions

| Parameter | Decision | Rationale |
|-----------|----------|-----------|
| Randomization Unit | **User-level** | Must be user-level (not session) to capture frequency effects over time |
| Allocation | **50/50 split** | Maximizes statistical power for given sample size |
| Minimum Sample | **50,000 users per arm** | Required for 3-5% MDE at 80% power, 95% confidence |
| Duration | **4-6 weeks** | Captures full ordering cycles; avoids seasonality bias in short runs |
| Eligibility | Users with ≥1 order in last 90 days | Focus on active users with ordering behavior |
| Exclusions | New users (<7 days), users in other active experiments | Prevents contamination |

### 2.3 Randomization Details
- Hash-based assignment: `hash(user_id + experiment_id) % 2`
- Verified balance across: city, segment, age band, platform (iOS/Android), order history
- No re-randomization during experiment

---

## 3. Metrics

### 3.1 Primary Metric
**Incremental successful orders per eligible user per month**

Why this metric:
- Directly measures the business objective (frequency growth)
- "Successful" excludes cancelled orders
- Per-user normalization accounts for different treatment group sizes
- Monthly timeframe captures full ordering cycles

### 3.2 Secondary Metrics

| Metric | Purpose |
|--------|---------|
| Recommendation CTR | TMZ engagement quality |
| Restaurant view rate | Discovery → intent conversion |
| Menu view rate | Intent → selection conversion |
| Cart conversion rate | Selection → commitment |
| Checkout conversion rate | Commitment → payment |
| Order frequency (30d) | Core frequency metric |
| 30-day retention | Long-term engagement health |

### 3.3 Business Metrics

| Metric | Purpose |
|--------|---------|
| Contribution per user per month | Ensure profitable growth |
| Contribution per order | Per-transaction economics |
| Discount per order | Ensure not buying orders with discounts |

### 3.4 Guardrail Metrics

| Metric | Threshold | Action if Breached |
|--------|-----------|-------------------|
| Cancellation rate | <5% absolute increase | Investigate restaurant quality |
| Refund rate | <3% absolute increase | Check recommendation accuracy |
| Late delivery rate | <2% absolute increase | Review ETA reliability scoring |
| Customer complaint rate | <1% absolute increase | Review user experience |
| Restaurant concentration (HHI) | <20% increase | Tighten diversity constraints |

---

## 4. Statistical Design

### 4.1 Minimum Detectable Effect (MDE)

**Target MDE: 3-5% relative lift in orders per user**

Business justification:
```
3% lift × 1.8 orders/month × 5M eligible users = 270K incremental orders/month
270K × ₹55 contribution = ₹14.85 Cr/month
Engineering cost: ~₹2-3 Cr (one-time)
ROI: Positive within first month → 3% MDE is justified
```

### 4.2 Sample Size Calculation

For a two-proportion z-test:
```
n = (Z_α/2 + Z_β)² × (p₁(1-p₁) + p₂(1-p₂)) / (p₁ - p₂)²
```

With:
- α = 0.05 (95% confidence)
- β = 0.20 (80% power)
- p₁ = 0.150 (control conversion, 15%)
- p₂ = 0.155 (treatment, 3.3% relative lift)

Result: ~48,000 users per arm → round up to **50,000 per arm**

### 4.3 Duration Calculation

With 50K users per arm and ~20 sessions/user/month:
- Week 1-2: Ramp-up, initial engagement data
- Week 3-4: Sufficient data for primary metric significance
- Week 5-6: Confirm stability, check secondary metrics

**Minimum duration: 4 weeks | Recommended: 6 weeks**

### 4.4 Analysis Plan

1. **Primary analysis:** Two-sample t-test on orders/user/month (treatment vs control)
2. **Confidence interval:** 95% CI on the difference
3. **Segmented analysis:** Break out by user segment, city, age band
4. **Heterogeneous treatment effects:** Check if TMZ works better for some segments
5. **Sensitivity analysis:** Vary MDE, check at different confidence levels

---

## 5. Decision Framework

### 5.1 Go / No-Go Criteria

| Outcome | Action |
|---------|--------|
| Primary metric significant positive, guardrails pass | **Ship TMZ** to all eligible users |
| Primary metric positive but not significant | Extend experiment 2 more weeks; if still not significant, iterate |
| Primary metric positive but guardrail(s) breached | Investigate root cause, fix, re-run |
| Primary metric null | Analyze secondary metrics for learning; iterate on product |
| Primary metric significantly negative | **Kill TMZ**; write postmortem |

### 5.2 Cannibalization Check

Even if orders increase in treatment:
```
True incremental = Total orders(treatment) - Total orders(control)
TMZ-attributed orders = Orders directly from TMZ flow
Cannibalization = TMZ-attributed - True incremental
Cannibalization rate = Cannibalization / TMZ-attributed
```

If cannibalization > 50%, the feature is mostly redirecting existing orders, not creating new ones.

---

## 6. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Novelty effect inflates early results | Run for full 6 weeks; check trend over time |
| Network effects between users | User-level randomization; check for spillover |
| Seasonal confounds | Run across stable period; compare same-period YoY |
| Multiple testing inflation | Pre-register primary metric; adjust secondary for FDR |
| Segment interaction effects | Pre-register key segments for subgroup analysis |

---

## 7. Post-Experiment

### 7.1 If Successful
1. Gradual rollout: 10% → 25% → 50% → 100%
2. Monitor guardrails during rollout
3. Begin Phase 2 (personalized ranking) development
4. Set up long-term tracking dashboard

### 7.2 If Unsuccessful
1. Deep-dive into engagement funnel (where did users drop?)
2. Qualitative research: 10-15 user interviews
3. Identify specific failure mode
4. Iterate product and re-test

---

*This experiment design is part of a portfolio case study. No actual Zomato experiment was conducted.*
