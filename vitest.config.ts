import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        clearMocks:   true,
        environment:  'jsdom',
        include:      ['tests/**/*.{vue,ts,tsx'],
        watchExclude: ['**/node_modules/**', '**/public/**'],
        reporters:    [
            'default',
            // 'dot',
            // 'json',
        ],
        coverage:     {
            include:         ['src/**/*'],
            clean:           true,
            reporter:        ['text', !process.env.GITHUB_ACTIONS && 'html'].filter(reporter => !!reporter),
            reportOnFailure: true,
            all:             true,
            skipFull:        false,

            // Coverage thresholds
            // lines: 100,
            // functions: 100,
            // branches: 100,
            // statements: 100
        },
    },
}))
