# AsilParla System Architecture

AsilParla is a modular AI-powered automation system built for Trendyol sellers.
It runs on FastAPI (Python backend) + React Native (mobile frontend) with full automation for:
- Orders, Cargo, e-Invoice, Reports, Finance, and Trendyol compliance.
- AI-driven features: pricing optimization, fraud detection, penalty prevention.
- Modular APIs with connectors for Trendyol, cargo, supplier, finance.

### Core Layers
1. **API Service (FastAPI)**
   - Handles all REST/JSON requests.
   - Connects via secure OAuth and JWT authentication.
   - Includes AI modules, routers, and connectors.

2. **Mobile App (React Native)**
   - Provides premium UI for sellers and admins.
   - Supports multilingual screens (TR + EN).
   - Full integration with backend through REST APIs.

3. **Automation Layer**
   - `n8n` workflows and schedulers for auto-sync, KPI alerts, invoices, and AI feedback loops.

4. **Monitoring Layer**
   - Real-time anomaly detection, CPU/memory usage tracking, latency monitoring.

5. **Compliance Layer**
   - Ensures KVKK, e-Defter, and Trendyol legal policy alignment.

