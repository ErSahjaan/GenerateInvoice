import React from 'react';
import { Table, Row, Col, Typography, Divider } from 'antd';
import moment from 'moment';


const { Title, Text } = Typography;

const Invoice = ({
  sellerDetails,
  placeOfSupply,
  billingDetails,
  shippingDetails,
  placeOfDelivery,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  items,
  signature
}) => {

  const calculateNetAmount = (unitPrice, quantity, discount) => unitPrice * quantity - discount;

  const calculateTax = (netAmount, taxRate) => netAmount * taxRate / 100;

  const calculateTotalAmount = (netAmount, taxAmount) => netAmount + taxAmount;

  const numberToWords = (num) => {
    const a = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
      'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (!n) return; let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str;
  };

  const columns = [
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Net Amount', dataIndex: 'netAmount', key: 'netAmount' },
    { title: 'Tax Type', dataIndex: 'taxType', key: 'taxType' },
    { title: 'Tax Amount', dataIndex: 'taxAmount', key: 'taxAmount' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
  ];

  const data = items.map((item, index) => {
    const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
    const taxType = placeOfSupply === placeOfDelivery ? 'CGST/SGST' : 'IGST';
    const taxRate = 18;
    const taxAmount = calculateTax(netAmount, taxRate);
    const totalAmount = calculateTotalAmount(netAmount, taxAmount);
    
    return {
      key: index,
      description: item.description,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      discount: item.discount,
      netAmount: netAmount,
      taxType: taxType,
      taxAmount: taxAmount,
      totalAmount: totalAmount
    };
  });

  const totalNetAmount = data.reduce((sum, item) => sum + item.netAmount, 0);
  const totalTaxAmount = data.reduce((sum, item) => sum + item.taxAmount, 0);
  const totalAmount = data.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div style={{ padding: '20px', border: '1px solid #000' }}>
      <Row>
        <Col span={12}>
          <Title level={4}>Seller Details</Title>
          <Text>{sellerDetails.name}</Text><br />
          <Text>{sellerDetails.address}</Text><br />
          <Text>{sellerDetails.city}, {sellerDetails.state}, {sellerDetails.pincode}</Text><br />
          <Text>PAN No.: {sellerDetails.panNo}</Text><br />
          <Text>GST Registration No.: {sellerDetails.gstRegNo}</Text>
        </Col>
        <Col span={12}>
          <Title level={4}>Billing Address</Title>
          <Text>{billingDetails.name}</Text><br />
          <Text>{billingDetails.address}</Text><br />
          <Text>{billingDetails.city}, {billingDetails.state}, {billingDetails.pincode}</Text><br />
          <Text>State/UT Code: {billingDetails.stateUtCode}</Text>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <Title level={4}>Shipping Address</Title>
          <Text>{shippingDetails.name}</Text><br />
          <Text>{shippingDetails.address}</Text><br />
          <Text>{shippingDetails.city}, {shippingDetails.state}, {shippingDetails.pincode}</Text><br />
          <Text>State/UT Code: {shippingDetails.stateUtCode}</Text>
        </Col>
        <Col span={12}>
          <Title level={4}>Order Details</Title>
          <Text>Order No.: {orderDetails.orderNo}</Text><br />
          <Text>Order Date: {moment(orderDetails.orderDate).format('DD.MM.YYYY')}</Text><br />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <Title level={4}>Invoice Details</Title>
          <Text>Invoice No.: {invoiceDetails.invoiceNo}</Text><br />
          <Text>Invoice Date: {moment(invoiceDetails.invoiceDate).format('DD.MM.YYYY')}</Text><br />
          <Text>Place of Supply: {placeOfSupply}</Text><br />
          <Text>Place of Delivery: {placeOfDelivery}</Text><br />
          <Text>Reverse Charge: {reverseCharge ? 'Yes' : 'No'}</Text>
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} summary={() => (
        <>
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={4}>Total</Table.Summary.Cell>
            <Table.Summary.Cell>{totalNetAmount}</Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell>{totalTaxAmount}</Table.Summary.Cell>
            <Table.Summary.Cell>{totalAmount}</Table.Summary.Cell>
          </Table.Summary.Row>
        </>
      )} />
      <Divider />
      <Row>
        <Col span={24}>
          <Text>Amount in Words: {numberToWords(totalAmount)}</Text>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <Text>For {sellerDetails.name}:</Text>
          <br />
          <img src={signature} alt="Signature" style={{ width: '100px' }} />
          <br />
          <Text>Authorised Signatory</Text>
        </Col>
      </Row>
    </div>
  );
};

export default Invoice;
