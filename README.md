# YOUU-Monorepo 一个React 组件库+admin的多包解决方案

基于CRA+DVA+ANTD+LERNA+DUMI

## 安装指引

yarn install
必须用yarn,用到了yarn workspaces

## 趟坑指引

- dumi依赖的umi锁了大量的包版本,导致yarn包冲突很多,已用yarn resolution解决.(看到一大堆锁小版本的包,把我整懵了)
- dumi案例里的father-build有点问题,所以替换成了rollup,自己配置
- 想要生成d.ts文件,就得用tsc,编译慢没啥办法,看后面swc和esbuild的了
- 样式文件不建议打包成css,所以做成了index.less入口,项目用到时全量引入就行

