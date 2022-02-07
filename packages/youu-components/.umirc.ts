// https://d.umijs.org/zh-CN/config
import { defineConfig } from 'dumi';

const repo = 'YOUU-UI';

export default defineConfig({
  title: repo,
  favicon: '/logo.svg',
  logo: '/logo.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  // base: `/${repo}/`,
  // publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/windyzoe',
    },
  ],
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  devServer: {
    port: 9111,
  },
  // more config: https://d.umijs.org/config
});
