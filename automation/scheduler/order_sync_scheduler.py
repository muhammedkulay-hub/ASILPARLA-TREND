"""
Sipariş senkronizasyonu için basit planlayıcı adaptörü.

Bu dosya gerçek cron/scheduler görevleri tarafından import edilip çağrılacak
yardımcı fonksiyonları içerir.
"""

from __future__ import annotations

import logging
from typing import Dict, Optional

from automation.n8n_client import get_n8n_client

logger = logging.getLogger(__name__)


def schedule_trendyol_sync(extra_payload: Optional[Dict[str, str]] = None) -> Dict:
    """
    Cronjob, systemd timer veya manuel tetikleme tarafından çağrılmak üzere
    tasarlanmıştır. Fonksiyon n8n workflow'unu tetikler.
    """

    client = get_n8n_client()
    payload = {"source": "trendyol", "triggered_by": "scheduler"}
    if extra_payload:
        payload.update(extra_payload)

    logger.info("Trendyol senkronizasyonu tetikleniyor...")
    result = client.trigger_workflow("workflow_sync_trendyol_orders", payload=payload)
    logger.info("Trendyol senkronizasyonu n8n'e iletildi")
    return result
