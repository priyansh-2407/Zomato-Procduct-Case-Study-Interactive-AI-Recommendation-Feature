"""
Zomato PM Case Study — Synthetic Data Generation
=================================================
Generates behaviorally realistic synthetic data for portfolio analysis.

⚠ SYNTHETIC DATA DISCLAIMER:
This dataset is created for portfolio analysis purposes only.
It does NOT represent Zomato's internal data.

Usage:
    python src/data_generation.py

Output:
    data/users.csv      (5,000+ users)
    data/orders.csv     (50,000+ orders)
    data/restaurants.csv (500+ restaurants)
    data/sessions.csv   (100,000+ sessions)
    data/experiments.csv (A/B test simulation)
"""

import os
import random
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

# Output directory
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ============================================================
# CONFIGURATION
# ============================================================
NUM_USERS = 5000
NUM_RESTAURANTS = 500
NUM_ORDERS = 50000
NUM_SESSIONS = 100000

CITIES = ['Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow']
CUISINES = ['North Indian', 'South Indian', 'Chinese', 'Italian', 'Japanese', 'Mexican', 'Burgers', 'Pizza', 'Biryani', 'Desserts',
            'Continental', 'Thai', 'Korean', 'Street Food', 'Healthy Bowls', 'Wraps & Rolls', 'Cafe', 'Bakery']
SEGMENTS = ['Heavy', 'Occasional', 'Discount-Driven', 'Premium', 'Churn-Risk', 'New']
SEGMENT_WEIGHTS = [0.10, 0.36, 0.16, 0.08, 0.18, 0.12]
CHANNELS = ['Organic', 'Paid Search', 'Social Media', 'Referral', 'App Store', 'Offline']
AGE_BANDS = ['18-24', '25-30', '31-35', '36-45', '46+']
PRICE_SEGMENTS = ['Budget', 'Mid-Range', 'Premium']
INTENTS = ['specific_restaurant', 'specific_dish', 'cuisine_browse', 'vague_craving', 'reorder', 'deal_hunting', 'exploration']


def generate_restaurants():
    """Generate 500+ synthetic restaurants with realistic attributes."""
    print("Generating restaurants...")
    restaurants = []
    
    restaurant_prefixes = ['Royal', 'Golden', 'Spice', 'The', 'New', 'Fresh', 'Green', 'Red', 'Blue', 'Silver',
                           'Grand', 'Little', 'Big', 'Hot', 'Cool', 'Classic', 'Modern', 'Urban', 'Desi', 'Fusion']
    restaurant_suffixes = ['Kitchen', 'Cafe', 'Grill', 'House', 'Corner', 'Express', 'Point', 'Hub', 'Box', 'Stop',
                           'Palace', 'Dhaba', 'Bistro', 'Diner', 'Bar', 'Bowl', 'Plate', 'Table', 'Bites', 'Treats']
    
    for i in range(NUM_RESTAURANTS):
        cuisine = CUISINES[i % len(CUISINES)]
        city = CITIES[i % len(CITIES)]
        price_segment = np.random.choice(PRICE_SEGMENTS, p=[0.35, 0.45, 0.20])
        
        # Rating distribution — slightly right-skewed (most restaurants are 3.5-4.5)
        rating = np.clip(np.random.normal(3.9, 0.5), 2.0, 5.0)
        rating = round(rating, 1)
        
        # Review count correlates loosely with rating
        review_base = 50 + int(np.random.exponential(300))
        review_count = int(review_base * (0.8 + rating / 10))
        
        # Pricing
        aov_map = {'Budget': (150, 280), 'Mid-Range': (280, 500), 'Premium': (500, 900)}
        aov_range = aov_map[price_segment]
        avg_order_value = int(np.random.uniform(*aov_range))
        
        # Delivery metrics
        distance = round(np.random.uniform(0.5, 10.0), 1)
        avg_prep_time = int(np.random.uniform(10, 30))
        avg_delivery_time = int(8 + distance * 2 + np.random.uniform(-3, 5))
        
        # ETA reliability correlates with rating
        eta_base = 0.55 + rating * 0.08
        eta_reliability = min(0.98, max(0.50, eta_base + np.random.uniform(-0.08, 0.08)))
        eta_reliability = round(eta_reliability, 2)
        
        # Availability (most restaurants are available most of the time)
        availability = round(np.random.uniform(0.75, 0.98), 2)
        
        # Discount rate — budget restaurants discount more
        discount_map = {'Budget': (5, 25), 'Mid-Range': (0, 15), 'Premium': (0, 8)}
        discount_range = discount_map[price_segment]
        discount_rate = int(np.random.uniform(*discount_range))
        
        # Ad spend — premium restaurants spend more
        ad_spend = int(np.random.exponential(500) * (1 + PRICE_SEGMENTS.index(price_segment) * 0.5))
        
        name = f"{random.choice(restaurant_prefixes)} {random.choice(restaurant_suffixes)} {i+1}"
        
        restaurants.append({
            'restaurant_id': f'R{str(i+1).zfill(4)}',
            'restaurant_name': name,
            'city': city,
            'cuisine': cuisine,
            'rating': rating,
            'review_count': review_count,
            'avg_order_value': avg_order_value,
            'distance': distance,
            'avg_prep_time': avg_prep_time,
            'avg_delivery_time': avg_delivery_time,
            'eta_reliability': eta_reliability,
            'availability': availability,
            'price_segment': price_segment,
            'discount_rate': discount_rate,
            'ad_spend': ad_spend
        })
    
    df = pd.DataFrame(restaurants)
    df.to_csv(os.path.join(OUTPUT_DIR, 'restaurants.csv'), index=False)
    print(f"  → {len(df)} restaurants generated")
    return df


