import { type } from 'os';

import { Document } from 'data/documents/models';

export type PageRequest = {
  page: number;
  pageSize: number;
  orderBy: string;
  sortBy: string;
  name: string;
};

export type SaveCompanyForm = {
  id: number;
  name: string;
  legalName: string;
  documentIds: number[];
};

export type Company = {
  id: number;
  name: string;
  legalName: string;
};

export type CompanyFull = {
  id: number;
  name: string;
  legalName: string;
  documents: Document[];
};
