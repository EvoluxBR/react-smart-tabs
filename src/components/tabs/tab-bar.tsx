import {
  createRef,
  default as React,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import uuid from 'uuid';
import { ITab } from '../types';
import Tab from './tab';
import TabBarAddButton from './tab-bar-add-button';
import TabBarItems from './tab-bar-items';
import TabBarPanels from './tab-bar-panels';
import { arrayMove } from './utils';
import getRef from '../../utils/get-ref';

export interface ITabBarProps {
  newTab?: () => ReactElement;
  reorderable?: boolean; // boolean to activate the reorderable behavior of the tabs
  children: ReactElement[] | ReactElement; // the tab passed as children
  closeable?: boolean; // boolean to activate the closeable behavior on tabs
  onTabClick?: (tab: ITab) => void;
  // Function to be called when the tab List changes it receives the modified tabList
  onTabsChange?: (modifiedList: ITab[], tabList?: ReactElement[] | ReactElement) => void;
  closeIcon?: ReactElement;
  className?: string;
  hiddenPanel?: boolean;
}

const TabBar = (props: ITabBarProps) => {
  const [draggedTab, setDraggedTab] = useState<ITab | null>(null);
  const [tabId, setTabId] = useState<string | number>('');
  const [tabList, setTabList] = useState<ITab[]>([]);
  const mousePosition = useRef(0);
  const tabBarRef = useRef(null);
  const childrenAsArray = React.Children.toArray(props.children);

  const refList = useRef(
    childrenAsArray.map(() => {
      return createRef<HTMLLIElement>();
    }),
  );

  // Add the tabs that comes from props to the tabList Array
  useEffect(() => {
    const tabs = childrenAsArray.map((tab: ReactElement) => {
      return {
        id: uuid(),
        tabComponent: tab,
      };
    });
    setTabList(tabs);
  }, []);

  // if the onTabsChange prop is provided, send the modified tablist array...
  // as a parameter for the callback function
  useEffect(() => {
    if (props.onTabsChange) {
      props.onTabsChange(tabList, props.children);
    }
  }, [tabList]);

  /**
   * This function gets the distance from tab dragged to TabBar
   *
   * @param {React.MouseEvent<HTMLElement>} event
   * @returns {number}
   */
  function getHorizontalLocation(currentElement: HTMLLIElement, clientX: number): number {
    const offsetBetweenMousePositionAndElement = mousePosition.current - clientX;
    return currentElement.offsetLeft - offsetBetweenMousePositionAndElement;
  }

  function onDragMouseDown(event: React.MouseEvent<HTMLElement>, tab: ITab): void {
    const element = getRef(tab, refList).current;
    setActive(tab);
    if (!props.reorderable) return;
    setDraggedTab(tab);
    // get the mouse cursor position at startup:
    mousePosition.current = event.clientX;
    element.style.left = `${element.getBoundingClientRect().left}px`;
    element.style.position = 'absolute';
    element.style.width = `${element.offsetWidth}px`;
    const nextElement = element.nextSibling as HTMLElement;
    const previousElement = element.previousSibling as HTMLElement;
    if (nextElement && previousElement) {
      nextElement.style.marginLeft = `${element.getBoundingClientRect().width - 1}px`;
    } else if (previousElement) {
      previousElement.style.marginRight = `${element.getBoundingClientRect().width - 2}px`;
    } else {
      nextElement.style.marginLeft = `${element.getBoundingClientRect().width - 1}px`;
    }
  }

  function onTabBarMouseMove(event: React.MouseEvent<HTMLElement>): void {
    if (!draggedTab) return;
    // TODO: Create a function with this lines bellow
    const currentElement = getRef(draggedTab, refList).current;
    const currentPosition = getHorizontalLocation(currentElement, event.clientX);
    const nextElement = currentElement.nextSibling as HTMLElement;
    const previousElement = currentElement.previousSibling as HTMLElement;
    // all this -1 margins is for covering the additional line after the tab
    const placeholderMargin = currentElement.getBoundingClientRect().width - 1;
    mousePosition.current = event.clientX;
    currentElement.style.left = `${currentPosition}px`;
    if (nextElement && nextElement.getBoundingClientRect().left - 70 < currentPosition) {
      if (previousElement) {
        previousElement.style.marginRight = '-1px';
        previousElement.style.marginLeft = '0';
      }
      nextElement.style.marginLeft = '0px';
      nextElement.style.marginRight = `${placeholderMargin - 1}px`;
      nextElement.className = 'animated';
      arrayMove(tabList, tabList.indexOf(draggedTab), tabList.indexOf(draggedTab) + 1);
      setTabList([...tabList]);
    }
    if (previousElement && previousElement.getBoundingClientRect().right - 80 > currentPosition) {
      if (nextElement) {
        nextElement.style.marginRight = '-1px';
        nextElement.style.marginLeft = '0';
      }
      previousElement.style.marginRight = '-1px';
      previousElement.style.marginLeft = `${placeholderMargin}px`;
      previousElement.className = 'deanimated';
      arrayMove(tabList, tabList.indexOf(draggedTab), tabList.indexOf(draggedTab) - 1);
      setTabList([...tabList]);
    }
  }

  // Function called when the dragged element is released
  function onCloseDragElement(event: React.MouseEvent<HTMLElement>): void {
    if (!draggedTab) return;
    const element = getRef(draggedTab, refList).current;
    const nextElement = element.nextSibling as HTMLElement;
    const previousElement = element.previousSibling as HTMLElement;
    if (nextElement) {
      nextElement.style.marginLeft = '0';
      nextElement.style.marginRight = '-1px';
    }
    if (previousElement) {
      previousElement.style.marginLeft = '0';
      previousElement.style.marginRight = '-1px';
    }
    element.style.position = 'relative';
    element.style.left = 'auto';
    element.style.width = '145px';
    tabBarRef.current.onmouseup = null;
    setDraggedTab(null);
  }

  // Closes elements based on List Order
  function onRemoveTab(id: string, event: React.MouseEvent<HTMLElement>, currentTab: ITab): void {
    event.stopPropagation();
    const tabIndex = tabList.indexOf(currentTab);
    if (isActiveTab(currentTab) && tabList.length > 1) {
      const afterTab = tabList[tabIndex + 1];
      const beforeTab = tabList[tabIndex - 1];
      if (afterTab) {
        setActive(afterTab);
      } else {
        setActive(beforeTab);
      }
    }

    setTabList(tabList.filter(tab => tab.id !== currentTab.id));
  }

  // Set a tab as the active tab based on it's id
  function setActive(tab: ITab): void {
    setTabId(tab.id);
    if (props.onTabClick) {
      props.onTabClick(tab);
    }
  }

  // Function to add a new element on the list of tabs
  function onAddTab(): void {
    let tabComponent: ReactElement = props.newTab();
    refList.current.push(createRef<HTMLLIElement>());
    tabComponent = <Tab text={tabComponent.props.text}>{tabComponent.props.children}</Tab>;
    const newTab: ITab = { tabComponent, id: uuid() };
    setTabList([...tabList, newTab]);
    setActive(newTab);
  }

  // Function the check if the tab is the active one
  function isActiveTab(tab: ITab): boolean {
    if (tab.id === tabId) {
      return true;
    }

    const activeTab = childrenAsArray.find((childArray: ReactElement) => {
      return childArray.props.active;
    });
    const isCurrentTab = activeTab && activeTab.key === tab.tabComponent.key;

    if (tabId === '' && isCurrentTab) {
      return true;
    }

    if (!isCurrentTab && tabId === '' && !activeTab) {
      if (childrenAsArray[0].key === tab.tabComponent.key) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className={`bar__wrapper ${props.className}`}>
        <TabBarItems
          tabList={tabList}
          refList={refList}
          refTabBar={tabBarRef}
          isActiveTab={isActiveTab}
          onTabBarMouseMove={onTabBarMouseMove}
          onCloseDragElement={onCloseDragElement}
          onRemoveTab={onRemoveTab}
          onDragMouseDown={onDragMouseDown}
          closeable={props.closeable}
          closeIcon={props.closeIcon}
        />
        <TabBarAddButton newTab={props.newTab} onAddTab={onAddTab} />
      </div>
      <TabBarPanels hiddenPanel={props.hiddenPanel} tabList={tabList} isActiveTab={isActiveTab} />
    </>
  );
};

export default TabBar;