def generate_users():
    """Generate 5,000+ synthetic users with behavioral attributes."""
    print("Generating users...")
    users = []
    
    base_date = datetime(2024, 1, 1)
    
    for i in range(NUM_USERS):
        segment = np.random.choice(SEGMENTS, p=SEGMENT_WEIGHTS)
        city = np.random.choice(CITIES)
        age_band = np.random.choice(AGE_BANDS, p=[0.25, 0.30, 0.22, 0.15, 0.08])
        channel = np.random.choice(CHANNELS, p=[0.25, 0.20, 0.18, 0.15, 0.15, 0.07])
        
        # Signup date — newer users more likely to be "New" segment
        if segment == 'New':
            signup_date = base_date + timedelta(days=random.randint(500, 700))
        else:
            signup_date = base_date + timedelta(days=random.randint(0, 600))
        
        # Order frequency depends on segment
        freq_map = {
            'Heavy': (4.0, 8.0),
            'Occasional': (1.0, 3.0),
            'Discount-Driven': (2.0, 4.0),
            'Premium': (3.0, 6.0),
            'Churn-Risk': (0.0, 1.0),
            'New': (0.5, 2.0)
        }
        freq_range = freq_map[segment]
        orders_30d = max(0, int(np.random.uniform(*freq_range)))
        orders_90d = orders_30d * 3 + random.randint(-2, 5)
        orders_90d = max(orders_30d, orders_90d)
        
        # AOV depends on segment
        aov_map = {
            'Heavy': (350, 500),
            'Occasional': (300, 450),
            'Discount-Driven': (200, 350),
            'Premium': (500, 800),
            'Churn-Risk': (250, 400),
            'New': (280, 420)
        }
        aov_range = aov_map[segment]
        avg_order_value = int(np.random.uniform(*aov_range))
        
        # Discount dependency
        disc_map = {
            'Heavy': (0.1, 0.3),
            'Occasional': (0.2, 0.5),
            'Discount-Driven': (0.7, 1.0),
            'Premium': (0.0, 0.15),
            'Churn-Risk': (0.3, 0.7),
            'New': (0.3, 0.6)
        }
        disc_range = disc_map[segment]
        discount_dependency = round(np.random.uniform(*disc_range), 2)
        
        # Price sensitivity
        price_map = {
            'Heavy': 'Low',
            'Occasional': np.random.choice(['Low', 'Medium'], p=[0.3, 0.7]),
            'Discount-Driven': np.random.choice(['High', 'Very High'], p=[0.4, 0.6]),
            'Premium': 'Very Low',
            'Churn-Risk': np.random.choice(['Medium', 'High'], p=[0.5, 0.5]),
            'New': np.random.choice(['Medium', 'Medium-High'], p=[0.6, 0.4])
        }
        price_sensitivity = price_map[segment]
        
        preferred_cuisine = np.random.choice(CUISINES)
        
        # Days since last order
        if segment == 'Churn-Risk':
            days_since = random.randint(30, 120)
        elif segment == 'Heavy':
            days_since = random.randint(0, 3)
        elif segment == 'New':
            days_since = random.randint(5, 30)
        else:
            days_since = random.randint(2, 25)
        
        # Retention status
        retention_map = {
            'Heavy': 'Active',
            'Occasional': np.random.choice(['Active', 'At Risk'], p=[0.7, 0.3]),
            'Discount-Driven': np.random.choice(['Active', 'At Risk'], p=[0.55, 0.45]),
            'Premium': 'Active',
            'Churn-Risk': np.random.choice(['At Risk', 'Churned'], p=[0.4, 0.6]),
            'New': np.random.choice(['Active', 'At Risk'], p=[0.65, 0.35])
        }
        retention_status = retention_map[segment]
        
        users.append({
            'user_id': f'U{str(i+1).zfill(5)}',
            'city': city,
            'age_band': age_band,
            'signup_date': signup_date.strftime('%Y-%m-%d'),
            'acquisition_channel': channel,
            'customer_segment': segment,
            'orders_last_30d': orders_30d,
            'orders_last_90d': orders_90d,
            'avg_order_value': avg_order_value,
            'discount_dependency': discount_dependency,
            'preferred_cuisine': preferred_cuisine,
            'price_sensitivity': price_sensitivity,
            'days_since_last_order': days_since,
            'retention_status': retention_status
        })
    
    df = pd.DataFrame(users)
    df.to_csv(os.path.join(OUTPUT_DIR, 'users.csv'), index=False)
    print(f"  → {len(df)} users generated")
    return df


