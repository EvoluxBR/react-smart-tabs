import { default as React, MouseEvent, MutableRefObject, ReactElement, RefObject } from 'react';
import { ITab } from '../types';
import TabBarItem from './tab-bar-item';

export interface ITabBarItemsProps {
  tabList: ITab[];
  refList: MutableRefObject<RefObject<HTMLLIElement>[]>;
  refTabBar: RefObject<HTMLUListElement>;
  isActiveTab: (tab: ITab) => boolean;
  onTabBarMouseMove: (event: MouseEvent<HTMLElement>) => void;
  onCloseDragElement: (event: MouseEvent<HTMLElement>) => void;
  onRemoveTab: (id: string, event: MouseEvent<HTMLElement>, tab: ITab) => void;
  onDragMouseDown: (event: MouseEvent<HTMLElement>, tab: ITab) => void;
  closeable: boolean;
  closeIcon: ReactElement;
}

const TabBarItems = ({
  isActiveTab,
  tabList,
  refList,
  refTabBar,
  onCloseDragElement,
  onTabBarMouseMove,
  onRemoveTab,
  onDragMouseDown,
  closeable,
  closeIcon,
}: ITabBarItemsProps) => (
  <ul
    className="tab__bar"
    onMouseMove={onTabBarMouseMove}
    onMouseLeave={onCloseDragElement}
    ref={refTabBar}
  >
    {tabList.map((tab: ITab, index) => (
      <TabBarItem
        key={tab.id}
        refItem={refList.current[index]}
        tab={tab}
        isActiveTab={isActiveTab}
        onCloseDragElement={onCloseDragElement}
        onRemoveTab={onRemoveTab}
        onDragMouseDown={onDragMouseDown}
        closeable={closeable}
        closeIcon={closeIcon}
      />
    ))}
  </ul>
);

export default TabBarItems;
