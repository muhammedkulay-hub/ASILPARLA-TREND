## Hesap Sağlığı Alarm Workflow'u

- **Senaryo:** Manuel veya başka servisler tarafından tetiklenen webhook, hesap sağlığı verilerini toplar ve kritik eşikler aşılırsa uyarı gönderir.
- **Kurulum:** `account-health-alert` path'ini n8n içinde koru, gerçek bildirim servisini (e-posta, Slack vb.) kendi URL'inle değiştir.
- **Kullanım:** CLI/worker tarafından POST isteği atılarak veya n8n panelinden manuel tetiklenerek değerlendirme yapılabilir.
- **Ek Not:** İleride AI servisinden gelen skorları loglamak için ekstra Function veya DB node'ları eklenmesi tavsiye edilir.
