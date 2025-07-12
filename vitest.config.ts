import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
       coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
        
        //  outputFile: {
        //   junit: './junit-report.xml',
        //   json: './json-report.json',
        // },
        //  outputFile: './test-output.json',
        
      },
       reporters: ['json', 'html'],
       outputFile: {
        json:'./output/test-output.json',
        html: './output/test-output.html'
      }
    },
  }),
)
