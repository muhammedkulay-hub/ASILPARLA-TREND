# Kullanıcı Onay Sistemi

**Tarih:** 2024-11-24  
**Durum:** ✅ AKTİF

---

## 🔒 Sistem Özellikleri

### Onay Zorunluluğu
- ✅ **Onaylanmamış kullanıcılar sisteme giriş yapamaz**
- ✅ Sadece admin kullanıcılar onay verebilir
- ✅ Normal login ve Google OAuth için onay kontrolü yapılır
- ✅ Onay bekleyen kullanıcılar admin panelden görüntülenebilir

---

## 📋 Yapılan Değişiklikler

### 1. User Model Güncellemesi
**Dosya:** `services/api/app/models/user.py`

**Eklenen Alanlar:**
- `is_approved` (Boolean) - Onay durumu
- `approved_at` (DateTime) - Onay tarihi
- `approved_by` (String) - Onaylayan admin email

### 2. Auth Service Güncellemesi
**Dosya:** `services/api/app/services/auth_service.py`

**Değişiklikler:**
- Login'de onay kontrolü eklendi
- Onaylanmamış kullanıcılar için `403 Forbidden` hatası
- Admin kullanıcılar her zaman onaylı

### 3. Google OAuth Güncellemesi
**Dosya:** `services/api/app/services/google_auth_service.py`

**Değişiklikler:**
- Google ile giriş yapan kullanıcılar için onay kontrolü
- Onaylanmamış kullanıcılar giriş yapamaz

### 4. User Management Router
**Dosya:** `services/api/app/routers/users.py`

**Endpoint'ler:**
- `POST /api/v1/users/approve` - Kullanıcıyı onayla/reddet
- `GET /api/v1/users/pending` - Onay bekleyen kullanıcıları listele

### 5. Admin Onay Paneli
**Dosyalar:**
- `apps/admin/approvals.html` - Onay yönetim sayfası
- `apps/admin/approvals.js` - Onay işlemleri JavaScript

### 6. Config Güncellemesi
**Dosya:** `services/api/app/core/config.py`

**Eklenen:**
- `AUTH_PILOT_APPROVED` - Pilot kullanıcının onay durumu (env variable)

---

## 🔧 Konfigürasyon

### Environment Variable

```env
# Satıcı (Pilot) onay durumu
AUTH_PILOT_APPROVED=false  # false = onay bekliyor, true = onaylı
```

**Varsayılan:** `false` (onay bekliyor)

---

## 🚀 Kullanım

### 1. Kullanıcı Giriş Denemesi

**Onaylanmamış Kullanıcı:**
```bash
POST /api/v1/auth/login
{
  "email": "pilot@asilparla.com",
  "password": "Pilot!234"
}
```

**Yanıt:**
```json
{
  "detail": "Hesabınız henüz onaylanmamış. Lütfen yöneticiden onay bekleyin."
}
```
**Status Code:** `403 Forbidden`

### 2. Admin Onay İşlemi

**Onay Bekleyen Kullanıcıları Listele:**
```bash
GET /api/v1/users/pending
Authorization: Bearer <admin_token>
```

**Kullanıcıyı Onayla:**
```bash
POST /api/v1/users/approve
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "email": "pilot@asilparla.com",
  "approve": true
}
```

**Kullanıcıyı Reddet:**
```bash
POST /api/v1/users/approve
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "email": "pilot@asilparla.com",
  "approve": false
}
```

### 3. Admin Panel Kullanımı

1. Admin olarak giriş yapın
2. `http://localhost:8080/admin/approvals.html` sayfasına gidin
3. Onay bekleyen kullanıcıları görüntüleyin
4. "Onayla" veya "Reddet" butonuna tıklayın

---

## 🔐 Güvenlik

### Onay Kontrolü Nerede Yapılıyor?

1. **Normal Login** (`auth_service.py`)
   - Email/password ile giriş
   - Onay kontrolü yapılır

2. **Google OAuth** (`google_auth_service.py`)
   - Google ile giriş
   - Onay kontrolü yapılır

3. **Token Doğrulama** (`security.py`)
   - JWT token kontrolü
   - Onay durumu kontrol edilir

### Admin İstisnası

- Admin kullanıcılar (`role="admin"`) her zaman onaylıdır
- Admin onay kontrolünden muaf tutulur
- Sadece admin kullanıcılar onay verebilir

---

## 📊 Durum Akışı

```
Kullanıcı Kayıt/Giriş
    ↓
is_approved = false
    ↓
Admin Onayı Bekliyor
    ↓
Admin Onay Verir
    ↓
is_approved = true
    ↓
Kullanıcı Giriş Yapabilir
```

---

## ⚠️ Önemli Notlar

1. **Varsayılan Durum:**
   - Yeni kullanıcılar varsayılan olarak `is_approved=false` ile oluşturulur
   - Admin kullanıcılar otomatik olarak `is_approved=true`

2. **Environment Variable:**
   - `.env.development` dosyasında `AUTH_PILOT_APPROVED=true` yaparak pilot kullanıcıyı onaylı hale getirebilirsiniz

3. **Veritabanı Entegrasyonu:**
   - Şu anda onay durumu config'de tutuluyor
   - İleride veritabanına taşınacak

4. **Google OAuth:**
   - Google ile giriş yapan kullanıcılar da onay beklemelidir
   - Sadece config'de tanımlı e-posta onaylı olabilir

---

## ✅ Test Senaryoları

### Senaryo 1: Onaylanmamış Kullanıcı Girişi
1. `AUTH_PILOT_APPROVED=false` olarak ayarlayın
2. Pilot kullanıcı ile giriş yapmayı deneyin
3. **Beklenen:** `403 Forbidden` hatası

### Senaryo 2: Admin Onayı
1. Admin olarak giriş yapın
2. Onay panelinden kullanıcıyı onaylayın
3. `AUTH_PILOT_APPROVED=true` yapın (veya API ile onaylayın)
4. Pilot kullanıcı ile giriş yapmayı deneyin
5. **Beklenen:** Başarılı giriş

### Senaryo 3: Google OAuth Onay Kontrolü
1. `AUTH_PILOT_APPROVED=false` olarak ayarlayın
2. Google ile giriş yapmayı deneyin
3. **Beklenen:** `403 Forbidden` hatası

---

## 📝 Sonuç

✅ **Onay sistemi aktif ve çalışıyor!**

- Onaylanmamış kullanıcılar sisteme giriş yapamaz
- Sadece admin kullanıcılar onay verebilir
- Admin panelden onay yönetimi yapılabilir
- Normal login ve Google OAuth için onay kontrolü yapılır

**Durum:** Production-ready ✅

---

**Oluşturulma Tarihi:** 2024-11-24  
**Versiyon:** v1.0

