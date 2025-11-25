# AsilParla - Kullanıcı Bilgileri

**Tarih:** 2024-11-24  
**Versiyon:** 1.17.02

---

## 🔐 ADMIN (Yönetici) Bilgileri

### Varsayılan Bilgiler (Config'de):
- **E-posta:** `admin@asilparla.com`
- **Şifre:** `Admin!234`
- **Telefon:** `05550000000`
- **Rol:** `admin`

### .env.example'da Tanımlı Bilgiler:
- **E-posta:** `muhammedkulay@gmail.com`
- **Şifre:** `babaseroS27`
- **Rol:** `admin`

**Not:** Eğer `.env.development` dosyasında `AUTH_ADMIN_EMAIL` ve `AUTH_ADMIN_PASSWORD` tanımlıysa, o değerler kullanılır.

### Giriş Sayfası:
```
http://localhost:8080/admin/login.html
```

### Dashboard:
```
http://localhost:8080/admin/admin.html
```

### Özellikler:
- ✅ Sistem yönetimi
- ✅ Kullanıcı yönetimi
- ✅ Sistem sağlık izleme
- ✅ Canlı log görüntüleme
- ✅ Database yönetimi
- ✅ AI modül kontrolü

---

## 👤 SATICI (Pilot) Bilgileri

### Varsayılan Bilgiler (Config'de):
- **E-posta:** `pilot@asilparla.com`
- **Şifre:** `Pilot!234`
- **Telefon:** `05550000001`
- **Rol:** `pilot` (satıcı)

### .env.example'da Tanımlı Bilgiler:
- **E-posta:** `asilparla73@gmail.com`
- **Şifre:** `asilParla2773`
- **Rol:** `pilot` (satıcı)

**Not:** Eğer `.env.development` dosyasında `AUTH_PILOT_EMAIL` ve `AUTH_PILOT_PASSWORD` tanımlıysa, o değerler kullanılır.

### Giriş Sayfası:
```
http://localhost:8080/seller/login.html
```

### Dashboard:
```
http://localhost:8080/seller/dashboard.html
```

### Özellikler:
- ✅ Satış raporları
- ✅ Ürün yönetimi
- ✅ Sipariş takibi
- ✅ AI öngörüleri
- ✅ Fatura yönetimi
- ✅ Google ile giriş (OAuth)

---

## ⭐ PREMIUM SATICI - Dilber Kalkan

### Kalıcı, Tek, Sınırsız Premium Satıcı

- **Ad Soyad:** Dilber Kalkan
- **E-posta:** `dilber.kalkan@asilparla.com`
- **Şifre:** `DilberKalkan2024!`
- **Telefon:** `05550000002`
- **Rol:** `pilot` (Satıcı)
- **Plan:** `unlimited` (Sınırsız)
- **Premium:** ✅ Aktif
- **Sınırsız:** ✅ Aktif
- **Kalıcı:** ✅ Süresiz
- **Onay:** ✅ Otomatik onaylı

### Giriş Sayfası:
```
http://localhost:8080/seller/login.html
```

### Özellikler:
- ✅ Sınırsız ürün ekleme
- ✅ Sınırsız sipariş işleme
- ✅ Sınırsız AI analizi
- ✅ Öncelikli destek
- ✅ Gelişmiş raporlama
- ✅ API limit yok
- ✅ Kalıcı erişim (süresiz)

**Not:** Bu kullanıcı sistemde **tek** premium satıcıdır ve **kalıcı, sınırsız** erişime sahiptir.

---

## 🔑 Google OAuth ile Giriş

Satıcılar Google hesapları ile de giriş yapabilir:

1. Satıcı giriş sayfasına gidin
2. "Google ile Giriş Yap" butonuna tıklayın
3. Google hesabınızı seçin
4. Otomatik olarak satıcı (pilot) rolü atanır

---

## 📝 Environment Variables

Eğer `.env.development` dosyasında farklı değerler varsa, onlar kullanılır:

```env
# Admin
AUTH_ADMIN_EMAIL=admin@asilparla.com
AUTH_ADMIN_PASSWORD=Admin!234
AUTH_ADMIN_PHONE=05550000000

# Satıcı (Pilot)
AUTH_PILOT_EMAIL=pilot@asilparla.com
AUTH_PILOT_PASSWORD=Pilot!234
AUTH_PILOT_PHONE=05550000001
```

---

## 🚀 Hızlı Başlangıç

### 1. Admin Girişi (Varsayılan):
```
URL: http://localhost:8080/admin/login.html
Email: admin@asilparla.com
Password: Admin!234
```

### 1b. Admin Girişi (.env.example):
```
URL: http://localhost:8080/admin/login.html
Email: muhammedkulay@gmail.com
Password: babaseroS27
```

### 2. Satıcı Girişi (Varsayılan):
```
URL: http://localhost:8080/seller/login.html
Email: pilot@asilparla.com
Password: Pilot!234
```

### 2b. Satıcı Girişi (.env.example):
```
URL: http://localhost:8080/seller/login.html
Email: asilparla73@gmail.com
Password: asilParla2773
```

### 3. Google ile Satıcı Girişi:
```
URL: http://localhost:8080/seller/login.html
Buton: "Google ile Giriş Yap"
```

---

## ⚠️ Önemli Notlar

1. **Production Ortamında:**
   - Bu bilgiler değiştirilmelidir
   - Güçlü şifreler kullanılmalıdır
   - Environment variables üzerinden yönetilmelidir

2. **Güvenlik:**
   - Şifreler asla kod içinde hardcode edilmemelidir
   - `.env` dosyaları `.gitignore`'da olmalıdır
   - Production'da bcrypt hash kullanılmalıdır

3. **Rol Kontrolü:**
   - Admin sayfası sadece `admin` rolüne izin verir
   - Satıcı sayfası sadece `pilot` veya `seller` rolüne izin verir
   - Google OAuth ile giriş yapanlar otomatik `pilot` rolü alır

---

## 📊 Özet Tablo

### Varsayılan Değerler (Config):
| Kullanıcı | E-posta | Şifre | Rol | Giriş Sayfası |
|-----------|---------|-------|-----|---------------|
| **Admin** | `admin@asilparla.com` | `Admin!234` | `admin` | `/admin/login.html` |
| **Satıcı** | `pilot@asilparla.com` | `Pilot!234` | `pilot` | `/seller/login.html` |

### .env.example Değerleri:
| Kullanıcı | E-posta | Şifre | Rol | Giriş Sayfası |
|-----------|---------|-------|-----|---------------|
| **Admin** | `muhammedkulay@gmail.com` | `babaseroS27` | `admin` | `/admin/login.html` |
| **Satıcı** | `asilparla73@gmail.com` | `asilParla2773` | `pilot` | `/seller/login.html` |

### Premium Satıcı:
| Kullanıcı | E-posta | Şifre | Rol | Plan | Giriş Sayfası |
|-----------|---------|-------|-----|------|---------------|
| **Dilber Kalkan** | `dilber.kalkan@asilparla.com` | `DilberKalkan2024!` | `pilot` | `unlimited` (Premium) | `/seller/login.html` |

### Google OAuth:
| Kullanıcı | E-posta | Şifre | Rol | Giriş Sayfası |
|-----------|---------|-------|-----|---------------|
| **Google** | (Google hesabı) | - | `pilot` | `/seller/login.html` |

---

**Not:** Bu bilgiler development ortamı içindir. Production'da mutlaka değiştirilmelidir.

---

**Oluşturulma Tarihi:** 2024-11-24

