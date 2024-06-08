import React, { useState, useRef } from 'react';
import { Form, Input, Button, Space, Checkbox, DatePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Invoice from './Invoice';
import { useReactToPrint } from 'react-to-print';
import '../App.css';

const { TextArea } = Input;

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const componentRef = useRef();

  const onFinish = (values) => {
    const { items, ...rest } = values;
    const calculatedItems = items.map(item => ({
      ...item,
      netAmount: item.unitPrice * item.quantity - item.discount,
      taxAmount: (item.unitPrice * item.quantity - item.discount) * (item.taxRate / 100),
    }));
    setInvoiceData({ ...rest, items: calculatedItems });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="invoice-form-container">
      <Form onFinish={onFinish} layout="vertical">
        <h2 className="section-title">Seller Details</h2>
        <Form.Item name="sellerName" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sellerAddress" label="Address" rules={[{ required: true }]}>
          <TextArea autoSize />
        </Form.Item>
        <Form.Item name="sellerCityStatePincode" label="City, State, Pincode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sellerPan" label="PAN No." rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sellerGst" label="GST Registration No." rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <h2 className="section-title">Place of Supply</h2>
        <Form.Item name="placeOfSupply" label="Place of Supply" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <h2 className="section-title">Billing Details</h2>
        <Form.Item name="billingName" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="billingAddress" label="Address" rules={[{ required: true }]}>
          <TextArea autoSize />
        </Form.Item>
        <Form.Item name="billingCityStatePincode" label="City, State, Pincode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="billingStateCode" label="State/UT Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <h2 className="section-title">Shipping Details</h2>
        <Form.Item name="shippingName" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="shippingAddress" label="Address" rules={[{ required: true }]}>
          <TextArea autoSize />
        </Form.Item>
        <Form.Item name="shippingCityStatePincode" label="City, State, Pincode" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="shippingStateCode" label="State/UT Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <h2 className="section-title">Order Details</h2>
        <Form.Item name="orderNo" label="Order No." rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="orderDate" label="Order Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <h2 className="section-title">Invoice Details</h2>
        <Form.Item name="invoiceNo" label="Invoice No." rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="invoiceDate" label="Invoice Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="reverseCharge" valuePropName="checked">
          <Checkbox>Reverse Charge</Checkbox>
        </Form.Item>

        <h2 className="section-title">Item Details</h2>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="item-space">
                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    fieldKey={[fieldKey, 'description']}
                    rules={[{ required: true, message: 'Missing description' }]}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'unitPrice']}
                    fieldKey={[fieldKey, 'unitPrice']}
                    rules={[{ required: true, message: 'Missing unit price' }]}
                  >
                    <Input placeholder="Unit Price" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    fieldKey={[fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Missing quantity' }]}
                  >
                    <Input placeholder="Quantity" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'discount']}
                    fieldKey={[fieldKey, 'discount']}
                    rules={[{ required: true, message: 'Missing discount' }]}
                  >
                    <Input placeholder="Discount" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'taxRate']}
                    fieldKey={[fieldKey, 'taxRate']}
                    rules={[{ required: true, message: 'Missing tax rate' }]}
                  >
                    <Input placeholder="Tax Rate" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} className="remove-icon" />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Button type="primary" htmlType="submit" className="submit-button">
          Generate Invoice
        </Button>
      </Form>

      {invoiceData && (
        <>
          <Invoice data={invoiceData} ref={componentRef} />
          <Button onClick={handlePrint} className="print-button">
            Print Invoice
          </Button>
        </>
      )}
    </div>
  );
};

export default InvoiceForm;
