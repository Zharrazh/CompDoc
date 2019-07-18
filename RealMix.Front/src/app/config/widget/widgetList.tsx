import React, { useEffect, useCallback } from 'react';
import { AsyncActions } from 'app/actionTypes';
import { useSelector, useDispatch } from 'react-redux';

import { StoreType } from 'core/store';
import { AppDispatch } from 'core/reduxHelper';
import { getPageAsync } from './actions';
import { useMatch } from 'core/routerHooks';//, useLocation

import { Table, THead, TBody, Tr, Th, Td, Line, RepeatPanel, LinkButton, DefaultPage } from 'shared';

//import { parse } from 'query-string';

export const WidgetList: React.FC = () => {
  const match = useMatch<{ page: number }>();
  //const location = useLocation();
  //const parsedQuery = location.search;
  //console.log(match, location);
  const dispatch = useDispatch<AppDispatch>();
  const get = useCallback(() => dispatch(getPageAsync({ page: +match.params.page || 1 })), [dispatch, match.params.page])
  useEffect(() => { get(); }, [get]);
  const page = useSelector((state: StoreType) => state.config.widget.page);
  return (
    <DefaultPage title="Widget List">
      <Line className="mb-3">
        <LinkButton primary to={`${match.url}/add`}>Add</LinkButton>
        {/* <LinkButton primary to={`${match.url}/asdasd/as`}>Go to not found</LinkButton> */}
      </Line>
      <RepeatPanel actionType={AsyncActions.CONFIG_WIDGET_GETPAGEASYNC} action={get}>
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
    </DefaultPage>
  );
};