import { defineConfig } from 'cypress'
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin'
import WatchAndReload from 'cypress-watch-and-reload/plugins'

export default defineConfig( {
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: { 'cypress-watch-and-reload': { watch: [ 'src/*', 'public/*' ] } },
    setupNodeEvents( on, config ) {
      // implement node event listeners here
      WatchAndReload( on, config )
      addMatchImageSnapshotPlugin( on, config )

      return config
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
  experimentalStudio: true,
} )