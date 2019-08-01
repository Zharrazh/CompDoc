import React from 'react';

import { Block } from 'shared';

interface Props {
  messages?: string | string[];
}

export const MessagesView: React.FC<Props> = ({ messages }) => {
  if (messages != null) {
    const result = !Array.isArray(messages) ? (
      messages
    ) : (
      <ul className="list-unstyled">
        {messages.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    );
    return (
      <Block text="danger" p="3">
        {result}
      </Block>
    );
  }
  return null;
};
