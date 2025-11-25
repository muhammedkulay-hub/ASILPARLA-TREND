"""
Metrik toplama
"""

import logging
import time
from typing import Dict, Any, List
from datetime import datetime
from collections import defaultdict

logger = logging.getLogger(__name__)


class MetricsCollector:
    """Metrik toplama sınıfı"""
    
    def __init__(self):
        self.metrics = defaultdict(list)
        self.counters = defaultdict(int)
        self.timers = {}
    
    def increment(self, metric_name: str, value: int = 1, tags: Dict[str, str] = None):
        """Sayaç artır"""
        key = f"{metric_name}:{tags}" if tags else metric_name
        self.counters[key] += value
    
    def record(self, metric_name: str, value: float, tags: Dict[str, str] = None):
        """Değer kaydet"""
        key = f"{metric_name}:{tags}" if tags else metric_name
        self.metrics[key].append({
            "value": value,
            "timestamp": datetime.now().isoformat()
        })
    
    def start_timer(self, metric_name: str) -> str:
        """Zamanlayıcı başlat"""
        timer_id = f"{metric_name}_{int(time.time() * 1000)}"
        self.timers[timer_id] = time.time()
        return timer_id
    
    def stop_timer(self, timer_id: str) -> float:
        """Zamanlayıcı durdur ve süreyi döndür"""
        if timer_id in self.timers:
            elapsed = time.time() - self.timers[timer_id]
            del self.timers[timer_id]
            return elapsed
        return 0.0
    
    def get_metrics(self) -> Dict[str, Any]:
        """Toplanan metrikleri döndür"""
        return {
            "counters": dict(self.counters),
            "metrics": {
                k: {
                    "count": len(v),
                    "avg": sum(m["value"] for m in v) / len(v) if v else 0,
                    "min": min(m["value"] for m in v) if v else 0,
                    "max": max(m["value"] for m in v) if v else 0
                }
                for k, v in self.metrics.items()
            }
        }


# Global instance
_metrics_collector = None


def get_metrics_collector() -> MetricsCollector:
    """Global metrics collector instance"""
    global _metrics_collector
    if _metrics_collector is None:
        _metrics_collector = MetricsCollector()
    return _metrics_collector
