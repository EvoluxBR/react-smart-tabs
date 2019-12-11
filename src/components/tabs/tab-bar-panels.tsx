import { default as React, ReactElement, Fragment } from 'react';
import { ITab } from '../types';
import TabBarPanel from './tab-bar-panel';

export interface ITabBarPanelsProps {
  hiddenPanel: boolean;
  isActive: (tab: ITab) => boolean;
  tabList: ITab[];
}

const TabBarPanels = ({ hiddenPanel, isActive, tabList }: ITabBarPanelsProps) => {
  if (hiddenPanel && !tabList.length) return null;

  return (
    <>
      {tabList.map((tab: ITab) => (
        <TabBarPanel key={tab.id} tab={tab} isActive={isActive} />
      ))}
    </>
  );
};

export default TabBarPanels;
