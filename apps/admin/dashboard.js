/**
 * Dashboard JavaScript
 */

const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:8000' 
    : 'https://api.asilparla.com';

let authToken = null;
let currentUser = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Token kontrolü
    authToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    currentUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }
    
    // Kullanıcı bilgisini göster
    if (currentUser.email) {
        document.getElementById('userEmail').textContent = currentUser.email;
    }
    
    // Çıkış butonu
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
    });
    
    // Dashboard verilerini yükle
    loadDashboardData();
    
    // Her 30 saniyede bir yenile
    setInterval(loadDashboardData, 30000);
});

async function loadDashboardData() {
    try {
        // Finans özeti
        const financeResponse = await fetch(`${API_BASE_URL}/api/v1/finance/summary`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (financeResponse.ok) {
            const financeData = await financeResponse.json();
            updateKPIs(financeData.summary || {});
        }
        
        // Sipariş listesi
        const ordersResponse = await fetch(`${API_BASE_URL}/api/v1/orders?limit=10`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            updateOrdersTable(ordersData || []);
        }
        
        // Ürün sayısı
        const productsResponse = await fetch(`${API_BASE_URL}/api/v1/products?limit=1`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            document.getElementById('activeProducts').textContent = productsData.length || 0;
        }
        
    } catch (error) {
        console.error('Dashboard data load error:', error);
    }
}

function updateKPIs(summary) {
    if (summary.total_revenue !== undefined) {
        document.getElementById('totalRevenue').textContent = 
            `₺${summary.total_revenue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
    }
    
    if (summary.total_orders !== undefined) {
        document.getElementById('totalOrders').textContent = summary.total_orders;
    }
    
    if (summary.profit_margin !== undefined) {
        document.getElementById('profitMargin').textContent = 
            `${summary.profit_margin.toFixed(1)}%`;
    }
}

function updateOrdersTable(orders) {
    const tbody = document.getElementById('ordersTableBody');
    
    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Sipariş bulunamadı</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.order_number || order.id}</td>
            <td>${order.customer_name || '-'}</td>
            <td>₺${(order.total || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
            <td><span class="status-badge status-${order.status || 'pending'}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.created_at)}</td>
        </tr>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Beklemede',
        'processing': 'İşleniyor',
        'shipped': 'Kargoda',
        'delivered': 'Teslim Edildi',
        'cancelled': 'İptal'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
