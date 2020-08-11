import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Line,
  Row,
  Col,
  Block,
  Button,
  Modal,
  LoadingButton,
  LinkButton,
  TextBoxField,
  RepeatPanel
} from 'shared';
import { StoreType } from 'core/store';
import { getPageAsync, deleteDocumentAsync } from 'data/documents/actions';
import { DocumentType } from 'enums/documentType';
import { DocumentFull } from 'data/documents/models';
import { ActionType } from 'data/actionTypes';
import { Paginator } from 'shared/base/paginator';
import { Order } from 'shared/base/order';

export const Documents = () => {
  const selector = useSelector((state: StoreType) => state.documents);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;
  const [orderBy, setOrderBy] = useState('id');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [titleSelect, setTitleSelect] = useState('');

  useEffect(() => {
    dispatch(getPageAsync({ page: pageNumber, pageSize, orderBy, sortBy, title: titleSelect }));
  }, [dispatch, orderBy, pageNumber, pageSize, sortBy, titleSelect]);

  const handleOnOrderClick = useCallback((name, sortBy) => {
    setOrderBy(name);
    setSortBy(sortBy);
  }, []);

  return (
    <Container className="documents" pt="3">
      <Row>
        <h2>Таблица документов</h2>
      </Row>
      <Row>
        <Col>
          <Line alignItems="baseline" mt="3">
            <label htmlFor="pageSize">Поиск по названию:</label>
            <TextBoxField
              name="titleSelect"
              value={titleSelect}
              onChange={value => setTitleSelect(value)}
              placeholder="Введите название документа"
              size={3}
            />
          </Line>
          <LinkButton success to="documents/create" my="2">
            Добавить новый документ
          </LinkButton>
          <Block className="documents_table">
            <Block className="table_header" style={{ fontWeight: 'bold' }}>
              <Row m="2">
                <Col size={1}>
                  <Order name="id" state={orderBy === 'id' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Id
                  </Order>
                </Col>
                <Col size={2}>
                  <Order name="title" state={orderBy === 'title' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Название
                  </Order>
                </Col>
                <Col size={2}>
                  <Order name="type" state={orderBy === 'type' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Тип
                  </Order>
                </Col>
                <Col size={3}>Тело</Col>
                <Col size={2}>Подписавшие компании</Col>
                <Col size={2} />
              </Row>
            </Block>
            <RepeatPanel
              actionType={ActionType.COMMON_DOCUMENTS_GETPAGEASYNC}
              action={() =>
                dispatch(getPageAsync({ page: pageNumber, pageSize, orderBy, sortBy, title: titleSelect }))
              }>
              <Block className="table_elements">
                {selector.page.items.map(i => (
                  <DocumentItem item={i} key={i.id} />
                ))}
              </Block>
            </RepeatPanel>
          </Block>
          <Block mt="5">
            <Paginator
              currentPage={pageNumber}
              totalPages={selector.page.totalPages}
              onChange={value => {
                setPageNumber(value);
              }}
            />
          </Block>
        </Col>
      </Row>
    </Container>
  );
};

const DocumentItem: React.FC<{ item: DocumentFull }> = ({ item }) => {
  const [deleteModalHidden, setDeleteModalHidden] = useState(true);
  return (
    <Container>
      <Row className="documentItem" m="2">
        <Container>
          <Row>
            <Col className="id" size={1}>
              {item.id}
            </Col>
            <Col className="title" size={2}>
              {item.title}
            </Col>
            <Col className="type" size={2}>
              {DocumentType.getName(item.type)}
            </Col>
            <Col className="body" size={3}>
              {item.body}
            </Col>
            <Col className="signedCompanies" size={2}>
              <ul>
                {item.companies.map(x => (
                  <li key={x.id}>{x.legalName}</li>
                ))}
              </ul>
            </Col>
            <Col className="controls" size={2}>
              <Line>
                <LinkButton small to={`/documents/edit/${item.id}`}>
                  Изменить
                </LinkButton>
                <Button small onClick={() => setDeleteModalHidden(false)}>
                  Удалить
                </Button>
              </Line>

              {deleteModalHidden || <DeleteDocumentModal document={item} onCancel={() => setDeleteModalHidden(true)} />}
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

const DeleteDocumentModal: React.FC<{ onCancel: () => void; document: { id: number; title: string } }> = ({
  onCancel,
  document
}) => {
  const dispatch = useDispatch();
  const handleOnClickDeleteBtn = useCallback(
    () =>
      dispatch(
        deleteDocumentAsync(document.id, document.id.toString(), () => {
          onCancel();
        })
      ),
    [dispatch, document.id, onCancel]
  );
  const footer = (
    <Line>
      <LoadingButton
        danger
        onClick={handleOnClickDeleteBtn}
        actionType={ActionType.COMMON_DOCUMENTS_DELETEDOCUMENTASYNC}
        mod={document.id.toString()}>
        Удалить
      </LoadingButton>
      <Button light onClick={onCancel}>
        Отменить
      </Button>
    </Line>
  );
  return (
    <Modal
      footer={footer}
      size="sm"
      header={<span>{`Удаление "${document.title}"`}</span>}
      noHeight
      onCancel={onCancel}>
      {`Вы уверены что хотите удалить документ "${document.title}"?`}
      <br />
      Эти изменения нельзя будет отменить.
    </Modal>
  );
};
