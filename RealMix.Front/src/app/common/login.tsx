import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { StoreType } from 'core/store';
import { parseError } from 'core/parseError';
import { Block, Line, MessagesView, LoadingButton, TextBoxField } from 'shared';
import { ActionType } from 'data/actionTypes';
import { setForm, loginAsync } from 'data/auth/actions';

const schema = yup.object().shape({
  login: yup
    .string()
    .nullable()
    .required()
    .min(3)
    .max(20)
    .label('Login'),
  password: yup
    .string()
    .nullable()
    .required()
    .min(5)
    .max(20)
    .label('Password')
});

export const Login = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: StoreType) => state.auth.form);
  const onChange = (field: string, value: string) => dispatch(setForm({ ...form, [field]: value }));
  const [messages, setMessages] = useState();
  const login = async () => {
    try {
      setMessages(null);
      await schema.validate(form, { abortEarly: false });
      const result = await dispatch(loginAsync(form));
      console.log('HERE', result);
      // if (result.isOk) history.push('/');
      // else setMessages(result.error);
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
        <MessagesView messages={messages} actionType={ActionType.COMMON_AUTH_LOGINASYNC} />
        <TextBoxField name="login" value={form.login} onChange={x => onChange('login', x)} placeholder="Login" />
        <TextBoxField
          type="password"
          name="password"
          value={form.password}
          onChange={x => onChange('password', x)}
          placeholder="Password"
        />
        <LoadingButton primary block onClick={login} actionType={ActionType.COMMON_AUTH_LOGINASYNC}>
          Login
        </LoadingButton>
      </Block>
    </Line>
  );
};
