SHELL := /bin/bash

.PHONY: help install run worker test compose-up compose-down compose-logs compose-prod-up compose-prod-down

help:
	@echo "Targets:"
	@echo "  install           Create venv and install Python deps"
	@echo "  run               Start FastAPI with reload (dev)"
	@echo "  worker            Run background worker (dev)"
	@echo "  test              Run pytest suite"
	@echo "  compose-up        Build & start dev Docker stack"
	@echo "  compose-down      Stop dev Docker stack"
	@echo "  compose-logs      Tail dev stack logs"
	@echo "  compose-prod-up   Build & start prod-like stack (detached)"
	@echo "  compose-prod-down Stop prod-like stack"

install:
	python3 -m venv .venv
	. .venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt

run:
	APP_ENV=development uvicorn services.api.app.main:app --host 0.0.0.0 --port 8000 --reload

worker:
	APP_ENV=development python -m services.worker.worker

test:
	pytest

compose-up:
	docker compose -f docker-compose.dev.yml up --build

compose-down:
	docker compose -f docker-compose.dev.yml down

compose-logs:
	docker compose -f docker-compose.dev.yml logs -f

compose-prod-up:
	docker compose -f docker-compose.prod.yml up --build -d

compose-prod-down:
	docker compose -f docker-compose.prod.yml down
