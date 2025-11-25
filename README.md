# AsilParla – AI Market Engine (v1.17.02)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-green.svg)](https://fastapi.tiangolo.com/)

AsilParla, özellikle **Trendyol satıcıları** ve Trendyol tarafından desteklenen tedarikçiler için tasarlanmış,  
**sipariş – stok – fatura – kargo – finans – raporlama** zincirini yöneten bir backoffice / otomasyon platformudur.

## 🚀 Özellikler

- ✅ AI destekli pazar analizi ve öngörüler
- ✅ Otomatik sipariş ve stok yönetimi
- ✅ E-fatura ve kargo entegrasyonu
- ✅ Premium satıcı desteği (sınırsız erişim)
- ✅ Kullanıcı onay sistemi
- ✅ Google OAuth ile giriş
- ✅ Admin ve Satıcı panelleri
- ✅ React Native mobil uygulama

Bu sürüm (**v1.17.02**) şu anda:

- ✅ Çalışan API + Worker omurgası
- ✅ JWT tabanlı kimlik doğrulama (admin + pilot satıcı)
- ✅ Statik Admin Panel (gateway’e bağlı)
- ✅ Temel mobil uygulama iskeleti (React Native)
- ✅ AIInsights (AI yorumları, mock + OpenAI hazır)
- ✅ n8n entegrasyon katmanı (orders_synced / stock_updated workflow tetikleri)
- ✅ Test altyapısı (39 test, hepsi geçecek şekilde kurgulanmış)

---

## 1. Hızlı Başlangıç (TL;DR)

> Geliştirme ortamında, lokal PostgreSQL + Redis ile API + Gateway + Worker + Admin çalıştırmak için:

```bash
# 1) Depo kökünde sanal ortam kur
python3 -m venv .venv
source .venv/bin/activate

# 2) Bağımlılıkları yükle
pip install --upgrade pip
pip install -r requirements.txt

# 3) .env dosyasını kontrol et (lokal DB/Redis için varsayılanlar hazır)
#    POSTGRES_USER=postgres
#    POSTGRES_PASSWORD=postgres
#    DB_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/asilparla

# 4) API (backend) – servis/api tarafı (ihtiyaca göre)
uvicorn services.api.app.main:app --host 0.0.0.0 --port 8000 --reload

# 5) Gateway (ana giriş noktası)
uvicorn system_enhancements.api_gateway.gateway_main:app --host 0.0.0.0 --port 8080 --reload

# 6) Worker (arkaplan işler)
python -m services.worker.worker

# 7) Admin panel (statik)
npx serve apps/admin  # veya HTML dosyasını tarayıcıdan direkt aç

# 8) Testler
pytest -q
```

> Docker ile geliştirme:

```bash
docker compose -f docker-compose.dev.yml up --build api worker gateway redis postgres n8n
```

2. Mimari Genel Bakış

Proje; API, Worker, Gateway, Admin Panel, Mobil Uygulama,
Config/Monitoring/Automation katmanlarına ayrılmıştır:

services/api/app/
Ana iş mantığı, domain servisleri, Trendyol/efatura/kargo connector’ları, AI katmanı.

services/worker/
Zamanlanmış işler ve arkaplan görevleri (sipariş senkronizasyonu, stok güncellemeleri, raporlar).

system_enhancements/
API Gateway, circuit breaker, config management, performance monitoring, secret management.

apps/admin/
Tarayıcıdan açılan hafif admin panel (HTML/JS). Gateway üzerinden verileri okur, JWT token ile çalışır.

apps/mobile/
React Native mobile app iskeleti (Android kaynakları + JS kodu).

automation/n8n/
n8n istemcisi ve workflow tetik entegrasyonu (orders_synced, stock_updated).

config/
YAML/JSON konfigürasyonlar (app, db, queue, pricing, limits, alerts, policies, ai thresholds).

tests/
unit + integration + e2e + performance testleri (şu an 39 test tanımlı, yeşil kabul).

 AsilParla-1.17.02/
