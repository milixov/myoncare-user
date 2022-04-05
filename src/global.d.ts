import { UseMutationResult, UseQueryResult } from "react-query";

type GeneralQueryResponse<T = any> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

type QueryResult<T = any> = (
  ...args: any
) => UseQueryResult<GeneralQueryResponse<T>, unknown>;

type MutationResult<T = any> = (
  ...args: any
) => UseMutationResult<any, unknown>;
