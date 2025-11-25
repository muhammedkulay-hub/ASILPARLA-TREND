"""
Günlük finans raporu planlayıcısı.

Gerçek hayatta bu fonksiyon bir cronjob tarafından her sabah çağrılacak ve
n8n workflow'unu tetikleyecektir.
"""

from __future__ import annotations

import logging
from typing import Dict

from automation.n8n_client import get_n8n_client

logger = logging.getLogger(__name__)


def schedule_daily_finance_report() -> Dict:
    """Saatlik/sabah görevleri tarafından tetiklenir."""

    client = get_n8n_client()
    payload = {
        "report_type": "daily_kpi",
        "requested_by": "scheduler",
    }
    logger.info("Günlük finans raporu workflow'u tetikleniyor...")
    result = client.trigger_workflow(
        "workflow_generate_daily_finance_report", payload=payload
    )
    logger.info("Günlük finans raporu n8n tarafına aktarıldı")
    return result
