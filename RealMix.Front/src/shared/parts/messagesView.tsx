import React from 'react';
import { Block } from '../';

interface Props {
  messages?: string | string[];
}

export const MessagesView: React.FC<Props> = ({ messages }) => {
  if (messages != null) {
    const result = !Array.isArray(messages)
      ? messages
      : <ul className="list-unstyled">{messages.map((x, i) => <li key={i}>{x}</li>)}</ul>
    return <Block text="danger"><small>{result}</small></Block>
  }
  return null;
}