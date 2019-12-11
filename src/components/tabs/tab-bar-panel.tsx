import { default as React, ReactElement } from 'react';
import { ITab } from '../types';

export interface ITabBarPanel {
  tab: ITab;
  isActive: (tab: ITab) => boolean;
}

const TabBarPanel = ({ tab, isActive }: ITabBarPanel) => (
  <div id={`${tab.id}-panel`} className={`tab-panel ${isActive(tab) ? 'active' : ''}`}>
    {tab.tabComponent}
  </div>
);

export default TabBarPanel;
