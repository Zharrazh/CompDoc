import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { DefaultPage, CancelButton, Button, TextBoxField, SelectField, Row, MessagesView, RepeatPanel } from 'shared';
import { WidgetType } from 'enums/WidgetType';
import { useMatch, useHistory } from 'core/routerHooks';
import { AppDispatch } from 'core/reduxHelper';
import { StoreType } from 'core/store';
import { useMounted } from 'core/useMounted';
import { AsyncActions } from 'app/actionTypes';

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

export const WidgetItem: React.FC = () => {
  const history = useHistory();
  const match = useMatch<{ id: number }>();
  const dispatch = useDispatch<AppDispatch>();
  const mounted = useMounted(
    useCallback(() => {
      dispatch(setItem());
    }, [dispatch])
  );
  const item = useSelector((state: StoreType) => state.config.widget.item);
  const [messages, setMessages] = useState<string | string[]>();
  const get = useCallback(() => dispatch(getItemAsync(match.params)), [dispatch, match.params]);
  const save = useCallback(async () => {
    setMessages(undefined);
    const result = await dispatch(saveAsync(item));
    if (mounted.current) {
      if (result.isError) {
        setMessages(result.error);
      } else {
        history.goBack();
      }
    }
  }, [dispatch, history, item, mounted]);
  useEffect(() => {
    if (match.params.id > 0) get();
  }, [get, match.params]);
  const change = (field: string, value: any) => {
    dispatch(setItem({ ...item, [field]: value }));
  };
  return (
    <DefaultPage title="Widget Item Test">
      <RepeatPanel actionType={AsyncActions.CONFIG_WIDGET_GETITEMASYNC} action={get}>
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
      </RepeatPanel>
    </DefaultPage>
  );
};
