## Trendyol Sipariş Senkronu Workflow'u

- **Amaç:** Trendyol üzerinden gelen siparişleri her 15 dakikada bir AsilParla API'sine aktarır.
- **Çalışma Şekli:** Cron tetikleyicisi `https://api.asilparla.local/api/orders/sync` adresine POST isteği gönderir ve n8n'de loglanır.
- **Kurulum İpucu:** n8n'de workflow'u içe aktar, cron değerini ihtiyaç duyulan periyoda göre güncelle ve gerçek API URL'sini ortamına göre ayarla.
- **Güvenlik:** `Authorization` başlıkları veya gizli parametreler n8n'ün gizli değişkenler bölümünde tutulmalıdır.
