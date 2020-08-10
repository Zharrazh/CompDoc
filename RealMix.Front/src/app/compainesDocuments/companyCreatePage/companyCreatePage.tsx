import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, TextBoxField, LoadingButton, LinkButton, Col } from 'shared';
import { StoreType } from 'core/store';
import { Multiselect, Option } from 'shared/base/Multiselect';
import { ActionType } from 'data/actionTypes';
import { getAllDocumentsAsync, saveCompanyAsync } from 'data/companies/actions';

export const CompanyCreatePage: React.FC<{}> = () => {
  const id = -1;
  const dispatch = useDispatch();
  const allDocuments = useSelector((state: StoreType) => state.companies.documents);

  useEffect(() => {
    dispatch(getAllDocumentsAsync());
  }, [dispatch, id]);

  const [name, setName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [documentIds, setDocumentIds] = useState<number[]>([]);

  const options: Option[] = useMemo(() => {
    return allDocuments.map(c => ({ id: c.id, title: c.title }));
  }, [allDocuments]);

  const handleOnChangeMultiselect = useCallback((op: Option[]) => {
    const ids = op.map(o => o.id);
    setDocumentIds(ids);
  }, []);

  const handleOnSaveChanges = useCallback(() => {
    dispatch(saveCompanyAsync({ id, name, legalName, documentIds }));
  }, [dispatch, documentIds, id, legalName, name]);
  return (
    <Container pt="4">
      <Row mb="4">
        <h2>Создание компании</h2>
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
              value={name}
              onChange={value => {
                setName(value);
              }}
              placeholder="Name..."
              size={5}
            />
          </Row>
          <Row alignItems="center">
            <Col size={4}>
              <label htmlFor="legalName">Оффициальное название:</label>
            </Col>
            <TextBoxField
              name="legalName"
              value={legalName}
              onChange={value => {
                setLegalName(value);
              }}
              placeholder="Legal name..."
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
            <LoadingButton
              success
              actionType={ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC}
              onClick={handleOnSaveChanges}>
              Добавить компанию
            </LoadingButton>
            <LinkButton to="/companies">Вернуться назад</LinkButton>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
