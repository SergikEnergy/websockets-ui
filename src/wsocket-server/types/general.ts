import { RequestResponseTypes } from '../enums/request-response-types';

export type StrOrNum = string | number;

export type ServerCommonMessages<T> = {
  type: RequestResponseTypes;
  data: T;
  id: number;
};
