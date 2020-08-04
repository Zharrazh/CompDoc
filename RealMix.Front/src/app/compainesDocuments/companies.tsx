import React, { useEffect, useState, useCallback } from 'react';
import './companies.scss';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Line, THead, Table, Col, Row, Td, Th, TBody, Tr, Block, Icon } from 'shared';
import { getPageAsync } from 'data/companies/actions';
import { StoreType } from 'core/store';

export const Companies = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [orderBy, setOrderBy] = useState('id');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [nameSelect, setNameSelect] = useState('');

  useEffect(() => {
    dispatch(getPageAsync({ page: pageNumber, pageSize, orderBy, sortBy, name: nameSelect }));
  }, [dispatch, nameSelect, orderBy, pageNumber, pageSize, sortBy]);

  const selector = useSelector((state: StoreType) => state.companies);

  const handleOnOrderClick = useCallback((name, sortBy) => {
    setOrderBy(name);
    setSortBy(sortBy);
  }, []);
  return (
    <Container className="companies">
      <Line>COMPANIES</Line>
      <Row>
        <Col size={10}>
          <Table className="companies__table">
            <THead className="head">
              <Tr>
                <Th>
                  <Order name="id" state={orderBy === 'id' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Id
                  </Order>
                </Th>
                <Th>
                  <Order name="name" state={orderBy === 'name' ? sortBy : 'none'} onClick={handleOnOrderClick}>
                    Name
                  </Order>
                </Th>
                <Th>
                  <Order
                    name="legalName"
                    state={orderBy === 'legalName' ? sortBy : 'none'}
                    onClick={handleOnOrderClick}>
                    Legal name
                  </Order>
                </Th>
              </Tr>
            </THead>
            <TBody>
              {selector.page.items.map(c => {
                return (
                  <Tr key={c.id}>
                    <Td>{c.id}</Td>
                    <Td>{c.name}</Td>
                    <Td>{c.legalName}</Td>
                  </Tr>
                );
              })}
            </TBody>
          </Table>
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
          <label htmlFor="nameSelect">Поиск по имени</label>
          <input
            id="nameSelect"
            type="text"
            value={nameSelect}
            onChange={e => {
              setNameSelect(e.currentTarget.value);
            }}
          />
        </Col>
      </Row>
    </Container>
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
      <Block mr={'2'} inline={true}>
        {children}
      </Block>
      {angle}
    </Block>
  );
};
