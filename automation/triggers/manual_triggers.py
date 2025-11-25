"""
CLI veya yönetim panellerinden çağrılabilecek manuel tetikleyiciler.
Amaç: Operasyon ekibinin kritik workflow'ları ihtiyaç olduğunda çalıştırabilmesi.
"""

from __future__ import annotations

from typing import Dict, Optional

from automation.n8n_client import get_n8n_client


def trigger_manual_order_sync(note: Optional[str] = None) -> Dict:
    """Operasyon ekibi gerektiğinde Trendyol senkronu başlatabilir."""

    client = get_n8n_client()
    payload = {"source": "manual", "note": note or ""}
    return client.trigger_workflow("workflow_sync_trendyol_orders", payload=payload)


def trigger_manual_health_alert_scan(reason: Optional[str] = None) -> Dict:
    """
    Hesap sağlığı taraması gerekirse bu fonksiyon kullanılabilir.
    Webhook tabanlı workflow tetiklenir.
    """

    client = get_n8n_client()
    payload = {"reason": reason or "manual_check"}
    return client.trigger_workflow("workflow_send_account_health_alerts", payload=payload)
