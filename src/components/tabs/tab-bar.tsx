import {
  createRef,
  default as React,
  Fragment,
  ReactChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactSVG from 'react-svg';
import uuid from 'uuid';
import cancelSvg from './cancel.svg';
import Tab, { ITabProps } from './tab';
import { arrayMove } from './utils';

interface ITab {
  tabComponent: ReactElement<ITabProps>;
  id: string;
}

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
  const [tabId, setTabId] = useState<string | number>('');
  const tabBarRef = useRef(null);
  const beforeTabPosition = useRef(0);
  const mousePosition = useRef(0);
  const [draggedTab, setDraggedTab] = useState<ITab | null>(null);
  const [tabList, setTabList] = useState<ITab[]>([]);
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

  function getRef(tab: ITab) {
    return refList.current.find(item => item.current.id === tab.id);
  }
  function exactCurrentPosition(event: React.MouseEvent<HTMLElement>): number {
    beforeTabPosition.current = mousePosition.current - event.clientX;
    mousePosition.current = event.clientX;
    return getRef(draggedTab).current.offsetLeft - beforeTabPosition.current;
  }

  function onDragMouseDown(event: React.MouseEvent<HTMLElement>, tab: ITab): void {
    const element = getRef(tab).current;
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

  // function called when the tab is dragged
  function elementDrag(event: React.MouseEvent<HTMLElement>): void {
    if (!draggedTab) return;
    const currentPosition = exactCurrentPosition(event);
    const currentElement = getRef(draggedTab).current;
    const nextElement = currentElement.nextSibling as HTMLElement;
    const previousElement = currentElement.previousSibling as HTMLElement;
    // all this -1 margins is for covering the additional line after the tab
    const placeholderMargin = currentElement.getBoundingClientRect().width - 1;
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
    const element = getRef(draggedTab).current;
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
  const onRemoveTab = (
    id: string,
    event: React.MouseEvent<HTMLElement>,
    currentTab: ITab,
  ): void => {
    event.stopPropagation();
    const tabIndex = tabList.indexOf(currentTab);
    if (isActive(currentTab) && tabList.length > 1) {
      const afterTab = tabList[tabIndex + 1];
      const beforeTab = tabList[tabIndex - 1];
      if (afterTab) {
        setActive(afterTab);
      } else {
        setActive(beforeTab);
      }
    }

    setTabList(tabList.filter(tab => tab.id !== currentTab.id));
  };

  // Set a tab as the active tab based on it's id
  const setActive = (tab: ITab): void => {
    setTabId(tab.id);
    if (props.onTabClick) {
      props.onTabClick(tab);
    }
  };

  // Function to add a new element on the list of tabs
  const onAddTab = (): void => {
    let tabComponent: ReactElement = props.newTab();
    refList.current.push(createRef<HTMLLIElement>());
    tabComponent = <Tab text={tabComponent.props.text}>{tabComponent.props.children}</Tab>;
    const newTab: ITab = { tabComponent, id: uuid() };
    setTabList([...tabList, newTab]);
    setActive(newTab);
  };

  // Function the check if the tab is the active one
  const isActive = (child: ITab): boolean => {
    const active = childrenAsArray.find((childArray: ReactElement) => {
      return childArray.props.active;
    });
    const currentTab = active && active.key === child.tabComponent.key ? active : null;
    if (child.id === tabId) {
      return true;
    }
    if (tabId === '' && currentTab) {
      return true;
    }
    if (!currentTab && tabId === '' && !active) {
      if (childrenAsArray[0].key === child.tabComponent.key) {
        return true;
      }
    }
    return false;
  };

  return (
    <Fragment>
      <div className={`bar__wrapper ${props.className}`}>
        <ul
          className="tab__bar"
          onMouseMove={elementDrag}
          onMouseLeave={onCloseDragElement}
          ref={tabBarRef}
        >
          {tabList.map((tab: ITab, index) => {
            const { className, classNameActive } = tab.tabComponent.props;
            return (
              <li
                id={tab.id}
                key={tab.id}
                ref={refList.current[index]}
                className={isActive(tab) ? `${classNameActive || 'active'} reposition` : className}
                onMouseDown={event => onDragMouseDown(event, tab)}
                onMouseUp={onCloseDragElement}
              >
                {tab.tabComponent.props.tabHeader || tab.tabComponent.props.text}
                {props.closeable && (
                  <span className="close" onClick={event => onRemoveTab(tab.id, event, tab)}>
                    {props.closeIcon || (
                      <ReactSVG className="close-icon" src={cancelSvg.toString()} />
                    )}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {props.newTab && (
          <span className="addButton" onClick={onAddTab}>
            +
          </span>
        )}
      </div>
      {!props.hiddenPanel &&
        tabList.map((tab: ITab) => {
          return (
            <div
              id={`${tab.id}-panel`}
              key={`${tab.id}-panel`}
              className={`tab-panel ${isActive(tab) ? 'active' : ''}`}
            >
              {tab.tabComponent}
            </div>
          );
        })}
    </Fragment>
  );
};

export default TabBar;
