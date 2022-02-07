/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button } from 'antd';

/**
 * @property type 指定用于关闭还是提交
 * @class DrawerPro 侧拉弹框,用于数据多的场景
 */
export default class DrawerPro extends React.Component {
  state = {
    loading: false,
  };

  static propTypes = {
    type: PropTypes.oneOf(['submit', 'close']),
    onOk: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'submit',
  };

  handleOk = () => {
    this.setState({ loading: true });
    const { onOk } = this.props;
    if (onOk) {
      onOk(() => {
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { children, cancelText, okText, type, ...restProps } = this.props;
    const { onCancel } = restProps;
    const { loading } = this.state;
    const footers =
      type === 'submit' ? (
        <>
          <Button key="back" onClick={onCancel} style={{ marginRight: '1rem' }}>
            {cancelText || '取消'}
          </Button>
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            {okText || '确认'}
          </Button>
        </>
      ) : (
        <Button key="back" onClick={onCancel}>
          {cancelText || '关闭'}
        </Button>
      );
    return (
      <Drawer
        destroyOnClose
        placement="right"
        closable={false}
        bodyStyle={{ paddingBottom: 80 }}
        footer={<div style={{ textAlign: 'right' }}>{footers}</div>}
        {...restProps}
      >
        {children}
      </Drawer>
    );
  }
}
