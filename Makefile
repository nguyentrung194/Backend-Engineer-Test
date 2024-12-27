SHELL := /bin/bash

IMAGE ?= api-backend
VERSION ?= 0.1.0

echo:
	@echo $(IMAGE):$(VERSION)

build_base:
	docker build -f Dockerfile.base -t $(IMAGE):base .
	docker network create api-net

build:
	docker build -f Dockerfile -t $(IMAGE):$(VERSION) .

install:
	docker-compose up -d

uninstall:
	docker-compose down