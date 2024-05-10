# Well documented Makefiles
DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-40s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [Container]
start: ## Start the containers: make start SERVICE_NAME=<service>
	docker-compose up -d $(SERVICE_NAME)

stop: ## Stop the containers
	docker-compose stop $(ARGS) && \
	rm -f .container/redis/data/dump.rdb

status: ## Status the containers
	docker-compose ps

down: ## Shut down the containers with args for removed volumes
	docker-compose down $(ARGS) && \
	rm -f .container/redis/data/dump.rdb

delete: ## Removed the containers
	docker-compose stop $(ARGS) && \
	docker-compose rm -f $(ARGS)

build: ## Build all container images OR a specific image by providing the service name via: make build DOCKER_ARGS=<args> SERVICE_NAME=<service>
	[ -f .env ] || cp .env.example .env && \
	docker-compose build $(DOCKER_ARGS) $(SERVICE_NAME)

build-no-cache: ## Build all container images OR a specific image by providing the service name via: make build DOCKER_ARGS=<args> SERVICE_NAME=<service>
	[ -f .env ] || cp .env.example .env && \
	make build DOCKER_ARGS="--no-cache --progress plain" && \
	make down && \
	make start && \
	docker exec -it gcodonto-app ls -lha prisma tools dist dist/prisma

db-start: ## Spin up the DB container for migrations and seeding
	docker-compose up postgres -d

db-stop: ## Shut down the DB container
	docker-compose stop postgres

##@ [Application]
#configure: ## Configures the application when setting it for the first time
#	make install && \
#	make art ARGS="key:generate --ansi"

#composer: ## Run composer commands. Specify the command e.g. via make composer ARGS="install|update|require <dependency>"
#	docker-compose run --rm app composer $(ARGS)

#install: ## Install all the dependencies
#	docker-compose run --rm app composer install

#composer-bump: ## Updates the dependencies and the min version on composer.json
#	docker-compose run --rm app composer update && \
#	docker-compose run --rm app composer bump \

npm: ## Run artisan commands. Specify the command e.g. via make art ARGS="tinker"
	docker-compose run --rm app npm run $(ARGS)

prisma: ## Run artisan commands. Specify the command e.g. via make art ARGS="tinker"
	docker-compose run --rm app npx prisma $(ARGS)

lint: ## Run the Linter.
	docker-compose run --rm app npm run lint

#test: ## Run all the tests.
#	docker-compose run --rm app composer test

#swagger: ## Generate the swagger documentation
#	docker-compose run --rm app composer swagger

#prepare: ## Run tools to prepare for commit
#	docker-compose run --rm app composer prepare

#hooks: ## Run the CGHooks commands. Specify the command e.g. via make hooks ARGS="update"
#	docker-compose run --rm app ./vendor/bin/cghooks $(ARGS)
