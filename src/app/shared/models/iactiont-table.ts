export interface IActionTable {
  name: string;
  label: string;
  icon: string;
  iconClasses: string;
  // eslint-disable-next-line
  callback: (id?: any) => any;
}
