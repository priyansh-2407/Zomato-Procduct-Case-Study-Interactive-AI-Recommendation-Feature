"""
Too Maaa Zooo — Unit Economics Calculator
=========================================
Per-order and per-user economics model with business impact projections.

⚠ DISCLAIMER:
All financial figures are illustrative assumptions.
They do NOT represent Zomato's actual internal economics.

Usage:
    from unit_economics import UnitEconomicsModel
    model = UnitEconomicsModel()
    per_order = model.per_order_economics(aov=380)
    impact = model.business_impact(eligible_users=5_000_000, freq_lift=0.2)
"""

from dataclasses import dataclass, field
from typing import Dict


@dataclass
class PerOrderEconomics:
    """Per-order revenue, cost, and contribution breakdown."""
    aov: float
    
    # Revenue components
    commission: float = 0
    delivery_fee: float = 0
    platform_fee: float = 0
    ad_revenue: float = 0
    total_revenue: float = 0
    
    # Cost components
    delivery_payout: float = 0
    payment_processing: float = 0
    discount: float = 0
    refund_allocation: float = 0
    customer_support: float = 0
    restaurant_incentive: float = 0
    total_cost: float = 0
    
    # Contribution
    contribution: float = 0
    contribution_margin_pct: float = 0


@dataclass
class BusinessImpact:
    """Business impact projections for a given scenario."""
    # Inputs
    eligible_users: int = 0
    current_freq: float = 0
    new_freq: float = 0
    freq_lift: float = 0
    aov: float = 0
    contribution_per_order: float = 0
    cannibalization_rate: float = 0
    
    # Outputs
    gross_incremental_orders: int = 0
    cannibalized_orders: int = 0
    net_incremental_orders: int = 0
    incremental_gmv: float = 0
    incremental_revenue: float = 0
    monthly_contribution: float = 0
    annual_contribution: float = 0
    ltv_per_user: float = 0
    ltv_cac_ratio: float = 0
    cac_payback_months: float = 0


class UnitEconomicsModel:
    """
    Interactive unit economics model for food delivery.
    
    ⚠ All figures are illustrative assumptions.
    """
    
    # Default assumptions (illustrative)
    DEFAULTS = {
        'commission_rate': 0.22,        # 22% restaurant commission
        'delivery_fee': 35,             # ₹35 customer delivery fee
        'platform_fee': 15,             # ₹15 platform fee
        'ad_revenue_per_order': 5,      # ₹5 ad revenue allocation
        'delivery_payout': 45,          # ₹45 delivery partner payout
        'payment_processing_rate': 0.02, # 2% payment processing
        'discount_per_order': 40,       # ₹40 average discount
        'refund_per_order': 5,          # ₹5 refund allocation
        'support_per_order': 3,         # ₹3 customer support
        'restaurant_incentive': 5,      # ₹5 restaurant incentive
        'cac': 250,                     # ₹250 customer acquisition cost
        'lifetime_months': 18,          # 18-month avg customer lifetime
    }
    
    def __init__(self, **overrides):
        """Initialize model with default or custom assumptions."""
        self.params = {**self.DEFAULTS, **overrides}
    
    def per_order_economics(self, aov: float = 380) -> PerOrderEconomics:
        """
        Calculate per-order economics.
        
        Args:
            aov: Average order value in ₹
        
        Returns:
            PerOrderEconomics with full breakdown
        """
        p = self.params
        
        econ = PerOrderEconomics(aov=aov)
        
        # Revenue
        econ.commission = round(aov * p['commission_rate'], 2)
        econ.delivery_fee = p['delivery_fee']
        econ.platform_fee = p['platform_fee']
        econ.ad_revenue = p['ad_revenue_per_order']
        econ.total_revenue = round(
            econ.commission + econ.delivery_fee + econ.platform_fee + econ.ad_revenue, 2
        )
        
        # Costs
        econ.delivery_payout = p['delivery_payout']
        econ.payment_processing = round(aov * p['payment_processing_rate'], 2)
        econ.discount = p['discount_per_order']
        econ.refund_allocation = p['refund_per_order']
        econ.customer_support = p['support_per_order']
        econ.restaurant_incentive = p['restaurant_incentive']
        econ.total_cost = round(
            econ.delivery_payout + econ.payment_processing + econ.discount +
            econ.refund_allocation + econ.customer_support + econ.restaurant_incentive, 2
        )
        
        # Contribution
        econ.contribution = round(econ.total_revenue - econ.total_cost, 2)
        econ.contribution_margin_pct = round((econ.contribution / aov) * 100, 2)
        
        return econ
    
    def business_impact(
        self,
        eligible_users: int = 5_000_000,
        current_freq: float = 1.8,
        new_freq: float = 2.0,
        aov: float = 380,
        contribution_per_order: float = 55,
        cannibalization: float = 0.25,
        discount_per_order: float = 40,
    ) -> BusinessImpact:
        """
        Calculate business impact of frequency improvement.
        
        Args:
            eligible_users: Number of users eligible for TMZ
            current_freq: Current orders per user per month
            new_freq: Projected new orders per user per month
            aov: Average order value
            contribution_per_order: Contribution per order (₹)
            cannibalization: Fraction of orders that are cannibalized
            discount_per_order: Average discount per order
        
        Returns:
            BusinessImpact with full projection
        """
        p = self.params
        
        impact = BusinessImpact()
        impact.eligible_users = eligible_users
        impact.current_freq = current_freq
        impact.new_freq = new_freq
        impact.freq_lift = new_freq - current_freq
        impact.aov = aov
        impact.contribution_per_order = contribution_per_order
        impact.cannibalization_rate = cannibalization
        
        # Order calculations
        impact.gross_incremental_orders = round(eligible_users * impact.freq_lift)
        impact.cannibalized_orders = round(impact.gross_incremental_orders * cannibalization)
        impact.net_incremental_orders = impact.gross_incremental_orders - impact.cannibalized_orders
        
        # Financial calculations
        impact.incremental_gmv = round(impact.net_incremental_orders * aov)
        impact.incremental_revenue = round(
            impact.net_incremental_orders * (contribution_per_order + discount_per_order)
        )
        impact.monthly_contribution = round(impact.net_incremental_orders * contribution_per_order)
        impact.annual_contribution = round(impact.monthly_contribution * 12)
        
        # LTV/CAC
        impact.ltv_per_user = round(contribution_per_order * new_freq * p['lifetime_months'])
        impact.ltv_cac_ratio = round(impact.ltv_per_user / p['cac'], 2)
        impact.cac_payback_months = round(p['cac'] / (contribution_per_order * new_freq), 1)
        
        return impact
    
    def scenario_comparison(self) -> Dict[str, BusinessImpact]:
        """
        Generate three scenario projections: Conservative, Base, Upside.
        
        Returns:
            Dictionary with three BusinessImpact scenarios
        """
        scenarios = {
            'conservative': self.business_impact(
                eligible_users=3_000_000,
                current_freq=1.8,
                new_freq=1.9,
                contribution_per_order=50,
                cannibalization=0.35
            ),
            'base': self.business_impact(
                eligible_users=5_000_000,
                current_freq=1.8,
                new_freq=2.0,
                contribution_per_order=55,
                cannibalization=0.25
            ),
            'upside': self.business_impact(
                eligible_users=8_000_000,
                current_freq=1.8,
                new_freq=2.1,
                contribution_per_order=60,
                cannibalization=0.15
            ),
        }
        return scenarios