├── config/                 # Uygulama, DB, queue, pricing, limit, policy, alert ayarları
│   ├── app.yaml
│   ├── database.yaml
│   ├── queue.yaml
│   ├── ai_thresholds.json
│   ├── pricing_rules.yaml
│   ├── alerts/
│   ├── limits/
│   ├── onboarding/
│   └── policies/
│
├── services/
│   ├── api/
│   │   └── app/           # FastAPI uygulaması, domain servisleri
│   └── worker/            # Celery/BG worker scriptleri
│
├── system_enhancements/
│   ├── api_gateway/       # FastAPI tabanlı gateway
│   │   ├── gateway_main.py
│   │   ├── routes/
│   │   │   ├── auth_routes.py
│   │   │   └── ai_routes.py
│   │   └── middlewares/
│   ├── circuit_breaker/
│   ├── configuration_management/
│   ├── performance_monitoring/
│   └── secret_management/
│
├── apps/
│   ├── admin/             # Statik admin panel
│   │   ├── index.html, login.html
│   │   ├── api.js
│   │   ├── screens/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Billing.js
│   │   │   ├── MarketRadar.js
│   │   │   ├── SystemHealth.js
│   │   │   ├── AIInsights.js
│   │   │   └── Logs.js, Tenants.js
│   │   └── assets/
│   └── mobile/            # React Native app
│
├── automation/
│   ├── n8n/
│   │   ├── n8n_client.py
│   │   └── README.md
│   ├── logs/
│   ├── scheduler/
│   └── triggers/
│
├── tests/                 # unit + integration + e2e + performance
├── backup/                # yedekleme scriptleri
├── docs/                  # API, development, user guide
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile.api
├── Dockerfile.worker
├── .env
├── .env.development
├── .env.production
└── requirements.txt

4. Ortam Değişkenleri (ENV)
Ortak Anahtarlar

APP_ENV – development / production

DEBUG – true / false

ASILPARLA_API_URL – API base URL (gateway veya direkt API)

CORS_ORIGINS – izin verilen origin listesi (JSON string)
Prod ortamda `*` kabul edilmez; API ve gateway başlatılırken engellenir.

Veritabanı

POSTGRES_USER

POSTGRES_PASSWORD

POSTGRES_DB

DB_URL – postgresql+psycopg2://user:pass@host:port/db

Güvenlik / Auth

JWT_SECRET

ENCRYPTION_KEY

JWT_ALGORITHM (HS256)

ACCESS_TOKEN_EXPIRE_MINUTES

Admin / Pilot kullanıcı bilgileri (dev ortam):

AUTH_ADMIN_EMAIL – örn: admin@example.com

AUTH_ADMIN_PASSWORD – örn: StrongP@ssw0rd!

AUTH_ADMIN_PASSWORD_HASH – opsiyonel, bcrypt hash (plain yerine tercih edilir)

AUTH_ADMIN_PHONE – örn: 05550000000

AUTH_PILOT_EMAIL – örn: pilot@example.com

AUTH_PILOT_PASSWORD – örn: AnotherStrongP@ss1

AUTH_PILOT_PASSWORD_HASH – opsiyonel, bcrypt hash

AUTH_PILOT_PHONE – örn: 05550000001

ALLOW_DEMO_USER_FALLBACK – sadece development’da demo kullanıcıya izin vermek için true

AUTH_MAX_FAILED_ATTEMPTS / AUTH_LOCKOUT_WINDOW_SECONDS – brute-force koruması için limitler

Not: Prod’da (.env.production) bu değerler placeholder’dır.
Gerçek canlı ortamda CI/infra tarafından güçlü şifreler ve gerçek telefonlar ile override edilmelidir.

Dış Servisler / AI

TRENDYOL_API_KEY – demo veya override

EFATURA_API_KEY

CARGO_API_KEY

IYZICO_API_KEY

OPENAI_API_KEY – dev/test’te demo; prod’da gerçek key

GEMINI_API_KEY – gelecekte kullanım için

n8n Entegrasyonu

N8N_URL – örn: http://n8n:5678 veya http://localhost:5678

N8N_API_KEY – n8n API anahtarı (opsiyonel, webhook’ta header ile gönderilebilir)

N8N_DRY_RUN – true ise network yok, sadece log; prod’da false yapılabilir.

5. Kimlik Doğrulama (JWT Auth)

Auth mantığı ENV tabanlı, in-memory kullanıcılarla çalışır (demo/dev için idealdir).
Bearer token olmadan erişim 401 döner; demo kullanıcıya yalnızca development + `ALLOW_DEMO_USER_FALLBACK=true` iken izin verilir.
Parolalar plain değil bcrypt hash ile doğrulanır; hatalı girişler için rate limit/lockout uygulanır.

services/api/app/security/auth_service.py

UserRole enum: admin, pilot

User modeli: email, full_name, role, phone, is_active

authenticate_user(email, password) → ENV’den gelen admin/pilot bilgileriyle doğrulama

JWT üretimi: create_access_token(...)

JWT doğrulama: token decode + payload kontrolü

Gateway Endpoint’leri

POST /auth/login

Body: { "email": "...", "password": "..." }

Başarılı:
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "user": {
    "email": "...",
    "full_name": "...",
    "role": "admin|pilot",
    "phone": "...",
    "is_active": true
  }
}

Başarısız: 401 Unauthorized

GET /auth/me

Header: Authorization: Bearer <jwt>

Dönen: kullanıcı bilgileri (email, role, phone, is_active)

Admin Panel Login

apps/admin/login.html + login.js

Form submit → /auth/login çağrılır (gateway üzerinden).

Başarılı olursa:

localStorage["asilparla_token"] → JWT

