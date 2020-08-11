import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container, Row, TextBoxField, LoadingButton, LinkButton, Col, RepeatPanel } from 'shared';
import { StoreType } from 'core/store';
import { Multiselect, Option } from 'shared/base/Multiselect';
import { ActionType } from 'data/actionTypes';
import { getAllDocumentsAsync, saveCompanyAsync, getCompanyFullAsync } from 'data/companies/actions';

export const CompanyEditPage: React.FC<{}> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allDocuments = useSelector((state: StoreType) => state.companies.documents);
  const compFull = useSelector((state: StoreType) => state.companies.companyFull);

  useEffect(() => {
    dispatch(getAllDocumentsAsync());
    dispatch(getCompanyFullAsync(Number(id)));
  }, [dispatch, id]);

  const [name, setName] = useState('');
  useEffect(() => {
    compFull && setName(compFull?.name);
  }, [compFull]);
  const [legalName, setLegalName] = useState('');
  useEffect(() => {
    compFull && setLegalName(compFull?.legalName);
  }, [compFull]);
  const [documentIds, setDocumentIds] = useState<number[]>([]);
  const [defaultDocumentIds, setDefaultDocumentId] = useState<number[]>([]);
  useEffect(() => {
    compFull && setDefaultDocumentId(compFull?.documents.map(c => c.id));
  }, [compFull]);

  const options: Option[] = useMemo(() => {
    return allDocuments.map(c => ({ id: c.id, title: c.title }));
  }, [allDocuments]);

  const handleOnChangeMultiselect = useCallback((op: Option[]) => {
    const ids = op.map(o => o.id);
    setDocumentIds(ids);
  }, []);

  const handleOnSaveChanges = useCallback(() => {
    dispatch(saveCompanyAsync({ id: Number(id), name, legalName, documentIds }));
  }, [dispatch, documentIds, id, legalName, name]);
  return (
    <Container pt="4">
      <Row mb="4">
        <h2>{`Изменение компании "${compFull?.name}"`}</h2>
      </Row>
      <Row>
        <RepeatPanel
          actionType={ActionType.COMMON_COMPANIES_GETCOMPANYFULLASYNC}
          action={() => {
            dispatch(getCompanyFullAsync(Number(id)));
          }}>
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
                <Multiselect
                  defaultSelectedId={defaultDocumentIds}
                  options={options}
                  onChange={handleOnChangeMultiselect}
                />
              </Col>
            </Row>
            <Row mt="5">
              <LoadingButton
                success
                actionType={ActionType.COMMON_COMPANIES_SAVECOMPANYASYNC}
                onClick={handleOnSaveChanges}>
                Применить изменения
              </LoadingButton>
              <LinkButton to="/companies">Вернуться назад</LinkButton>
            </Row>
          </Col>
        </RepeatPanel>
      </Row>
    </Container>
  );
};