def generate_orders(users_df, restaurants_df):
    """Generate 50,000+ synthetic orders with realistic economic attributes."""
    print("Generating orders...")
    orders = []
    
    user_ids = users_df['user_id'].values
    restaurant_ids = restaurants_df['restaurant_id'].values
    
    start_date = datetime(2025, 1, 1)
    end_date = datetime(2025, 12, 31)
    
    for i in range(NUM_ORDERS):
        user_id = np.random.choice(user_ids)
        user = users_df[users_df['user_id'] == user_id].iloc[0]
        
        # Restaurant selection — prefer restaurants matching user's cuisine preference
        cuisine_match = restaurants_df[restaurants_df['cuisine'] == user['preferred_cuisine']]
        if len(cuisine_match) > 0 and random.random() < 0.6:
            restaurant_id = np.random.choice(cuisine_match['restaurant_id'].values)
        else:
            restaurant_id = np.random.choice(restaurant_ids)
        
        restaurant = restaurants_df[restaurants_df['restaurant_id'] == restaurant_id].iloc[0]
        
        # Order timing
        order_date = start_date + timedelta(days=random.randint(0, 364))
        hour_probs = [1, 0.5, 0.5, 0.5, 0.5, 1, 2, 3, 5, 4, 3, 5,
                      8, 9, 7, 4, 3, 4, 6.5, 9, 10, 8.5, 5.5, 3.5]
        hour_probs = [p / sum(hour_probs) for p in hour_probs]
        hour = np.random.choice(range(24), p=hour_probs)
        order_time = f"{hour:02d}:{random.randint(0,59):02d}"
        
        # Order value
        base_ov = restaurant['avg_order_value']
        order_value = max(100, int(base_ov * np.random.uniform(0.7, 1.4)))
        
        # Fees
        delivery_fee = max(0, int(15 + restaurant['distance'] * 3 + np.random.uniform(-5, 10)))
        platform_fee = 15
        
        # Discount — depends on user's discount dependency and restaurant's discount rate
        discount_prob = user['discount_dependency'] * 0.7 + restaurant['discount_rate'] / 100 * 0.3
        if random.random() < discount_prob:
            discount = int(order_value * np.random.uniform(0.05, 0.25))
        else:
            discount = 0
        
        # Restaurant commission
        commission_rate = np.random.uniform(0.18, 0.28)
        restaurant_commission = round(order_value * commission_rate, 2)
        
        # Costs
        delivery_cost = max(30, int(25 + restaurant['distance'] * 3.5 + np.random.uniform(-5, 15)))
        payment_cost = round(order_value * 0.02, 2)
        
        # Refund & support costs — occasional
        refund_cost = int(order_value * 0.15) if random.random() < 0.04 else 0
        support_cost = random.choice([0, 0, 0, 0, 0, 3, 5, 8]) 
        
        # Delivery time
        promised_time = restaurant['avg_prep_time'] + restaurant['avg_delivery_time']
        actual_time = int(promised_time * np.random.uniform(0.8, 1.3 + (1 - restaurant['eta_reliability']) * 0.5))
        late_delivery = 1 if actual_time > promised_time * 1.1 else 0
        
        # Cancellation — correlated with high delivery time, low rating
        cancel_prob = 0.02 + (1 - restaurant['eta_reliability']) * 0.05
        cancelled = 1 if random.random() < cancel_prob else 0
        successful_order = 0 if cancelled else 1
        
        # Rating — correlates with delivery experience and food quality
        if successful_order:
            base_rating = restaurant['rating'] - 0.3 + np.random.uniform(-0.5, 0.5)
            if late_delivery:
                base_rating -= np.random.uniform(0.3, 1.0)
            rating = max(1.0, min(5.0, round(base_rating, 1)))
        else:
            rating = None
        
        # Repeat within 30 days — correlates with rating, ETA reliability, and user segment
        if successful_order and rating:
            repeat_base = 0.3
            repeat_base += (rating - 3) * 0.1  # Higher rating → more repeat
            repeat_base += (restaurant['eta_reliability'] - 0.7) * 0.2  # Better reliability → more repeat
            repeat_base -= user['discount_dependency'] * 0.1  # Discount-dependent → less organic repeat
            if user['customer_segment'] == 'Heavy':
                repeat_base += 0.15
            elif user['customer_segment'] == 'Churn-Risk':
                repeat_base -= 0.15
            repeat_within_30 = 1 if random.random() < max(0.05, min(0.85, repeat_base)) else 0
        else:
            repeat_within_30 = 0
        
        orders.append({
            'order_id': f'O{str(i+1).zfill(6)}',
            'user_id': user_id,
            'restaurant_id': restaurant_id,
            'order_date': order_date.strftime('%Y-%m-%d'),
            'order_time': order_time,
            'city': user['city'],
            'cuisine': restaurant['cuisine'],
            'order_value': order_value,
            'delivery_fee': delivery_fee,
            'platform_fee': platform_fee,
            'discount': discount,
            'restaurant_commission': restaurant_commission,
            'delivery_cost': delivery_cost,
            'payment_cost': payment_cost,
            'refund_cost': refund_cost,
            'support_cost': support_cost,
            'delivery_time': actual_time,
            'promised_delivery_time': promised_time,
            'late_delivery': late_delivery,
            'cancelled': cancelled,
            'successful_order': successful_order,
            'rating': rating,
            'repeat_within_30_days': repeat_within_30
        })
    
    df = pd.DataFrame(orders)
    df.to_csv(os.path.join(OUTPUT_DIR, 'orders.csv'), index=False)
    print(f"  → {len(df)} orders generated")
    return df


