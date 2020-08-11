import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Container, Row, TextBoxField, LoadingButton, LinkButton, Col, MessagesView, Line } from 'shared';
import { StoreType } from 'core/store';
import { Multiselect, Option } from 'shared/base/Multiselect';
import { ActionType } from 'data/actionTypes';
import { getAllDocumentsAsync, saveCompanyAsync } from 'data/companies/actions';

type CompanyForm = {
  id: number;
  name: string;
  legalName: string;
  documentIds: number[];
};

const schema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .required()
    .label('Id'),

  name: yup
    .string()
    .required('Название - это обязательное поле')
    .min(3, 'Кол-во символов в названии компании должно превышать 3')
    .max(50, 'Кол-во символов в названии компании должно быть меньше 50'),
  legalName: yup
    .string()
    .required('Официальное название - это обязательное поле')
    .min(3, 'Кол-во символов в названии компании должно превышать 3')
    .max(50, 'Кол-во символов в названии компании должно быть меньше 50')
});
export const CompanyCreatePage: React.FC<{}> = () => {
  const id = -1;
  const dispatch = useDispatch();
  const allDocuments = useSelector((state: StoreType) => state.companies.documents);

  useEffect(() => {
    dispatch(getAllDocumentsAsync());
  }, [dispatch, id]);

  const [companyForm, setCompanyForm] = useState<CompanyForm>({ id, name: '', legalName: '', documentIds: [] });
  const [validErrorMessages, setValidErrorMessages] = useState<string[]>([]);

  const options: Option[] = useMemo(() => {
    return allDocuments.map(c => ({ id: c.id, title: c.title }));
  }, [allDocuments]);

  const change = useCallback((field: keyof CompanyForm, value: any) => {
    setCompanyForm(x => ({ ...x, [field]: value }));
  }, []);

  const handleOnChangeMultiselect = useCallback(
    (op: Option[]) => {
      const ids = op.map(o => o.id);
      change('documentIds', ids);
    },
    [change]
  );

  const handleOnSaveChanges = useCallback(async () => {
    schema
      .validate(companyForm)
      .then(() => {
        setValidErrorMessages([]);
        dispatch(saveCompanyAsync(companyForm));
      })
      .catch(x => setValidErrorMessages(x.message));
  }, [companyForm, dispatch]);
  return (
    <Container pt="4">
      <Row mb="4">
        <h2>{'Создание компании'}</h2>
      </Row>
      <Row>
        <Col size={6}>
          <Row alignItems="baseline">
            <Col size={4}>
              <label htmlFor="name" className="mr-4">
                Название:
              </label>
            </Col>

            <TextBoxField
              name="name"
              value={companyForm.name}
              onChange={value => {
                change('name', value);
              }}
              placeholder="Название..."
              size={5}
            />
          </Row>
          <Row alignItems="center">
            <Col size={4}>
              <label htmlFor="legalName">Оффициальное название:</label>
            </Col>
            <TextBoxField
              name="legalName"
              value={companyForm.legalName}
              onChange={value => {
                change('legalName', value);
              }}
              placeholder="Оф. название..."
              size={5}
            />
          </Row>
          <Row alignItems="center">
            <Col size={4}>Документы подписанные компанией:</Col>
            <Col>
              <Multiselect options={options} onChange={handleOnChangeMultiselect} />
            </Col>
          </Row>
          <Row mt="5">
            <Line vertical>
              <Line>
                <MessagesView messages={validErrorMessages} actionType={ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC} />
              </Line>
              <Line>
                <LoadingButton
                  success
                  actionType={ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC}
                  onClick={handleOnSaveChanges}>
                  Добавить компанию
                </LoadingButton>
                <LinkButton to="/companies">Вернуться назад</LinkButton>
              </Line>
            </Line>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
