import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import './index.less';
/**
 *
 * @param {headColor} 颜色 Lime|Geekblue|Cyan|Gold
 */
const MaterialCard: React.FC<{ header: JSX.Element; headColor: 'Lime' | 'Geekblue' | 'Cyan' | 'Gold' }> = ({
  children,
  header,
  headColor = 'Lime',
}) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const cardClassName = context.getPrefixCls('youu-materialcard-card');
  const headerClassName = context.getPrefixCls('youu-materialcard-header');
  const bodyClassName = context.getPrefixCls('youu-materialcard-body');
  const headerColorClassName = context.getPrefixCls('youu-materialcard-headerColor');
  return (
    <div className={cardClassName}>
      <div className={`${headerClassName} ${headerColorClassName}${headColor}}`}>{header}</div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default MaterialCard;
