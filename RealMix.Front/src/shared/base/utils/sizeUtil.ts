export interface SizeProps {
  w?: '25' | '50' | '75' | '100' | 'auto';
  h?: '25' | '50' | '75' | '100' | 'auto';
  vw?: boolean;
  vh?: boolean;
}

export function propsToSize(props: SizeProps) {
  const { w, h, vw, vh } = props;

  delete props.w;
  delete props.h;
  delete props.vw;
  delete props.vh;

  return {
    [`w-${w}`]: w != null,
    [`h-${h}`]: h != null,
    [`vw-100`]: vw,
    [`vh-100`]: vh,
  };
}