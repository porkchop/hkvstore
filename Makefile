start: node_modules db.json
	@node server.js

node_modules: package.json
	@npm install

test: node_modules test-db.json
	@./node_modules/.bin/mocha \
		--reporter spec

db.json:
	@node setup.js -d db.json

test-db.json:
	@node setup.js -d test-db.json

clean:
	@rm -rf db.json test-db.json node_modules

.PHONY: test dist start clean
