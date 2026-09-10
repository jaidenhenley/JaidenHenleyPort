import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jaidenhenley.com',
  build: {
    // Emits /coastcast.html, so the original page URLs keep resolving.
    format: 'file',
  },
  redirects: {
    // format: 'file' appends .html, so these emit /caseStudies.html and
    // /bridgeprofessionals.html: exactly the URLs the old site published.
    '/caseStudies': '/case-studies',
    '/bridgeprofessionals': '/case-studies',
  },
});
