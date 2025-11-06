// LIGHTHOUSE DESKTOP CONFIGURATION
var argv = require('yargs')
  .env('Vtex')
  .options({
      't': {
        alias: 'Token',
        default: ''
      },
      'v': {
        alias: 'Vendor',
        default: 'corebiz'
      },
      'w': {
        alias: 'Ws',
        default: 'master'
      },
    })
  .argv

module.exports = {
 ci: {
  collect: {
   numberOfRuns: 2,
   url: [
	'https://' + argv.Vendor + '.myvtex.com/?workspace=' + argv.Ws + '&__disablePixels&Desktop', // Homepage
        //'https://' + argv.Vendor + '.myvtex.com/CustomCollectionPage?workspace=' + argv.Ws + '&__disablePixels&Desktop' // Custon Collection Page
        //'https://' + argv.Vendor + '.myvtex.com/CustomPDPPage?workspace=' + argv.Ws + '&__disablePixels&Desktop', // Custom PDP
        //'https://' + argv.Vendor + '.myvtex.com/AnotherCustomPage?workspace=' + argv.Ws + '&__disablePixels&Desktop', // Another Custom Page
	],
   settings: {
    onlyCategories: [
     'performance',
     'accessibility',
     'best-practices',
     'seo',
    ],
    skipAudits: ['uses-http2'],
    preset: 'desktop',
    chromeFlags: '--no-sandbox --headless --disable-gpu --disable-dev-shm-usage --no-first-run',
    extraHeaders: JSON.stringify({
     Cookie: 'VtexIdclientAutCookie=' + argv.Token,
    }),
   },
  },
  assert: {
   assertions: {
    'categories:performance': [
     'error',
     { minScore: 0.5, aggregationMethod: 'optimistic' },
    ],
    'categories:accessibility': [
     'error',
     { minScore: 0.5, aggregationMethod: 'optimistic' },
    ],
    'categories:best-practices': [
     'error',
     { minScore: 0.5, aggregationMethod: 'optimistic' },
    ],
    'categories:seo': [
     'error',
     { minScore: 0.5, aggregationMethod: 'optimistic' },
    ],
   },
  },
  upload: {
   target: 'temporary-public-storage',
  },
 },
}
