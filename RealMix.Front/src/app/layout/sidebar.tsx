import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useLocation } from 'core/routerHooks';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/store';

import './sidebar.scss';

interface StaticItem {
  type: 'static';
  title: string;
  show?: () => boolean;
}

interface GroupItem {
  type: 'group';
  title: string;
  show?: () => boolean;
  icon?: IconName;
  items: { title: string, to: string, show?: () => boolean }[]
}

interface LinkItem {
  type: 'link';
  title: string;
  show?: () => boolean;
  icon?: IconName;
  to: string;
}

type MenuItem = StaticItem | GroupItem | LinkItem;

interface Props {
  show: boolean;
  hide: () => void;
}

export const Sidebar: React.FC<Props> = ({ show, hide }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<{ to: string }>();
  const [expanded, setExpanded] = useState<GroupItem>();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const authInfo = useSelector((x: StoreType) => x.common.auth.authInfo);
  const groupElement = useRef<any>(null);

  const menu = useMemo(() => {
    const innerMenu: MenuItem[] = [
      { type: 'static', title: 'General' },
      { type: 'link', title: 'Dashboard', to: '/', icon: 'tachometer-alt' },
      {
        type: 'group', title: 'Members', icon: 'users', items: [
          { title: 'Employees', to: '/Employees' },
          { title: 'Some Report', to: '/someReport' },
          { title: 'Contacts', to: '/Contacts' },
          { title: 'Categories', to: '/Categories' },
        ]
      },
      {
        type: 'group', title: 'Automation', icon: 'calculator', items: [
          { title: 'Notification Templates', to: '/Notification-Templates' },
          { title: 'Jobs', to: '/Jobs' },
          { title: 'Some Report', to: '/someReport1' },
          { title: 'Settings', to: '/Settings' }
        ]
      },
      {
        type: 'group', title: 'Configurations', icon: 'cog', show: () => authInfo.isAdmin, items: [
          { title: 'Widgets', to: '/config/widget' },
        ]
      },
      {
        type: 'group', title: 'Auditing', icon: 'clipboard-check', items: [
          { title: 'Activity log', to: '/Activity-log' },
          { title: 'Detailed Reported Hours', to: '/Detailed-Reported-Hours' }
        ]
      },
      { type: 'static', title: 'Extra' },
      { type: 'link', title: 'Billable View', to: '/Billable-View' },
      { type: 'link', title: 'Invoice View', to: '/Invoice-View' },
      { type: 'link', title: 'Payroll View', to: '/Payroll-View' },
      { type: 'link', title: 'Dashboard Templates', to: '/Dashboard-Templates', icon: 'users' },
    ];
    return innerMenu;
  }, [authInfo.isAdmin])

  useEffect(() => {
    hide();
    const isActive = (to: string) => RegExp(`^${to}(/\\w*)?$`, 'i').test(location.pathname);
    for (let item of menu) {
      if (item.type === 'link' && isActive(item.to)) {
        setActiveItem(item);
        setExpanded(undefined);
        return;
      }
      if (item.type === 'group') {
        const subitem = item.items.find(x => isActive(x.to))
        if (subitem != null) {
          setActiveItem(subitem);
          setExpanded(item);
          return;
        }
      }
    }
  }, [location.pathname, hide, menu]);
  useEffect(() => {
    if (groupElement.current && groupElement.current.clientHeight > 0)
      setMaxHeight(groupElement.current.clientHeight);
  }, [expanded, show]);
  return (
    <div className="app-sidebar fixed-top navbar-expand-md">
      <div className={classNames('collapse navbar-collapse', { show })}>
        <div className="sidebar-body">
          {menu.map((item, itemKey) => {
            if (!shouldShow(item))
              return null;
            if (item.type === 'static')
              return <div key={itemKey} className="sidebarItem sidebarStatic">{item.title}</div>
            if (item.type === 'group')
              return (
                <div key={itemKey}>
                  <button className="btn btn-link sidebarItem sidebarGroup" onClick={() => setExpanded(item !== expanded ? item : undefined)}>
                    {item.icon && <span className="menuIcon"><FontAwesomeIcon icon={item.icon} /></span>}
                    <span className="groupTitle">{item.title}</span>
                    <span className="groupArrow"><FontAwesomeIcon icon={item === expanded ? 'angle-down' : 'angle-right'} /></span>
                  </button>
                  <div className="sidebarSubList" style={item === expanded ? { maxHeight: maxHeight } : undefined}>
                    <div ref={item === expanded ? groupElement : undefined}>
                      {item.items.map((subItem, subItemKey) =>
                        !shouldShow(subItem) ? null : (
                          <Link key={subItemKey} to={subItem.to} className={subItem === activeItem ? 'active' : undefined}>
                            <FontAwesomeIcon icon={['far', 'circle']} />
                            {subItem.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              );
            if (item.type === 'link')
              return (
                <Link to={item.to} key={itemKey} className={classNames('sidebarItem sidebarLink', { active: item === activeItem })}>
                  {item.icon && <span className="menuIcon"><FontAwesomeIcon icon={item.icon} /></span>}
                  {item.title}
                </Link>
              );
            throw new Error('You should handle all types of MenuItem');
          })}
        </div>
      </div>
    </div>
  );
}

const shouldShow = ({ show }: { show?: () => boolean }) => {
  return show == null || show();
}