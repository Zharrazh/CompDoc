export type PageRequest = {
  page: number;
  pageSize: number;
  orderBy: string;
  sortBy: string;
  name: string;
};

export type SaveRequest = {
  name: string;
  legalName: string;
};

export type Company = {
  id: number;
  name: string;
  legalName: string;
};
