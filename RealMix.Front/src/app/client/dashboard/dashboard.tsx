import React from 'react';

import { Row, DefaultPage, Col, Block } from 'shared';

export const Dashboard: React.FC = () => {
  const colors = [];
  for (let i = 0; i < 150; i++)
    colors.push(
      `#${Math.ceil(Math.random() * 255).toString(16)}${Math.ceil(Math.random() * 255).toString(16)}${Math.ceil(
        Math.random() * 255
      ).toString(16)}`
    );
  return (
    <DefaultPage title="App Dashboard">
      Some Text On The Page
      <Row>
        {colors.map((x, i) => (
          <Col key={i} size={4}>
            <Block my="3" style={{ height: '150px', backgroundColor: x }}></Block>
          </Col>
        ))}
      </Row>
    </DefaultPage>
  );
};
