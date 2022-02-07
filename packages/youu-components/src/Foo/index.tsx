import React from 'react';
import { Button } from 'antd';

export default ({ title }: { title: string }) => {
  return (
    <>
      <h1>{title}</h1>
      <Button>123</Button>
    </>
  );
};
