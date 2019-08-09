// tslint:disable-next-line:import-name
import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  ReactElement,
  createRef,
} from 'react';
// tslint:disable-next-line:import-name
import Tab from './tab';
import uuid from 'uuid';
import { any } from 'prop-types';
import { placeholder } from '@babel/types';

export interface TabBarProps {
  newTab?: () => ReactElement;
  reorderable?: boolean; // boolean to activate the reorderable behavior of the tabs
  children: any; // the tab passed as children
  closeable?: boolean; // booblean to activate the closeable behavior on tabs
  // Function to be called when the tab List changes it receives the modified tabList
  onTabsChange?: (modifiedList: any, tabList?: any) => void;
}

// tslint:disable-next-line:variable-name
const TabBar = (props: TabBarProps) => {
  const [tabId, setTabId] = useState('');
  const tabBar = useRef(null);
  const pos1 = useRef(0);
  const pos3 = useRef(0);
  const [dragged, setDrag] = useState(null);
  const draggingFront = useRef(null);
  const draggingBack = useRef(null);
  const [tabList, setTabList] = useState([]);
  const refList = useRef(
    React.Children.toArray(props.children).map(() => {
      return createRef<HTMLLIElement>();
    }),
  );

  useEffect(
    () => {
      setTabList(React.Children.toArray(props.children));
    },
    [],
  );

  useEffect(
    () => {
      if (props.onTabsChange) {
        props.onTabsChange(tabList, props.children);
      }
    },
    [tabList],
  );

  function getRef(tab: ReactElement) {
    console.log('entrou');
    return refList.current.find(item => item.current.id === tab.props.id);
  }
  function exactPos(e: React.MouseEvent<HTMLElement>) {
    pos1.current = pos3.current - e.clientX;
    pos3.current = e.clientX;
    return getRef(dragged).current.offsetLeft - pos1.current;
  }
  function moveFront() {
    const newOne = tabList.find((item) => {
      return item.props.id === 'new';
    });
    let previous = tabList.indexOf(dragged) + 1;
    if (previous === tabList.indexOf(newOne)) {
      previous += 1;
    }
    getRef(tabList[previous]).current.className = 'animated';
    array_move(tabList, tabList.indexOf(newOne), previous);
    array_move(tabList, tabList.indexOf(dragged), previous);
    setTabList([...tabList]);
  }
  function moveBack() {
    const newOne = tabList.find((item) => {
      return item.props.id === 'new';
    });
    const previous = tabList.indexOf(dragged) - 2;
    getRef(tabList[previous]).current.className = 'deanimated';
    array_move(tabList, tabList.indexOf(newOne), previous);
    array_move(tabList, tabList.indexOf(dragged), previous);
    setTabList([...tabList]);
  }

  function array_move(arr: any[], oldIndex: number, newIndex: number) {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  function dragMouseDown(e: React.MouseEvent<HTMLElement>, tab: ReactElement) {
    // console.log('first');
    const elemn = getRef(tab).current;
    // console.log({ tab })
    setDrag(tab);
    // console.log({ tabBar })
    if (elemn.id) {
      setActive(tab.props.id, e);
      if (props.reorderable === true) {
      // get the mouse cursor position at startup:
        pos3.current =  e.clientX;
        elemn.style.left = `${elemn.getBoundingClientRect().left}px`;
        elemn.style.position = 'absolute';
        elemn.style.width = `${elemn.offsetWidth}px`;
        const nextElement = elemn.nextSibling as HTMLElement;
        const previousElement = elemn.previousSibling as HTMLElement;
        if (nextElement && previousElement) {
          nextElement.style.marginLeft = `${elemn.getBoundingClientRect().width - 1}px`;
        } else if (previousElement) {
          previousElement.style.marginRight = `${elemn.getBoundingClientRect().width - 1}px`;
        } else {
          nextElement.style.marginLeft = `${elemn.getBoundingClientRect().width - 1}px`;
        }
        // refList.current.push(createRef<HTMLLIElement>());
        // const reordered = [newElement, ...tabList];
        // array_move(reordered, 0, reordered.indexOf(tab) - 1);
        // setTabList([...reordered]);
      }
    }
  }

  function elementDrag(e: React.MouseEvent<HTMLElement>) {
    if (dragged) {
      const position = exactPos(e);
      const currentElement = getRef(dragged).current;
      const nextElement = currentElement.nextSibling as HTMLElement;
      const previousElement = currentElement.previousSibling as HTMLElement;
      currentElement.style.left = `${position}px`;
      if (nextElement && nextElement.getBoundingClientRect().left - 70 < position) {
        if (previousElement) {
          previousElement.style.marginRight = '0px';
          previousElement.style.marginLeft = '0px';
        }
        nextElement.style.marginLeft = '0px';
        nextElement.style.marginRight = `${currentElement.getBoundingClientRect().width - 1}px`;
        nextElement.className = 'animated';
        array_move(tabList, tabList.indexOf(dragged), tabList.indexOf(dragged) + 1);
        setTabList([...tabList]);
      } else if (previousElement && previousElement.getBoundingClientRect().right - 80 > position) {
        if (nextElement) {
          nextElement.style.marginRight = '0px';
          nextElement.style.marginLeft = '0px';
        }
        previousElement.style.marginRight = '0px';
        previousElement.style.marginLeft = `${currentElement.getBoundingClientRect().width - 1}px`;
        previousElement.className = 'deanimated';
        array_move(tabList, tabList.indexOf(dragged), tabList.indexOf(dragged) - 1);
        setTabList([...tabList]);
      }
    }
  }

  function closeDragElement(e: React.MouseEvent<HTMLElement>) {
    if (dragged) {
      const elemn = getRef(dragged).current;
      const nextElement = elemn.nextSibling as HTMLElement;
      const previousElement = elemn.previousSibling as HTMLElement;
      if (nextElement) {
        nextElement.style.marginLeft = `${0}px`;
        nextElement.style.marginRight = `${0}px`;
      }
      if (previousElement) {
        previousElement.style.marginLeft = `${0}px`;
        previousElement.style.marginRight = `${0}px`;
      }
      const element = tabList.find(item => item.props.id === 'new');
      const index = tabList.indexOf(element);
      if (element) {
        tabList.splice(index, 1);
      }
      setTabList([...tabList]);
      elemn.style.position = 'relative';
      elemn.style.left = 'auto';
      elemn.style.width = '145px';
      tabBar.current.onmouseup = null;
      draggingBack.current = false;
      draggingFront.current = false;
      setDrag(null);
    }
  }

  // closes elements based on List Order
  const removeTab = (id: string, e: any, tab: any) => {
    e.stopPropagation();
    if (checkActive(tab.props.id)) {
      if (tabList.length > 1) {
        const backTab = tabList[tabList.indexOf(tab) + 1];
        const frontTab = tabList[tabList.indexOf(tab) - 1];
        if (backTab) {
          setActive(backTab.props.id, e);
        } else {
          setActive(frontTab.props.id, e);
        }
      }
    }
    // finish this up
    const removed = tabList;
    removed.splice(tabList.indexOf(tab), 1);
    setTabList([...removed]);
  };

  const setActive = (tabId: string, e: any) => {
    setTabId(tabId);
  };

  const addTab = () => {
    let newTab: ReactElement = props.newTab();
    refList.current.push(createRef<HTMLLIElement>());
    if (!newTab.props.id) {
      const idKey = `${uuid()}tab`;
      newTab = <Tab
                text={newTab.props.text}
                id={idKey}
               >
                {newTab.props.children}
               </Tab>;
    }
    setTabList([...tabList, newTab]);
    setActive(newTab.props.id, null);
  };

  const checkActive = (currentId: string) => {
    const active = React.Children.toArray(props.children).find((child: any) => {
      return child.props.active;
    });
    const currentTab = (active && active.props.id === currentId) ? active : null;
    if (currentId === tabId) {
      return true;
    }
    if (tabId === '' && currentTab) {
      return true;
    }
    if (!currentTab && tabId === '') {
      if (!props.children.length) {
        return true;
      }
      if (props.children[0].props.id === currentId) {
        return true;
      }
    }
    return false;
  };
  return (
    <Fragment>
      <div className="bar__wrapper">
      <ul className="tab__bar"
        onMouseMove={elementDrag}
        onMouseLeave={closeDragElement}
        ref={tabBar}
      >
        {tabList.map((child: any, i) => {
          if (child.props.id !== 'new') {
            return (
              <li
                id={child.props.id}
                key={child.props.id}
                ref={refList.current[i]}
                className={checkActive(child.props.id) ? 'active reposition' : ''}
                onMouseDown={e => dragMouseDown(e, child)}
                onMouseUp={closeDragElement}
              >
                {child.props.text}
                {props.closeable &&
                  <span
                    className="close"
                    onClick={e => removeTab(child.props.id, e, child)}>x</span>
                }
              </li>
            );
          }
          return (
              <li
                id={child.props.id}
                key={child.props.id}
                ref={refList.current[i]}
              />
          );
        })
        }

      </ul>
      {props.newTab &&
        <span className="addButton" onClick={addTab}>+</span>
      }
      </div>
  {tabList.map((child: any) => {
    return (
          <div
            id={`${child.props.id}-panel`}
            key={`${child.props.id}-panel`}
            className={`tab-panel ${checkActive(child.props.id) ? 'active' : '' }`}
          >
            {child}
          </div>
    );
  })
  }
    </Fragment >
  );
};
export default TabBar;
