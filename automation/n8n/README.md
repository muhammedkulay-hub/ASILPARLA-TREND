# n8n Automation Integration for AsilParla v1.17.02

Complete n8n automation implementation for AsilParla platform.

## Structure

```
automation/
├── n8n_client.py          # n8n API client
├── n8n/
│   ├── __init__.py        # Module exports
│   ├── integrations.py    # High-level integration wrappers
│   ├── triggers.yaml      # Webhook trigger definitions
│   ├── workflows/         # n8n workflow JSON files
│   │   ├── order_sync.json
│   │   ├── penalty_alert.json
│   │   ├── supplier_sync.json
│   │   └── daily_kpi_report.json
│   └── README.md          # This file
```

## Components

### 1. n8n API Client (`n8n_client.py`)

Full-featured client for n8n API with methods:
- `create_execution()` - Trigger workflow execution
- `trigger_webhook()` - Trigger webhook endpoint
- `list_workflows()` - List all workflows
- `get_workflow()` - Get workflow by ID
- `check_status()` - Check n8n instance status
- `activate_workflow()` / `deactivate_workflow()` - Control workflow state

### 2. Integration Wrappers (`n8n/integrations.py`)

High-level functions for common automations:
- `sync_trendyol_orders()` - Sync orders from Trendyol
- `auto_dispute_penalty()` - Auto-dispute penalties
- `sync_supplier_stock()` - Sync supplier stock
- `generate_daily_kpi_report()` - Generate daily reports
- `trigger_custom_workflow()` - Trigger any workflow

### 3. Workflow Triggers (`triggers.yaml`)

Webhook trigger definitions:
- `on_new_order` - New Trendyol order received
- `on_low_stock` - Product stock below threshold
- `on_penalty_received` - New penalty from Trendyol
- `on_daily_summary` - Daily KPI report trigger
- And more...

### 4. Workflow Definitions

#### Order Sync (`order_sync.json`)
- Receives new orders via webhook
- Processes and saves to API
- Creates shipment if order is shipped
- Sends Telegram notifications

#### Penalty Alert (`penalty_alert.json`)
- Receives penalty notifications
- AI analysis for dispute eligibility
- Auto-submits disputes when eligible
- Sends alerts via Telegram and email

#### Supplier Sync (`supplier_sync.json`)
- Syncs stock from suppliers
- Updates product inventory
- Checks for low stock
- Creates alerts for low stock items

#### Daily KPI Report (`daily_kpi_report.json`)
- Scheduled daily at 8 AM
- Generates KPI reports
- Sends email reports
- Saves reports to API

## Environment Variables

Required environment variables:

```bash
N8N_URL=http://localhost:5678          # n8n instance URL
N8N_API_KEY=your_api_key_here         # n8n API key (optional)
N8N_WEBHOOK_SECRET=webhook_secret     # Webhook authentication
ASILPARLA_API_URL=http://localhost:8000  # AsilParla API URL
TELEGRAM_CHAT_ID=your_chat_id         # Telegram notifications
ADMIN_EMAIL=admin@example.com         # Admin email
```

## Usage

### Basic Usage

```python
from automation.n8n_client import get_n8n_client
from automation.n8n.integrations import get_integrations

# Get client
client = get_n8n_client()

# Check n8n status
status = client.check_status()
print(status)

# Get integrations
integrations = get_integrations()

# Sync Trendyol orders
result = integrations.sync_trendyol_orders(
    seller_id="seller123",
    date_from="2024-01-01",
    date_to="2024-01-31"
)

# Auto-dispute penalty
result = integrations.auto_dispute_penalty(
    penalty_id="penalty123",
    dispute_reason="Invalid penalty reason",
    evidence=[{"type": "document", "url": "..."}]
)

# Sync supplier stock
result = integrations.sync_supplier_stock(
    supplier_id="supplier456",
    product_ids=["prod1", "prod2"]
)

# Generate daily KPI report
result = integrations.generate_daily_kpi_report(
    tenant_id="tenant789",
    report_date="2024-01-15",
    email_recipients=["admin@example.com"]
)
```

### Direct Webhook Trigger

```python
from automation.n8n_client import get_n8n_client

client = get_n8n_client()

# Trigger webhook directly
result = client.trigger_webhook(
    webhook_path="webhook/trendyol-order-sync",
    method="POST",
    data={
        "order_id": "order123",
        "seller_id": "seller456",
        "total_amount": 150.00
    }
)
```

## Importing Workflows to n8n

1. Open n8n UI
2. Go to Workflows
3. Click "Import from File"
4. Select workflow JSON files from `automation/n8n/workflows/`
5. Configure credentials (API, Telegram, SMTP)
6. Activate workflows

## Webhook Configuration

Configure webhooks in n8n:
1. Create Webhook node in workflow
2. Set webhook path (e.g., `/webhook/trendyol-order-sync`)
3. Save workflow
4. Copy webhook URL
5. Use in AsilParla API to trigger workflows

## Integration with FastAPI

Example FastAPI endpoint:

```python
from fastapi import APIRouter
from automation.n8n.integrations import get_integrations

router = APIRouter()
integrations = get_integrations()

@router.post("/api/orders/sync")
async def sync_orders(seller_id: str):
    result = integrations.sync_trendyol_orders(seller_id=seller_id)
    return result
```

## Testing

Test n8n client:

```python
from automation.n8n_client import get_n8n_client

client = get_n8n_client()
status = client.check_status()
assert status["status"] == "online"
```

## Notes

- All workflows use environment variables for configuration
- Webhook authentication uses `X-AsilParla-Webhook-Key` header
- Workflows are designed to be idempotent
- Error handling is built into all integration functions
- Logging is configured for debugging

## Support

For issues or questions, refer to:
- n8n Documentation: https://docs.n8n.io
- AsilParla API Documentation: `docs/api/`











