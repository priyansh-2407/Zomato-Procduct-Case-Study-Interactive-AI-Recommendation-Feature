# Zomato PM Case Study: Too Maaa Zooo

> **"Food delivery doesn't have a selection problem. It has a decision problem."**

A comprehensive, interactive Product Management case study analyzing Zomato's food delivery business and proposing **Too Maaa Zooo** — a personalized, intent-based food discovery experience designed to increase profitable order frequency among existing users.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Interactive_Website-e23744?style=for-the-badge)](web/index.html)

---

## Data Integrity Disclaimer

This project uses **five types of data**, each clearly labeled:

| Type | Description |
|------|-------------|
| **Public Data** | Verified from Eternal/Zomato filings, investor presentations, exchange disclosures |
| **Industry Research** | From reputable financial publications and credible research reports |
| **Observable** | Publicly observable product behavior (pricing, features, UI) |
| **Assumption** | Explicitly labeled illustrative assumptions for modeling |
| **Synthetic** | Generated datasets for analysis — does NOT represent Zomato internal data |

**No Zomato internal data was accessed or fabricated.**

---

## Problem Statement

**Central Business Question:**
> "How can Zomato increase profitable food-order frequency among existing users without becoming overly dependent on discounts?"

**Key Insight:**
Users often open Zomato without knowing what they want. With 300K+ restaurant partners, the paradox of choice creates discovery friction and decision fatigue — leading to session abandonment or suboptimal orders.

---

## Research Methodology

1. **Public company data** from Eternal FY25 Annual Report, Q1 FY26 Shareholders' Letter
2. **Industry research** on food delivery economics, market share, and competition
3. **Product observation** of Zomato app features, pricing, and user experience
4. **Behavioral research** on choice overload and decision fatigue in digital platforms
5. **Synthetic data generation** for analysis and prototyping (50K+ orders, 5K+ users, 500+ restaurants)

---

## Key Findings

### Zomato Business Context
- **22.9M** monthly transacting users (Q1 FY26)
- **₹10,769 Cr** food delivery GOV (Q1 FY26)
- **~6-7%** contribution margin per order
- **56-57%** food delivery market share

### User Segmentation (Synthetic)
| Segment | % of Base | Orders/Mo | AOV | Contribution/Order | 30d Retention |
|---------|-----------|-----------|-----|-------------------|---------------|
| Heavy Users | 10% | 6.2 | ₹420 | ₹68 | 92% |
| **Occasional Users** | **36%** | **1.8** | **₹380** | **₹55** | **58%** |
| Discount-Driven | 16% | 2.8 | ₹310 | ₹18 | 45% |
| Premium Users | 8% | 4.5 | ₹650 | ₹95 | 85% |
| Churn Risk | 18% | 0.4 | ₹340 | ₹38 | 18% |
| New Users | 12% | 1.2 | ₹350 | ₹28 | 42% |

**Target:** Occasional users — largest segment with proven platform engagement and profitable unit economics.

### Problem Prioritization (RICE)
Discovery friction scored highest due to:
- **Reach:** Affects 78% of sessions
- **Impact:** Directly addresses conversion funnel's largest drop-off
- **Strategic Fit:** Aligns with profitability focus without requiring discounts

---

## Solution: Too Maaa Zooo

> "You don't need to know what you want. We do."

### What It Does
Too Maaa Zooo converts vague food intent into personalized restaurant recommendations through:

1. **Intent Capture** — 11 mood options (Comfort Food, Healthy, Spicy, Quick, etc.)
2. **Constraint Setting** — Budget, Cuisine, ETA, Diet, Distance, Discovery Mode
3. **Personalized Ranking** — 7-dimension scoring algorithm
4. **Transparent Explainability** — "Why am I seeing this?" for every recommendation

### Recommendation Algorithm
```
Final Score = Σ (weight_i × score_i) / Σ weight_i
```

| Dimension | Default Weight | Signal |
|-----------|---------------|--------|
| Personal Preference | 30% | Cuisine affinity, order history, mood match |
| Restaurant Quality | 20% | Rating, review count |
| ETA Reliability | 15% | Historical on-time delivery rate |
| Price Fit | 15% | Budget alignment, AOV match |
| Distance | 10% | Physical proximity |
| Availability | 10% | Currently open and accepting orders |
| Novelty | 0% (adjustable) | New restaurants, unexplored cuisines |

### Diversity Constraints
- Top 5 cannot all be same cuisine
- Top 5 cannot all be same price segment
- 10-15% slots reserved for new/underrepresented restaurants

---

## Unit Economics (Illustrative)

