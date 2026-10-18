// ============================================================
// ZOMATO PM CASE STUDY — APPLICATION LOGIC
// Too Maaa Zooo — Interactive Features & Recommendation Engine
// ============================================================

// ============================================================
// GLOBAL STATE
// ============================================================
const STATE = {
  selectedMood: null,
  selectedBudget: null,
  selectedCuisine: null,
  selectedEta: null,
  selectedDiet: null,
  selectedDistance: null,
  selectedDiscovery: null,
  selectedProfile: null,
  showAlgorithm: false,
  weights: {
    preference: 30,
    quality: 20,
    etaReliability: 15,
    priceFit: 15,
    distance: 10,
    availability: 10,
    novelty: 0
  },
  defaultWeights: { preference: 30, quality: 20, etaReliability: 15, priceFit: 15, distance: 10, availability: 10, novelty: 0 },
  beforeRankings: [],
  charts: {}
};

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroAnimations();
  initFunnel();
  initSQLAnalysis();
  initNorthStar();
  initHypothesisTree();
  initDataCharts();
  initSegmentation();
  initTMZDemo();
  initAlgorithmPlayground();
  initExperiment();
  initUnitEconomics();
  initBusinessImpact();
  initRoadmap();
  initRisks();
  initFinalDecision();
  initDataWishlist();
  initSources();
  initScrollAnimations();
});

// ============================================================
// NAVIGATION
// ============================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const toggle = document.getElementById('nav-toggle');
  const linksContainer = document.getElementById('nav-links');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        linksContainer.classList.remove('mobile-open');
      }
    });
  });

  toggle.addEventListener('click', () => {
    linksContainer.classList.toggle('mobile-open');
  });

  // Active link tracking
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ============================================================
// HERO ANIMATIONS
// ============================================================
function initHeroAnimations() {
  const stats = document.querySelectorAll('#hero-stats .fade-in');
  setTimeout(() => {
    stats.forEach(s => s.classList.add('visible'));
  }, 300);
}

// ============================================================
// ACCORDION TOGGLE (used by Data & Sources section)
// ============================================================
function toggleAccordion(btn) {
  const item = btn.closest('.accordion-item');
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
  if (!wasActive) item.classList.add('active');
}


