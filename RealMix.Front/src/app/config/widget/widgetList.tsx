import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ActionType } from 'data/actionTypes';
import { StoreType } from 'core/store';
import { useMatch, useLocationParams } from 'core/router';
import { useCancellation } from 'core/useCancellation';
import {
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  RepeatPanel,
  LinkButton,
  DefaultPage,
  Button,
  Icon,
  ButtonGroup,
  DropdownButton,
  DropdownItem,
  FiltersPanel,
  SelectFilter
} from 'shared';
import { WidgetType } from 'enums/widgetType';
import { DateTime } from 'utils/dateTime';
import { useCleaning } from 'core/useCleaning';
import { setPage, getPageAsync } from 'data/config/widget/actions';

export const WidgetList: React.FC = () => {
  useCancellation(ActionType.CONFIG_WIDGET_GETPAGEASYNC);
  useCleaning(setPage);
  const match = useMatch();
  const { page: pageNumber, widgetType } = useLocationParams<{ page: number; widgetType: number }>();
  const dispatch = useDispatch();
  const get = useCallback(() => {
    dispatch(getPageAsync({ page: Number(pageNumber) || 1, widgetType }));
  }, [dispatch, pageNumber, widgetType]);
  useEffect(() => get(), [get]);
  const page = useSelector((state: StoreType) => state.config.widget.page);
  return (
    <DefaultPage title="Widget List">
      <FiltersPanel className="mb-3">
        <LinkButton primary to={`${match.url}/add`}>
          <Icon name="plus" />
        </LinkButton>
        <SelectFilter
          options={WidgetType.all}
          getLabel={x => x.name}
          getValue={x => x.id.toString()}
          label="Widget Type"
          name="widgetType"
          addEmptyOption
          disableAutoSelect
          size={4}></SelectFilter>
        {/* <LinkButton primary to={`${match.url}/asdasd/as`}>Go to not found</LinkButton> */}
      </FiltersPanel>
      <RepeatPanel actionType={ActionType.CONFIG_WIDGET_GETPAGEASYNC} action={get}>
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
                  <Td>{WidgetType.getName(item.type)}</Td>
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
