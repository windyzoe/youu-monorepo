import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import './index.less';

const BulletLine = () => {
  const context = useContext(ConfigProvider.ConfigContext);
  const wrapperClassName = context.getPrefixCls('youu-bulletline-wrapper');
  const lineClassName = context.getPrefixCls('youu-bulletline-line');
  return (
    <div className={wrapperClassName}>
      <div className={lineClassName} />
    </div>
  );
};

export default BulletLine;
