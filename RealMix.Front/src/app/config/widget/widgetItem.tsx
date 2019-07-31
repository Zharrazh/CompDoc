import React, { useCallback, useEffect, useState, useMemo } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultPage, CancelButton, Button, TextBoxField, SelectField, Row, MessagesView } from 'shared';
import { WidgetType } from 'enums/WidgetType';
import { useMatch, useHistory } from 'core/routerHooks';
import { AppDispatch } from 'core/reduxHelper';
import { StoreType } from 'core/store';

import { getItemAsync, setItem, saveAsync } from './actions';

const schema = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .required()
    .min(3)
    .max(20)
    .label('Name')
});

const useMounted = () => {
  const info = useMemo(() => ({ mounted: true }), []);
  console.log('MOUNT RENDER');
  useEffect(() => {
    console.log('MOUNT EFFECT');
    return () => {
      console.log('MOUNT -----');
      info.mounted = false;
    };
  }, [info]);

  return info;
};

export const WidgetItem: React.FC = () => {
  const info = useMounted();
  const history = useHistory();
  const match = useMatch<{ id: number }>();
  const dispatch = useDispatch<AppDispatch>();
  const item = useSelector((state: StoreType) => state.config.widget.item);
  const [messages, setMessages] = useState<string | string[]>();
  const get = useCallback(() => dispatch(getItemAsync(match.params)), [dispatch, match.params]);
  const save = useCallback(async () => {
    setMessages(undefined);
    const result = await dispatch(saveAsync(item));
    console.log('SAVE COMPLETED', result);
    if (info.mounted) {
      if (result.isError) {
        setMessages(result.error);
      } else {
        setMessages(undefined);
        history.goBack();
      }
    }
  }, [dispatch, history, item, info]);
  useEffect(() => {
    if (match.params.id > 0) get();
  }, [get, match.params.id]);
  const change = (field: string, value: any) => {
    dispatch(setItem({ ...item, [field]: value }));
  };
  return (
    <DefaultPage title="Widget Item Test">
      <Row>
        <MessagesView messages={messages}></MessagesView>
      </Row>
      <Row>
        <TextBoxField data={item} field="name" size={6} onChange={change} v={schema}>
          Name
        </TextBoxField>
        <SelectField data={item} field="type" values={WidgetType.all} size={6} onChange={change} v={schema}>
          Type
        </SelectField>
        <TextBoxField data={item} field="parameters" size={6} onChange={change} v={schema}>
          Parameters
        </TextBoxField>
      </Row>
      <div></div>
      <Button primary onClick={save}>
        Save
      </Button>
      <CancelButton ml="3" />
    </DefaultPage>
  );
};
