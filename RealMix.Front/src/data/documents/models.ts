import { Company } from 'data/companies/models';

export type Document = {
  id: number;
  title: string;
  body: string;
  type: number;
};
export type DocumentFull = {
  id: number;
  title: string;
  body: string;
  type: number;
  companies: Company[];
};

export type PageRequest = {
  page: number;
  pageSize: number;
  orderBy: string;
  sortBy: string;
  title: string;
};

export type DocumentCreatorForm = {
  id: number;
  title: string;
  type: number;
  body: string;
  companyIds: number[];
};
