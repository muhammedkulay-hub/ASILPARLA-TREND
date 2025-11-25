/**
 * Satıcı Login sayfası JavaScript
 */

const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:8000' 
    : 'https://api.asilparla.com';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const registerLink = document.getElementById('registerLink');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const togglePassword = document.getElementById('togglePassword');
    
    // Şifre göster/gizle
    togglePassword.addEventListener('click', () => {
        const passwordField = document.getElementById('password');
        if (passwordField.type === "password") {
            passwordField.type = "text";
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            passwordField.type = "password";
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });
    
    // Normal login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Hata mesajını gizle
        errorMessage.style.display = 'none';
        
        // Loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
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
            
            // Onay hatası kontrolü
            if (response.status === 403) {
                showError(data.detail || 'Hesabınız henüz onaylanmamış. Lütfen yöneticiden onay bekleyin.');
                resetButton();
                return;
            }
            
            if (response.ok && data.access_token) {
                // Kullanıcı rolünü kontrol et
                const userRole = data.user?.role;
                
                // Sadece pilot (satıcı) rolüne izin ver
                if (userRole !== 'pilot' && userRole !== 'seller') {
                    showError('Bu sayfa sadece satıcılar için. Lütfen admin panelinden giriş yapın.');
                    resetButton();
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
                
                // Satıcı dashboard'una yönlendir
                window.location.href = 'dashboard.html';
            } else {
                showError(data.detail || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
                resetButton();
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('Bağlantı hatası. Lütfen tekrar deneyin.');
            resetButton();
        }
    });
    
    // Google ile giriş
    googleLoginBtn.addEventListener('click', async () => {
        try {
            // Google OAuth URL'ini al
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/google`);
            const data = await response.json();
            
            if (data.authorization_url) {
                // Google OAuth sayfasına yönlendir
                window.location.href = data.authorization_url;
            } else {
                showError('Google girişi başlatılamadı.');
            }
        } catch (error) {
            console.error('Google login error:', error);
            showError('Google girişi başlatılamadı. Lütfen tekrar deneyin.');
        }
    });
    
    // URL'den token kontrolü (Google callback'den döndüğünde)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    
    if (token) {
        // Token'ı sakla
        localStorage.setItem('token', token);
        
        // Kullanıcı bilgilerini al
        fetch(`${API_BASE_URL}/api/v1/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        })
        .catch(err => {
            console.error('User info error:', err);
            showError('Kullanıcı bilgileri alınamadı.');
        });
    }
    
    if (error) {
        const errorMsg = decodeURIComponent(error);
        // Onay hatası kontrolü
        if (errorMsg.includes('onaylanmamış') || errorMsg.includes('onay bekleyin')) {
            showError('Hesabınız henüz onaylanmamış. Lütfen yöneticiden onay bekleyin.');
        } else {
            showError(errorMsg);
        }
    }
    
    // Kayıt linki (ileride implement edilebilir)
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Kayıt özelliği yakında eklenecek.');
    });
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function resetButton() {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
    
    // Enter tuşu ile form gönderimi
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

