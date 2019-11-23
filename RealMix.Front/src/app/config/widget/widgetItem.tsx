import React, { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {
  DefaultPage,
  CancelButton,
  TextBoxField,
  SelectField,
  Row,
  MessagesView,
  RepeatPanel,
  LoadingButton
} from 'shared';
import { WidgetType } from 'enums/widgetType';
import { useMatch } from 'core/router';
import { StoreType } from 'core/store';
import { useMounted } from 'core/useMounted';
import { ActionType } from 'data/actionTypes';
import { useCancellation } from 'core/useCancellation';
import { getItemAsync, setItem, saveAsync } from 'data/config/widget/actions';
import { useCleaning } from 'core/useCleaning';

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
  useCancellation(ActionType.CONFIG_WIDGET_SAVEASYNC);
  useCleaning(setItem);
  const match = useMatch<{ id: number }>();
  const dispatch = useDispatch();
  const item = useSelector((state: StoreType) => state.config.widget.item);
  const [messages, setMessages] = useState<string | string[]>();
  const get = useCallback(() => dispatch(getItemAsync(match.params)), [dispatch, match.params]);
  const save = useCallback(async () => {
    schema
      .validate(item)
      .then(() => {
        dispatch(saveAsync(item));
        setMessages(undefined);
      })
      .catch(x => setMessages(x.message));
  }, [dispatch, item]);
  useEffect(() => {
    if (match.params.id > 0) get();
  }, [get, match.params]);
  const change = (field: string, value: any) => {
    dispatch(setItem({ ...item, [field]: value }));
  };
  return (
    <DefaultPage title="Widget Item Test">
      <RepeatPanel actionType={ActionType.CONFIG_WIDGET_GETITEMASYNC} action={get}>
        <MessagesView messages={messages} actionType={ActionType.CONFIG_WIDGET_SAVEASYNC}></MessagesView>
        <Row>
          <TextBoxField
            name="name"
            value={item.name}
            size={6}
            onChange={v => change('name', v)}
            schema={schema}
            fieldPath="name">
            Name
          </TextBoxField>
          <SelectField
            name="type"
            value={item.type.toString()}
            options={WidgetType.map}
            getLabel={x => x}
            size={6}
            onChange={v => change('type', parseInt(v))}>
            Type
          </SelectField>
          <TextBoxField name="parameters" value={item.parameters} size={6} onChange={v => change('parameters', v)}>
            Parameters
          </TextBoxField>
        </Row>
        <div>
          <LoadingButton actionType={ActionType.CONFIG_WIDGET_SAVEASYNC} primary onClick={save}>
            Save
          </LoadingButton>
          <CancelButton ml="3" />
        </div>
      </RepeatPanel>
    </DefaultPage>
  );
};
