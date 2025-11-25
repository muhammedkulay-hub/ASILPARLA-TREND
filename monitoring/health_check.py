"""
Sistem sağlık kontrolü
"""

import logging
import psutil
from typing import Dict, Any
from datetime import datetime

logger = logging.getLogger(__name__)


def check_system_health() -> Dict[str, Any]:
    """Sistem sağlık durumunu kontrol et"""
    try:
        # CPU ve Memory
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "system": {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "memory_available_gb": round(memory.available / (1024**3), 2),
                "disk_percent": disk.percent,
                "disk_free_gb": round(disk.free / (1024**3), 2)
            }
        }
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return {
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }


def check_database_health(db_session) -> Dict[str, Any]:
    """Veritabanı sağlık kontrolü"""
    try:
        from sqlalchemy import text
        result = db_session.execute(text("SELECT 1"))
        result.fetchone()
        return {
            "status": "healthy",
            "latency_ms": 0
        }
    except Exception as e:
        logger.error(f"Database health check error: {e}")
        return {
            "status": "unhealthy",
            "error": str(e)
        }
