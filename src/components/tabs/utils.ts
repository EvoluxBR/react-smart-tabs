import { ITab } from '../types';

export function arrayMove(tabList: ITab[], oldIndex: number, newIndex: number) {
  tabList.splice(newIndex, 0, tabList.splice(oldIndex, 1)[0]);
  return tabList;
}