def generate_sessions(users_df):
    """Generate 100,000+ synthetic sessions with funnel events."""
    print("Generating sessions...")
    sessions = []
    
    user_ids = users_df['user_id'].values
    
    for i in range(NUM_SESSIONS):
        user_id = np.random.choice(user_ids)
        user = users_df[users_df['user_id'] == user_id].iloc[0]
        
        timestamp = datetime(2025, 1, 1) + timedelta(
            days=random.randint(0, 364),
            hours=random.randint(6, 23),
            minutes=random.randint(0, 59)
        )
        
        intent = np.random.choice(INTENTS, p=[0.15, 0.10, 0.15, 0.25, 0.12, 0.13, 0.10])
        recommendation_exposed = 1 if random.random() < 0.4 else 0
        
        # Funnel progression — each step has a probability based on intent and user type
        restaurants_shown = random.randint(5, 50)
        
        # Click probability depends on intent clarity
        click_prob = {'specific_restaurant': 0.85, 'specific_dish': 0.75, 'cuisine_browse': 0.65,
                      'vague_craving': 0.50, 'reorder': 0.90, 'deal_hunting': 0.70, 'exploration': 0.55}
        
        restaurant_clicks = max(0, int(restaurants_shown * np.random.uniform(0, click_prob.get(intent, 0.5)) * 0.3))
        menu_views = max(0, int(restaurant_clicks * np.random.uniform(0.5, 0.9)))
        cart_created = 1 if menu_views > 0 and random.random() < 0.55 else 0
        checkout_started = 1 if cart_created and random.random() < 0.75 else 0
        order_completed = 1 if checkout_started and random.random() < 0.80 else 0
        
        # Session duration correlates with funnel depth
        base_duration = 30 + restaurant_clicks * 15 + menu_views * 25
        if order_completed:
            base_duration += random.randint(60, 180)
        session_duration = max(10, int(base_duration + np.random.uniform(-30, 60)))
        
        sessions.append({
            'session_id': f'S{str(i+1).zfill(7)}',
            'user_id': user_id,
            'timestamp': timestamp.strftime('%Y-%m-%d %H:%M'),
            'intent': intent,
            'restaurants_shown': restaurants_shown,
            'restaurant_clicks': restaurant_clicks,
            'menu_views': menu_views,
            'cart_created': cart_created,
            'checkout_started': checkout_started,
            'order_completed': order_completed,
            'session_duration': session_duration,
            'recommendation_exposed': recommendation_exposed
        })
    
    df = pd.DataFrame(sessions)
    df.to_csv(os.path.join(OUTPUT_DIR, 'sessions.csv'), index=False)
    print(f"  → {len(df)} sessions generated")
    return df


