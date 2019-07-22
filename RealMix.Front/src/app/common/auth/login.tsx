import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useHistory } from 'core/routerHooks';
import { StoreType } from 'core/store';
import { AppDispatch } from 'core/reduxHelper';
import { parseError } from 'core/parseError';
import { Block, Line, MessagesView, LoadingButton, TextBoxField } from 'shared';
import { setForm, loginAsync } from './actions';
import { AsyncActions } from 'app/actionTypes';

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
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const form = useSelector((state: StoreType) => state.common.auth.form);
  const onChange = (field: string, value: string) => dispatch(setForm({ ...form, [field]: value }));
  const [messages, setMessages] = useState();
  const login = async () => {
    try {
      setMessages(null);
      await schema.validate(form, { abortEarly: false });
      const result = await dispatch(loginAsync(form));
      if (result.isOk) history.push('/');
      else setMessages(result.error);
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
        <TextBoxField data={form} field="login" onChange={onChange} placeholder="Login" />
        <TextBoxField type="password" data={form} field="password" onChange={onChange} placeholder="Password" />
        <LoadingButton primary block onClick={login} actionType={AsyncActions.COMMON_AUTH_LOGINASYNC}>
          Login
        </LoadingButton>
      </Block>
    </Line>
  );
};
