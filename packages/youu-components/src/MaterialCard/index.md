---
title: MaterialCard - Material卡片
nav:
  title: 组件
  path: /components
  order: 0
group:
  path: /display
  title: 展示类
  order: 0
---

## MaterialCard

Material 样式卡片

```tsx
import React from 'react';
import { Button } from 'antd';
import { MaterialCard } from 'youu-components';

export default () => {
  return <MaterialCard header={<span>标题</span>}>内容</MaterialCard>;
};
```

## API

| 参数             | 说明                                                                                                                           | 类型                           | 默认值  | 版本   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------- | ------ |
| title            | 标题                                                                                                                           | `React.ReactNode`              | -       |
| subTitle         | 副标题                                                                                                                         | `React.ReactNode`              | -       |
| tooltip          | 标题右侧图标 hover 提示信息                                                                                                    | `string`                       | -       |
| extra            | 右上角自定义区域                                                                                                               | `React.ReactNode`              | -       |
| layout           | 内容布局，支持垂直居中                                                                                                         | `default` \| `center`          | default |
| loading          | 加载中，支持自定义 loading 样式                                                                                                | `boolean` \| `ReactNode`       | false   |
| colSpan          | 栅格布局宽度，24 栅格，支持指定宽度 px 或百分比, 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}`, 仅在嵌套的子卡片上设置有效。 | `number` \| `string`           | 24      |
| gutter           | 数字或使用数组形式同时设置 [水平间距, 垂直间距], 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}`                               | `number` \| `array`            | 0       |
| split            | 拆分卡片的方向                                                                                                                 | `vertical` \| `horizontal`     | -       |
| type             | 卡片类型                                                                                                                       | `inner` \| `default`           | -       |
| size             | 卡片尺寸                                                                                                                       | `default` \| `small`           | -       |
| actions          | 卡片操作组，位置在卡片底部                                                                                                     | `Array&lt;ReactNode>`          | -       |
| direction        | 指定 Flex 方向，仅在嵌套子卡片时有效，默认方向为 row 横向                                                                      | `column`                       | -       |
| wrap             | 是否支持换行，仅在嵌套子卡片时有效                                                                                             | false                          | -       | 1.12.0 |
| bordered         | 是否有边框                                                                                                                     | `boolean`                      | false   |
| ghost            | 幽灵模式，即是否取消卡片内容区域的 padding 和 卡片的背景颜色。                                                                 | `boolean`                      | false   |
| headerBordered   | 页头是否有分割线                                                                                                               | `boolean`                      | false   |
| collapsed        | 受控属性，是否折叠                                                                                                             | `boolean`                      | false   |
| collapsible      | 配置是否可折叠，受控时无效                                                                                                     | `boolean`                      | false   |
| defaultCollapsed | 默认折叠, 受控时无效                                                                                                           | `boolean`                      | false   |
| onCollapse       | 收起卡片的事件，受控时无效                                                                                                     | `(collapsed: boolean) => void` | -       |
| tabs             | 标签页配置                                                                                                                     | 见下面 ProCardTabs             | -       |

### ProCardTabs

| 参数      | 说明                                                      | 类型                           | 默认值 |
| :-------- | :-------------------------------------------------------- | :----------------------------- | :----- |
| activeKey | 当前选中项                                                | string                         | -      |
| type      | 页签的基本样式，可选 `line`、`card`、`editable-card` 类型 | string                         | inline |
| onChange  | 回调                                                      | `(activeKey: string) => void;` | -      |
