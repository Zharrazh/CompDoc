import React, { useEffect, useCallback } from 'react';
import { ActionType } from 'actions/actionType';
import { useSelector, useDispatch } from 'react-redux';

import { StoreType } from 'core/store';
import { AppDispatch } from 'core/reduxHelper';
import { getPageAsync } from 'actions/admin/widgetAction';
import { useMatch, useLocation } from 'core/routerHooks';

import { RepeatPanel, LinkButton } from 'components/shared';
import { Table, THead, TBody, Tr, Th, Td, Line } from 'components/shared/base';

import { parse } from 'query-string';

export const WidgetList: React.FC = () => {
  const match = useMatch<{ page: number }>();
  const location = useLocation();
  const parsedQuery = location.search;
  console.log(match, location);
  const dispatch = useDispatch<AppDispatch>();
  const get = useCallback(() => dispatch(getPageAsync({ page: +match.params.page || 1 })), [dispatch, match.params.page])
  useEffect(() => { get(); }, [get]);
  const page = useSelector((state: StoreType) => state.admin.widget.page);
  return (
    <>
      <div>Widget List Test</div>
      <Line className="mb-3">
        <LinkButton primary to={`${match.url}/add`}>Add</LinkButton>
      </Line>
      <RepeatPanel actionType={ActionType.ADMIN_WIDGET_GETPAGEASYNC} action={get}>
        {page && (
          <Table small>
            <THead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
              </Tr>
            </THead>
            <TBody>
              {page.items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </RepeatPanel>
    </>
  );
};