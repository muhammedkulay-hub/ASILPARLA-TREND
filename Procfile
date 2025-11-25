web: uvicorn services.api.app.main:app --host 0.0.0.0 --port ${PORT:-8000}
worker: python -m services.worker.worker
scheduler: python automation/scheduler/job_runner.py
