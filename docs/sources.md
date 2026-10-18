# Sources — Zomato PM Case Study

> All public data is cited with source and date. All synthetic data is clearly labeled.
> This document categorizes every data source used in the case study.

---

## Data Integrity Framework

| Badge | Type | Description |
|-------|------|-------------|
| 🟢 | **Public Data** | Verified from official company filings, investor presentations, exchange disclosures |
| 🔵 | **Industry Research** | From reputable financial publications and credible industry research reports |
| 🟣 | **Observable** | Publicly observable product behavior (pricing, features, UI) |
| 🟡 | **Assumption** | Explicitly labeled illustrative assumptions for modeling |
| 🟠 | **Synthetic** | Generated datasets for analysis — does NOT represent Zomato internal data |
| 🔷 | **Scenario** | Calculated projections based on illustrative inputs |

---

## Company Filings

| # | Source | Date | Type | Used For |
|---|--------|------|------|----------|
| 1 | Eternal Limited (formerly Zomato) FY25 Annual Report | May 2025 | 🟢 Public | FY25 revenue (₹20,243 Cr), PAT (₹527 Cr), business verticals |
| 2 | Eternal Q1 FY26 Shareholders' Letter | July 2025 | 🟢 Public | Q1 FY26 food GOV (₹10,769 Cr), revenue (₹2,657 Cr), MTU (22.9M), EBITDA margin (5.0% of NOV) |
| 3 | Eternal Q4 FY25 Earnings Release | April 2025 | 🟢 Public | Q4 FY25 food GOV (₹9,778 Cr), NOV transition, seasonal patterns |
| 4 | Zomato IPO Prospectus (DRHP) | July 2021 | 🟢 Public | Historical business model, unit economics framework, marketplace structure |
| 5 | Eternal corporate rebranding announcement | March 2025 | 🟢 Public | Parent company rebrand to Eternal Limited |

---

## Industry Research

| # | Source | Date | Type | Used For |
|---|--------|------|------|----------|
| 6 | Indian food delivery market share analysis | 2026 | 🔵 Industry | Zomato ~56-57%, Swiggy ~43-44% market share |
| 7 | Food delivery contribution margin benchmarks | 2025-2026 | 🔵 Industry | ~6-7% contribution margin per order |
| 8 | ONDC food delivery commission analysis | 2025-2026 | 🔵 Industry | ONDC commission rates (2-4%), competitive impact |
| 9 | Indian food delivery active users analysis | 2025-2026 | 🔵 Industry | Combined market MTU >110M, user behavior patterns |
| 10 | Quick commerce vs food delivery growth trends | 2025-2026 | 🔵 Industry | Blinkit NOV surpassing food delivery, strategic context |

---

## Public Product Observation

| # | Source | Date | Type | Used For |
|---|--------|------|------|----------|
| 11 | Zomato platform fee observation | March 2026 | 🟣 Observable | ₹14.90 pre-GST (₹17.58 incl. GST) platform fee |
| 12 | Zomato Gold AI features | 2025-2026 | 🟣 Observable | Match Scores, AI chatbot, personalized recommendations |
| 13 | Restaurant commission range | 2025-2026 | 🟣 Observable | 18-28% commission; effective deduction 25-35%+ |
| 14 | Zomato Gold membership features | 2025-2026 | 🟣 Observable | Free delivery, priority support, AI features, pricing |
| 15 | Zomato app UI and discovery features | 2025-2026 | 🟣 Observable | Home screen, search, filters, collections, trending |

---

## Academic & Behavioral Research

| # | Source | Date | Type | Used For |
|---|--------|------|------|----------|
| 16 | "Choice overload and decision fatigue in food delivery" — ResearchGate | 2023-2025 | 🔵 Industry | Paradox of choice validation, cognitive strain evidence |
| 17 | "The Paradox of Choice" — Barry Schwartz | 2004 | 🔵 Industry | Theoretical foundation for choice overload hypothesis |
| 18 | "Information overload in digital food platforms" — IJIP / IJSS | 2023-2025 | 🔵 Industry | Impulsive buying, decision fatigue correlation |
| 19 | "Recommendation systems in food delivery" — academic literature | 2022-2025 | 🔵 Industry | Collaborative filtering, content-based ranking approaches |
| 20 | "Determinants of food delivery app usage in India" — multiple papers | 2023-2026 | 🔵 Industry | Convenience (81-88%), price sensitivity, habit formation |

---

## Illustrative Assumptions (Clearly Labeled)

| # | Assumption | Value | Used For |
|---|------------|-------|----------|
| A1 | Average Order Value | ₹380 | Unit economics baseline |
| A2 | Restaurant commission rate | 22% | Per-order revenue calculation |
| A3 | Delivery fee | ₹35 | Per-order revenue |
| A4 | Platform fee | ₹15 | Per-order revenue |
| A5 | Ad revenue allocation | ₹5/order | Per-order revenue |
| A6 | Delivery payout | ₹45 | Per-order cost |
| A7 | Payment processing | 2% | Per-order cost |
| A8 | Discount per order | ₹40 | Per-order cost |
| A9 | Refund allocation | ₹5/order | Per-order cost |
| A10 | Customer support | ₹3/order | Per-order cost |
| A11 | Restaurant incentive | ₹5/order | Per-order cost |
| A12 | Customer Acquisition Cost | ₹250 | LTV/CAC calculation |
| A13 | Customer lifetime | 18 months | LTV calculation |

> ⚠️ These assumptions are illustrative. Actual Zomato economics may differ significantly.

---

## Synthetic Data

| # | Dataset | Records | Used For |
|---|---------|---------|----------|
| S1 | users.csv | 5,000+ | User segmentation, behavioral analysis |
| S2 | orders.csv | 50,000+ | Funnel analysis, unit economics, retention |
| S3 | restaurants.csv | 500+ | Recommendation engine, marketplace analysis |
| S4 | sessions.csv | 100,000+ | Funnel analysis, intent classification |
| S5 | experiments.csv | 2,000+ | A/B test simulation |

> ⚠️ Synthetic datasets created for portfolio analysis. They do NOT represent Zomato's internal data.

---

## Scenario Estimates

All business impact projections are calculated from illustrative inputs:

| Scenario | Eligible Users | Freq Lift | Cannibalization | Annual Contribution |
|----------|---------------|-----------|-----------------|-------------------|
| Conservative | 3M | +0.1 | 35% | ~₹12 Cr |
| Base | 5M | +0.2 | 25% | ~₹50 Cr |
| Upside | 8M | +0.3 | 15% | ~₹110 Cr |

> ⚠️ These are scenario estimates based on illustrative assumptions. They do not represent Zomato projections.
