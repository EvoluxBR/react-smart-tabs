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
import Tab from './tab';
import { arrayMove } from './utils';

interface ITab {
  tabComponent: ReactElement;
  id: string;
}

export interface ITabBarProps {
  newTab?: () => ReactElement;
  reorderable?: boolean; // boolean to activate the reorderable behavior of the tabs
  children: any; // the tab passed as children
  closeable?: boolean; // boolean to activate the closeable behavior on tabs
  onTabClick?: (tab: ReactElement) => void;
  // Function to be called when the tab List changes it receives the modified tabList
  onTabsChange?: (modifiedList: ITab[], tabList?: ReactChildren) => void;
  closeIcon?: ReactElement;
  className?: string;
  hiddenPanel?: boolean;
}

const TabBar = (props: ITabBarProps) => {
  const [tabId, setTabId] = useState('');
  const tabBar = useRef(null);
  const pos1 = useRef(0);
  const pos3 = useRef(0);
  const [dragged, setDrag] = useState(null);
  const [tabList, setTabList] = useState([]);
  const refList = useRef(
    React.Children.toArray(props.children).map(() => {
      return createRef<HTMLLIElement>();
    }),
  );

  // Add the tabs that comes from props to the tabList Array
  useEffect(() => {
    // setTabList(React.Children.toArray(props.children));
    const tabs = React.Children.toArray(props.children).map(tab => {
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

  function getRef(tab: any) {
    return refList.current.find(item => item.current.id === tab.id);
  }
  function exactPos(e: React.MouseEvent<HTMLElement>) {
    pos1.current = pos3.current - e.clientX;
    pos3.current = e.clientX;
    return getRef(dragged).current.offsetLeft - pos1.current;
  }

  function dragMouseDown(e: React.MouseEvent<HTMLElement>, tab: any) {
    const element = getRef(tab).current;
    setActive(tab);
    if (!props.reorderable) return;
    setDrag(tab);
    // get the mouse cursor position at startup:
    pos3.current = e.clientX;
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
  function elementDrag(e: React.MouseEvent<HTMLElement>) {
    if (!dragged) return;
    const position = exactPos(e);
    const currentElement = getRef(dragged).current;
    const nextElement = currentElement.nextSibling as HTMLElement;
    const previousElement = currentElement.previousSibling as HTMLElement;
    // all this -1 margins is for covering the additional line after the tab
    const placeholderMargin = currentElement.getBoundingClientRect().width - 1;
    currentElement.style.left = `${position}px`;
    if (nextElement && nextElement.getBoundingClientRect().left - 70 < position) {
      if (previousElement) {
        previousElement.style.marginRight = '-1px';
        previousElement.style.marginLeft = '0';
      }
      nextElement.style.marginLeft = '0px';
      nextElement.style.marginRight = `${placeholderMargin - 1}px`;
      nextElement.className = 'animated';
      arrayMove(tabList, tabList.indexOf(dragged), tabList.indexOf(dragged) + 1);
      setTabList([...tabList]);
    }
    if (previousElement && previousElement.getBoundingClientRect().right - 80 > position) {
      if (nextElement) {
        nextElement.style.marginRight = '-1px';
        nextElement.style.marginLeft = '0';
      }
      previousElement.style.marginRight = '-1px';
      previousElement.style.marginLeft = `${placeholderMargin}px`;
      previousElement.className = 'deanimated';
      arrayMove(tabList, tabList.indexOf(dragged), tabList.indexOf(dragged) - 1);
      setTabList([...tabList]);
    }
  }

  // Function called when the dragged element is released
  function closeDragElement(e: React.MouseEvent<HTMLElement>) {
    if (!dragged) return;
    const element = getRef(dragged).current;
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
    tabBar.current.onmouseup = null;
    setDrag(null);
  }

  // Closes elements based on List Order
  const removeTab = (id: string, e: any, tab: any) => {
    e.stopPropagation();
    if (checkActive(tab) && tabList.length > 1) {
      const backTab = tabList[tabList.indexOf(tab) + 1];
      const frontTab = tabList[tabList.indexOf(tab) - 1];
      if (backTab) {
        setActive(backTab);
      } else {
        setActive(frontTab);
      }
    }
    const removed = tabList;
    removed.splice(tabList.indexOf(tab), 1);
    setTabList([...removed]);
  };

  // Set a tab as the active tab based on it's id
  const setActive = (tab: any) => {
    setTabId(tab.id);
    if (props.onTabClick) {
      props.onTabClick(tab);
    }
  };

  // Function to add a new element on the list of tabs
  const addTab = () => {
    let tabComponent: ReactElement = props.newTab();
    refList.current.push(createRef<HTMLLIElement>());
    tabComponent = <Tab text={tabComponent.props.text}>{tabComponent.props.children}</Tab>;
    const newTab = { tabComponent, id: uuid() };
    setTabList([...tabList, newTab]);
    setActive(newTab);
  };

  // Function the check if the tab is the active one
  const checkActive = (child: any) => {
    const active = React.Children.toArray(props.children).find((childArray: any) => {
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
      if (React.Children.toArray(props.children)[0].key === child.tabComponent.key) {
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
          onMouseLeave={closeDragElement}
          ref={tabBar}
        >
          {tabList.map((child: any, i) => {
            const className = child.tabComponent.props.className;
            const activeClassName = child.tabComponent.props.classNameActive;
            return (
              <li
                id={child.id}
                key={child.id}
                ref={refList.current[i]}
                className={
                  checkActive(child) ? `${activeClassName || 'active'} reposition` : className
                }
                onMouseDown={event => dragMouseDown(event, child)}
                onMouseUp={closeDragElement}
              >
                {child.tabComponent.props.tabHeader || child.tabComponent.props.text}
                {props.closeable && (
                  <span className="close" onClick={event => removeTab(child.id, event, child)}>
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
          <span className="addButton" onClick={addTab}>
            +
          </span>
        )}
      </div>
      {!props.hiddenPanel &&
        tabList.map((child: any) => {
          return (
            <div
              id={`${child.id}-panel`}
              key={`${child.id}-panel`}
              className={`tab-panel ${checkActive(child) ? 'active' : ''}`}
            >
              {child.tabComponent}
            </div>
          );
        })}
    </Fragment>
  );
};

export default TabBar;
