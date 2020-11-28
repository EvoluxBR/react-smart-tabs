import { MutableRefObject, RefObject } from 'react';
import { ITab } from '../components/types';

function getRef(tab: ITab, refList: MutableRefObject<RefObject<HTMLLIElement>[]>) {
  return refList.current.find(item => item.current.id === tab.id);
}

export default getRef;
