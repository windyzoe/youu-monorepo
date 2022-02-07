import React from 'react';
import { Drawer, Button } from 'antd';

export interface DrawerProProps {
  onOk: (setLoadingFalse: () => void) => void;
  onCancel: () => void;
  cancelText?: string;
  okText?: string;
  type: 'submit' | 'close';
}

/**
 * 
 */
export default class DrawerPro extends React.Component<DrawerProProps> {
  state = {
    loading: false,
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
