import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import {
  Container,
  Row,
  TextBoxField,
  SelectField,
  LoadingButton,
  LinkButton,
  Col,
  RepeatPanel,
  MessagesView,
  Line
} from 'shared';
import { getDocumentFullAsync, getAllCompaniesAsync, saveDocumentAsync } from 'data/documents/actions';
import { StoreType } from 'core/store';
import { Multiselect, Option } from 'shared/base/Multiselect';
import { DocumentType } from 'enums/documentType';
import { ActionType } from 'data/actionTypes';

type DocumentForm = {
  id: number;
  title: string;
  type: number;
  body: string;
  companyIds: number[];
};

const schema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .required()
    .label('Id'),

  title: yup
    .string()
    .required('Название - это обязательное поле')
    .min(3, 'Кол-во символов в названии документа должно превышать 3')
    .max(50, 'Кол-во символов в названии документа должно быть меньше 50'),
  type: yup
    .number()
    .integer()
    .required(),
  body: yup.string()
});

export const DocumentEditPage: React.FC<{}> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fullDoc = useSelector((state: StoreType) => state.documents.documentFull);
  const allCompanies = useSelector((state: StoreType) => state.documents.companies);

  useEffect(() => {
    dispatch(getDocumentFullAsync(id));
    dispatch(getAllCompaniesAsync());
  }, [dispatch, id]);

  const [documentForm, setDocumentForm] = useState<DocumentForm>({
    id: Number(id),
    title: '',
    type: 0,
    body: '',
    companyIds: []
  });
  const change = useCallback((field: string, value: any) => {
    setDocumentForm(x => ({ ...x, [field]: value }));
  }, []);
  const [validErrorMessages, setValidErrorMessages] = useState<string[]>([]);
  const [defaultCompanyIds, setDefaultCompanyId] = useState<number[]>([]);
  useEffect(() => {
    if (fullDoc) {
      setDefaultCompanyId(fullDoc?.companies.map(c => c.id));
      setDocumentForm({
        id: fullDoc.id,
        title: fullDoc.title,
        type: fullDoc.type,
        body: fullDoc.body,
        companyIds: []
      });
    }
  }, [fullDoc]);

  const options: Option[] = useMemo(() => {
    return allCompanies.map(c => ({ id: c.id, title: c.name }));
  }, [allCompanies]);

  const handleOnChangeMultiselect = useCallback(
    (op: Option[]) => {
      const ids = op.map(o => o.id);
      change('companyIds', ids);
    },
    [change]
  );

  const handleOnSaveChanges = useCallback(async () => {
    schema
      .validate(documentForm)
      .then(() => {
        setValidErrorMessages([]);
        dispatch(saveDocumentAsync(documentForm));
      })
      .catch(x => setValidErrorMessages(x.message));
  }, [dispatch, documentForm]);

  return (
    <Container pt="4">
      <Row mb="4">
        <h2>{`Изменение документа "${fullDoc?.title}"`}</h2>
      </Row>
      <Row>
        <RepeatPanel
          action={() => dispatch(getDocumentFullAsync(id))}
          actionType={ActionType.COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC}>
          <Col size={6}>
            <Row alignItems="baseline">
              <Col size={3}>
                <label htmlFor="title">Название:</label>
              </Col>
              <TextBoxField
                name="title"
                value={documentForm.title}
                onChange={value => {
                  change('title', value);
                }}
                placeholder="Title..."
                size={5}
              />
            </Row>
            <Row>
              <Col size={3}>
                <label htmlFor="type">Тип документа:</label>
              </Col>
              <SelectField
                name="type"
                options={DocumentType.map}
                getLabel={x => x}
                value={documentForm.type.toString()}
                onChange={value => change('type', Number(value))}
                size={5}
              />
            </Row>
            <Row alignItems="center">
              <Col size={3}>Компании, подписавшие документ:</Col>
              <Col size={9}>
                <Multiselect
                  defaultSelectedId={defaultCompanyIds}
                  options={options}
                  onChange={handleOnChangeMultiselect}
                />
              </Col>
            </Row>
            <Row mt="3">
              <Col size={3}>
                <label htmlFor="body">Тело документа:</label>
              </Col>
              <Col size={9}>
                <textarea
                  name="body"
                  value={documentForm.body}
                  onChange={e => change('body', e.target.value)}
                  rows={5}
                  cols={59}></textarea>
              </Col>
            </Row>
          </Col>
        </RepeatPanel>
      </Row>

      <Row mt="5">
        <Line vertical>
          <Line>
            <MessagesView messages={validErrorMessages} actionType={ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC} />
          </Line>
          <Line>
            <LoadingButton
              success
              actionType={ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC}
              onClick={handleOnSaveChanges}>
              Применить изменения
            </LoadingButton>
            <LinkButton to="/documents">Вернуться назад</LinkButton>
          </Line>
        </Line>
      </Row>
    </Container>
  );
};
