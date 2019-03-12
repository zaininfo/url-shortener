port := 3000
postgres_host := postgres
postgres_port := 5432
postgres_user := postgres
postgres_password := postgres
postgres_db := postgres
postgres_dialect := postgres
source_files := $(wildcard src/*) $(wildcard src/**/*)

.PHONY: bootstrap-dev
bootstrap-dev:
	@npm run install:dev

.PHONY: lint
lint:
	@npm run lint

.PHONY: run
run:
	@NODE_ENV=development \
	PORT=$(port) \
	POSTGRES_HOST=$(postgres_host) \
	POSTGRES_PORT=$(postgres_port) \
	POSTGRES_USER=$(postgres_user) \
	POSTGRES_PASSWORD=$(postgres_password) \
	POSTGRES_DB=$(postgres_db) \
	POSTGRES_DIALECT=$(postgres_dialect) \
	npm run server:dev

.PHONY: run-reload
run-reload:
	@NODE_ENV=development \
	PORT=$(port) \
	POSTGRES_HOST=$(postgres_host) \
	POSTGRES_PORT=$(postgres_port) \
	POSTGRES_USER=$(postgres_user) \
	POSTGRES_PASSWORD=$(postgres_password) \
	POSTGRES_DB=$(postgres_db) \
	POSTGRES_DIALECT=$(postgres_dialect) \
	npm run watch

dist: $(source_files)
	@npm run build

.PHONY: build
build: dist

.PHONY: bootstrap-prod
bootstrap-prod:
	@npm run install:prod

.PHONY: deploy
deploy:
	@NODE_ENV=production \
	PORT=$(port) \
	POSTGRES_HOST=$(postgres_host) \
	POSTGRES_PORT=$(postgres_port) \
	POSTGRES_USER=$(postgres_user) \
	POSTGRES_PASSWORD=$(postgres_password) \
	POSTGRES_DB=$(postgres_db) \
	POSTGRES_DIALECT=$(postgres_dialect) \
    docker-compose up -d

.PHONY: teardown
teardown:
	@PORT=$(port) \
	POSTGRES_PORT=$(postgres_port) \
	docker-compose down --rmi local
