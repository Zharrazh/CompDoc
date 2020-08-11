import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, TextBoxField, SelectField, LoadingButton, LinkButton, Col } from 'shared';
import { getAllCompaniesAsync, saveDocumentAsync } from 'data/documents/actions';
import { StoreType } from 'core/store';
import { Multiselect, Option } from 'shared/base/Multiselect';
import { DocumentType } from 'enums/documentType';
import { ActionType } from 'data/actionTypes';

export const DocumentCreatePage: React.FC<{}> = () => {
  const id = -1;
  const dispatch = useDispatch();
  const allCompanies = useSelector((state: StoreType) => state.documents.companies);

  useEffect(() => {
    dispatch(getAllCompaniesAsync());
  }, [dispatch, id]);

  const [title, setTitle] = useState('');
  const [type, setType] = useState(0);
  const [body, setBody] = useState('');
  const [companyIds, setCompanyIds] = useState<number[]>([]);

  const options: Option[] = useMemo(() => {
    return allCompanies.map(c => ({ id: c.id, title: c.name }));
  }, [allCompanies]);

  const handleOnChangeMultiselect = useCallback((op: Option[]) => {
    const ids = op.map(o => o.id);
    setCompanyIds(ids);
  }, []);

  const handleOnSaveChanges = useCallback(() => {
    dispatch(saveDocumentAsync({ id: id, title, type, body, companyIds }));
  }, [body, companyIds, dispatch, id, title, type]);
  return (
    <Container pt="4">
      <Row mb="4">
        <h2>Создание документа</h2>
      </Row>
      <Row>
        <Col size={6}>
          <Row alignItems="baseline">
            <Col size={3}>
              <label htmlFor="title">Название:</label>
            </Col>
            <TextBoxField
              name="title"
              value={title}
              onChange={value => {
                setTitle(value);
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
              value={type.toString()}
              onChange={value => setType(Number(value))}
              size={5}
            />
          </Row>
          <Row alignItems="center">
            <Col size={3}>Компании, подписавшие документ:</Col>
            <Col size={9}>
              <Multiselect options={options} onChange={handleOnChangeMultiselect} />
            </Col>
          </Row>
          <Row mt="3">
            <Col size={3}>
              <label htmlFor="body">Тело документа:</label>
            </Col>
            <Col size={9}>
              <textarea name="body" value={body} onChange={e => setBody(e.target.value)} rows={5} cols={59}></textarea>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row mt="5">
        <LoadingButton success actionType={ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC} onClick={handleOnSaveChanges}>
          Добавить документ
        </LoadingButton>
        <LinkButton to="/documents">Вернуться назад</LinkButton>
      </Row>
    </Container>
  );
};
