"""
n8n Integration Wrappers for AsilParla v1.17.02
Provides high-level functions for common automation workflows
"""
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from n8n_client import get_n8n_client

logger = logging.getLogger(__name__)


class N8NIntegrations:
    """Integration wrappers for n8n workflows"""
    
    def __init__(self):
        self.client = get_n8n_client()
    
    def sync_trendyol_orders(
        self,
        seller_id: str,
        date_from: Optional[str] = None,
        date_to: Optional[str] = None,
        status: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Trigger Trendyol order synchronization workflow
        
        Args:
            seller_id: Trendyol seller ID
            date_from: Start date (ISO format)
            date_to: End date (ISO format)
            status: Order status filter
            
        Returns:
            Workflow execution result
        """
        try:
            payload = {
                "seller_id": seller_id,
                "date_from": date_from or (datetime.now() - timedelta(days=1)).isoformat(),
                "date_to": date_to or datetime.now().isoformat(),
                "status": status,
                "triggered_at": datetime.utcnow().isoformat()
            }
            
            result = self.client.trigger_webhook(
                webhook_path="webhook/trendyol-order-sync",
                method="POST",
                data=payload
            )
            
            logger.info(f"Trendyol order sync triggered for seller {seller_id}")
            return {
                "success": True,
                "workflow": "trendyol_order_sync",
                "result": result,
                "payload": payload
            }
        except Exception as e:
            logger.error(f"Failed to trigger Trendyol order sync: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "workflow": "trendyol_order_sync"
            }
    
    def auto_dispute_penalty(
        self,
        penalty_id: str,
        dispute_reason: str,
        evidence: Optional[List[Dict]] = None
    ) -> Dict[str, Any]:
        """
        Trigger automatic penalty dispute workflow
        
        Args:
            penalty_id: Penalty ID to dispute
            dispute_reason: Reason for dispute
            evidence: List of evidence documents/links
            
        Returns:
            Workflow execution result
        """
        try:
            payload = {
                "penalty_id": penalty_id,
                "dispute_reason": dispute_reason,
                "evidence": evidence or [],
                "triggered_at": datetime.utcnow().isoformat(),
                "auto_dispute": True
            }
            
            result = self.client.trigger_webhook(
                webhook_path="webhook/penalty-dispute",
                method="POST",
                data=payload
            )
            
            logger.info(f"Penalty dispute triggered for penalty {penalty_id}")
            return {
                "success": True,
                "workflow": "penalty_dispute",
                "result": result,
                "payload": payload
            }
        except Exception as e:
            logger.error(f"Failed to trigger penalty dispute: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "workflow": "penalty_dispute"
            }
    
    def sync_supplier_stock(
        self,
        supplier_id: str,
        product_ids: Optional[List[str]] = None,
        force_full_sync: bool = False
    ) -> Dict[str, Any]:
        """
        Trigger supplier stock synchronization workflow
        
        Args:
            supplier_id: Supplier ID
            product_ids: Specific product IDs to sync (None = all)
            force_full_sync: Force full sync even if recently synced
            
        Returns:
            Workflow execution result
        """
        try:
            payload = {
                "supplier_id": supplier_id,
                "product_ids": product_ids,
                "force_full_sync": force_full_sync,
                "triggered_at": datetime.utcnow().isoformat()
            }
            
            result = self.client.trigger_webhook(
                webhook_path="webhook/supplier-stock-sync",
                method="POST",
                data=payload
            )
            
            logger.info(f"Supplier stock sync triggered for supplier {supplier_id}")
            return {
                "success": True,
                "workflow": "supplier_stock_sync",
                "result": result,
                "payload": payload
            }
        except Exception as e:
            logger.error(f"Failed to trigger supplier stock sync: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "workflow": "supplier_stock_sync"
            }
    
    def generate_daily_kpi_report(
        self,
        tenant_id: str,
        report_date: Optional[str] = None,
        include_charts: bool = True,
        email_recipients: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Trigger daily KPI report generation workflow
        
        Args:
            tenant_id: Tenant/account ID
            report_date: Report date (ISO format, defaults to yesterday)
            include_charts: Include chart visualizations
            email_recipients: List of email addresses to send report
            
        Returns:
            Workflow execution result
        """
        try:
            if not report_date:
                report_date = (datetime.now() - timedelta(days=1)).date().isoformat()
            
            payload = {
                "tenant_id": tenant_id,
                "report_date": report_date,
                "include_charts": include_charts,
                "email_recipients": email_recipients or [],
                "triggered_at": datetime.utcnow().isoformat(),
                "report_type": "daily_kpi"
            }
            
            result = self.client.trigger_webhook(
                webhook_path="webhook/daily-kpi-report",
                method="POST",
                data=payload
            )
            
            logger.info(f"Daily KPI report generation triggered for tenant {tenant_id}")
            return {
                "success": True,
                "workflow": "daily_kpi_report",
                "result": result,
                "payload": payload
            }
        except Exception as e:
            logger.error(f"Failed to trigger daily KPI report: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "workflow": "daily_kpi_report"
            }
    
    def trigger_custom_workflow(
        self,
        workflow_name: str,
        data: Dict[str, Any],
        wait: bool = False
    ) -> Dict[str, Any]:
        """
        Trigger a custom workflow by name
        
        Args:
            workflow_name: Workflow name or ID
            data: Workflow input data
            wait: Wait for execution to complete
            
        Returns:
            Workflow execution result
        """
        try:
            # First, try to find workflow by name
            workflows = self.client.list_workflows(active_only=True)
            workflow = next(
                (w for w in workflows if w.get("name") == workflow_name),
                None
            )
            
            if not workflow:
                # Try as ID
                try:
                    workflow = self.client.get_workflow(workflow_name)
                except:
                    raise ValueError(f"Workflow '{workflow_name}' not found")
            
            workflow_id = workflow.get("id") or workflow.get("workflowId")
            
            result = self.client.create_execution(
                workflow_id=workflow_id,
                data=data,
                wait=wait
            )
            
            logger.info(f"Custom workflow '{workflow_name}' triggered")
            return {
                "success": True,
                "workflow": workflow_name,
                "workflow_id": workflow_id,
                "result": result
            }
        except Exception as e:
            logger.error(f"Failed to trigger custom workflow: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "workflow": workflow_name
            }


# Global instance
_integrations: Optional[N8NIntegrations] = None


def get_integrations() -> N8NIntegrations:
    """Get or create global integrations instance"""
    global _integrations
    if _integrations is None:
        _integrations = N8NIntegrations()
    return _integrations

