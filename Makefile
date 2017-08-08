.PHONY: run in stop clean ci-build build prod default

# Task declarations.
# ------------------

run:
	docker-compose run --rm -p 3000:3000 site

in:
	docker exec -it $(shell docker-compose ps | grep _run_ | cut -d" " -f 1) /bin/bash

stop:
	docker-compose stop

clean:
	docker-compose down

build:
	docker-compose build

prod:
	docker-compose -f docker-compose.site.prod.yml up -d

default: run
