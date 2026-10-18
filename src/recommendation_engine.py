"""
Too Maaa Zooo — Recommendation Engine (Python Reference Implementation)
======================================================================
Multi-signal restaurant recommendation scoring system.

⚠ SYNTHETIC DATA DISCLAIMER:
This engine operates on synthetic data for portfolio demonstration.
It does NOT represent Zomato's actual recommendation system.

Usage:
    from recommendation_engine import RecommendationEngine
    engine = RecommendationEngine(restaurants_df, user_profile)
    results = engine.recommend(mood='comfort', budget='b500', cuisine='North Indian')
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Tuple


# Mood → Cuisine affinity map
MOOD_CUISINE_MAP = {
    'comfort': {'North Indian': 0.9, 'Biryani': 0.85, 'Chinese': 0.7, 'Pizza': 0.6, 'South Indian': 0.7},
    'healthy': {'Healthy Bowls': 0.95, 'Cafe': 0.6, 'Japanese': 0.7, 'Continental': 0.65, 'Thai': 0.6},
    'spicy': {'North Indian': 0.8, 'Chinese': 0.75, 'Korean': 0.85, 'Thai': 0.8, 'Mexican': 0.75},
    'quick': {'Burgers': 0.9, 'Wraps & Rolls': 0.85, 'Pizza': 0.7, 'Street Food': 0.8, 'Chinese': 0.65},
    'light': {'Cafe': 0.85, 'Healthy Bowls': 0.8, 'Bakery': 0.7, 'Desserts': 0.6, 'Japanese': 0.65},
    'latenight': {'Pizza': 0.85, 'Burgers': 0.8, 'Chinese': 0.75, 'Biryani': 0.7, 'Street Food': 0.65},
    'sharing': {'Pizza': 0.9, 'Chinese': 0.8, 'North Indian': 0.85, 'Biryani': 0.8, 'Mexican': 0.7},
    'treat': {'Italian': 0.85, 'Japanese': 0.8, 'Continental': 0.75, 'Korean': 0.7, 'Desserts': 0.8},
    'new': {'Japanese': 0.8, 'Korean': 0.85, 'Thai': 0.8, 'Mexican': 0.75, 'Continental': 0.7},
}

# Budget options
BUDGET_OPTIONS = {
    'b200': {'max': 200},
    'b300': {'min': 200, 'max': 300},
    'b500': {'min': 300, 'max': 500},
    'b800': {'min': 500, 'max': 800},
    'b999': {'min': 800},
}

# ETA options
ETA_OPTIONS = {'e20': 20, 'e30': 30, 'e45': 45}

# Distance options
DISTANCE_OPTIONS = {'d2': 2, 'd5': 5, 'd8': 8}


class UserProfile:
    """Represents a user's preferences and history."""
    
    def __init__(
        self,
        user_id: str = 'anonymous',
        preferred_cuisines: List[str] = None,
        avg_order_value: float = 380,
        order_history: List[str] = None,
        top_rated: Dict[str, int] = None,
        novelty_preference: float = 0.2,
        discount_sensitivity: float = 0.3,
        eta_tolerance: int = 35,
        diet: str = 'No preference'
    ):
        self.user_id = user_id
        self.preferred_cuisines = preferred_cuisines or []
        self.avg_order_value = avg_order_value
        self.order_history = order_history or []
        self.top_rated = top_rated or {}
        self.novelty_preference = novelty_preference
        self.discount_sensitivity = discount_sensitivity
        self.eta_tolerance = eta_tolerance
        self.diet = diet


