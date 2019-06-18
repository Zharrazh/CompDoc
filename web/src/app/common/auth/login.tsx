import React, { useState } from 'react';
import * as yup from 'yup';
import { parseError } from 'core/parseError';
import { MessagesView } from 'shared';
import { Block, Line, Button } from 'shared/base';
import { TextBoxField } from 'shared/fields/textBoxField';

const schema = yup.object().shape({
  login: yup.string().nullable().required().min(3).max(20).label('Login'),
  password: yup.string().nullable().required().min(5).max(20).label('Password')
});

export const Login = () => {
  const [state, setState] = useState({
    login: null,
    password: null
  });
  const [messages, setMessages] = useState();
  const onChange = (field: string, value: string) => setState({ ...state, [field]: value });
  const login = async () => {
    try {
      setMessages(null);
      await schema.validate(state, { abortEarly: false });
    } catch (error) {
      setMessages(parseError(error));
    }
  };
  return (
    <Line justifyContent="center" alignItems="center" vh>
      <Block border p="3" rounded w="25">
        <Block border="bottom" mb="3">
          <h2>Login</h2>
        </Block>
        <MessagesView messages={messages} />
        <TextBoxField data={state} field="login" onChange={onChange} placeholder="Login" />
        <TextBoxField type="password" data={state} field="password" onChange={onChange} placeholder="Password" />
        <Button primary block onClick={login}>Login</Button>
      </Block>
    </Line>
  );
}