import { type } from 'os';

/**
 * This module handles all the type decleration for Search Component
 */
export interface ISearchProps {
  props?: any;
}

export interface ISearchFetchDataCallbackProps {
  input?: any;
  sort?: any;
  order?: any;
  perPage?: any;
  pg?: any;
}

export type ISearchDataStateTypes = {
  totalCount?: any;
  items?: any;
  languages?: any;
} | null;

export type IFilteredResultsStateTypes = {
  totalCount?: any;
  items?: any;
} | null;
