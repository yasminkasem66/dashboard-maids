export interface IResponse<T> {
  status: string;
  code: number;
  data: T;
  message: string;
}
