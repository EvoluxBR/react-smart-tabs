import { default as React, ReactElement } from 'react';
import { ITab } from '../types';

export interface ITabBarPanel {
  tab: ITab;
  isActiveTab: (tab: ITab) => boolean;
}

const TabBarPanel = ({ tab, isActiveTab }: ITabBarPanel) => (
  <div id={`${tab.id}-panel`} className={`tab-panel ${isActiveTab(tab) ? 'active' : ''}`}>
    {tab.tabComponent}
  </div>
);

export default TabBarPanel;