**Per-Order Economics:**
- Revenue/order: ~₹139 (commission + delivery fee + platform fee + ads)
- Variable cost/order: ~₹106 (delivery + payment + discount + refund + support)
- **Contribution/order: ~₹33-55** (varies by segment)

**Business Impact Scenarios (Scenario Estimates):**
| Scenario | Eligible Users | Freq Lift | Cannibalization | Annual Contribution |
|----------|---------------|-----------|-----------------|-------------------|
| Conservative | 3M | +0.1 | 35% | ~₹12 Cr |
| Base | 5M | +0.2 | 25% | ~₹50 Cr |
| Upside | 8M | +0.3 | 15% | ~₹110 Cr |

---

## A/B Test Design

- **Control:** Current Zomato discovery
- **Treatment:** Current + Too Maaa Zooo
- **Primary Metric:** Incremental successful orders per eligible user per month
- **MDE:** 3-5%
- **Power:** 80%, **Confidence:** 95%
- **Duration:** 4-6 weeks
- **Guardrails:** Cancellation, refund, late delivery, restaurant concentration

---

## Project Structure

```
zomato-pm-case-study/
├── README.md                          # This file
├── requirements.txt                   # Python dependencies
├── data/
│   ├── users.csv                     # 5,000+ synthetic users
│   ├── orders.csv                    # 50,000+ synthetic orders
│   ├── restaurants.csv               # 500+ synthetic restaurants
│   ├── sessions.csv                  # 100,000+ synthetic sessions
│   └── experiments.csv               # A/B test simulation data
├── src/
│   ├── data_generation.py            # Synthetic data generator
│   ├── recommendation_engine.py      # Python recommendation engine
│   └── unit_economics.py             # Unit economics calculator
├── analysis/
│   ├── exploratory_analysis.ipynb    # Descriptive statistics
│   ├── funnel_analysis.ipynb         # Session-to-order funnel
│   ├── segmentation.ipynb            # User segmentation
│   ├── retention_analysis.ipynb      # Cohort retention
│   └── unit_economics.ipynb          # Per-order/user economics
├── web/
│   ├── index.html                    # Interactive case study website
│   ├── styles.css                    # Design system
│   ├── data.js                       # Embedded data layer
│   └── app.js                        # Application logic & recommendation engine
├── docs/
│   ├── case-study.md                 # Written case study
│   ├── product-requirements.md       # Too Maaa Zooo PRD
│   ├── algorithm.md                  # Algorithm documentation
│   ├── experiment.md                 # A/B test design
│   ├── sources.md                    # All citations
│   └── interview-questions.md        # 30+ Q&A + resume bullets
└── assets/
    ├── charts/
    └── wireframes/
```

---

## How to Run Locally

### Interactive Website (No setup required)
```bash
# Simply open in any modern browser
open web/index.html
```

### Python Data Generation
```bash
pip install -r requirements.txt
python src/data_generation.py
```

### Analysis Notebooks
```bash
pip install jupyter
jupyter notebook analysis/
```

---

## What This Project Demonstrates

1. **Product Thinking** — Problem → Research → Data → Insight → Solution
2. **Quantitative Rigor** — Unit economics, funnel analysis, segmentation, A/B testing
3. **Algorithm Design** — Multi-signal recommendation engine with diversity constraints
4. **Business Judgment** — Cannibalization modeling, North Star selection, strategic prioritization
5. **Interactivity** — Working prototype, algorithm playground, business impact calculator
6. **Data Integrity** — All data sources clearly categorized and labeled

---

## Limitations

- All datasets are synthetic — they model realistic distributions but are not actual Zomato data
- Financial assumptions are illustrative — actual Zomato economics may differ significantly
- The recommendation engine is a simplified prototype — production systems use ML models
- Market data is from public sources and may not reflect current conditions
- This is a student portfolio project, not a Zomato internal document

---

## Future Work

- Production ML-based recommendation model (collaborative filtering + content-based)
- Real-time restaurant availability integration
- Context-aware ranking (weather, time, social signals)
- Predictive food intent modeling
- Restaurant partner dashboard for recommendation transparency

---

## Sources

All sources are documented in [docs/sources.md](docs/sources.md) and in the interactive website's Sources section.

Key sources include:
- Eternal Limited FY25 Annual Report (May 2025)
- Eternal Q1 FY26 Shareholders' Letter (July 2025)
- Industry research on Indian food delivery market (2025-2026)
- Academic research on choice overload and decision fatigue

---

## About

Built by an IIT Ropar engineering student for Product Management campus recruitment preparation.

This project is not affiliated with, endorsed by, or representative of Zomato/Eternal Limited.

---

*Last updated: September 2026*
