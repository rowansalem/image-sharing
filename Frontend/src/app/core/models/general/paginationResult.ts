import { AnyARecord } from "dns";

export class PaginationResult<T> {
  data: T;
  count: number;
  page: number;
  pageSize: number;
}