localStorage["asilparla_user"] → kullanıcı JSON

Dashboard sayfasına yönlenir.

Hatalı girişte hata mesajı gösterilir.

Admin panelde tüm istekler apps/admin/api.js üzerinden geçer;
burada token varsa Authorization: Bearer <token> header’ı otomatik eklenir.
6. AIInsights (AI Katmanı)

AI katmanı, hem mock mod hem de OpenAI modunu destekler:

services/api/app/ai/llm_client.py

Provider’lar: mock, openai

Dev/test’te veya demo key ile çalışırken:

Tamamen mock/dry_run → dış API çağrısı yapılmaz.

Prod + gerçek OpenAI API key olduğunda:

OpenAI çağrısı denenir, hata durumunda fallback mesaj döner.

Endpoint

POST /ai/insights

Body:

{
  "kpis": { "orders": 10, "returns": 1, "margin": 0.25 },
  "timeframe": "last_7_days"
}
{
  "insights": "Metin olarak AI yorumu...",
  "provider": "mock" | "openai",
  "dry_run": true | false
}
Admin Panel AIInsights Ekranı

apps/admin/screens/AIInsights.js

Gateway’den gelen KPI snapshot’ını kullanır.

“AI İçgörü Oluştur” butonu ile /ai/insights çağrılır.

Dönen insights metni ekranda gösterilir.

Hata durumunda: “AI yorumları alınamıyor” mesajı gösterilir.
7. n8n Entegrasyonu (Workflow Tetikleme)

n8n entegrasyonu kod tarafında hazır;
AsilParla tarafı event üretir, n8n tarafı workflow çalıştırır.

automation/n8n/n8n_client.py

get_n8n_config() – N8N_URL, N8N_API_KEY, N8N_DRY_RUN, APP_ENV okur.

trigger_workflow(slug, payload):

N8N_DRY_RUN=true iken:

Sadece log yazar, network yapmaz → { "status": "dry_run" }

Prod + URL varsa:

POST {N8N_URL}/webhook/{slug} isteği atar, sonuç loglanır.

Worker Entegrasyonu

services/worker/sync_orders.py

Siparişler senkronize edildikten sonra:
trigger_workflow(
    "orders_synced",
    {
        "source": "sync_orders",
        "synced_count": <adet veya "unknown">,
    },
)
services/worker/update_stock.py

Stok güncellemesi sonrası:
trigger_workflow(
    "stock_updated",
    {
        "source": "update_stock",
        "updated_count": <adet veya "unknown">,
    },
)
Workflow Tasarımı (n8n UI)

Detaylı açıklama: automation/n8n/README.md

Kısaca:

n8n’de Webhook node oluştur:

orders_synced için path: /webhook/orders_synced

stock_updated için path: /webhook/stock_updated

Devamına şu node’ları bağlayabilirsin:

Efatura servisi (mock/gerçek)

Kargo servisi

Slack / e-posta / SMS bildirim

Log / rapor kaydı node’ları

8. Testler

Testler pytest ile çalıştırılır:

pytest -q --capture=sys


Mevcut durumda:

Toplam 39 test tanımlıdır.

Auth, gateway, config, env dosyaları, AIInsights, n8n client, vb. senaryoları kapsar.

Hedef: 0 fail (tüm testler yeşil).

Örnek önemli test dosyaları:

tests/integration/test_gateway.py

tests/integration/test_auth_api.py

tests/integration/test_ai_insights_api.py

tests/unit/test_env_files.py

tests/unit/test_n8n_client.py

9. Yol Haritası / Sonraki Adımlar

Bu sürüm, demo + iskelet + AI + n8n entegrasyonlu bir yapı sunar.
Gerçek hayata çıkarken aşağıdakiler tamamlanmalıdır:

Prod ENV düzeni

.env.production içindeki:

JWT_SECRET, ENCRYPTION_KEY

DB_URL

Dış servis API key’leri

Gerçek ve güçlü değerler ile değiştirilmeli.

Gerçek Trendyol / Efatura / Kargo Entegrasyonu

Mevcut mock connector’lar, gerçek API sözleşmeleri ile genişletilmeli.

Rate limit & retry & error handling eklenmeli.

Monitoring / Alerting

performance_monitoring/, config/alerts/ ve monitoring/ klasörleri
üretim seviyesinde metrik ve alarm senaryoları ile doldurulmalı.

Legal / KVKK / Sözleşmeler

legal/ altındaki metinler (kvkk, privacy, tos, merchant_policy)
avukat onaylı hâle getirilip kullanıcı arayüzüne bağlanmalı.

Dağıtım (Deploy)

docker-compose.prod + CI/CD pipeline ile
tek komutla dev → staging → prod dağıtım senaryoları hazırlanmalıdır.

Bu README, AsilParla v1.17.02 kod tabanının genel resmini,


















/
 .