class RecommendationEngine:
    """Multi-signal restaurant recommendation engine."""
    
    DEFAULT_WEIGHTS = {
        'preference': 30,
        'quality': 20,
        'eta_reliability': 15,
        'price_fit': 15,
        'distance': 10,
        'availability': 10,
        'novelty': 0
    }
    
    def __init__(self, restaurants_df: pd.DataFrame, user: Optional[UserProfile] = None):
        """
        Initialize recommendation engine.
        
        Args:
            restaurants_df: DataFrame with restaurant data
            user: Optional user profile for personalization
        """
        self.restaurants = restaurants_df
        self.user = user or UserProfile()
        self.weights = dict(self.DEFAULT_WEIGHTS)
    
    def set_weights(self, **kwargs):
        """Update scoring weights."""
        for key, value in kwargs.items():
            if key in self.weights:
                self.weights[key] = value
    
    def recommend(
        self,
        mood: Optional[str] = None,
        budget: Optional[str] = None,
        cuisine: Optional[str] = None,
        eta: Optional[str] = None,
        diet: Optional[str] = None,
        distance: Optional[str] = None,
        discovery: Optional[str] = None,
        top_n: int = 10
    ) -> pd.DataFrame:
        """
        Generate personalized restaurant recommendations.
        
        Args:
            mood: One of the mood options (comfort, healthy, spicy, etc.)
            budget: Budget constraint (b200, b300, b500, b800, b999)
            cuisine: Cuisine preference
            eta: Maximum ETA (e20, e30, e45)
            diet: Dietary preference
            distance: Maximum distance (d2, d5, d8)
            discovery: Discovery mode (usuals, new, surprise)
            top_n: Number of recommendations to return
        
        Returns:
            DataFrame with ranked restaurants and scores
        """
        context = {
            'mood': mood, 'budget': budget, 'cuisine': cuisine,
            'eta': eta, 'diet': diet, 'distance': distance, 'discovery': discovery
        }
        
        # Step 1: Candidate generation with filters
        candidates = self._filter_candidates(context)
        
        if len(candidates) == 0:
            return pd.DataFrame()
        
        # Step 2: Adjust weights for discovery mode
        weights = self._adjust_weights(context)
        
        # Step 3: Score all candidates
        scored = self._score_candidates(candidates, context, weights)
        
        # Step 4: Apply diversity constraints
        diversified = self._apply_diversity(scored, top_n)
        
        return diversified
    
    def _filter_candidates(self, context: dict) -> pd.DataFrame:
        """Filter restaurants by eligibility criteria."""
        df = self.restaurants.copy()
        
        # Availability filter
        if 'availability' in df.columns:
            df = df[df['availability'] > 0.5]
        
        # Cuisine filter
        if context.get('cuisine') and context['cuisine'] != 'Any':
            cuisine_df = df[df['cuisine'] == context['cuisine']]
            if len(cuisine_df) >= 3:
                df = cuisine_df
        
        # ETA filter
        if context.get('eta') and context['eta'] in ETA_OPTIONS:
            max_eta = ETA_OPTIONS[context['eta']]
            total_time = df['avg_prep_time'] + df['avg_delivery_time']
            eta_df = df[total_time <= max_eta]
            if len(eta_df) >= 3:
                df = eta_df
        
        # Distance filter
        if context.get('distance') and context['distance'] in DISTANCE_OPTIONS:
            max_dist = DISTANCE_OPTIONS[context['distance']]
            dist_df = df[df['distance'] <= max_dist]
            if len(dist_df) >= 3:
                df = dist_df
        
        return df
    
    def _adjust_weights(self, context: dict) -> dict:
        """Adjust weights based on discovery mode."""
        w = dict(self.weights)
        
        if context.get('discovery') == 'new':
            w['novelty'] = max(w['novelty'], 20)
            w['preference'] = max(w['preference'] - 10, 5)
        elif context.get('discovery') == 'usuals':
            w['preference'] += 15
            w['novelty'] = 0
        elif context.get('discovery') == 'surprise':
            w['novelty'] = 30
            w['preference'] = 10
        
        return w
    
    def _score_candidates(self, candidates: pd.DataFrame, context: dict, weights: dict) -> pd.DataFrame:
        """Score each candidate restaurant."""
        scored = candidates.copy()
        
        # Calculate individual scores
        scored['pref_score'] = scored.apply(lambda r: self._calc_preference(r, context), axis=1)
        scored['quality_score'] = (scored['rating'] / 5.0 * 100).clip(0, 100)
        scored['eta_score'] = (scored['eta_reliability'] * 100).clip(0, 100)
        scored['price_score'] = scored.apply(lambda r: self._calc_price_fit(r, context), axis=1)
        scored['dist_score'] = (100 - scored['distance'] * 10).clip(0, 100)
        scored['avail_score'] = scored['availability'].apply(lambda x: 95 if x > 0.7 else 30)
        scored['novelty_score'] = scored.apply(lambda r: self._calc_novelty(r), axis=1)
        
        # Weighted final score
        total_weight = sum(weights.values())
        if total_weight > 0:
            scored['final_score'] = (
                scored['pref_score'] * weights['preference'] +
                scored['quality_score'] * weights['quality'] +
                scored['eta_score'] * weights['eta_reliability'] +
                scored['price_score'] * weights['price_fit'] +
                scored['dist_score'] * weights['distance'] +
                scored['avail_score'] * weights['availability'] +
                scored['novelty_score'] * weights['novelty']
            ) / total_weight
        else:
            scored['final_score'] = 0
        
        scored['final_score'] = scored['final_score'].round(1)
        scored = scored.sort_values('final_score', ascending=False)
        
        return scored
    
    def _calc_preference(self, restaurant, context: dict) -> float:
        """Calculate preference score for a restaurant."""
        score = 50  # baseline
        
        # Cuisine match
        if restaurant['cuisine'] in self.user.preferred_cuisines:
            score += 30
        
        # Order history
        if restaurant.get('restaurant_id') in self.user.order_history:
            score += 15
        
        # Past ratings
        if restaurant.get('restaurant_id') in self.user.top_rated:
            score += self.user.top_rated[restaurant['restaurant_id']] * 3
        
        # Mood-cuisine affinity
        mood = context.get('mood')
        if mood and mood in MOOD_CUISINE_MAP:
            affinity = MOOD_CUISINE_MAP[mood].get(restaurant['cuisine'], 0)
            score += affinity * 25
        
        return min(100, max(0, score))
    
    def _calc_price_fit(self, restaurant, context: dict) -> float:
        """Calculate price fit score."""
        score = 70
        
        if context.get('budget') and context['budget'] in BUDGET_OPTIONS:
            opts = BUDGET_OPTIONS[context['budget']]
            aov = restaurant['avg_order_value']
            
            if 'max' in opts and aov <= opts['max']:
                score = 95
            elif 'min' in opts and 'max' in opts and opts['min'] <= aov <= opts['max']:
                score = 90
            elif 'min' in opts and 'max' not in opts and aov >= opts['min']:
                score = 85
            else:
                target = opts.get('max', opts.get('min', 500))
                score = max(20, 90 - abs(aov - target) / 5)
        
        # User AOV match
        if self.user.avg_order_value:
            diff = abs(restaurant['avg_order_value'] - self.user.avg_order_value)
            score = max(score - diff / 10, 20)
        
        return min(100, max(0, score))
    
    def _calc_novelty(self, restaurant) -> float:
        """Calculate novelty score."""
        score = 50
        
        if restaurant.get('restaurant_id') not in self.user.order_history:
            score = 85
        else:
            score = 20
        
        return min(100, max(0, score))
    
    def _apply_diversity(self, scored: pd.DataFrame, top_n: int) -> pd.DataFrame:
        """Apply diversity constraints to final ranking."""
        if len(scored) <= 5:
            return scored.head(top_n)
        
        result_indices = [scored.index[0]]
        cuisine_counts = {scored.iloc[0]['cuisine']: 1}
        
        for idx in scored.index[1:]:
            if len(result_indices) >= top_n:
                break
            
            r = scored.loc[idx]
            count = cuisine_counts.get(r['cuisine'], 0)
            
            # Max 2 same cuisine in top 5
            if len(result_indices) < 5 and count >= 2:
                continue
            # Max 3 same cuisine in top 10
            if count >= 3:
                continue
            
            cuisine_counts[r['cuisine']] = count + 1
            result_indices.append(idx)
        
        # Fill remaining if too strict
        for idx in scored.index:
            if len(result_indices) >= top_n:
                break
            if idx not in result_indices:
                result_indices.append(idx)
        
        return scored.loc[result_indices]
    
    def explain(self, restaurant, context: dict) -> List[str]:
        """Generate human-readable explanation for a recommendation."""
        reasons = []
        
        if restaurant['cuisine'] in self.user.preferred_cuisines:
            reasons.append(f"You frequently order {restaurant['cuisine']} food.")
        
        if abs(restaurant['avg_order_value'] - self.user.avg_order_value) < 100:
            reasons.append(
                f"Your typical order is ₹{self.user.avg_order_value}. "
                f"This fits at ₹{restaurant['avg_order_value']}."
            )
        
        if restaurant['eta_reliability'] >= 0.85:
            reasons.append(
                f"Delivers on time {int(restaurant['eta_reliability'] * 100)}% of the time."
            )
        
        if restaurant['rating'] >= 4.2:
            reasons.append(
                f"Highly rated at {restaurant['rating']}★ from {restaurant['review_count']} reviews."
            )
        
        if restaurant['distance'] <= 3:
            reasons.append(f"Very close at {restaurant['distance']} km.")
        
        if not reasons:
            reasons.append("Popular in your area with good ratings and reliability.")
        
        return reasons


