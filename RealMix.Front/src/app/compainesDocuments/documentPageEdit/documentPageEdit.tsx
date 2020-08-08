import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, TextBoxField, SelectField, LoadingButton, LinkButton } from 'shared';
import { getDocumentFullAsync, getAllCompaniesAsync, saveDocumentAsync } from 'data/documents/actions';
import { StoreType } from 'core/store';
import { Multiselect, Option } from 'shared/base/Multiselect';
import { DocumentType } from 'enums/DocumentType';
import { ActionType } from 'data/actionTypes';

export const DocumentPageEdit: React.FC<{}> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fullDoc = useSelector((state: StoreType) => state.documents.documentFull);
  const allCompanies = useSelector((state: StoreType) => state.documents.companies);

  useEffect(() => {
    dispatch(getDocumentFullAsync(id));
    dispatch(getAllCompaniesAsync());
  }, [dispatch, id]);

  const [defaultCompanyIds, setDefaultCompanyId] = useState<number[]>([]);
  useEffect(() => {
    if (fullDoc) setDefaultCompanyId(fullDoc?.companies.map(c => c.id));
  }, [fullDoc]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (fullDoc) setTitle(fullDoc?.title);
  }, [fullDoc]);
  const [type, setType] = useState(0);
  useEffect(() => {
    if (fullDoc) setType(fullDoc?.type);
  }, [fullDoc]);
  const [body, setBody] = useState('');
  useEffect(() => {
    if (fullDoc) setBody(fullDoc?.body);
  }, [fullDoc]);
  const [companyIds, setCompanyIds] = useState<number[]>([]);
  useEffect(() => {
    if (fullDoc) setCompanyIds(fullDoc?.companies.map(c => c.id));
  }, [fullDoc]);

  const options: Option[] = useMemo(() => {
    return allCompanies.map(c => ({ id: c.id, title: c.name }));
  }, [allCompanies]);

  const handleOnChangeMultiselect = useCallback((op: Option[]) => {
    const ids = op.map(o => o.id);
    setCompanyIds(ids);
  }, []);

  const handleOnSaveChanges = useCallback(() => {
    dispatch(saveDocumentAsync({ id: Number(id), title, type, body, companyIds }));
  }, [body, companyIds, dispatch, id, title, type]);
  return (
    <Container>
      <Row>
        <TextBoxField
          name="title"
          value={title}
          onChange={value => {
            setTitle(value);
          }}
          placeholder="Title..."
        />
      </Row>
      <Row>
        <SelectField
          name="type"
          options={DocumentType.map}
          getLabel={x => x}
          value={type.toString()}
          onChange={value => setType(Number(value))}
        />
      </Row>
      <Row>
        <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
      </Row>
      <Row>
        <Multiselect defaultSelectedId={defaultCompanyIds} options={options} onChange={handleOnChangeMultiselect} />
      </Row>
      <Row>
        <LoadingButton success actionType={ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC} onClick={handleOnSaveChanges}>
          Сохранить измненения
        </LoadingButton>
        <LinkButton to="/documents">Вернуться назад</LinkButton>
      </Row>
    </Container>
  );
};

// const DocumentCreator: FC<{ onCancel: () => void; onCreate: (document: DocumentCreatorForm) => void }> = ({
//   onCancel,
//   onCreate
// }) => {
//   // const [defaultSelectIds, setDefaultSelectIds] = useState<number[]>([]);
//   const documentCreatorForm = useSelector((state: StoreType) => state.documents.documentCreatorForm);
//   // useEffect(() => {
//   //   console.log('set new ids');
//   //   if (documentCreatorForm.id >= 0) setDefaultSelectIds(documentCreatorForm.companyIds);
//   // }, [documentCreatorForm.companyIds, documentCreatorForm.id]);

//   const allCompanies = useSelector((state: StoreType) => state.documents.companies);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllCompaniesAsync());
//   }, [dispatch]);
//   const handleOnCreate = () => {
//     onCreate(documentCreatorForm);
//   };

//   const [options, setOptions] = useState<Option[]>([]);
//   useEffect(() => {
//     setOptions(allCompanies.map(c => ({ id: c.id, title: c.name })));
//   }, [allCompanies]);
//   const handleOnChangeMultiselect = useCallback(
//     (op: Option[]) => {
//       const ids = op.map(o => o.id);
//       dispatch(setCompaniesIds(ids));
//     },
//     [dispatch]
//   );

//   return (
//     <Line vertical alignItems="start">
//       <Line alignItems="baseline">
//         <TextBoxField
//           name="title"
//           value={documentCreatorForm.title}
//           onChange={value => {
//             dispatch(setCreatorForm({ ...documentCreatorForm, title: value }));
//           }}
//           placeholder="Title..."
//         />
//       </Line>
//       <Line alignItems="baseline">
//         <SelectField
//           name="type"
//           options={DocumentType.map}
//           getLabel={x => x}
//           value={documentCreatorForm.type.toString()}
//           onChange={value => dispatch(setCreatorForm({ ...documentCreatorForm, type: Number(value) }))}
//         />
//       </Line>
//       <textarea
//         value={documentCreatorForm.body}
//         onChange={e => dispatch(setCreatorForm({ ...documentCreatorForm, body: e.target.value }))}></textarea>

//       <Multiselect options={options} onChange={handleOnChangeMultiselect} />
//       <Line mt="3">
//         <LoadingButton
//           actionType={ActionType.COMMON_DOCUMENTS_SAVEDOCUMENTASYNC}
//           success={true}
//           small={true}
//           mr="2"
//           onClick={handleOnCreate}>
//           Создать
//         </LoadingButton>
//         <Button danger={true} small={true} onClick={onCancel}>
//           Отменить
//         </Button>
//       </Line>
//     </Line>
//   );
// };