// ============================================================
// PRODUCT FUNNEL
// ============================================================
function initFunnel() {
  const container = document.getElementById('funnel-visual');
  const maxWidth = 100;
  container.innerHTML = FUNNEL_DATA.steps.map((step, i) => {
    const width = (step.pct / 100) * maxWidth;
    const nextStep = FUNNEL_DATA.steps[i + 1];
    const dropoff = nextStep ? (step.pct - nextStep.pct) : 0;
    const hue = 0 + (i * 15);
    return `
      <div class="funnel-step" style="width:${Math.max(width, 30)}%;background:hsla(${hue},65%,45%,0.15);border:1px solid hsla(${hue},65%,45%,0.3);">
        <span class="funnel-step-label">${step.name}</span>
        <span class="funnel-step-value" style="color:hsla(${hue},65%,55%,1);">${step.pct}%</span>
      </div>
      ${dropoff > 0 ? `<div class="funnel-drop">▼ ${dropoff.toFixed(1)}pp drop-off</div>` : ''}
    `;
  }).join('');

  // Funnel Chart
  const ctx = document.getElementById('funnel-chart');
  if (ctx) {
    STATE.charts.funnel = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: FUNNEL_DATA.steps.map(s => s.name),
        datasets: [{
          label: 'Conversion %',
          data: FUNNEL_DATA.steps.map(s => s.pct),
          backgroundColor: FUNNEL_DATA.steps.map((_, i) => `hsla(${i * 15}, 65%, 50%, 0.6)`),
          borderColor: FUNNEL_DATA.steps.map((_, i) => `hsla(${i * 15}, 65%, 50%, 1)`),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw}% of users reach this stage`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96', callback: v => v + '%' }, max: 100 },
          y: { grid: { display: false }, ticks: { color: '#333333', font: { size: 11 } } }
        }
      }
    });
  }
}

// ============================================================
// NORTH STAR
// ============================================================
function initNorthStar() {
  const table = document.getElementById('northstar-table');
  table.innerHTML = `
    <thead><tr><th>Metric</th><th>Pros</th><th>Cons</th><th>Verdict</th></tr></thead>
    <tbody>
      ${NORTH_STAR_ANALYSIS.comparison.map(m => `
        <tr>
          <td><strong>${m.metric}</strong></td>
          <td style="font-size:var(--text-xs);color:var(--text-secondary);">${m.pros}</td>
          <td style="font-size:var(--text-xs);color:var(--text-secondary);">${m.cons}</td>
          <td><span class="tag ${m.verdict.includes('★') ? 'tag-green' : ''}">${m.verdict}</span></td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// ============================================================
// SQL PRODUCT ANALYTICS
// ============================================================
function initSQLAnalysis() {
  const container = document.getElementById('sql-query-cards');
  if (!container || typeof SQL_QUERIES === 'undefined') return;

  container.innerHTML = SQL_QUERIES.map((q, i) => `
    <div class="sql-query-card">
      <div class="sql-query-header">
        <div class="sql-query-number">${i + 1}</div>
        <div class="sql-query-title">
          <div class="sql-query-category">${q.category}</div>
          <h3 class="sql-query-question">${q.question}</h3>
        </div>
        <div class="sql-query-actions">
          <button class="btn-sql toggle-sql-btn" onclick="toggleSqlPanel(this)">Show SQL</button>
          <button class="btn-sql toggle-insight-btn" onclick="toggleSqlInsight(this)">What did this tell us?</button>
        </div>
      </div>
      
      <div class="sql-code-panel">
        <div class="sql-code-inner">
          <div class="sql-code-label">
            <span>SQL Query</span>
            <span class="sql-code-badge">PostgreSQL</span>
          </div>
          <pre class="sql-code"><code>${formatSQL(q.sql)}</code></pre>
        </div>
      </div>
      
      <div class="sql-result-area">
        ${renderSqlResult(q)}
      </div>
      
      <div class="sql-insight-panel">
        <div class="sql-insight-inner">
          <div class="sql-insight-chain">
            <div class="sql-insight-step">
              <div class="sql-insight-step-icon finding">📊</div>
              <div class="sql-insight-step-content">
                <div class="sql-insight-step-label finding">FINDING</div>
                <div class="sql-insight-step-text">${q.finding}</div>
              </div>
            </div>
            <div class="sql-insight-step">
              <div class="sql-insight-step-icon interpretation">🧠</div>
              <div class="sql-insight-step-content">
                <div class="sql-insight-step-label interpretation">INTERPRETATION</div>
                <div class="sql-insight-step-text">${q.interpretation}</div>
              </div>
            </div>
            <div class="sql-insight-step">
              <div class="sql-insight-step-icon decision">💡</div>
              <div class="sql-insight-step-content">
                <div class="sql-insight-step-label decision">PRODUCT DECISION</div>
                <div class="sql-insight-step-text">${q.decision}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Render Charts after DOM injection
  setTimeout(() => {
    SQL_QUERIES.forEach(q => renderSqlChart(q));
  }, 100);
}

function toggleSqlPanel(btn) {
  const panel = btn.closest('.sql-query-card').querySelector('.sql-code-panel');
  const isVisible = panel.classList.contains('visible');
  panel.classList.toggle('visible');
  btn.classList.toggle('active');
  btn.textContent = isVisible ? 'Show SQL' : 'Hide SQL';
}

function toggleSqlInsight(btn) {
  const panel = btn.closest('.sql-query-card').querySelector('.sql-insight-panel');
  const isVisible = panel.classList.contains('visible');
  panel.classList.toggle('visible');
  btn.classList.toggle('active');
  
  // Also update the narrative flow active state when the first insight is viewed
  if (!isVisible) {
    const steps = document.querySelectorAll('.sql-narrative-step');
    if (steps.length > 2) {
      steps.forEach(s => s.classList.remove('active'));
      steps[2].classList.add('active'); // "FOUND"
    }
  }
}

function formatSQL(sql) {
  // Simple syntax highlighting for SQL
  return sql
    .replace(/\\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|UNION ALL|JOIN|LEFT JOIN|ON|HAVING|LIMIT|AS|CASE|WHEN|THEN|ELSE|END)\\b/g, '<span class="sql-kw">$1</span>')
    .replace(/\\b(COUNT|SUM|AVG|ROUND|MIN|MAX)\\b/g, '<span class="sql-fn">$1</span>')
    .replace(/'[^']*'/g, '<span class="sql-str">$&</span>')
    .replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, '<span class="sql-num">$1</span>');
}

function renderSqlResult(q) {
  const data = SQL_RESULTS[q.resultKey];
  if (!data) return '<div class="text-muted text-sm">Result dataset missing.</div>';

  if (q.chartType === 'segment_table') {
    return `
      <table class="sql-result-table">
        <thead><tr><th>Segment</th><th>Users</th><th>Avg Orders/Mo</th><th>Avg AOV</th><th>Avg Discount</th><th>30d Repeat</th></tr></thead>
        <tbody>
          ${data.map(r => `
            <tr class="${r.segment === 'Occasional' ? 'highlight-row' : ''}">
              <td>${r.segment}</td>
              <td>${r.users} (${r.pct_base}%)</td>
              <td>${r.avg_orders_per_user}</td>
              <td>₹${r.avg_aov}</td>
              <td>₹${r.avg_discount}</td>
              <td>${r.repeat_rate}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  if (q.chartType === 'candidate_summary') {
    return `
      <div class="sql-stat-row">
        <div class="sql-stat-item">
          <div class="sql-stat-value">${data.total_occasional}</div>
          <div class="sql-stat-label">Total Occasional Users</div>
        </div>
        <div class="sql-stat-item" style="border-color:var(--accent-primary);background:var(--accent-primary-subtle);">
          <div class="sql-stat-value text-accent">${data.high_browse_low_convert}</div>
          <div class="sql-stat-label">TMZ Candidate Profiles</div>
        </div>
        <div class="sql-stat-item">
          <div class="sql-stat-value">${data.avg_clicks}</div>
          <div class="sql-stat-label">Avg Restaurants Clicked</div>
        </div>
        <div class="sql-stat-item">
          <div class="sql-stat-value">${data.avg_conversion}%</div>
          <div class="sql-stat-label">Avg Conversion Rate</div>
        </div>
      </div>
    `;
  }
  
  if (q.chartType === 'economics_waterfall') {
    return `
      <div class="sql-stat-row">
        <div class="sql-stat-item">
          <div class="sql-stat-value">₹${data.avg_revenue}</div>
          <div class="sql-stat-label">Avg Revenue/Order</div>
        </div>
        <div class="sql-stat-item">
          <div class="sql-stat-value" style="color:var(--accent-secondary);">-₹${data.avg_cost}</div>
          <div class="sql-stat-label">Avg Var Cost/Order</div>
        </div>
        <div class="sql-stat-item" style="border-color:var(--accent-green);background:rgba(46, 213, 115, 0.05);">
          <div class="sql-stat-value text-green">₹${data.avg_contribution}</div>
          <div class="sql-stat-label">Contribution Margin</div>
        </div>
      </div>
      <table class="sql-result-table" style="max-width:400px;margin:0 auto;">
        <thead><tr><th>Cost Breakdown</th><th>Per Order</th></tr></thead>
        <tbody>
          <tr><td>Delivery Cost</td><td>₹${data.avg_delivery_cost}</td></tr>
          <tr><td>Discount</td><td>₹${data.avg_discount}</td></tr>
          <tr><td>Payment Gateway</td><td>₹${data.avg_payment_cost}</td></tr>
          <tr><td>Refunds & Support</td><td>₹${(data.avg_refund + data.avg_support).toFixed(1)}</td></tr>
        </tbody>
      </table>
    `;
  }
  
  if (q.chartType === 'experiment_table') {
    return `
      <table class="sql-result-table">
        <thead><tr><th>Group</th><th>Users</th><th>Orders/User</th><th>Conversion</th><th>Rec Clicks</th></tr></thead>
        <tbody>
          <tr class="highlight-row">
            <td>Treatment (TMZ)</td>
            <td>${data.treatment.users}</td>
            <td>${data.treatment.avg_orders}</td>
            <td><span class="tag tag-green">${data.treatment.conversion_rate}%</span></td>
            <td>${data.treatment.avg_rec_clicks}</td>
          </tr>
          <tr>
            <td>Control</td>
            <td>${data.control.users}</td>
            <td>${data.control.avg_orders}</td>
            <td>${data.control.conversion_rate}%</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Fallback to chart container
  return `<div class="sql-result-chart"><canvas id="sql-chart-${q.id}"></canvas></div>`;
}

function renderSqlChart(q) {
  const ctx = document.getElementById(`sql-chart-${q.id}`);
  if (!ctx) return;
  const data = SQL_RESULTS[q.resultKey];
  
  if (q.chartType === 'funnel_bar') {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.steps.map(s => s.stage),
        datasets: [{
          label: 'Retention %',
          data: data.steps.map(s => s.pct),
          backgroundColor: data.steps.map((_, i) => i === 0 ? '#1e293b' : (i===1 ? '#e23744' : 'rgba(160,160,184,0.4)')),
          borderRadius: 4
        }]
      },
      options: chartOptions('Conversion across funnel stages (%)')
    });
  } else if (q.chartType === 'intent_bar') {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.intent),
        datasets: [{
          label: 'Conversion Rate %',
          data: data.map(d => d.conversion_rate),
          backgroundColor: data.map(d => d.intent === 'vague_craving' ? '#e23744' : 'rgba(160,160,184,0.4)'),
          borderRadius: 4
        }]
      },
      options: chartOptions('Conversion rate by intent type (%)')
    });
  } else if (q.chartType === 'browsing_line') {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.bucket),
        datasets: [{
          label: 'Conversion Rate %',
          data: data.map(d => d.conversion_rate),
          borderColor: '#e23744',
          backgroundColor: 'rgba(226, 55, 68, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: chartOptions('Conversion rate vs restaurants clicked')
    });
  } else if (q.chartType === 'discount_stacked') {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.bucket),
        datasets: [
          { label: 'Active %', data: data.map(d => d.active_pct), backgroundColor: '#2ed573' },
          { label: 'At Risk %', data: data.map(d => d.at_risk_pct), backgroundColor: '#f59f00' },
          { label: 'Churned %', data: data.map(d => d.churned_pct), backgroundColor: '#e23744' }
        ]
      },
      options: {
        ...chartOptions('Retention breakdown by discount dependency'),
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true, max: 100 }
        }
      }
    });
  } else if (q.chartType === 'eta_comparison') {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['On-Time Delivery', 'Late Delivery'],
        datasets: [{
          label: '30-Day Repeat Rate %',
          data: [data.on_time.repeat_rate, data.late.repeat_rate],
          backgroundColor: ['#2ed573', '#e23744'],
          borderRadius: 4
        }]
      },
      options: chartOptions('Repeat order rate by delivery experience (%)')
    });
  } else if (q.chartType === 'cuisine_bar') {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.slice(0, 8).map(d => d.cuisine),
        datasets: [{
          label: '30-Day Repeat Rate %',
          data: data.slice(0, 8).map(d => d.repeat_rate),
          backgroundColor: data.slice(0, 8).map((d, i) => i < 3 ? '#2ed573' : 'rgba(160,160,184,0.4)'),
          borderRadius: 4
        }]
      },
      options: {
        ...chartOptions('Top 8 Cuisines by Repeat Rate (%)'),
        indexAxis: 'y'
      }
    });
  }
}

// ============================================================
// HYPOTHESIS TREE
// ============================================================

function initHypothesisTree() {
  const container = document.getElementById('hypothesis-grid');
  container.innerHTML = HYPOTHESIS_TREE.map(h => `
    <div class="card card-interactive" onclick="this.querySelector('.hypothesis-detail').classList.toggle('visible')">
      <div class="card-header">
        <div style="display:flex;align-items:center;gap:var(--space-sm);">
          <span style="font-size:var(--text-xl)">${h.icon}</span>
          <div class="card-title">${h.name}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;">
          <span class="tag ${h.confidence === 'High' ? 'tag-green' : h.confidence === 'Medium-High' ? 'tag-blue' : 'tag-gold'}">${h.confidence}</span>
        </div>
      </div>
      <p class="card-description">${h.hypothesis}</p>
      
      <div class="score-breakdown hypothesis-detail" style="display:none;">
        <div style="margin-bottom:var(--space-md);">
          <div class="journey-detail-label">Evidence</div>
          <div style="font-size:var(--text-sm);color:var(--text-secondary);">${h.evidence}</div>
        </div>
        <div style="margin-bottom:var(--space-md);">
          <div class="journey-detail-label">Data Required</div>
          <div style="font-size:var(--text-sm);color:var(--text-secondary);">${h.data_required}</div>
        </div>
        <div>
          <div class="journey-detail-label">Key Metric</div>
          <div style="font-size:var(--text-sm);color:var(--accent-primary);">${h.metric}</div>
        </div>
      </div>
      
      <div style="margin-top:var(--space-md);">
        <div class="score-bar-container" style="height:4px;">
          <div class="score-bar score-bar-red" style="width:${h.rating}%;"></div>
        </div>
        <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-top:4px;">Confidence score: ${h.rating}/100</div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// DATA ANALYSIS CHARTS
// ============================================================
function initDataCharts() {
  const segments = USER_SEGMENTS.segments;

  // Frequency Chart
  const freqCtx = document.getElementById('freq-chart');
  if (freqCtx) {
    STATE.charts.freq = new Chart(freqCtx, {
      type: 'bar',
      data: {
        labels: segments.map(s => s.name),
        datasets: [{
          label: 'Orders/Month',
          data: segments.map(s => s.orders_month),
          backgroundColor: segments.map(s => s.color + '99'),
          borderColor: segments.map(s => s.color),
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: chartOptions('Orders per Month')
    });
  }

  // Contribution Chart
  const contribCtx = document.getElementById('contribution-chart');
  if (contribCtx) {
    STATE.charts.contribution = new Chart(contribCtx, {
      type: 'bar',
      data: {
        labels: segments.map(s => s.name),
        datasets: [{
          label: 'Contribution/Order (₹)',
          data: segments.map(s => s.contribution_per_order),
          backgroundColor: segments.map(s => s.color + '99'),
          borderColor: segments.map(s => s.color),
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: chartOptions('₹ per Order')
    });
  }

  // Rating vs Repeat
  const ratingCtx = document.getElementById('rating-repeat-chart');
  if (ratingCtx) {
    const ratingData = [
      { x: 2.5, y: 18 }, { x: 3.0, y: 24 }, { x: 3.5, y: 32 },
      { x: 3.8, y: 38 }, { x: 4.0, y: 45 }, { x: 4.2, y: 52 },
      { x: 4.5, y: 62 }, { x: 4.8, y: 70 }, { x: 5.0, y: 75 }
    ];
    STATE.charts.ratingRepeat = new Chart(ratingCtx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Repeat Probability',
          data: ratingData,
          backgroundColor: '#e2374499',
          borderColor: '#e23744',
          pointRadius: 8,
          pointHoverRadius: 10
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: 'Order Rating', color: '#868e96' }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96' } },
          y: { title: { display: true, text: 'Repeat within 30 days (%)', color: '#868e96' }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96', callback: v => v + '%' } }
        }
      }
    });
  }

  // Discount vs Retention
  const discountCtx = document.getElementById('discount-retention-chart');
  if (discountCtx) {
    const labels = ['None', 'Low', 'Medium', 'High', 'Very High'];
    STATE.charts.discountRetention = new Chart(discountCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '30d Retention %',
          data: [72, 65, 52, 38, 28],
          borderColor: '#e23744',
          backgroundColor: 'rgba(226,55,68,0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#e23744'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: 'Discount Dependency Level', color: '#868e96' }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96' } },
          y: { title: { display: true, text: '30-Day Retention (%)', color: '#868e96' }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96', callback: v => v + '%' }, min: 0, max: 100 }
        }
      }
    });
  }
}

function chartOptions(yLabel) {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96', font: { size: 10 } } },
      y: { title: { display: true, text: yLabel, color: '#868e96' }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96' } }
    }
  };
}

// ============================================================
// USER SEGMENTATION
// ============================================================
function initSegmentation() {
  const segments = USER_SEGMENTS.segments;
  
  // Segment Cards
  const cardsContainer = document.getElementById('segment-cards');
  cardsContainer.innerHTML = segments.map(s => `
    <div class="card card-compact" style="border-left:3px solid ${s.color};">
      <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm);">
        <span style="font-size:var(--text-xl)">${s.icon}</span>
        <div class="card-title" style="margin-bottom:0;">${s.name}</div>
      </div>
      <p class="card-description">${s.description}</p>
      <div style="display:flex;gap:var(--space-md);margin-top:var(--space-md);">
        <div><div style="font-weight:700;color:${s.color};">${s.orders_month}</div><div style="font-size:10px;color:var(--text-tertiary);">Orders/mo</div></div>
        <div><div style="font-weight:700;color:${s.color};">₹${s.aov}</div><div style="font-size:10px;color:var(--text-tertiary);">AOV</div></div>
        <div><div style="font-weight:700;color:${s.color};">${s.retention_30d}%</div><div style="font-size:10px;color:var(--text-tertiary);">Retention</div></div>
      </div>
    </div>
  `).join('');

  // Segment Table
  const table = document.getElementById('segment-table');
  table.innerHTML = `
    <thead><tr>
      <th>Segment</th><th>Users</th><th>% Base</th><th>Orders/Mo</th><th>AOV</th>
      <th>Discount/Order</th><th>Contribution/Order</th><th>30d Retention</th><th>Est. LTV</th><th>Price Sensitivity</th>
    </tr></thead>
    <tbody>
      ${segments.map(s => `
        <tr style="${s.name === 'Occasional Users' ? 'background:var(--accent-primary-subtle);' : ''}">
          <td><strong>${s.icon} ${s.name}</strong></td>
          <td>${s.users.toLocaleString()}</td>
          <td>${s.pct}%</td>
          <td>${s.orders_month}</td>
          <td>₹${s.aov}</td>
          <td>₹${s.discount_per_order}</td>
          <td>₹${s.contribution_per_order}</td>
          <td>${s.retention_30d}%</td>
          <td>₹${s.est_ltv.toLocaleString()}</td>
          <td>${s.price_sensitivity}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
}



// ============================================================
// TOO MAAA ZOOO INTERACTIVE DEMO
// ============================================================
function initTMZDemo() {
  // Profile Selector
  const profileContainer = document.getElementById('profile-selector');
  profileContainer.innerHTML = USER_PROFILES.profiles.map(p => `
    <div class="profile-card" data-profile="${p.id}" onclick="selectProfile('${p.id}')">
      <div class="profile-avatar">${p.icon}</div>
      <div class="profile-name">${p.name}</div>
      <div class="profile-desc">${p.description}</div>
    </div>
  `).join('');

  // Mood Chips
  document.getElementById('mood-chips').innerHTML = MOOD_OPTIONS.map(m => `
    <div class="chip" data-mood="${m.id}" onclick="selectChip('mood','${m.id}',this)">
      <span class="chip-icon">${m.icon}</span> ${m.label}
    </div>
  `).join('');

  // Budget Chips
  document.getElementById('budget-chips').innerHTML = BUDGET_OPTIONS.map(b => `
    <div class="chip" data-budget="${b.id}" onclick="selectChip('budget','${b.id}',this)">₹ ${b.label}</div>
  `).join('');

  // Cuisine Chips
  document.getElementById('cuisine-chips').innerHTML = CUISINE_OPTIONS.map(c => `
    <div class="chip" data-cuisine="${c}" onclick="selectChip('cuisine','${c}',this)">${c}</div>
  `).join('');

  // ETA Chips
  document.getElementById('eta-chips').innerHTML = ETA_OPTIONS.map(e => `
    <div class="chip" data-eta="${e.id}" onclick="selectChip('eta','${e.id}',this)">⏱ ${e.label}</div>
  `).join('');

  // Diet Chips
  document.getElementById('diet-chips').innerHTML = DIET_OPTIONS.map(d => `
    <div class="chip" data-diet="${d}" onclick="selectChip('diet','${d}',this)">${d}</div>
  `).join('');

  // Distance Chips
  document.getElementById('distance-chips').innerHTML = DISTANCE_OPTIONS.map(d => `
    <div class="chip" data-distance="${d.id}" onclick="selectChip('distance','${d.id}',this)">📍 ${d.label}</div>
  `).join('');

  // Discovery Mode Chips
  document.getElementById('discovery-chips').innerHTML = DISCOVERY_MODES.map(d => `
    <div class="chip" data-discovery="${d}" onclick="selectChip('discovery','${d}',this)">🧭 ${d}</div>
  `).join('');

  // Show Recommendations button
  document.getElementById('show-recommendations').addEventListener('click', runRecommendations);

  // Algorithm Toggle
  document.getElementById('algo-toggle').addEventListener('click', () => {
    STATE.showAlgorithm = !STATE.showAlgorithm;
    document.getElementById('algo-toggle-track').classList.toggle('active', STATE.showAlgorithm);
    document.querySelectorAll('.score-breakdown.algo-detail').forEach(el => {
      el.classList.toggle('visible', STATE.showAlgorithm);
    });
  });

  // Run initial recommendations
  runRecommendations();
}

function selectProfile(profileId) {
  STATE.selectedProfile = USER_PROFILES.profiles.find(p => p.id === profileId);
  document.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.profile-card[data-profile="${profileId}"]`).classList.add('selected');

  // Apply profile preferences
  if (STATE.selectedProfile) {
    const p = STATE.selectedProfile;
    if (p.preferred_cuisines.length > 0) {
      selectChip('cuisine', p.preferred_cuisines[0],
        document.querySelector(`.chip[data-cuisine="${p.preferred_cuisines[0]}"]`));
    }
    const budgetMap = { 'Budget': 'b200', 'Mid-Range': 'b500', 'Premium': 'b800' };
    if (budgetMap[p.price_preference]) {
      selectChip('budget', budgetMap[p.price_preference],
        document.querySelector(`.chip[data-budget="${budgetMap[p.price_preference]}"]`));
    }
  }
  runRecommendations();
}

function selectChip(type, value, el) {
  const key = `selected${type.charAt(0).toUpperCase() + type.slice(1)}`;

  // Toggle selection
  if (STATE[key] === value) {
    STATE[key] = null;
    if (el) el.classList.remove('selected');
  } else {
    STATE[key] = value;
    const container = el ? el.parentElement : null;
    if (container) {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    }
    if (el) el.classList.add('selected');
  }
}

// ============================================================
// RECOMMENDATION ENGINE
// ============================================================
function calculateRecommendationScore(user, restaurant, context, weights) {
  const w = weights || STATE.weights;
  const scores = {};

  // 1. PREFERENCE SCORE (0-100)
  let prefScore = 50; // baseline
  if (user && user.preferred_cuisines) {
    if (user.preferred_cuisines.includes(restaurant.cuisine)) prefScore += 30;
    if (user.order_history && user.order_history.includes(restaurant.id)) prefScore += 15;
    if (user.top_rated && user.top_rated[restaurant.id]) {
      prefScore += user.top_rated[restaurant.id] * 3;
    }
  }
  // Mood-cuisine affinity
  if (context.mood && MOOD_CUISINE_MAP[context.mood]) {
    const affinity = MOOD_CUISINE_MAP[context.mood][restaurant.cuisine] || 0;
    prefScore += affinity * 25;
  }
  scores.preference = Math.min(100, Math.max(0, prefScore));

  // 2. QUALITY SCORE (0-100)
  scores.quality = Math.min(100, Math.max(0, (restaurant.rating / 5) * 100));

  // 3. ETA RELIABILITY SCORE (0-100)
  scores.etaReliability = Math.min(100, Math.max(0, restaurant.eta_reliability * 100));

  // 4. PRICE FIT SCORE (0-100)
  let priceFit = 70;
  if (context.budget) {
    const budgetOpt = BUDGET_OPTIONS.find(b => b.id === context.budget);
    if (budgetOpt) {
      const aov = restaurant.avg_order_value;
      if (budgetOpt.max && aov <= budgetOpt.max) priceFit = 95;
      else if (budgetOpt.min && budgetOpt.max && aov >= budgetOpt.min && aov <= budgetOpt.max) priceFit = 90;
      else if (budgetOpt.min && !budgetOpt.max && aov >= budgetOpt.min) priceFit = 85;
      else priceFit = Math.max(20, 90 - Math.abs(aov - (budgetOpt.max || 500)) / 5);
    }
  }
  if (user && user.avg_order_value) {
    const diff = Math.abs(restaurant.avg_order_value - user.avg_order_value);
    priceFit = Math.max(priceFit - diff / 10, 20);
  }
  scores.priceFit = Math.min(100, Math.max(0, priceFit));

  // 5. DISTANCE SCORE (0-100)
  let distScore = 100 - (restaurant.distance * 10);
  if (context.distance) {
    const distOpt = DISTANCE_OPTIONS.find(d => d.id === context.distance);
    if (distOpt && restaurant.distance <= distOpt.max) distScore = 95 - (restaurant.distance * 5);
    else if (distOpt) distScore = Math.max(10, 50 - (restaurant.distance - distOpt.max) * 15);
  }
  scores.distance = Math.min(100, Math.max(0, distScore));

  // 6. AVAILABILITY SCORE (0-100)
  scores.availability = restaurant.available ? 95 : 10;

  // 7. NOVELTY SCORE (0-100)
  let noveltyScore = 50;
  if (user && user.order_history) {
    if (!user.order_history.includes(restaurant.id)) noveltyScore = 85;
    else noveltyScore = 20;
  }
  if (restaurant.is_new) noveltyScore += 15;
  if (restaurant.is_trending) noveltyScore += 10;
  scores.novelty = Math.min(100, Math.max(0, noveltyScore));

  // FINAL WEIGHTED SCORE
  const totalWeight = w.preference + w.quality + w.etaReliability + w.priceFit + w.distance + w.availability + w.novelty;
  const finalScore = totalWeight > 0 ? (
    (scores.preference * w.preference +
     scores.quality * w.quality +
     scores.etaReliability * w.etaReliability +
     scores.priceFit * w.priceFit +
     scores.distance * w.distance +
     scores.availability * w.availability +
     scores.novelty * w.novelty) / totalWeight
  ) : 0;

  return {
    scores,
    finalScore: Math.round(finalScore * 10) / 10,
    weights: { ...w }
  };
}

function getRecommendations(weights) {
  const user = STATE.selectedProfile || null;
  const context = {
    mood: STATE.selectedMood,
    budget: STATE.selectedBudget,
    cuisine: STATE.selectedCuisine,
    eta: STATE.selectedEta,
    diet: STATE.selectedDiet,
    distance: STATE.selectedDistance,
    discovery: STATE.selectedDiscovery
  };

  // Step 1: Candidate Generation
  let candidates = [...RESTAURANTS];

  // Step 2: Eligibility Filters
  // Cuisine filter
  if (context.cuisine && context.cuisine !== 'Any') {
    const cuisineFiltered = candidates.filter(r => r.cuisine === context.cuisine);
    if (cuisineFiltered.length >= 3) candidates = cuisineFiltered;
  }

  // ETA filter
  if (context.eta) {
    const etaOpt = ETA_OPTIONS.find(e => e.id === context.eta);
    if (etaOpt) {
      const etaFiltered = candidates.filter(r => r.eta_total <= etaOpt.max);
      if (etaFiltered.length >= 3) candidates = etaFiltered;
    }
  }

  // Diet filter
  if (context.diet && context.diet !== 'No preference') {
    const dietFiltered = candidates.filter(r => {
      if (context.diet === 'Vegetarian') return r.veg;
      if (context.diet === 'Non-vegetarian') return r.non_veg;
      if (context.diet === 'Vegan') return r.vegan;
      return true;
    });
    if (dietFiltered.length >= 3) candidates = dietFiltered;
  }

  // Distance filter
  if (context.distance) {
    const distOpt = DISTANCE_OPTIONS.find(d => d.id === context.distance);
    if (distOpt) {
      const distFiltered = candidates.filter(r => r.distance <= distOpt.max);
      if (distFiltered.length >= 3) candidates = distFiltered;
    }
  }

  // Availability filter
  candidates = candidates.filter(r => r.available);

  // Adjust weights for discovery mode
  const w = { ...(weights || STATE.weights) };
  if (context.discovery === 'Something new') {
    w.novelty = Math.max(w.novelty, 20);
    w.preference = Math.max(w.preference - 10, 5);
  } else if (context.discovery === 'My usuals') {
    w.preference += 15;
    w.novelty = 0;
  } else if (context.discovery === 'Surprise me') {
    w.novelty = 30;
    w.preference = 10;
  }

  // Step 3: Score all candidates
  const scored = candidates.map(r => {
    const result = calculateRecommendationScore(user, r, context, w);
    return { ...r, ...result };
  });

  // Step 4: Sort by final score
  scored.sort((a, b) => b.finalScore - a.finalScore);

  // Step 5: Diversity constraints — don't let top 5 be all same cuisine
  const diversified = applyDiversityConstraints(scored);

  return diversified.slice(0, 10);
}

function applyDiversityConstraints(ranked) {
  if (ranked.length <= 5) return ranked;

  const result = [ranked[0]]; // Always keep #1
  const usedCuisines = { [ranked[0].cuisine]: 1 };
  const usedPriceSegments = { [ranked[0].price_segment]: 1 };
  let idx = 1;

  while (result.length < Math.min(10, ranked.length) && idx < ranked.length) {
    const r = ranked[idx];
    const cuisineCount = usedCuisines[r.cuisine] || 0;
    const priceCount = usedPriceSegments[r.price_segment] || 0;

    // Allow max 2 of same cuisine in top 5, max 3 in top 10
    if (result.length < 5 && cuisineCount >= 2) {
      idx++;
      continue;
    }
    if (cuisineCount >= 3) {
      idx++;
      continue;
    }

    usedCuisines[r.cuisine] = cuisineCount + 1;
    usedPriceSegments[r.price_segment] = priceCount + 1;
    result.push(r);
    idx++;
  }

  // Fill remaining from ranked list if diversity constraints were too strict
  if (result.length < 10) {
    for (const r of ranked) {
      if (!result.includes(r) && result.length < 10) result.push(r);
    }
  }

  return result;
}

function runRecommendations() {
  const recommendations = getRecommendations();
  renderRecommendations(recommendations);
}

function renderRecommendations(recs) {
  const container = document.getElementById('recommendation-results');
  if (recs.length === 0) {
    container.innerHTML = '<div class="card" style="text-align:center;padding:var(--space-3xl);"><p class="text-secondary">No restaurants match your criteria. Try adjusting your filters.</p></div>';
    return;
  }

  container.innerHTML = recs.map((r, i) => {
    const whyReasons = generateWhyReasons(r);
    return `
    <div class="restaurant-card ${i === 0 ? 'top-pick' : ''}" style="margin-bottom:var(--space-md);">
      <div class="restaurant-header">
        <div>
          <div class="restaurant-name">${r.name}</div>
          <div class="restaurant-cuisine">${r.cuisine} · ${r.price_segment}</div>
        </div>
        <div class="restaurant-score">
          <div class="restaurant-score-value">${r.finalScore}</div>
          <div class="restaurant-score-label">Score</div>
        </div>
      </div>
      <div class="restaurant-meta">
        <div class="restaurant-meta-item"><span class="restaurant-meta-icon">⭐</span> ${r.rating}</div>
        <div class="restaurant-meta-item"><span class="restaurant-meta-icon">⏱</span> ${r.eta_total} min</div>
        <div class="restaurant-meta-item"><span class="restaurant-meta-icon">📍</span> ${r.distance} km</div>
        <div class="restaurant-meta-item"><span class="restaurant-meta-icon">💰</span> ₹${r.avg_order_value}</div>
        <div class="restaurant-meta-item"><span class="restaurant-meta-icon">📊</span> ${Math.round(r.eta_reliability * 100)}% on-time</div>
        ${r.is_new ? '<span class="tag tag-green">New</span>' : ''}
        ${r.is_trending ? '<span class="tag tag-red">Trending</span>' : ''}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-xs);margin-bottom:var(--space-sm);">
        ${r.popular_dishes.slice(0, 3).map(d => `<span class="tag">${d}</span>`).join('')}
      </div>
      <div class="restaurant-actions">
        <button class="btn btn-primary btn-sm">Order Now</button>
        <button class="btn btn-ghost btn-sm" onclick="togglePanel(this, 'why-${i}')">Why This?</button>
        <button class="btn btn-ghost btn-sm" onclick="togglePanel(this, 'algo-${i}')">Show Scores</button>
      </div>
      
      <!-- Why Panel -->
      <div class="why-panel" id="why-${i}">
        <div style="font-weight:600;font-size:var(--text-sm);margin-bottom:var(--space-sm);">Why am I seeing this?</div>
        ${whyReasons.map(reason => `
          <div class="why-item">
            <span class="why-icon">→</span>
            <span>${reason}</span>
          </div>
        `).join('')}
        <div style="margin-top:var(--space-sm);font-size:var(--text-xs);color:var(--text-tertiary);font-style:italic;">
          Generated from synthetic user profile. Does not represent real Zomato user data.
        </div>
      </div>
      
      <!-- Algorithm Score Breakdown -->
      <div class="score-breakdown algo-detail ${STATE.showAlgorithm ? 'visible' : ''}" id="algo-${i}">
        <div style="font-weight:600;font-size:var(--text-sm);margin-bottom:var(--space-sm);">Algorithm Score Breakdown</div>
        ${renderScoreBreakdown(r.scores, r.weights)}
        <div style="margin-top:var(--space-sm);padding-top:var(--space-sm);border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;">
          <span style="font-weight:600;font-size:var(--text-sm);">Final Score</span>
          <span style="font-weight:700;font-size:var(--text-lg);color:var(--accent-primary);">${r.finalScore}</span>
        </div>
      </div>
    </div>
  `;}).join('');
}

function renderScoreBreakdown(scores, weights) {
  const dims = [
    { key: 'preference', label: 'Preference', color: 'red' },
    { key: 'quality', label: 'Quality', color: 'green' },
    { key: 'etaReliability', label: 'ETA Reliability', color: 'blue' },
    { key: 'priceFit', label: 'Price Fit', color: 'gold' },
    { key: 'distance', label: 'Distance', color: 'purple' },
    { key: 'availability', label: 'Availability', color: 'cyan' },
    { key: 'novelty', label: 'Novelty', color: 'warm' }
  ];
  return dims.map(d => `
    <div class="score-row">
      <span class="score-label">${d.label} (${weights[d.key]}%)</span>
      <div class="score-bar-container">
        <div class="score-bar score-bar-${d.color}" style="width:${scores[d.key]}%;"></div>
      </div>
      <span class="score-number">${Math.round(scores[d.key])}</span>
    </div>
  `).join('');
}

function generateWhyReasons(restaurant) {
  const reasons = [];
  const user = STATE.selectedProfile;

  if (user && user.preferred_cuisines.includes(restaurant.cuisine)) {
    reasons.push(`You frequently order ${restaurant.cuisine} food.`);
  }
  if (STATE.selectedMood) {
    const mood = MOOD_OPTIONS.find(m => m.id === STATE.selectedMood);
    if (mood) reasons.push(`This matches your "${mood.label}" mood.`);
  }
  if (user && Math.abs(restaurant.avg_order_value - user.avg_order_value) < 100) {
    reasons.push(`Your typical order value is ₹${user.avg_order_value}. This restaurant fits at ₹${restaurant.avg_order_value}.`);
  }
  if (restaurant.eta_reliability >= 0.85) {
    reasons.push(`This restaurant usually delivers on time (${Math.round(restaurant.eta_reliability * 100)}% reliability).`);
  }
  if (restaurant.rating >= 4.2) {
    reasons.push(`Highly rated at ${restaurant.rating}★ from ${restaurant.review_count} reviews.`);
  }
  if (STATE.selectedBudget) {
    const budget = BUDGET_OPTIONS.find(b => b.id === STATE.selectedBudget);
    if (budget) reasons.push(`This restaurant fits your ${budget.label} budget.`);
  }
  if (restaurant.is_trending) {
    reasons.push('Currently trending in your area.');
  }
  if (user && user.order_history && user.order_history.includes(restaurant.id)) {
    reasons.push('You\'ve ordered from here before and rated it well.');
  }
  if (restaurant.distance <= 3) {
    reasons.push(`Very close to you at ${restaurant.distance} km.`);
  }

  return reasons.length > 0 ? reasons : ['Popular in your area with good ratings and delivery reliability.'];
}

function togglePanel(btn, panelId) {
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.toggle('visible');
}

// ============================================================
// ALGORITHM PLAYGROUND
// ============================================================
function initAlgorithmPlayground() {
  const weightDims = [
    { key: 'preference', label: 'Personal Preference', default: 30 },
    { key: 'quality', label: 'Restaurant Quality', default: 20 },
    { key: 'etaReliability', label: 'ETA Reliability', default: 15 },
    { key: 'priceFit', label: 'Price Fit', default: 15 },
    { key: 'distance', label: 'Distance', default: 10 },
    { key: 'availability', label: 'Availability', default: 10 },
    { key: 'novelty', label: 'Novelty / Exploration', default: 0 }
  ];

  const slidersContainer = document.getElementById('weight-sliders');
  slidersContainer.innerHTML = weightDims.map(d => `
    <div class="slider-group mb-md">
      <div class="slider-header">
        <span class="slider-label">${d.label}</span>
        <span class="slider-value" id="w-${d.key}-val">${d.default}%</span>
      </div>
      <input type="range" id="w-${d.key}" min="0" max="50" value="${d.default}" step="1"
             oninput="updateWeight('${d.key}', this.value)">
    </div>
  `).join('');

  // Store initial rankings
  STATE.beforeRankings = getRecommendations(STATE.defaultWeights).slice(0, 5);
  renderAlgoComparison();

  document.getElementById('reset-weights').addEventListener('click', () => {
    Object.entries(STATE.defaultWeights).forEach(([key, val]) => {
      STATE.weights[key] = val;
      document.getElementById(`w-${key}`).value = val;
      document.getElementById(`w-${key}-val`).textContent = val + '%';
    });
    
    // Clear edge case chips visually
    document.querySelectorAll('#edge-case-toggles .chip').forEach(c => c.classList.remove('selected'));
    
    updateWeightTotal();
    renderAlgoComparison();
    runRecommendations();
  });
}

function updateWeight(key, value) {
  STATE.weights[key] = parseInt(value);
  document.getElementById(`w-${key}-val`).textContent = value + '%';
  updateWeightTotal();
  renderAlgoComparison();
  runRecommendations();
}

function updateWeightTotal() {
  const total = Object.values(STATE.weights).reduce((a, b) => a + b, 0);
  document.getElementById('weight-total').textContent = total + '%';
  document.getElementById('weight-total').style.color = total === 100 ? 'var(--accent-green)' : total > 100 ? 'var(--accent-primary)' : 'var(--accent-gold)';
}

function toggleEdgeCase(edgeId, el) {
  // Toggle selection visually
  const isSelected = el.classList.contains('selected');
  document.querySelectorAll('#edge-case-toggles .chip').forEach(c => c.classList.remove('selected'));
  
  if (!isSelected) {
    el.classList.add('selected');
    applyEdgeCaseWeights(edgeId);
  } else {
    // Reset if deselected
    document.getElementById('reset-weights').click();
  }
}

function applyEdgeCaseWeights(edgeId) {
  const w = { ...STATE.defaultWeights };
  if (edgeId === 'new-user') {
    // No preference data, rely on quality and novelty (popular)
    w.preference = 0;
    w.quality = 40;
    w.novelty = 30;
    w.etaReliability = 15;
    w.priceFit = 15;
  } else if (edgeId === 'new-restaurant') {
    // Force discovery
    w.novelty = 50;
    w.preference = 10;
    w.quality = 10;
    w.etaReliability = 10;
    w.priceFit = 10;
    w.distance = 10;
  } else if (edgeId === 'bad-delivery') {
    // ETA becomes critical
    w.etaReliability = 45;
    w.distance = 25;
    w.preference = 10;
    w.quality = 10;
    w.priceFit = 10;
  }

  Object.entries(w).forEach(([key, val]) => {
    STATE.weights[key] = val;
    const input = document.getElementById(`w-${key}`);
    if (input) {
      input.value = val;
      document.getElementById(`w-${key}-val`).textContent = val + '%';
    }
  });
  updateWeightTotal();
  renderAlgoComparison();
  runRecommendations();
}

function renderAlgoComparison() {
  const afterRankings = getRecommendations(STATE.weights).slice(0, 5);
  const beforeContainer = document.getElementById('algo-before');
  const afterContainer = document.getElementById('algo-after');

  beforeContainer.innerHTML = STATE.beforeRankings.map((r, i) => `
    <div style="display:flex;align-items:center;gap:var(--space-md);padding:8px 0;${i < STATE.beforeRankings.length - 1 ? 'border-bottom:1px solid var(--border-subtle);' : ''}">
      <span style="font-family:var(--font-mono);font-weight:700;color:var(--text-tertiary);width:24px;">#${i + 1}</span>
      <div style="flex:1;">
        <div style="font-weight:500;font-size:var(--text-sm);">${r.name}</div>
        <div style="font-size:var(--text-xs);color:var(--text-tertiary);">${r.cuisine} · ₹${r.avg_order_value}</div>
      </div>
      <span style="font-family:var(--font-mono);font-weight:600;color:var(--text-secondary);">${r.finalScore}</span>
    </div>
  `).join('');

  afterContainer.innerHTML = afterRankings.map((r, i) => {
    const beforeIdx = STATE.beforeRankings.findIndex(b => b.id === r.id);
    const movement = beforeIdx >= 0 ? beforeIdx - i : 'NEW';
    const movementText = movement === 'NEW' ? '🆕' : movement > 0 ? `↑${movement}` : movement < 0 ? `↓${Math.abs(movement)}` : '—';
    const movementColor = movement === 'NEW' ? 'var(--accent-cyan)' : movement > 0 ? 'var(--accent-green)' : movement < 0 ? 'var(--accent-primary)' : 'var(--text-tertiary)';
    return `
    <div style="display:flex;align-items:center;gap:var(--space-md);padding:8px 0;${i < afterRankings.length - 1 ? 'border-bottom:1px solid var(--border-subtle);' : ''}">
      <span style="font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);width:24px;">#${i + 1}</span>
      <div style="flex:1;">
        <div style="font-weight:500;font-size:var(--text-sm);">${r.name}</div>
        <div style="font-size:var(--text-xs);color:var(--text-tertiary);">${r.cuisine} · ₹${r.avg_order_value}</div>
      </div>
      <span style="font-family:var(--font-mono);font-weight:600;color:${movementColor};font-size:var(--text-xs);">${movementText}</span>
      <span style="font-family:var(--font-mono);font-weight:600;color:var(--accent-primary);">${r.finalScore}</span>
    </div>
  `;}).join('');

  // Explanation
  generateAlgoExplanation(afterRankings);
}

function generateAlgoExplanation(afterRankings) {
  const el = document.getElementById('algo-explanation-text');
  if (afterRankings.length === 0 || STATE.beforeRankings.length === 0) {
    el.textContent = 'Adjust weights above to see how rankings change.';
    return;
  }

  const changes = [];
  afterRankings.slice(0, 5).forEach((r, newIdx) => {
    const oldIdx = STATE.beforeRankings.findIndex(b => b.id === r.id);
    if (oldIdx >= 0 && oldIdx !== newIdx) {
      const direction = newIdx < oldIdx ? 'moved up' : 'moved down';
      changes.push(`${r.name} ${direction} from #${oldIdx + 1} → #${newIdx + 1}`);
    } else if (oldIdx < 0) {
      changes.push(`${r.name} is NEW in the top 5`);
    }
  });

  // Find what weight changed most
  const weightChanges = Object.entries(STATE.weights).map(([key, val]) => ({
    key, diff: val - STATE.defaultWeights[key]
  })).filter(w => w.diff !== 0).sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  let explanation = changes.length > 0 ? changes.join('. ') + '.' : 'No ranking changes with current weights.';
  if (weightChanges.length > 0) {
    const w = weightChanges[0];
    explanation += ` Primary driver: ${w.key} weight changed by ${w.diff > 0 ? '+' : ''}${w.diff}pp.`;
  }
  el.textContent = explanation;
}