# ============================================================
# DEMO USAGE
# ============================================================
if __name__ == '__main__':
    print("=" * 60)
    print("TOO MAAA ZOOO — Recommendation Engine Demo")
    print("=" * 60)
    print()
    print("⚠ This operates on synthetic data for portfolio demonstration.")
    print()
    
    # Load restaurant data
    import os
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'restaurants.csv')
    
    if os.path.exists(data_path):
        restaurants = pd.read_csv(data_path)
    else:
        print("Restaurant data not found. Run data_generation.py first.")
        print(f"Expected path: {data_path}")
        exit(1)
    
    # Create a sample user profile
    user = UserProfile(
        user_id='demo_user',
        preferred_cuisines=['North Indian', 'Chinese', 'Biryani'],
        avg_order_value=380,
        order_history=['R0001', 'R0003', 'R0010'],
        top_rated={'R0001': 5, 'R0003': 4},
        novelty_preference=0.2
    )
    
    # Initialize engine
    engine = RecommendationEngine(restaurants, user)
    
    # Run recommendation
    results = engine.recommend(
        mood='comfort',
        budget='b500',
        cuisine='North Indian',
        eta='e30',
        top_n=5
    )
    
    print("Top 5 Recommendations:")
    print("-" * 60)
    for _, r in results.iterrows():
        print(f"  #{_+1 if isinstance(_, int) else ''} {r['restaurant_name']}")
        print(f"     Cuisine: {r['cuisine']} | Rating: {r['rating']} | "
              f"₹{r['avg_order_value']} | {r['distance']}km")
        print(f"     Score: {r['final_score']}")
        
        # Explain
        reasons = engine.explain(r, {'mood': 'comfort', 'budget': 'b500'})
        for reason in reasons:
            print(f"     → {reason}")
        print()
