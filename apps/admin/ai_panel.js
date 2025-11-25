/**
 * AI Panel JavaScript
 */

const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:8000' 
    : 'https://api.asilparla.com';

let authToken = null;

document.addEventListener('DOMContentLoaded', () => {
    authToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }
    
    loadAIInsights();
});

async function loadAIInsights() {
    const timeframe = document.getElementById('timeframeSelect').value;
    const resultsDiv = document.getElementById('aiResults');
    
    resultsDiv.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/market-radar/analyze`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                days_back: parseInt(timeframe),
                min_profit_margin: 0.20,
                min_sales_volume: 10
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            displayAIResults(data);
        } else {
            resultsDiv.innerHTML = '<div class="alert alert-error">Analiz yüklenemedi</div>';
        }
    } catch (error) {
        console.error('AI insights error:', error);
        resultsDiv.innerHTML = '<div class="alert alert-error">Bağlantı hatası</div>';
    }
}

function displayAIResults(data) {
    const resultsDiv = document.getElementById('aiResults');
    
    if (!data.trends || data.trends.length === 0) {
        resultsDiv.innerHTML = '<div class="empty-state">Analiz sonucu bulunamadı</div>';
        return;
    }
    
    const summary = data.summary || {};
    const topTrends = data.trends.slice(0, 10);
    
    resultsDiv.innerHTML = `
        <div class="ai-summary">
            <h3>Analiz Özeti</h3>
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-label">Trend Ürün</div>
                    <div class="kpi-value">${summary.trending_products || 0}</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">Ortalama Kârlılık</div>
                    <div class="kpi-value">${(summary.average_profitability || 0).toFixed(1)}%</div>
                </div>
            </div>
        </div>
        
        <div class="trends-list">
            <h3>En Kârlı Ürünler</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Ürün Adı</th>
                        <th>Kârlılık Skoru</th>
                        <th>Toplam Satış</th>
                        <th>Kâr Marjı</th>
                        <th>Öneri</th>
                    </tr>
                </thead>
                <tbody>
                    ${topTrends.map(trend => `
                        <tr>
                            <td>${trend.product_name || '-'}</td>
                            <td>${trend.profitability_score.toFixed(1)}</td>
                            <td>${trend.total_sales}</td>
                            <td>${trend.profit_margin.toFixed(1)}%</td>
                            <td>${trend.recommendation || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}
