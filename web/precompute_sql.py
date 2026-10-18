#!/usr/bin/env python3
"""
Pre-compute SQL query results from CSV data and output sql-data.js
"""
import csv
import json
import os
from collections import defaultdict

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_csv(filename):
    rows = []
    with open(os.path.join(DATA_DIR, filename), 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows

print("Loading CSVs...")
orders = load_csv('orders.csv')
users = load_csv('users.csv')
sessions = load_csv('sessions.csv')
restaurants = load_csv('restaurants.csv')
experiments = load_csv('experiments.csv')
print(f"Loaded: {len(orders)} orders, {len(users)} users, {len(sessions)} sessions, {len(restaurants)} restaurants, {len(experiments)} experiments")

results = {}

# ============================================================
# QUERY 1: Funnel Analysis from sessions
# ============================================================
total_sessions = len(sessions)
discovery = sum(1 for s in sessions if int(s['restaurant_clicks']) > 0)
restaurant_view = sum(1 for s in sessions if int(s['menu_views']) > 0)
cart = sum(1 for s in sessions if int(s['cart_created']) == 1)
checkout = sum(1 for s in sessions if int(s['checkout_started']) == 1)
order_completed = sum(1 for s in sessions if int(s['order_completed']) == 1)

results['q1_funnel'] = {
    'steps': [
        {'stage': 'App Open (Sessions)', 'count': total_sessions, 'pct': 100.0},
        {'stage': 'Restaurant Click', 'count': discovery, 'pct': round(discovery/total_sessions*100, 1)},
        {'stage': 'Menu View', 'count': restaurant_view, 'pct': round(restaurant_view/total_sessions*100, 1)},
        {'stage': 'Cart Created', 'count': cart, 'pct': round(cart/total_sessions*100, 1)},
        {'stage': 'Checkout Started', 'count': checkout, 'pct': round(checkout/total_sessions*100, 1)},
        {'stage': 'Order Completed', 'count': order_completed, 'pct': round(order_completed/total_sessions*100, 1)},
    ]
}
print("Q1 done: Funnel")

# ============================================================
# QUERY 2: Intent vs Conversion
# ============================================================
intent_stats = defaultdict(lambda: {'total': 0, 'converted': 0})
for s in sessions:
    intent = s['intent']
    intent_stats[intent]['total'] += 1
    if int(s['order_completed']) == 1:
        intent_stats[intent]['converted'] += 1

results['q2_intent'] = []
for intent, stats in sorted(intent_stats.items(), key=lambda x: x[1]['converted']/max(x[1]['total'],1)):
    results['q2_intent'].append({
        'intent': intent,
        'sessions': stats['total'],
        'converted': stats['converted'],
        'conversion_rate': round(stats['converted']/max(stats['total'],1)*100, 2)
    })
print("Q2 done: Intent vs Conversion")

# ============================================================
# QUERY 3: Segment Analysis
# ============================================================
segment_stats = defaultdict(lambda: {'users': 0, 'total_orders': 0, 'total_gmv': 0, 'total_discount': 0, 'repeat_orders': 0})
user_segment_map = {u['user_id']: u['customer_segment'] for u in users}

for o in orders:
    seg = user_segment_map.get(o['user_id'], 'Unknown')
    segment_stats[seg]['total_orders'] += 1
    if int(o['successful_order']) == 1:
        segment_stats[seg]['total_gmv'] += float(o['order_value'])
        segment_stats[seg]['total_discount'] += float(o['discount'])
        if int(o['repeat_within_30_days']) == 1:
            segment_stats[seg]['repeat_orders'] += 1

for u in users:
    segment_stats[u['customer_segment']]['users'] += 1

results['q3_segments'] = []
for seg, stats in segment_stats.items():
    if stats['users'] == 0:
        continue
    avg_orders = round(stats['total_orders'] / stats['users'], 1) if stats['users'] > 0 else 0
    avg_aov = round(stats['total_gmv'] / max(stats['total_orders'], 1), 0)
    avg_discount = round(stats['total_discount'] / max(stats['total_orders'], 1), 0)
    repeat_rate = round(stats['repeat_orders'] / max(stats['total_orders'], 1) * 100, 1)
    results['q3_segments'].append({
        'segment': seg,
        'users': stats['users'],
        'pct_base': round(stats['users'] / len(users) * 100, 1),
        'total_orders': stats['total_orders'],
        'avg_orders_per_user': avg_orders,
        'avg_aov': avg_aov,
        'avg_discount': avg_discount,
        'repeat_rate': repeat_rate
    })
results['q3_segments'].sort(key=lambda x: x['avg_orders_per_user'], reverse=True)
print("Q3 done: Segments")

# ============================================================
# QUERY 4: Browsing Depth vs Conversion
# ============================================================
click_buckets = defaultdict(lambda: {'sessions': 0, 'converted': 0})
for s in sessions:
    clicks = int(s['restaurant_clicks'])
    if clicks == 0:
        bucket = '0 clicks'
    elif clicks <= 2:
        bucket = '1-2 clicks'
    elif clicks <= 5:
        bucket = '3-5 clicks'
    elif clicks <= 10:
        bucket = '6-10 clicks'
    else:
        bucket = '11+ clicks'
    click_buckets[bucket]['sessions'] += 1
    if int(s['order_completed']) == 1:
        click_buckets[bucket]['converted'] += 1

bucket_order = ['0 clicks', '1-2 clicks', '3-5 clicks', '6-10 clicks', '11+ clicks']
results['q4_browsing'] = []
for b in bucket_order:
    stats = click_buckets[b]
    results['q4_browsing'].append({
        'bucket': b,
        'sessions': stats['sessions'],
        'converted': stats['converted'],
        'conversion_rate': round(stats['converted']/max(stats['sessions'],1)*100, 2)
    })
print("Q4 done: Browsing Depth")

# ============================================================
# QUERY 5: Discount Dependency vs Retention
# ============================================================
dd_buckets = defaultdict(lambda: {'users': 0, 'active': 0, 'at_risk': 0, 'churned': 0})
for u in users:
    dd = float(u['discount_dependency'])
    if dd < 0.2:
        bucket = 'Low (<20%)'
    elif dd < 0.4:
        bucket = 'Medium (20-40%)'
    elif dd < 0.6:
        bucket = 'High (40-60%)'
    elif dd < 0.8:
        bucket = 'Very High (60-80%)'
    else:
        bucket = 'Extreme (80%+)'
    dd_buckets[bucket]['users'] += 1
    status = u['retention_status']
    if status == 'Active':
        dd_buckets[bucket]['active'] += 1
    elif status == 'At Risk':
        dd_buckets[bucket]['at_risk'] += 1
    else:
        dd_buckets[bucket]['churned'] += 1

dd_order = ['Low (<20%)', 'Medium (20-40%)', 'High (40-60%)', 'Very High (60-80%)', 'Extreme (80%+)']
results['q5_discount'] = []
for b in dd_order:
    stats = dd_buckets[b]
    results['q5_discount'].append({
        'bucket': b,
        'users': stats['users'],
        'active_pct': round(stats['active']/max(stats['users'],1)*100, 1),
        'at_risk_pct': round(stats['at_risk']/max(stats['users'],1)*100, 1),
        'churned_pct': round(stats['churned']/max(stats['users'],1)*100, 1)
    })
print("Q5 done: Discount vs Retention")

# ============================================================
# QUERY 6: ETA Reliability vs Repeat
# ============================================================
eta_stats = {'on_time': {'orders': 0, 'repeats': 0}, 'late': {'orders': 0, 'repeats': 0}}
for o in orders:
    if int(o['successful_order']) != 1:
        continue
    key = 'late' if int(o['late_delivery']) == 1 else 'on_time'
    eta_stats[key]['orders'] += 1
    if int(o['repeat_within_30_days']) == 1:
        eta_stats[key]['repeats'] += 1

results['q6_eta'] = {
    'on_time': {
        'orders': eta_stats['on_time']['orders'],
        'repeat_rate': round(eta_stats['on_time']['repeats']/max(eta_stats['on_time']['orders'],1)*100, 1)
    },
    'late': {
        'orders': eta_stats['late']['orders'],
        'repeat_rate': round(eta_stats['late']['repeats']/max(eta_stats['late']['orders'],1)*100, 1)
    }
}
print("Q6 done: ETA vs Repeat")

# ============================================================
# QUERY 7: Cuisine Repeat Rate
# ============================================================
cuisine_stats = defaultdict(lambda: {'orders': 0, 'repeats': 0})
for o in orders:
    if int(o['successful_order']) != 1:
        continue
    cuisine_stats[o['cuisine']]['orders'] += 1
    if int(o['repeat_within_30_days']) == 1:
        cuisine_stats[o['cuisine']]['repeats'] += 1

results['q7_cuisine'] = []
for cuisine, stats in sorted(cuisine_stats.items(), key=lambda x: x[1]['repeats']/max(x[1]['orders'],1), reverse=True):
    results['q7_cuisine'].append({
        'cuisine': cuisine,
        'orders': stats['orders'],
        'repeat_rate': round(stats['repeats']/max(stats['orders'],1)*100, 1)
    })
print("Q7 done: Cuisine Repeat Rate")

# ============================================================
# QUERY 8: TMZ Candidate Identification
# ============================================================
# Occasional users with high browsing depth but low conversion
user_session_stats = defaultdict(lambda: {'sessions': 0, 'clicks_total': 0, 'orders': 0, 'duration_total': 0})
for s in sessions:
    uid = s['user_id']
    user_session_stats[uid]['sessions'] += 1
    user_session_stats[uid]['clicks_total'] += int(s['restaurant_clicks'])
    user_session_stats[uid]['orders'] += int(s['order_completed'])
    user_session_stats[uid]['duration_total'] += int(s['session_duration'])

tmz_candidates = 0
tmz_details = {'total_occasional': 0, 'high_browse_low_convert': 0, 'avg_clicks': 0, 'avg_conversion': 0}
candidate_clicks = []
candidate_conversions = []

for u in users:
    if u['customer_segment'] != 'Occasional':
        continue
    tmz_details['total_occasional'] += 1
    ss = user_session_stats.get(u['user_id'])
    if not ss or ss['sessions'] == 0:
        continue
    avg_clicks = ss['clicks_total'] / ss['sessions']
    conversion = ss['orders'] / ss['sessions']
    # High browsing (>2 avg clicks) but low conversion (<30%)
    if avg_clicks > 2 and conversion < 0.3:
        tmz_candidates += 1
        candidate_clicks.append(avg_clicks)
        candidate_conversions.append(conversion)

tmz_details['high_browse_low_convert'] = tmz_candidates
tmz_details['avg_clicks'] = round(sum(candidate_clicks)/max(len(candidate_clicks),1), 1) if candidate_clicks else 0
tmz_details['avg_conversion'] = round(sum(candidate_conversions)/max(len(candidate_conversions),1)*100, 1) if candidate_conversions else 0

results['q8_tmz_candidates'] = tmz_details
print(f"Q8 done: TMZ Candidates = {tmz_candidates}")

# ============================================================
# QUERY 9: Per-Order Unit Economics
# ============================================================
successful = [o for o in orders if int(o['successful_order']) == 1]
total_revenue = sum(float(o['restaurant_commission']) + float(o['delivery_fee']) + float(o['platform_fee']) for o in successful)
total_cost = sum(float(o['delivery_cost']) + float(o['payment_cost']) + float(o['discount']) + float(o['refund_cost']) + float(o['support_cost']) for o in successful)
total_gmv = sum(float(o['order_value']) for o in successful)

n = len(successful)
results['q9_economics'] = {
    'total_orders': n,
    'avg_order_value': round(total_gmv / n, 0),
    'avg_revenue': round(total_revenue / n, 1),
    'avg_cost': round(total_cost / n, 1),
    'avg_contribution': round((total_revenue - total_cost) / n, 1),
    'contribution_margin_pct': round((total_revenue - total_cost) / total_gmv * 100, 1),
    'avg_commission': round(sum(float(o['restaurant_commission']) for o in successful) / n, 1),
    'avg_delivery_fee': round(sum(float(o['delivery_fee']) for o in successful) / n, 1),
    'avg_platform_fee': round(sum(float(o['platform_fee']) for o in successful) / n, 1),
    'avg_delivery_cost': round(sum(float(o['delivery_cost']) for o in successful) / n, 1),
    'avg_payment_cost': round(sum(float(o['payment_cost']) for o in successful) / n, 1),
    'avg_discount': round(sum(float(o['discount']) for o in successful) / n, 1),
    'avg_refund': round(sum(float(o['refund_cost']) for o in successful) / n, 1),
    'avg_support': round(sum(float(o['support_cost']) for o in successful) / n, 1),
}
print("Q9 done: Unit Economics")

# ============================================================
# QUERY 10: Experiment Results
# ============================================================
exp_groups = defaultdict(lambda: {'users': 0, 'total_sessions': 0, 'total_orders': 0, 'total_gmv': 0, 'total_rec_clicks': 0, 'converted': 0})
for e in experiments:
    g = e['experiment_group']
    exp_groups[g]['users'] += 1
    exp_groups[g]['total_sessions'] += int(e['sessions'])
    exp_groups[g]['total_orders'] += int(e['orders'])
    exp_groups[g]['total_gmv'] += float(e['gmv']) if e['gmv'] else 0
    exp_groups[g]['total_rec_clicks'] += int(e['recommendation_clicks'])
    if int(e['converted']) == 1:
        exp_groups[g]['converted'] += 1

results['q10_experiment'] = {}
for group, stats in exp_groups.items():
    results['q10_experiment'][group] = {
        'users': stats['users'],
        'avg_sessions': round(stats['total_sessions']/max(stats['users'],1), 1),
        'avg_orders': round(stats['total_orders']/max(stats['users'],1), 2),
        'avg_gmv': round(stats['total_gmv']/max(stats['users'],1), 0),
        'conversion_rate': round(stats['converted']/max(stats['users'],1)*100, 1),
        'avg_rec_clicks': round(stats['total_rec_clicks']/max(stats['users'],1), 1)
    }
print("Q10 done: Experiment")

# ============================================================
# OUTPUT
# ============================================================
output = f"""// ============================================================
// SQL ANALYTICS — PRE-COMPUTED QUERY RESULTS
// Generated from synthetic CSV data (5K users, 50K orders, 100K sessions)
// ⚠ SYNTHETIC DATA — Does not represent Zomato internal data
// ============================================================

const SQL_RESULTS = {json.dumps(results, indent=2)};
"""

output_path = os.path.join(os.path.dirname(__file__), 'sql-data.js')
with open(output_path, 'w') as f:
    f.write(output)

print(f"\n✅ Written to {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
