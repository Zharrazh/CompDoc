export interface BorderProps {
  border?: true | 'top' | 'right' | 'bottom' | 'left';
  border0?: true | 'top' | 'right' | 'bottom' | 'left';
  borderColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'white';
  rounded?: true | 'top' | 'right' | 'bottom' | 'left' | 'circle' | 'pill' | '0';
}

export function propsToBorder(props: BorderProps) {
  const { border, border0, borderColor, rounded } = props;

  delete props.border;
  delete props.border0;
  delete props.borderColor;
  delete props.rounded;

  return {
    [`border`]: border === true,
    [`border-${border}`]: border !== true && border != null,
    [`border-0`]: border0 === true,
    [`border-${border0}-0`]: border0 !== true && border0 != null,
    [`border-${borderColor}`]: borderColor != null,
    [`rounded`]: rounded === true,
    [`rounded-${rounded}`]: rounded !== true && rounded != null
  };
}