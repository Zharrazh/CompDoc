import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AsyncActions } from 'app/actionTypes';
import { StoreType } from 'core/store';
import { AppDispatch } from 'core/reduxHelper';
import { useMatch } from 'core/routerHooks'; //, useLocation
import {
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  Line,
  RepeatPanel,
  LinkButton,
  DefaultPage,
  Button,
  Icon,
  ButtonGroup,
  DropdownButton,
  DropdownItem
} from 'shared';
import { WidgetType } from 'enums/WidgetType';
import { DateTime } from 'utils/dateTime';

import { getPageAsync } from './actions';

export const WidgetList: React.FC = () => {
  const match = useMatch<{ page: number }>();
  const dispatch = useDispatch<AppDispatch>();
  const get = useCallback(() => dispatch(getPageAsync({ page: +match.params.page || 1 })), [
    dispatch,
    match.params.page
  ]);
  useEffect(() => {
    get();
  }, [get]);
  const page = useSelector((state: StoreType) => state.config.widget.page);
  return (
    <DefaultPage title="Widget List">
      <Line className="mb-3">
        <LinkButton primary to={`${match.url}/add`}>
          <Icon name="plus" />
        </LinkButton>
        {/* <LinkButton primary to={`${match.url}/asdasd/as`}>Go to not found</LinkButton> */}
      </Line>
      <RepeatPanel actionType={AsyncActions.CONFIG_WIDGET_GETPAGEASYNC} action={get}>
        {page && (
          <Table small minHeight>
            <THead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Created</Th>
                <Th>Updated</Th>
                <Th>Actions</Th>
              </Tr>
            </THead>
            <TBody>
              {page.items.map(item => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{WidgetType.name(item.type)}</Td>
                  <Td>{DateTime.format(item.created)}</Td>
                  <Td>{DateTime.format(item.updated)}</Td>
                  <Td narrow>
                    <ButtonGroup>
                      <LinkButton small success to={`${match.url}/${item.id}`}>
                        <Icon name="pencil-alt" />
                      </LinkButton>
                      <Button small danger>
                        <Icon name="trash-alt" />
                      </Button>
                      <DropdownButton secondary small rightAlignment>
                        <DropdownItem tag={Link} to={`${match.url}/settings`}>
                          Test link 1
                        </DropdownItem>
                        <DropdownItem>Dropdown link</DropdownItem>
                        <DropdownItem>Dropdown link</DropdownItem>
                      </DropdownButton>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </RepeatPanel>
    </DefaultPage>
  );
};
