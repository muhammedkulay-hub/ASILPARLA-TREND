// Chart.js Konfigürasyonu - Neon Grafik
const ctx = document.getElementById('revenueChart').getContext('2d');

// Gradyan Oluşturma (Grafiğin altı parlasın diye)
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // Mor başlangıç
gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');   // Saydam bitiş

const revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'],
        datasets: [{
            label: 'Gerçekleşen Satış',
            data: [1200, 1900, 3000, 2500, 4200, 5000, 6500],
            borderColor: '#6366f1',
            backgroundColor: gradient,
            borderWidth: 3,
            tension: 0.4, // Çizgiyi yumuşatır (kıvrımlı yapar)
            fill: true,
            pointBackgroundColor: '#fff'
        },
        {
            label: 'AI Tahmini (Hedef)',
            data: [1500, 2200, 3200, 3500, 4500, 5500, 7000],
            borderColor: '#d946ef', // Pembe çizgi
            borderDash: [5, 5], // Kesik çizgi
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 0 // Noktaları gizle
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#94a3b8' } // Yazı rengi
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        }
    }
});

// AI Simülasyonu - Rastgele Bildirimler
function simulateAIInsights() {
    const insights = [
        "Fiyat Botu: Rakip X fiyat düşürdü, fiyatınız optimize edildi.",
        "Stok Uyarısı: Kırmızı Elbise için talep artışı öngörülüyor.",
        "Kargo Analizi: Sürat Kargo teslimat süresi uzadı, Aras öneriliyor."
    ];
    // Rastgele bir mesaj seçip konsola yazalım (İleride popup yapılacak)
    const randomMsg = insights[Math.floor(Math.random() * insights.length)];
    console.log(`[AsilParla AI]: ${randomMsg}`);
}

// Her 10 saniyede bir AI kontrolü yapsın
setInterval(simulateAIInsights, 10000);

