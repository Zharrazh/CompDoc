import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Line,
  Col,
  Row,
  Block,
  LinkButton,
  Button,
  LoadingButton,
  Modal,
  TextBoxField,
  RepeatPanel
} from 'shared';
import { getPageAsync, deleteCompanyAsync, deleteCompanyOnPage } from 'data/companies/actions';
import { StoreType } from 'core/store';
import { CompanyFull } from 'data/companies/models';
import { ActionType } from 'data/actionTypes';
import { Paginator } from 'shared/base/paginator';
import { Order } from 'shared/base/order';

export const Companies = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;
  const [orderBy, setOrderBy] = useState('id');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [nameSelect, setNameSelect] = useState('');

  useEffect(() => {
    dispatch(getPageAsync({ page: pageNumber, pageSize, orderBy, sortBy, name: nameSelect }));
  }, [dispatch, nameSelect, orderBy, pageNumber, pageSize, sortBy]);

  const page = useSelector((state: StoreType) => state.companies.page);

  const handleOnOrderClick = useCallback((name, sortBy) => {
    setOrderBy(name);
    setSortBy(sortBy);
  }, []);
  return (
    <Container className="companies" pt="3">
      <Row>
        <h2>Таблица компаний</h2>
      </Row>
      <Row>
        <Col>
          <Line alignItems="baseline" mt="3">
            <label htmlFor="pageSize" className="pr-2">
              Поиск по названию компании:
            </label>
            <TextBoxField
              name="titleSelect"
              value={nameSelect}
              onChange={value => setNameSelect(value)}
              placeholder="Введите название компании"
              size={3}
            />
          </Line>
          <LinkButton success to="companies/create" my="2">
            Добавить компанию
          </LinkButton>
          <Block className="companies_table">
            <Block className="table_header" style={{ fontWeight: 'bold' }}>
              <Row m="2">
                <Col size={1}>
                  <Order name="id" state={orderBy === 'id' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Id
                  </Order>
                </Col>
                <Col size={3}>
                  <Order name="name" state={orderBy === 'name' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Название
                  </Order>
                </Col>
                <Col size={3}>
                  <Order
                    name="legalName"
                    state={orderBy === 'legalName' ? sortBy : 'none'}
                    onClick={handleOnOrderClick}>
                    Официальное название
                  </Order>
                </Col>
                <Col size={3}>Подписанные документы</Col>
                <Col size={2} />
              </Row>
            </Block>
            <RepeatPanel
              actionType={ActionType.COMMON_COMPANIES_GETPAGEASYNC}
              action={() => dispatch(getPageAsync({ page: pageNumber, pageSize, orderBy, sortBy, name: nameSelect }))}>
              <Block className="table_body">
                {page.items.map(x => (
                  <CompanyItem item={x} key={x.id} />
                ))}
              </Block>
            </RepeatPanel>
            <Block mt="5">
              <Paginator
                currentPage={pageNumber}
                totalPages={page.totalPages}
                onChange={value => {
                  setPageNumber(value);
                }}
              />
            </Block>
          </Block>
        </Col>
      </Row>
    </Container>
  );
};

const CompanyItem: React.FC<{ item: CompanyFull }> = ({ item }) => {
  const dispatch = useDispatch();
  const [deleteModalHidden, setDeleteModalHidden] = useState(true);
  return (
    <Container>
      <Row className="documentItem" m="2">
        <Container>
          <Row>
            <Col className="id" size={1}>
              {item.id}
            </Col>
            <Col className="name" size={3}>
              {item.name}
            </Col>
            <Col className="legalName" size={3}>
              {item.legalName}
            </Col>
            <Col className="signedDocuments" size={3}>
              <ul>
                {item.documents.map(x => (
                  <li key={x.id}>{x.title}</li>
                ))}
              </ul>
            </Col>
            <Col className="controls" size={2}>
              <Line>
                <LinkButton small to={`/companies/edit/${item.id}`}>
                  Изменить
                </LinkButton>
                <Button small onClick={() => setDeleteModalHidden(false)}>
                  Удалить
                </Button>
              </Line>

              {deleteModalHidden || (
                <DeleteCompanyModal
                  company={item}
                  onCancel={() => setDeleteModalHidden(true)}
                  onDelete={() => dispatch(deleteCompanyOnPage(item.id))}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

const DeleteCompanyModal: React.FC<{
  onCancel: () => void;
  onDelete: () => void;
  company: { id: number; name: string };
}> = ({ onCancel, company, onDelete }) => {
  const dispatch = useDispatch();
  const handleOnClickDeleteBtn = useCallback(
    () =>
      dispatch(
        deleteCompanyAsync(company.id, company.id.toString(), () => {
          onDelete();
        })
      ),

    [company.id, dispatch, onDelete]
  );
  const footer = (
    <Line>
      <LoadingButton
        danger
        onClick={handleOnClickDeleteBtn}
        actionType={ActionType.COMMON_COMPANIES_DELETECOMPANYASYNC}
        mod={company.id.toString()}>
        Удалить
      </LoadingButton>
      <Button light onClick={onCancel}>
        Отменить
      </Button>
    </Line>
  );
  return (
    <Modal footer={footer} size="sm" header={<span>{`Удаление "${company.name}"`}</span>} noHeight onCancel={onCancel}>
      {`Вы уверены что хотите удалить документ "${company.name}"?`}
      <br />
      Эти изменения нельзя будет отменить.
    </Modal>
  );
};
