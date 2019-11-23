import React, { useLayoutEffect } from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';
import { BorderProps, propsToBorder } from './utils/borderUtil';
import { SizeProps, propsToSize } from './utils/sizeUtil';

import './modal.scss';

interface Props extends SpaceProps, BorderProps, SizeProps, React.HTMLAttributes<any> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  noHeight?: boolean;
  onCancel?: () => void;
}

export const Modal: React.FC<Props> = ({ className, header, footer, onCancel, noHeight, children, size, ...other }) => {
  const rootClasses = classNames(
    'app-modal modal fade show',
    { noHeight },
    propsToSpace(other),
    propsToBorder(other),
    propsToSize(other),
    className
  );
  const subClasses = classNames('modal-dialog modal-dialog-scrollable modal-dialog-centered', {
    ['modal-' + size]: size != null
  });
  useLayoutEffect(() => {
    document.body.classList.toggle('modal-open');
    return () => {
      document.body.classList.toggle('modal-open');
    };
  }, []);
  return (
    <>
      <div className={rootClasses} tabIndex={-1} role="dialog">
        <div className={subClasses} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{header}</h5>
              <button type="button" className="close" aria-label="Close" onClick={onCancel}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