# ============================================================
# DEMO USAGE
# ============================================================
if __name__ == '__main__':
    print("=" * 60)
    print("TOO MAAA ZOOO — Unit Economics Model")
    print("=" * 60)
    print()
    print("⚠ All figures below are ILLUSTRATIVE ASSUMPTIONS.")
    print("   They do NOT represent Zomato's actual internal economics.")
    print()
    
    model = UnitEconomicsModel()
    
    # Per-order economics
    print("PER-ORDER ECONOMICS (AOV = ₹380)")
    print("-" * 40)
    econ = model.per_order_economics(aov=380)
    print(f"  Revenue:")
    print(f"    Commission:        ₹{econ.commission}")
    print(f"    Delivery Fee:      ₹{econ.delivery_fee}")
    print(f"    Platform Fee:      ₹{econ.platform_fee}")
    print(f"    Ad Revenue:        ₹{econ.ad_revenue}")
    print(f"    TOTAL REVENUE:     ₹{econ.total_revenue}")
    print()
    print(f"  Costs:")
    print(f"    Delivery Payout:   ₹{econ.delivery_payout}")
    print(f"    Payment:           ₹{econ.payment_processing}")
    print(f"    Discount:          ₹{econ.discount}")
    print(f"    Refund:            ₹{econ.refund_allocation}")
    print(f"    Support:           ₹{econ.customer_support}")
    print(f"    Rest. Incentive:   ₹{econ.restaurant_incentive}")
    print(f"    TOTAL COST:        ₹{econ.total_cost}")
    print()
    print(f"  CONTRIBUTION:        ₹{econ.contribution}")
    print(f"  MARGIN:              {econ.contribution_margin_pct}%")
    print()
    
    # Scenario comparison
    print("SCENARIO COMPARISON")
    print("-" * 60)
    scenarios = model.scenario_comparison()
    
    print(f"{'Metric':<35} {'Conservative':>12} {'Base':>12} {'Upside':>12}")
    print("-" * 71)
    
    for label, key in [
        ('Eligible Users', 'eligible_users'),
        ('Freq Lift', 'freq_lift'),
        ('Cannibalization %', 'cannibalization_rate'),
        ('Net Incremental Orders/Mo', 'net_incremental_orders'),
        ('Monthly Contribution (₹)', 'monthly_contribution'),
        ('Annual Contribution (₹)', 'annual_contribution'),
        ('LTV per User (₹)', 'ltv_per_user'),
        ('LTV/CAC', 'ltv_cac_ratio'),
        ('Payback (months)', 'cac_payback_months'),
    ]:
        vals = [getattr(scenarios[s], key) for s in ['conservative', 'base', 'upside']]
        if key in ['cannibalization_rate', 'freq_lift']:
            formatted = [f"{v:.0%}" if key == 'cannibalization_rate' else f"+{v:.1f}" for v in vals]
        elif key in ['ltv_cac_ratio', 'cac_payback_months']:
            formatted = [f"{v:.1f}" for v in vals]
        else:
            formatted = [f"{v:,.0f}" for v in vals]
        
        print(f"  {label:<33} {formatted[0]:>12} {formatted[1]:>12} {formatted[2]:>12}")
    
    print()
    print("⚠ Scenario estimates based on illustrative assumptions.")
