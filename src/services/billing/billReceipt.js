import React, { useState } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
export default function BillReceipt() {
  const [visible, setVisible] = useState(false);

  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleButtonClick = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={handleButtonClick}>
        Open Receipt Modal
      </Button>
      <Modal
        width={340}
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
        height={100}
      >
        <Form>
          <Form.Item label="Store UID" name="field1" rules={[{ required: true }]}>
            <Input style={{ width: '160px' }} />
          </Form.Item>
          <Form.Item label="Due Date" name="field2" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
