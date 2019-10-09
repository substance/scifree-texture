const b = require('substance-bundler')
const vfs = require('substance-bundler/extensions/vfs')
const rollup = require('substance-bundler/extensions/rollup')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const postcss = require('substance-bundler/extensions/postcss')
const path = require('path')

const DIST = 'dist/'
const TMP = 'dist/'

b.task('clean', () => {
  b.rm(DIST)
  b.rm(TMP)
}).describe('removes all generated files and folders.')

b.task('build', ['clean', 'build:assets', 'build:demo', 'build:js', 'build:css'])
  .describe('builds the library bundle.')

b.task('default', ['clean', 'build'])

b.task('build:js', () => {
  rollup(b, {
    input: 'index.js',
    output: {
      file: DIST + 'texture-scifree.js',
      format: 'umd',
      name: 'TextureSciFree',
      globals: {
        substance: 'window.substance',
        'substance-texture': 'window.texture',
        katex: 'window.katex'
      },
      sourcemap: true
    },
    external: ['substance', 'substance-texture', 'katex'],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  })
})

b.task('build:assets', ['build:vfs'], () => {
  b.copy('./node_modules/substance-texture/dist', path.join(DIST, 'lib', 'texture'))
  b.copy('./data', DIST)
})

b.task('build:css', () => {
  postcss(b, {
    from: 'styles/index.css',
    to: DIST + 'texture-scifree.css'
  })
})

b.task('build:demo', () => {
  rollup(b, {
    input: './demo/web/demo.js',
    output: {
      file: DIST + 'demo.js',
      format: 'umd',
      name: 'figurePackageDemo',
      globals: {
        substance: 'substance',
        'substance-texture': 'texture',
        katex: 'katex'
      }
    },
    external: ['substance', 'substance-texture', 'katex'],
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  })
  b.copy('./demo/web/index.html', DIST)
})

b.task('build:vfs', () => {
  vfs(b, {
    src: ['./data/**/*'],
    dest: DIST + 'vfs.js',
    format: 'umd',
    moduleName: 'vfs',
    rootDir: path.join(__dirname, 'data')
  })
})

// Server configuration
const port = process.env.PORT || 4030
b.setServerPort(port)
b.serve({ static: true, route: '/', folder: './dist' })
