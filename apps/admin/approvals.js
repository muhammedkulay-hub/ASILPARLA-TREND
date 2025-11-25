/**
 * Kullanıcı Onayları JavaScript
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
    
    loadPendingUsers();
});

async function loadPendingUsers() {
    const pendingList = document.getElementById('pendingUsersList');
    const emptyState = document.getElementById('emptyState');
    const pendingCount = document.getElementById('pendingCount');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/pending`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Kullanıcılar yüklenemedi');
        }
        
        const data = await response.json();
        const users = data.pending_users || [];
        
        pendingCount.textContent = users.length;
        
        if (users.length === 0) {
            pendingList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        pendingList.style.display = 'flex';
        
        pendingList.innerHTML = users.map(user => `
            <div class="glass-panel" style="padding:20px; border-radius:12px; border-left: 4px solid var(--warning);">
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="flex:1;">
                        <div style="display:flex; align-items:center; gap:15px; margin-bottom:10px;">
                            <div style="width:50px; height:50px; background:linear-gradient(45deg, var(--primary), var(--accent)); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700;">
                                ${user.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div style="font-size:1.1rem; font-weight:600; margin-bottom:5px;">${user.full_name}</div>
                                <div style="font-size:0.9rem; color:var(--text-dim); font-family:var(--font-code);">${user.email}</div>
                            </div>
                        </div>
                        <div style="display:flex; gap:15px; margin-top:15px; font-size:0.85rem; color:var(--text-dim);">
                            <span><i class="fa-solid fa-user-tag"></i> Rol: ${user.role}</span>
                            <span><i class="fa-solid fa-calendar"></i> ${new Date(user.created_at).toLocaleDateString('tr-TR')}</span>
                        </div>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button onclick="approveUser('${user.email}')" class="btn-neon" style="background:linear-gradient(135deg, var(--success), #34d399);">
                            <i class="fa-solid fa-check"></i> Onayla
                        </button>
                        <button onclick="rejectUser('${user.email}')" style="background:rgba(239,68,68,0.1); border:1px solid var(--danger); color:var(--danger); padding:10px 20px; border-radius:8px; cursor:pointer;">
                            <i class="fa-solid fa-times"></i> Reddet
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading users:', error);
        pendingList.innerHTML = '<div style="text-align:center; color:var(--danger); padding:20px;">Kullanıcılar yüklenemedi.</div>';
    }
}

async function approveUser(email) {
    if (!confirm(`${email} adresli kullanıcıyı onaylamak istediğinize emin misiniz?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                approve: true
            })
        });
        
        if (response.ok) {
            alert('Kullanıcı onaylandı!');
            loadPendingUsers();
        } else {
            const data = await response.json();
            alert('Hata: ' + (data.detail || 'Onay işlemi başarısız'));
        }
    } catch (error) {
        console.error('Approve error:', error);
        alert('Onay işlemi sırasında bir hata oluştu.');
    }
}

async function rejectUser(email) {
    if (!confirm(`${email} adresli kullanıcıyı reddetmek istediğinize emin misiniz?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                approve: false
            })
        });
        
        if (response.ok) {
            alert('Kullanıcı reddedildi.');
            loadPendingUsers();
        } else {
            const data = await response.json();
            alert('Hata: ' + (data.detail || 'Red işlemi başarısız'));
        }
    } catch (error) {
        console.error('Reject error:', error);
        alert('Red işlemi sırasında bir hata oluştu.');
    }
}

