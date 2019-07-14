import React from 'react';
import { Block, Row } from 'shared/base';

export const Dashboard: React.FC = () => {
  const colors = [];
  for (let i = 0; i < 150; i++)
    colors.push(`#${Math.ceil(Math.random() * 255).toString(16)}${Math.ceil(Math.random() * 255).toString(16)}${Math.ceil(Math.random() * 255).toString(16)}`);
  return (
    <Block>
      <Block>App Dashboard</Block>
      <Row>
        {colors.map((x, i) => <div key={i} className="col-md-4" style={{ height: '50px', backgroundColor: x }}></div>)}
      </Row>
    </Block>
  )
};