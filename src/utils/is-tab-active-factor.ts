import { ReactElement } from 'react';
import { ITab } from '../components/types';

const activeTabIsDefined = (tabId: string | number) => tabId !== '';

const isFirstTab = (childrenAsArray: ReactElement[], tab: ITab) =>
  childrenAsArray[0].key === tab.tabComponent.key;

// Function the check if the tab is the active one
const isTabActiveFactor = (childrenAsArray: ReactElement[], tabId: string | number) => (
  tab: ITab,
): boolean => {
  if (tab.id === tabId) {
    return true;
  }

  const childrenWithActiveProp = childrenAsArray.find((childArray: ReactElement) => {
    return childArray.props.active;
  });
  const currentTabHasActiveProp =
    childrenWithActiveProp && childrenWithActiveProp.key === tab.tabComponent.key;

  if (currentTabHasActiveProp && !activeTabIsDefined(tabId)) {
    return true;
  }

  if (
    !(currentTabHasActiveProp || activeTabIsDefined(tabId) || childrenWithActiveProp) &&
    isFirstTab(childrenAsArray, tab)
  ) {
    return true;
  }
  return false;
};

export default isTabActiveFactor;
