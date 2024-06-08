import React from 'react';
import { Table, Row, Col } from 'antd';
import './Invoice.css';
import logo from '../assets/images/download.png';
import numberToWords from 'number-to-words';

const Invoice = React.forwardRef(({ data }, ref) => {
  const {
    sellerName,
    sellerAddress,
    sellerCityStatePincode,
    sellerPan,
    sellerGst,
    billingName,
    billingAddress,
    billingCityStatePincode,
    billingStateCode,
    shippingName,
    shippingAddress,
    shippingCityStatePincode,
    shippingStateCode,
    orderNo,
    orderDate,
    invoiceNo,
    invoiceDate,
    items,
  } = data;

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Net Amount',
      dataIndex: 'netAmount',
      key: 'netAmount',
    },
    {
      title: 'Tax Rate',
      dataIndex: 'taxRate',
      key: 'taxRate',
    },
    {
      title: 'Tax Amount',
      dataIndex: 'taxAmount',
      key: 'taxAmount',
    },
  ];

  const totalAmount = items.reduce((acc, item) => acc + item.netAmount + item.taxAmount, 0);
  const amountInWords = numberToWords.toWords(totalAmount.toFixed(2));

  return (
    <div ref={ref} className="invoice">
      <div className="header-section">
        <div className="left">
          <img src="data:image/png;base64,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" alt="Company Logo" />
          <h2>Seller Details</h2>
          <p>{sellerName}</p>
          <p>{sellerAddress}</p>
          <p>{sellerCityStatePincode}</p>
          <p>PAN: {sellerPan}</p>
          <p>GST: {sellerGst}</p>
        </div>
        <div className="right">
          <h2>Invoice Details</h2>
          <p>Invoice No: {invoiceNo}</p>
          <p>Invoice Date: {invoiceDate.format('DD-MM-YYYY')}</p>
          <p>Order No: {orderNo}</p>
          <p>Order Date: {orderDate.format('DD-MM-YYYY')}</p>
        </div>
      </div>

      <div className="details-section">
        <Row>
          <Col span={12}>
            <h2>Billing Details</h2>
            <p>{billingName}</p>
            <p>{billingAddress}</p>
            <p>{billingCityStatePincode}</p>
            <p>State/UT Code: {billingStateCode}</p>
          </Col>
          <Col span={12}>
            <h2>Shipping Details</h2>
            <p>{shippingName}</p>
            <p>{shippingAddress}</p>
            <p>{shippingCityStatePincode}</p>
            <p>State/UT Code: {shippingStateCode}</p>
          </Col>
        </Row>
      </div>

      <Table dataSource={items} columns={columns} pagination={false} rowKey="description" />

      <Row>
        <Col span={12}>
          <div className="amount-in-words">
            <h2>Amount in Words</h2>
            <p>{amountInWords}</p>
          </div>
        </Col>
        <Col span={12}>
          <div className="total-amount">
            <h2>Total Amount</h2>
            <p>{totalAmount.toFixed(2)}</p>
          </div>
        </Col>
      </Row>

      <div className="signature-section">
        <h2>Signature</h2>
        <p><img src={logo} alt="Signature" /></p>
      </div>
    </div>
  );
});

export default Invoice;
