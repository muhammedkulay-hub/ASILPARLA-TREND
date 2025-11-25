"""
AsilParla - n8n İstemcisi
-------------------------

Bu modül n8n REST API ile haberleşmek için küçük ve dayanıklı bir istemci
sağlar. Ortam değişkenlerinden yapılandırma alır ve FastAPI router'ları,
worker'lar veya planlanmış görevler tarafından güvenle kullanılabilir.
"""

from __future__ import annotations

import json
import logging
import os
from typing import Any, Dict, Optional

import requests
from requests import Response
from requests.exceptions import RequestException, Timeout

logger = logging.getLogger(__name__)


class N8NClient:
    """n8n HTTP API'si ile konuşan basit istemci."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        api_key: Optional[str] = None,
        timeout: int = 15,
    ) -> None:
        """
        Args:
            base_url: n8n kurulumunun taban URL'si. Örn: https://n8n.example.com
            api_key: n8n kullanıcı API anahtarı. Ortam değişkeninden okunur.
            timeout: HTTP istek zaman aşımı (saniye).
        """

        self.base_url = (base_url or os.getenv("N8N_URL") or "http://localhost:5678").rstrip(
            "/"
        )
        self.api_key = api_key or os.getenv("N8N_API_KEY") or ""
        self.timeout = timeout

    # ---------------------------------------------------------------------#
    # Yardımcılar
    # ---------------------------------------------------------------------#
    def _headers(self) -> Dict[str, str]:
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        if self.api_key:
            headers["X-N8N-API-KEY"] = self.api_key
        return headers

    def _request(self, method: str, path: str, **kwargs: Any) -> Response:
        url = f"{self.base_url}{path}"
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=self._headers(),
                timeout=self.timeout,
                **kwargs,
            )
            response.raise_for_status()
            return response
        except Timeout as exc:
            logger.error("n8n isteği zaman aşımına uğradı: %s %s", method, url)
            raise RuntimeError("n8n isteği zaman aşımına uğradı") from exc
        except RequestException as exc:
            logger.error("n8n isteği başarısız oldu: %s %s - %s", method, url, exc)
            raise RuntimeError(f"n8n isteği başarısız: {exc}") from exc

    # ---------------------------------------------------------------------#
    # Kamu metodları
    # ---------------------------------------------------------------------#
    def trigger_workflow(
        self,
        workflow_id: str,
        payload: Optional[Dict[str, Any]] = None,
        wait_for_result: bool = False,
    ) -> Dict[str, Any]:
        """
        Bir n8n workflow'unu tetikler.

        Args:
            workflow_id: n8n içindeki benzersiz workflow kimliği veya webhook adı.
            payload: Workflow'a iletilecek JSON veri.
            wait_for_result: True ise n8n tamamlanana kadar bekler (destekleyen
                workflow'lar için).

        Returns:
            Workflow yürütmesinin sonucunu içeren dictionary.

        Raises:
            RuntimeError: HTTP hatası, JSON çözme hatası veya beklenmeyen cevapta.
        """

        endpoint = (
            f"/api/v1/workflows/{workflow_id}/run"
            if workflow_id.isdigit()
            else f"/webhook/{workflow_id}"
        )

        response = self._request(
            method="POST",
            path=endpoint,
            json=payload or {},
            params={"wait": "true"} if wait_for_result and workflow_id.isdigit() else None,
        )
        try:
            return response.json()
        except json.JSONDecodeError as exc:
            logger.error("n8n yanıtı JSON parse edilemedi: %s", response.text[:200])
            raise RuntimeError("n8n beklenmeyen cevap döndürdü") from exc

    def healthcheck(self) -> bool:
        """
        n8n örneğinin ayakta olup olmadığını basitçe kontrol eder.

        Returns:
            True: /healthz uç noktası 200 dönerse
            False: herhangi bir hata veya 2xx dışı durum
        """

        try:
            response = self._request("GET", "/healthz")
            return response.status_code == 200
        except RuntimeError:
            return False


_n8n_client: Optional[N8NClient] = None


def get_n8n_client() -> N8NClient:
    """
    Lazy olarak tek bir N8NClient nesnesi oluşturur.

    Returns:
        N8NClient: Paylaşılan istemci örneği.
    """

    global _n8n_client
    if _n8n_client is None:
        _n8n_client = N8NClient()
    return _n8n_client
