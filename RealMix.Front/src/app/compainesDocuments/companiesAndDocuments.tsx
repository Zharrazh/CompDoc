import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import { Container, Line, Block } from 'shared';

import { Companies } from './companies';
import { CompanyCreatePage } from './companyCreatePage/companyCreatePage';
import { CompanyEditPage } from './companyCreatePage/companyEditPage';
import { Documents } from './documents';
import { DocumentEditPage } from './documentEditPage/documentEditPage';
import { DocumentCreatePage } from './documentCreatePage/documentCreatePage';
import './companiesAndDocuments.scss';

export const CompaniesAndDocuments = () => {
  return (
    <Block>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/companies" component={Companies} />
          <Route path="/companies/create" component={CompanyCreatePage} />
          <Route path="/companies/edit/:id" component={CompanyEditPage} />

          <Route exact path="/documents" component={Documents} />
          <Route path="/documents/edit/:id" component={DocumentEditPage} />
          <Route path="/documents/create" component={DocumentCreatePage} />
        </Switch>
      </Container>
    </Block>
  );
};

export const Header = () => {
  return (
    <Line justifyContent="around" p="2" className="companiesAndDocuments__header">
      <NavLink to="/companies">Компании</NavLink>
      <NavLink to="/documents">Документы</NavLink>
    </Line>
  );
};
