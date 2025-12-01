.PHONY: run

run: db_up
	docker-compose up -d --build

db_up:
	scripts/db_up.sh
	scripts/ins.sh