// ============================================================
// A/B EXPERIMENT SIMULATOR
// ============================================================
function initExperiment() {
  // Secondary metrics
  document.getElementById('secondary-metrics').innerHTML = AB_TEST.secondary_metrics.map(m => `<div style="padding:3px 0;color:var(--text-secondary);">• ${m}</div>`).join('');
  document.getElementById('guardrail-metrics').innerHTML = AB_TEST.guardrails.map(m => `<div style="padding:3px 0;color:var(--text-secondary);">• ${m}</div>`).join('');

  // Experiment Design Table
  const table = document.getElementById('experiment-table');
  const design = AB_TEST.design;
  table.innerHTML = `
    <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
    <tbody>
      <tr><td>Randomization Unit</td><td>${design.randomization_unit}</td></tr>
      <tr><td>Allocation</td><td>${design.allocation}</td></tr>
      <tr><td>Minimum Detectable Effect (MDE)</td><td>${design.mde}</td></tr>
      <tr><td>Statistical Power</td><td>${design.power}</td></tr>
      <tr><td>Confidence Level</td><td>${design.confidence}</td></tr>
      <tr><td>Duration</td><td>${design.duration}</td></tr>
      <tr><td>Sample Size per Arm</td><td>${design.sample_per_arm}</td></tr>
      <tr><td>Exclusions</td><td>${design.exclusions}</td></tr>
    </tbody>
  `;

  // Simulator sliders
  ['exp-control', 'exp-treatment', 'exp-sample'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateExperimentSim);
  });
  updateExperimentSim();
}

