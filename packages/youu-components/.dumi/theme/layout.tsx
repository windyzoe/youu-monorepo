import React from 'react';
import { ConfigProvider } from 'antd';
import Layout from 'dumi-theme-default/es/layout';
import 'antd/dist/antd.variable.less';

const AntdWrapper: React.FC<{ children: JSX.Element }> = React.memo(({ children }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
});

const customLayout: React.FC<{ children: JSX.Element }> = ({ children, ...props }) => {
  return (
    <AntdWrapper>
      <Layout {...props}>{children}</Layout>
    </AntdWrapper>
  );
};

export default customLayout;
