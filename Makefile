install:
	mkdir dist
	cp public/_redirects dist/
	cp public/index.html dist/

	cd functions/gen-opengraph-image && npm ci && npm run build
	cd functions/process-url && npm ci
