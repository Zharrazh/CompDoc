import { library } from '@fortawesome/fontawesome-svg-core';
//solid
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCalculator } from '@fortawesome/free-solid-svg-icons/faCalculator';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons/faClipboardCheck';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
//regular
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
//
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';

library.add(
  //solid
  faAngleRight,
  faAngleDown,
  faTachometerAlt,
  faUsers,
  faCalculator,
  faClipboardCheck,
  faCog,
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faExclamationCircle,
  faCircleNotch,
  //regular
  faCircle,
  faCheckSquare,
  faSquare
);

export type ImportedIcon =
  | 'angle-right'
  | 'angle-down'
  | 'tachometer-alt'
  | 'users'
  | 'calculator'
  | 'clipboard-check'
  | 'cog'
  | 'circle'
  | 'pencil-alt'
  | 'trash-alt'
  | 'plus'
  | 'exclamation-circle'
  | 'circle-notch'
  | 'check-square'
  | 'square';

export interface Props extends SpaceProps, React.HTMLAttributes<any> {
  className?: string;
  spin?: boolean;
  prefix?: 'fas' | 'far';
  name: ImportedIcon;
}

export const Icon: React.FC<Props> = ({ prefix = 'fas', name, spin, className, ...other }) => {
  const classes = classNames('icon-container', propsToSpace(other), className);
  return <FontAwesomeIcon icon={[prefix, name]} spin={spin} className={classes} {...other}></FontAwesomeIcon>;
};