function updateExperimentSim() {
  const control = parseFloat(document.getElementById('exp-control').value);
  const treatment = parseFloat(document.getElementById('exp-treatment').value);
  const sample = parseInt(document.getElementById('exp-sample').value);

  document.getElementById('exp-control-val').textContent = control.toFixed(1) + '%';
  document.getElementById('exp-treatment-val').textContent = treatment.toFixed(1) + '%';
  document.getElementById('exp-sample-val').textContent = sample.toLocaleString();

  const lift = ((treatment - control) / control * 100);
  const pooledP = (control + treatment) / 200;
  const se = Math.sqrt(2 * pooledP * (1 - pooledP) / sample);
  const zScore = Math.abs(treatment - control) / 100 / se;
  const significant = zScore > 1.96;
  const ci = (1.96 * se * 100);
  const incrementalOrders = Math.round(sample * (treatment - control) / 100);

  document.getElementById('exp-lift').textContent = (lift >= 0 ? '+' : '') + lift.toFixed(1) + '%';
  document.getElementById('exp-lift').style.color = lift >= 0 ? 'var(--accent-green)' : 'var(--accent-primary)';
  document.getElementById('exp-sig').textContent = significant ? 'Yes ✓' : 'Not yet';
  document.getElementById('exp-sig').style.color = significant ? 'var(--accent-green)' : 'var(--accent-gold)';
  document.getElementById('exp-ci').textContent = '±' + ci.toFixed(1) + '%';
  document.getElementById('exp-incremental').textContent = incrementalOrders.toLocaleString();
}

