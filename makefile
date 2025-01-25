.PHONY: run

run:
	npm run dev

db_up:
	scripts/db_up.sh
	scripts/ins.sh

