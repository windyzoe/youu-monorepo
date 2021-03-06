import React, { PureComponent } from 'react';
import { List, Tag, Input, Button, Modal, message, Row, Col } from 'antd';
import { PlusOutlined, PhoneOutlined, MailOutlined, BankOutlined } from '@ant-design/icons';
import _ from 'lodash';
import BasicContentLayout from '@/layouts/BasicContentLayout';
import { EditAction, DeleteAction } from '@/components/TablePro';
import { FormLayout, FormBackgroundTitle, FormItem } from '@/components/Form';
import DrawerPro from '@/components/DrawerPro';
import { pwdPattern, emailAddressPattern, mobilePattern, getPageQuery } from '@/utils/utils';
import { userList, roleList } from '@/services/user';
import { renderRole } from '@/utils/roles';
import Styles from './index.less';

const { Search } = Input;
const { CheckableTag } = Tag;

export default class User extends PureComponent {
  formRef = React.createRef();

  state = {
    isShow: false,
    isAdd: true,
    selectedTags: [],
    userInfo: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    roles: [],
  };

  componentDidMount() {
    this.setState({ searchValue: getPageQuery().search }, () => this.init());
  }

  handleSearch() {
    this.init({
      pageNo: 1,
    });
  }

  handleOk(setLoadingFalse) {
    this.formRef.current
      .validateFields()
      .then(v => v)
      .finally(setLoadingFalse());
  }

  userOperation = (mode, record) => {
    if (mode === 'delete') {
      this.doDelete(record);
      return;
    }
    if (mode === 'add') {
      this.setState({ isAdd: true, isShow: true });
    } else {
      const selectedTags = record.roles.map(el => el.id);
      this.setState(
        {
          isAdd: false,
          isShow: true,
          selectedTags: _.uniq(selectedTags),
        },
        () => {
          this.formRef.current.setFieldsValue({
            ...record,
          });
        }
      );
    }
  };

  init = params => {
    const { pageNo, pageSize } = this.state;
    userList({ pageNo, pageSize, ...params }).then(res => {
      this.setState({
        userInfo: res?.data?.userInfo,
        total: 2,
        pageNo,
        pageSize,
        ...params,
      });
    });
    roleList().then(res =>
      this.setState({
        roles: res?.data,
      })
    );
  };

  handleDelUser = item => {
    Modal.confirm({
      title: `?????????????????????${item.userName}?????????`,
      centered: true,
      okText: '??????',
      cancelText: '??????',
      onOk: () => this.userOperation('delete', item),
      onCancel: () => {},
    });
  };

  handleCancel = () => {
    this.setState({
      isShow: false,
      selectedTags: [],
    });
  };

  pageChange = (pageNo, pageSize) => {
    this.init({
      pageNo,
      pageSize,
    });
  };

  handleChange = (tag, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: _.uniq(nextSelectedTags) });
  };

  description = item => {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <PhoneOutlined /> {item.mobile}
        </Col>
        <Col span={12}>
          {item.email ? <MailOutlined /> : null} {item.email}
        </Col>
        <Col span={12}>
          {item.deptName ? <BankOutlined /> : null} {item.deptName}
        </Col>
      </Row>
    );
  };

  doDelete = v => {
    message.warn('????????????????????????');
  };

  renderAdd = () => {
    const { isShow, roles, isAdd, selectedTags } = this.state;
    return (
      <DrawerPro
        width={660}
        visible={isShow}
        title={isAdd ? '????????????' : '????????????'}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <FormLayout ref={this.formRef}>
          <FormBackgroundTitle title="????????????">
            <FormItem label="?????????" name="userName" rules={[{ required: true }]}>
              <Input placeholder="??????????????????" />
            </FormItem>
            <FormItem label="?????????" name="loginName" rules={[{ required: true }]}>
              <Input disabled={!isAdd} placeholder={isAdd ? '??????????????????' : null} />
            </FormItem>
            {isAdd && (
              <>
                <FormItem
                  label="????????????"
                  name="oldPassword"
                  rules={[{ required: true }, { pattern: pwdPattern, message: '?????????12?????????????????????????????????????????????????????????' }]}
                >
                  <Input type="password" placeholder="?????????12?????????????????????????????????????????????????????????" />
                </FormItem>
                <FormItem label="????????????" name="password" validateTrigger={['onBlur']} rules={[{ required: true }]}>
                  <Input type="password" placeholder="?????????????????????" />
                </FormItem>
              </>
            )}
          </FormBackgroundTitle>
          <FormBackgroundTitle title="????????????">
            <FormItem
              label="????????????"
              name="email"
              rules={[{ required: true }, { pattern: emailAddressPattern, message: '??????????????????' }]}
            >
              <Input placeholder="?????????????????????" />
            </FormItem>
            <FormItem
              label="????????????"
              name="mobile"
              rules={[{ required: true }, { pattern: mobilePattern, message: '????????????????????????' }]}
            >
              <Input placeholder="?????????????????????" />
            </FormItem>
          </FormBackgroundTitle>
          <FormBackgroundTitle title="??????">
            <FormItem>
              {Array.isArray(roles) &&
                roles.map(item => (
                  <CheckableTag
                    style={{ marginBottom: 3, marginTop: 3 }}
                    key={item.id}
                    checked={selectedTags.indexOf(item.id) > -1}
                    onChange={checked => this.handleChange(item.id, checked, item)}
                  >
                    {item.roleName}
                  </CheckableTag>
                ))}
            </FormItem>
          </FormBackgroundTitle>
        </FormLayout>
      </DrawerPro>
    );
  };

  render() {
    const { userInfo, isShow, total, searchValue } = this.state;
    const pagination = {
      showQuickJumper: true,
      showSizeChanger: true,
      total,
      showTotal: totals => `??? ${totals} ???`,
      onChange: this.pageChange,
      onShowSizeChange: this.pageChange,
      size: 'small',
    };
    return (
      <BasicContentLayout>
        <div className={Styles.main}>
          <Search
            placeholder="???????????????"
            onSearch={value => this.handleSearch(value)}
            style={{ width: 420, float: 'right', marginBottom: '12px' }}
            enterButton
            allowClear
            value={searchValue}
            onChange={v => this.setState({ searchValue: v.target.value })}
          />
          <Button type="dashed" style={{ width: '100%', marginBottom: '12px' }} onClick={() => this.userOperation('add')}>
            <PlusOutlined /> ???????????????
          </Button>
          <List
            itemLayout="horizontal"
            dataSource={userInfo}
            pagination={pagination}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <EditAction onClick={() => this.userOperation('update', item)} />,
                  <DeleteAction onClick={() => this.handleDelUser(item)} />,
                ]}
              >
                <div style={{ width: '20rem', flex: 'none' }}>{item.userName}</div>
                <div style={{ display: 'flex', flex: 'auto' }}>
                  <div style={{ width: '20rem', flex: 'none' }}>{this.description(item)}</div>
                  <div style={{ flex: 'auto' }}>{item.roles.map(element => renderRole(element.roleName))}</div>
                </div>
              </List.Item>
            )}
          />
        </div>
        {isShow && this.renderAdd()}
      </BasicContentLayout>
    );
  }
}