// ============================================================
// UNIT ECONOMICS
// ============================================================
function initUnitEconomics() {
  const econ = calcUnitEconomics(380);

  // Revenue Chart
  const revCtx = document.getElementById('revenue-chart');
  if (revCtx) {
    STATE.charts.revenue = new Chart(revCtx, {
      type: 'doughnut',
      data: {
        labels: ['Commission', 'Delivery Fee', 'Platform Fee', 'Ad Revenue'],
        datasets: [{
          data: [econ.revenue.commission, econ.revenue.delivery_fee, econ.revenue.platform_fee, econ.revenue.ad_revenue],
          backgroundColor: ['#e2374499', '#ff6b6b99', '#ffd93d99', '#4dabf799'],
          borderColor: ['#e23744', '#ff6b6b', '#ffd93d', '#4dabf7'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#868e96', padding: 16, font: { size: 11 } } },
          tooltip: { callbacks: { label: (ctx) => `₹${ctx.raw.toFixed(1)} (${Math.round(ctx.raw / econ.revenue.total * 100)}%)` } }
        }
      }
    });
  }

  // Cost Chart
  const costCtx = document.getElementById('cost-chart');
  if (costCtx) {
    STATE.charts.cost = new Chart(costCtx, {
      type: 'doughnut',
      data: {
        labels: ['Delivery Payout', 'Payment Processing', 'Discount', 'Refund', 'Support', 'Restaurant Incentive'],
        datasets: [{
          data: [econ.cost.delivery_payout, econ.cost.payment, econ.cost.discount, econ.cost.refund, econ.cost.support, econ.cost.restaurant_incentive],
          backgroundColor: ['#e2374499', '#ff8c4299', '#ffd93d99', '#a78bfa99', '#22d3ee99', '#2ed57399'],
          borderColor: ['#e23744', '#ff8c42', '#ffd93d', '#a78bfa', '#22d3ee', '#2ed573'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#868e96', padding: 16, font: { size: 11 } } },
          tooltip: { callbacks: { label: (ctx) => `₹${ctx.raw.toFixed(1)}` } }
        }
      }
    });
  }

  // Summary cards
  const summary = document.getElementById('econ-summary');
  summary.innerHTML = `
    <div class="stat-card"><div class="stat-value">₹${econ.revenue.total.toFixed(0)}</div><div class="stat-label">Revenue/Order</div><span class="assumption-label mt-sm">Illustrative</span></div>
    <div class="stat-card"><div class="stat-value">₹${econ.cost.total.toFixed(0)}</div><div class="stat-label">Variable Cost/Order</div><span class="assumption-label mt-sm">Illustrative</span></div>
    <div class="stat-card"><div class="stat-value text-green">₹${econ.contribution.toFixed(0)}</div><div class="stat-label">Contribution/Order</div><span class="assumption-label mt-sm">Illustrative</span></div>
    <div class="stat-card"><div class="stat-value text-blue">${econ.margin.toFixed(1)}%</div><div class="stat-label">Contribution Margin</div><span class="assumption-label mt-sm">Illustrative</span></div>
  `;

  // Calculator sliders
  ['calc-users', 'calc-freq', 'calc-newfreq', 'calc-aov', 'calc-contrib', 'calc-cannibal'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCalculator);
  });
  updateCalculator();
}

function updateCalculator() {
  const users = parseInt(document.getElementById('calc-users').value);
  const freq = parseFloat(document.getElementById('calc-freq').value);
  const newFreq = parseFloat(document.getElementById('calc-newfreq').value);
  const aov = parseInt(document.getElementById('calc-aov').value);
  const contrib = parseInt(document.getElementById('calc-contrib').value);
  const cannibal = parseInt(document.getElementById('calc-cannibal').value) / 100;

  document.getElementById('calc-users-val').textContent = users.toLocaleString();
  document.getElementById('calc-freq-val').textContent = freq.toFixed(1);
  document.getElementById('calc-newfreq-val').textContent = newFreq.toFixed(1);
  document.getElementById('calc-aov-val').textContent = '₹' + aov;
  document.getElementById('calc-contrib-val').textContent = '₹' + contrib;
  document.getElementById('calc-cannibal-val').textContent = (cannibal * 100) + '%';

  const result = calcBusinessImpact({
    eligible_users: users,
    current_freq: freq,
    new_freq: newFreq,
    aov: aov,
    contribution_per_order: contrib,
    cannibalization: cannibal
  });

  const outputs = document.getElementById('calc-outputs');
  outputs.innerHTML = `
    <div class="stat-card"><div class="stat-value">${formatLargeNumber(result.gross_incremental_orders)}</div><div class="stat-label">Gross Incremental Orders/Mo</div></div>
    <div class="stat-card"><div class="stat-value text-accent">${formatLargeNumber(result.cannibalized_orders)}</div><div class="stat-label">Cannibalized Orders</div></div>
    <div class="stat-card"><div class="stat-value text-green">${formatLargeNumber(result.net_incremental_orders)}</div><div class="stat-label">Net Incremental Orders/Mo</div></div>
    <div class="stat-card"><div class="stat-value">₹${formatCr(result.incremental_gmv)}</div><div class="stat-label">Incremental GMV/Mo</div></div>
    <div class="stat-card"><div class="stat-value text-green">₹${formatCr(result.monthly_contribution)}</div><div class="stat-label">Monthly Contribution</div></div>
    <div class="stat-card"><div class="stat-value text-green">₹${formatCr(result.annual_contribution)}</div><div class="stat-label">Annual Contribution</div></div>
    <div class="stat-card"><div class="stat-value text-blue">₹${result.ltv.toLocaleString()}</div><div class="stat-label">LTV per User</div></div>
    <div class="stat-card"><div class="stat-value text-gold">${result.ltv_cac}x</div><div class="stat-label">LTV/CAC</div></div>
  `;

  updateCannibalizationChart(result);
}

function updateCannibalizationChart(result) {
  const ctx = document.getElementById('cannibalization-chart');
  if (!ctx) return;

  if (STATE.charts.cannibalization) STATE.charts.cannibalization.destroy();

  STATE.charts.cannibalization = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Gross Lift', 'Cannibalized', 'Net Incremental'],
      datasets: [{
        data: [result.gross_incremental_orders, -result.cannibalized_orders, result.net_incremental_orders],
        backgroundColor: ['rgba(77,171,247,0.6)', 'rgba(226,55,68,0.6)', 'rgba(46,213,115,0.6)'],
        borderColor: ['#4dabf7', '#e23744', '#2ed573'],
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.raw >= 0 ? '+' : ''}${formatLargeNumber(Math.abs(ctx.raw))} orders/month` } } },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96' } },
        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96', callback: v => formatLargeNumber(v) } }
      }
    }
  });
}

// ============================================================
// BUSINESS IMPACT SCENARIOS
// ============================================================
function initBusinessImpact() {
  const tabs = document.querySelectorAll('.scenario-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderScenario(tab.dataset.scenario);
    });
  });
  renderScenario('base');
  renderScenarioChart();
}

function renderScenario(scenario) {
  const s = UNIT_ECONOMICS.scenarios[scenario];
  const result = calcBusinessImpact({
    eligible_users: s.eligible_users,
    current_freq: 1.8,
    new_freq: 1.8 + s.freq_lift,
    aov: 380,
    contribution_per_order: s.contribution_per_order,
    cannibalization: s.cannibalization
  });

  const container = document.getElementById('scenario-stats');
  container.innerHTML = `
    <div class="stat-card"><div class="stat-value">${formatLargeNumber(s.eligible_users)}</div><div class="stat-label">Eligible Users</div><span class="source-badge source-scenario mt-sm">Scenario</span></div>
    <div class="stat-card"><div class="stat-value text-green">${formatLargeNumber(result.net_incremental_orders)}</div><div class="stat-label">Net Incremental Orders/Mo</div><span class="source-badge source-scenario mt-sm">Scenario</span></div>
    <div class="stat-card"><div class="stat-value text-green">₹${formatCr(result.monthly_contribution)}</div><div class="stat-label">Monthly Contribution</div><span class="source-badge source-scenario mt-sm">Scenario</span></div>
    <div class="stat-card"><div class="stat-value text-gold">₹${formatCr(result.annual_contribution)}</div><div class="stat-label">Annual Contribution</div><span class="source-badge source-scenario mt-sm">Scenario</span></div>
  `;
}

function renderScenarioChart() {
  const scenarios = ['conservative', 'base', 'upside'];
  const results = scenarios.map(s => {
    const cfg = UNIT_ECONOMICS.scenarios[s];
    return calcBusinessImpact({
      eligible_users: cfg.eligible_users,
      current_freq: 1.8,
      new_freq: 1.8 + cfg.freq_lift,
      aov: 380,
      contribution_per_order: cfg.contribution_per_order,
      cannibalization: cfg.cannibalization
    });
  });

  const ctx = document.getElementById('scenario-chart');
  if (ctx) {
    STATE.charts.scenario = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Conservative', 'Base', 'Upside'],
        datasets: [
          {
            label: 'Annual Incremental Contribution (₹ Cr)',
            data: results.map(r => Math.round(r.annual_contribution / 10000000)),
            backgroundColor: ['rgba(255,217,61,0.5)', 'rgba(46,213,115,0.5)', 'rgba(77,171,247,0.5)'],
            borderColor: ['#ffd93d', '#2ed573', '#4dabf7'],
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `₹${ctx.raw} Cr annual contribution` } } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96' } },
          y: { title: { display: true, text: '₹ Crore (Annual)', color: '#868e96' }, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#868e96' } }
        }
      }
    });
  }
}

// ============================================================
// ROADMAP
// ============================================================
function initRoadmap() {
  const container = document.getElementById('roadmap-timeline');
  container.innerHTML = ROADMAP.map((phase, i) => `
    <div class="roadmap-phase">
      <div class="roadmap-marker ${i === 1 ? 'current' : ''}">P${phase.phase}</div>
      <div class="roadmap-content">
        <div class="roadmap-title">${phase.name}</div>
        <div class="roadmap-desc">${phase.duration}</div>
        <div class="grid-2 gap-sm" style="margin-bottom:var(--space-md);">
          <div>
            <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:4px;">Features</div>
            ${phase.features.map(f => `<div style="font-size:var(--text-xs);color:var(--text-secondary);padding:2px 0;">• ${f}</div>`).join('')}
          </div>
          <div>
            <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:4px;">Success Metrics</div>
            ${phase.metrics.map(m => `<div style="font-size:var(--text-xs);color:var(--text-secondary);padding:2px 0;">• ${m}</div>`).join('')}
          </div>
        </div>
        <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
          <span class="tag">${phase.data}</span>
          <span class="tag">${phase.engineering}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// RISKS
// ============================================================
function initRisks() {
  const container = document.getElementById('risks-list');
  container.innerHTML = RISKS.map(r => {
    const severityClass = r.probability === 'High' || r.impact === 'High' ? 'risk-high' : r.probability === 'Medium' ? 'risk-medium' : 'risk-low';
    return `
    <div class="risk-item">
      <div class="risk-severity ${severityClass}">${r.icon}</div>
      <div style="flex:1;">
        <div style="font-weight:600;margin-bottom:4px;">${r.risk}</div>
        <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-sm);">
          <span class="tag" style="font-size:10px;">P: ${r.probability}</span>
          <span class="tag" style="font-size:10px;">I: ${r.impact}</span>
        </div>
        <div style="font-size:var(--text-sm);color:var(--text-secondary);"><strong>Mitigation:</strong> ${r.mitigation}</div>
      </div>
    </div>
  `;}).join('');
}

// ============================================================
// INTERNAL DATA WISHLIST
// ============================================================
function initDataWishlist() {
  const container = document.getElementById('data-wishlist');
  container.innerHTML = INTERNAL_DATA_WISHLIST.map(item => `
    <div class="accordion-item">
      <button class="accordion-trigger" onclick="toggleAccordion(this)">
        <div style="display:flex;align-items:center;gap:var(--space-md);">
          <span class="tag tag-blue" style="min-width:auto;font-size:10px;">DATA</span>
          <span style="font-weight:600;">${item.data}</span>
        </div>
        <span class="arrow">▸</span>
      </button>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <div class="grid-2">
            <div class="journey-detail-item">
              <div class="journey-detail-label">Why It Matters</div>
              <div style="font-size:var(--text-sm);color:var(--text-secondary);">${item.why}</div>
            </div>
            <div class="journey-detail-item">
              <div class="journey-detail-label">How It Changes the Product</div>
              <div style="font-size:var(--text-sm);color:var(--accent-primary);">${item.how}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// SOURCES
// ============================================================
function initSources() {
  const container = document.getElementById('sources-list');
  container.innerHTML = SOURCES.map(cat => `
    <div class="card mb-md">
      <h4>${cat.category}</h4>
      <div style="margin-top:var(--space-md);">
        ${cat.items.map(item => `
          <div style="display:flex;align-items:center;gap:var(--space-md);padding:8px 0;border-bottom:1px solid var(--border-subtle);">
            <span class="source-badge source-${item.type}" style="min-width:80px;justify-content:center;">${item.type}</span>
            <div style="flex:1;font-size:var(--text-sm);color:var(--text-secondary);">${item.text}</div>
            <div style="font-size:var(--text-xs);color:var(--text-tertiary);white-space:nowrap;">${item.date}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatLargeNumber(n) {
  if (Math.abs(n) >= 10000000) return (n / 10000000).toFixed(1) + ' Cr';
  if (Math.abs(n) >= 100000) return (n / 100000).toFixed(1) + ' L';
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString();
}

function formatCr(n) {
  if (Math.abs(n) >= 10000000) return (n / 10000000).toFixed(1) + ' Cr';
  if (Math.abs(n) >= 100000) return (n / 100000).toFixed(1) + ' L';
  return n.toLocaleString();
}

// ============================================================
// FINAL DECISION
// ============================================================
function initFinalDecision() {
  const container = document.getElementById('decision-thresholds');
  if (!container || typeof FINAL_DECISION === 'undefined') return;

  container.innerHTML = FINAL_DECISION.map(d => `
    <div class="card" style="border-top: 4px solid var(--accent-${d.color});">
      <div class="flex-between mb-md">
        <h4 style="margin:0;font-size:var(--text-2xl);color:var(--text-primary);">${d.decision}</h4>
        <span style="font-size:var(--text-2xl);">${d.icon}</span>
      </div>
      <div style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-sm);color:var(--text-secondary);">IF:</div>
      <ul style="list-style:none;padding:0;margin-bottom:var(--space-md);">
        ${d.conditions.map(c => `<li style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:4px;display:flex;gap:8px;">
          <span style="color:var(--accent-${d.color});">●</span> ${c}
        </li>`).join('')}
      </ul>
      <div style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-sm);color:var(--text-secondary);">THEN:</div>
      <div style="font-size:var(--text-sm);color:var(--text-primary);background:var(--bg-secondary);padding:var(--space-sm);border-radius:var(--radius-md);">
        ${d.action}
      </div>
    </div>
  `).join('');
}
