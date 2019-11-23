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
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons/faMoneyBillAlt';
import { faPercent } from '@fortawesome/free-solid-svg-icons/faPercent';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons/faStarOfLife';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons/faExchangeAlt';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faHammer } from '@fortawesome/free-solid-svg-icons/faHammer';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons/faArrowsAltH';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons/faShoePrints';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
//regular
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons/faFileAlt';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
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
  faMoneyBillAlt,
  faPercent,
  faStarOfLife,
  faTh,
  faExchangeAlt,
  faCaretLeft,
  faCaretRight,
  faHistory,
  faExclamationTriangle,
  faLock,
  faTimes,
  faSearch,
  faEdit,
  faHammer,
  faCheck,
  faArrowsAltH,
  faShoePrints,
  faStar,
  faQuestionCircle,
  //regular
  faCircle,
  faCalendar,
  faCheckSquare,
  faSquare,
  faFileAlt,
  faClock
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
  | 'square'
  | 'money-bill-alt'
  | 'percent'
  | 'star-of-life'
  | 'th'
  | 'exchange-alt'
  | 'caret-left'
  | 'caret-right'
  | 'history'
  | 'calendar'
  | 'file-alt'
  | 'exclamation-triangle'
  | 'times'
  | 'clock'
  | 'lock'
  | 'search'
  | 'edit'
  | 'hammer'
  | 'check'
  | 'arrows-alt-h'
  | 'shoe-prints'
  | 'star'
  | 'question-circle';

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
