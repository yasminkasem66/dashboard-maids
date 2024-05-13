export interface ITableHeaders {
  name: string;
  value: string;
  classesStyle?: string;
  // eslint-disable-next-line
  renderedValue?: (value?: any) => any;
}
