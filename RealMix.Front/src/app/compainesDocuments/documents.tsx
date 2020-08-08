import React, { useCallback, useState, useEffect, FC } from 'react';
import './documents.scss';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Line,
  Row,
  Col,
  Block,
  Icon,
  Button,
  SelectField,
  Modal,
  LoadingButton,
  TextBoxField
} from 'shared';
import { StoreType } from 'core/store';
import {
  getPageAsync,
  saveDocumentAsync,
  deleteDocumentAsync,
  getDocumentFullAsync,
  setCreatorForm,
  setCompaniesIds,
  getAllCompaniesAsync,
  setVisibleCreaterForm,
  setCreatorFormByIdAsync
} from 'data/documents/actions';
import { DocumentType } from 'enums/DocumentType';
import { DocumentCreatorForm } from 'data/documents/models';
import { ActionType } from 'data/actionTypes';
import { Multiselect, Option } from 'shared/base/Multiselect';

export const Documents = () => {
  const selector = useSelector((state: StoreType) => state.documents);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [orderBy, setOrderBy] = useState('id');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [titleSelect, setTitleSelect] = useState('');
  const isVisibleDocCreator = useSelector((state: StoreType) => state.documents.isDocumentCreatorVisible);

  useEffect(() => {
    dispatch(getPageAsync({ page: pageNumber, pageSize, orderBy, sortBy, title: titleSelect }));
  }, [dispatch, orderBy, pageNumber, pageSize, sortBy, titleSelect]);

  const handleOnOrderClick = useCallback((name, sortBy) => {
    setOrderBy(name);
    setSortBy(sortBy);
  }, []);

  return (
    <Container className="documents">
      <Line>Documents</Line>
      <Row>
        <Col size={10}>
          <Block className="documents_table">
            <Block className="table_header" style={{ fontWeight: 'bold' }}>
              <Row m="2">
                <Col size={1}>
                  <Order name="id" state={orderBy === 'id' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Id
                  </Order>
                </Col>
                <Col size={4}>
                  <Order name="title" state={orderBy === 'title' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Title
                  </Order>
                </Col>
                <Col size={2}>
                  <Order name="type" state={orderBy === 'type' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Type
                  </Order>
                </Col>
                <Col size={5} />
              </Row>
            </Block>
            <Block className="table_elements">
              {selector.page.items.map(i => (
                <DocumentItem item={i} key={i.id} />
              ))}
            </Block>
          </Block>
          {isVisibleDocCreator || (
            <Button
              success={true}
              onClick={() => {
                dispatch(setCreatorForm({ id: -1, body: '', title: '', companyIds: [], type: 0 }));
                dispatch(setVisibleCreaterForm(true));
              }}>
              Добавить новый документ
            </Button>
          )}
          {isVisibleDocCreator && (
            <DocumentCreator
              onCancel={() => dispatch(setVisibleCreaterForm(false))}
              onCreate={document => {
                dispatch(saveDocumentAsync(document));
              }}
            />
          )}
        </Col>
        <Col size={2}>
          <label htmlFor="pageNumber">Номер страницы</label>
          <input
            id={'pageNumber'}
            value={pageNumber}
            type="number"
            min={1}
            max={selector.page.totalPages}
            onChange={e => {
              setPageNumber(Number(e.currentTarget.value));
            }}
          />
          <label htmlFor="pageSize">Кол-во элементов на странице</label>
          <input
            id="pageSize"
            value={pageSize}
            type="number"
            min={1}
            max={50}
            onChange={e => {
              setPageSize(Number(e.currentTarget.value));
            }}
          />
          <label htmlFor="titleSelect">Поиск по заголовку</label>
          <input
            id="titleSelect"
            type="text"
            value={titleSelect}
            onChange={e => {
              setTitleSelect(e.currentTarget.value);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

const DocumentItem: React.FC<{ item: { id: number; title: string; type: number } }> = ({ item }) => {
  const dispatch = useDispatch();
  const [deleteModalHidden, setDeleteModalHidden] = useState(true);
  const [isExtended, setExtended] = useState(false);
  const handleOnClickDetails = useCallback(() => {
    dispatch(getDocumentFullAsync(item.id, item.id.toString(), () => setExtended(true)));
  }, [dispatch, item.id]);
  const handleOnClickChange = useCallback(() => {
    dispatch(setCreatorFormByIdAsync(item.id));
  }, [dispatch, item.id]);
  const documentSelector = useSelector((state: StoreType) => state.documents.documentFull);
  return (
    <Container>
      <Row className="documentItem" m="2">
        <Container>
          <Row>
            <Col className="id" size={1}>
              {item.id}
            </Col>
            <Col className="title" size={4}>
              {item.title}
            </Col>
            <Col className="type" size={2}>
              {DocumentType.getName(item.type)}
            </Col>
            <Col className="controls" size={5}>
              <LoadingButton
                small
                actionType={ActionType.COMMON_DOCUMENTS_GETDOCUMENTFULLASYNC}
                mod={item.id.toString()}
                onClick={handleOnClickDetails}>
                Подробнее
              </LoadingButton>
              <Button small onClick={handleOnClickChange}>
                Изменить
              </Button>
              <Button small onClick={() => setDeleteModalHidden(false)}>
                Удалить
              </Button>
              {deleteModalHidden || <DeleteDocumentModal document={item} onCancel={() => setDeleteModalHidden(true)} />}
            </Col>
          </Row>
          {isExtended && documentSelector?.id === item.id && (
            <Row className="documentItem__dropdown" mt="2">
              <Col>{documentSelector.body}</Col>
              <Col>
                <ul>
                  {documentSelector.companies.map(c => (
                    <li key={c.id}>{c.legalName}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          )}
        </Container>
      </Row>
    </Container>
  );
};

const DocumentCreator: FC<{ onCancel: () => void; onCreate: (document: DocumentCreatorForm) => void }> = ({
  onCancel,
  onCreate
}) => {
  // const [defaultSelectIds, setDefaultSelectIds] = useState<number[]>([]);
  const documentCreatorForm = useSelector((state: StoreType) => state.documents.documentCreatorForm);
  // useEffect(() => {
  //   console.log('set new ids');
  //   if (documentCreatorForm.id >= 0) setDefaultSelectIds(documentCreatorForm.companyIds);
  // }, [documentCreatorForm.companyIds, documentCreatorForm.id]);

  const allCompanies = useSelector((state: StoreType) => state.documents.companies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCompaniesAsync());
  }, [dispatch]);
  const handleOnCreate = () => {
    onCreate(documentCreatorForm);
  };

  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    setOptions(allCompanies.map(c => ({ id: c.id, title: c.name })));
  }, [allCompanies]);
  const handleOnChangeMultiselect = useCallback(
    (op: Option[]) => {
      const ids = op.map(o => o.id);
      dispatch(setCompaniesIds(ids));
    },
    [dispatch]
  );

  return (
    <Line vertical alignItems="start">
      <Line alignItems="baseline">
        <TextBoxField
          name="title"
          value={documentCreatorForm.title}
          onChange={value => {
            dispatch(setCreatorForm({ ...documentCreatorForm, title: value }));
          }}
          placeholder="Title..."
        />
      </Line>
      <Line alignItems="baseline">
        <SelectField
          name="type"
          options={DocumentType.map}
          getLabel={x => x}
          value={documentCreatorForm.type.toString()}
          onChange={value => dispatch(setCreatorForm({ ...documentCreatorForm, type: Number(value) }))}
        />
      </Line>
      <textarea
        value={documentCreatorForm.body}
        onChange={e => dispatch(setCreatorForm({ ...documentCreatorForm, body: e.target.value }))}></textarea>

      <Multiselect options={options} onChange={handleOnChangeMultiselect} />
      <Line mt="3">
        <LoadingButton
          actionType={ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC}
          success={true}
          small={true}
          mr="2"
          onClick={handleOnCreate}>
          Создать
        </LoadingButton>
        <Button danger={true} small={true} onClick={onCancel}>
          Отменить
        </Button>
      </Line>
    </Line>
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

const Order: React.FC<{
  name: string;
  state: 'asc' | 'desc' | 'none';
  onClick: (name: string, sortBy: 'asc' | 'desc') => void;
}> = ({ name, state, onClick, children }) => {
  let angle;
  if (state === 'asc') angle = <Icon name={'angle-down'} className={'fa-rotate-180'} />;
  else if (state === 'desc') angle = <Icon name={'angle-down'} />;

  const clickHandler = useCallback(() => {
    const nextState = state !== 'desc' ? 'desc' : 'asc';
    onClick(name, nextState);
  }, [name, onClick, state]);
  return (
    <Block onClick={clickHandler}>
      <Line>
        <Block inline mr="2">
          {children}
        </Block>
        <Block inline>{angle}</Block>
      </Line>
    </Block>
  );
};
