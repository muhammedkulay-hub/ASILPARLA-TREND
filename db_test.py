import psycopg2

try:
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="525458",
        host="localhost",
        port="5432"
    )
    print("✅ Veritabanı bağlantısı başarılı!")
    conn.close()
except Exception as e:
    print("❌ Bağlantı hatası:", e)