def generate_experiments(users_df):
    """Generate A/B test simulation data."""
    print("Generating experiment data...")
    
    # Sample users for experiment
    experiment_users = users_df.sample(n=min(2000, len(users_df)), random_state=42)
    
    experiments = []
    for _, user in experiment_users.iterrows():
        group = np.random.choice(['control', 'treatment'])
        
        # Base conversion depends on user segment
        base_conv = {
            'Heavy': 0.65, 'Occasional': 0.35, 'Discount-Driven': 0.45,
            'Premium': 0.55, 'Churn-Risk': 0.15, 'New': 0.30
        }
        
        conv = base_conv.get(user['customer_segment'], 0.35)
        if group == 'treatment':
            conv *= np.random.uniform(1.02, 1.12)  # 2-12% lift
        
        ordered = 1 if random.random() < conv else 0
        
        experiments.append({
            'user_id': user['user_id'],
            'experiment_group': group,
            'customer_segment': user['customer_segment'],
            'sessions': random.randint(3, 30),
            'orders': random.randint(0, 8) if ordered else 0,
            'gmv': random.randint(300, 3000) if ordered else 0,
            'recommendation_clicks': random.randint(0, 15) if group == 'treatment' else 0,
            'converted': ordered
        })
    
    df = pd.DataFrame(experiments)
    df.to_csv(os.path.join(OUTPUT_DIR, 'experiments.csv'), index=False)
    print(f"  → {len(df)} experiment records generated")
    return df


def main():
    print("=" * 60)
    print("ZOMATO PM CASE STUDY — SYNTHETIC DATA GENERATION")
    print("=" * 60)
    print()
    print("⚠ DISCLAIMER: Synthetic dataset created for portfolio analysis.")
    print("   It does NOT represent Zomato's internal data.")
    print()
    
    restaurants_df = generate_restaurants()
    users_df = generate_users()
    orders_df = generate_orders(users_df, restaurants_df)
    sessions_df = generate_sessions(users_df)
    experiments_df = generate_experiments(users_df)
    
    print()
    print("=" * 60)
    print("DATA GENERATION COMPLETE")
    print("=" * 60)
    print(f"  Users:       {len(users_df):,}")
    print(f"  Restaurants:  {len(restaurants_df):,}")
    print(f"  Orders:       {len(orders_df):,}")
    print(f"  Sessions:     {len(sessions_df):,}")
    print(f"  Experiments:  {len(experiments_df):,}")
    print(f"  Output:       {OUTPUT_DIR}")
    print()
    
    # Quick validation
    print("VALIDATION:")
    print(f"  Order values: ₹{orders_df['order_value'].min()} - ₹{orders_df['order_value'].max()} (mean: ₹{orders_df['order_value'].mean():.0f})")
    print(f"  Successful orders: {orders_df['successful_order'].mean()*100:.1f}%")
    print(f"  Late deliveries: {orders_df['late_delivery'].mean()*100:.1f}%")
    print(f"  Avg rating: {orders_df['rating'].dropna().mean():.2f}")
    print(f"  Repeat within 30d: {orders_df['repeat_within_30_days'].mean()*100:.1f}%")
    print(f"  Session-to-order: {sessions_df['order_completed'].mean()*100:.1f}%")


if __name__ == '__main__':
    main()
