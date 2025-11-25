/**
 * Admin Login sayfası JavaScript
 */

const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:8000' 
    : 'https://api.asilparla.com';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Hata mesajını gizle
        errorMessage.style.display = 'none';
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Doğrulanıyor...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok && data.access_token) {
                // Kullanıcı rolünü kontrol et
                const userRole = data.user?.role;
                
                // Sadece admin rolüne izin ver
                if (userRole !== 'admin') {
                    showError('Bu sayfa sadece yöneticiler için. Lütfen satıcı giriş sayfasından giriş yapın.');
                    resetButton(submitBtn, originalText);
                    return;
                }
                
                // Token'ı sakla
                if (remember) {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } else {
                    sessionStorage.setItem('token', data.access_token);
                    sessionStorage.setItem('user', JSON.stringify(data.user));
                }
                
                // Admin dashboard'a yönlendir
                window.location.href = 'admin.html';
            } else {
                // Onay hatası kontrolü
                if (response.status === 403) {
                    showError(data.detail || 'Hesabınız henüz onaylanmamış. Lütfen yöneticiden onay bekleyin.');
                } else {
                    showError(data.detail || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
                }
                resetButton(submitBtn, originalText);
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('Bağlantı hatası. Lütfen tekrar deneyin.');
            resetButton(submitBtn, originalText);
        }
    });
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function resetButton(btn, text) {
        btn.innerHTML = text;
        btn.disabled = false;
    }
});
