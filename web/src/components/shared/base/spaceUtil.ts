type SpaceType = 0 | 1 | 2 | 3 | 4 | 5 | 'auto';

export interface SpaceProps {
  m?: SpaceType;
  mt?: SpaceType;
  mb?: SpaceType;
  ml?: SpaceType;
  mr?: SpaceType;
  mx?: SpaceType;
  my?: SpaceType;
  p?: SpaceType;
  pt?: SpaceType;
  pb?: SpaceType;
  pl?: SpaceType;
  pr?: SpaceType;
  px?: SpaceType;
  py?: SpaceType;
}

export function propsToSpace({ m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py }: SpaceProps) {
  return {
    [`m-${m}`]: m == null,
    [`mt-${mt}`]: mt == null,
    [`mb-${mb}`]: mb == null,
    [`ml-${ml}`]: ml == null,
    [`mr-${mr}`]: mr == null,
    [`mx-${mx}`]: mx == null,
    [`my-${my}`]: my == null,
    [`p-${p}`]: p == null,
    [`pt-${pt}`]: pt == null,
    [`pb-${pb}`]: pb == null,
    [`pl-${pl}`]: pl == null,
    [`pr-${pr}`]: pr == null,
    [`px-${px}`]: px == null,
    [`py-${py}`]: py == null
  };
}