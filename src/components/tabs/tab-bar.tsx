// tslint:disable-next-line:import-name
import React, { Fragment, useState, useRef, useEffect, ReactElement } from 'react';
// tslint:disable-next-line:import-name
import Tab from './tab';
import uuid from 'uuid';

export interface TabBarProps {
  newTab?: () => ReactElement;
  reorderable?: boolean; // boolean to activate the reorderable behavior of the tabs
  children: any; // the tab passed as children
  closeable?: boolean; // booblean to activate the closeable behavior on tabs
  onTabsChange?: (tabList: any) => void; // Function to be called when the tab List changes
}

// tslint:disable-next-line:variable-name
const TabBar = (props: TabBarProps) => {
  const [tabId, setTabId] = useState('');
  const tabBar = useRef(null);
  const pos1 = useRef(0);
  const [tabList, setTabList] = useState([]);
  const pos3 = useRef(0);

  useEffect(
    () => {
      console.log('render');
      setTabList(React.Children.toArray(props.children));
    },
    [],
  );

  useEffect(
    () => {
      if (props.onTabsChange) {
        props.onTabsChange(tabList);
      }
    },
    [tabList],
  );

  function array_move(arr: any, oldIndex: number, newIndex: number) {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

  function dragMouseDown(e: React.MouseEvent<HTMLElement>, tab: any) {
    const elemn = e.target as HTMLElement;
    if (elemn.id) {
      setActive(tab.props.id, e);
      if (props.reorderable === true) {
      // get the mouse cursor position at startup:
        pos3.current =  e.clientX;
        elemn.style.left = `${elemn.getBoundingClientRect().left}px`;
        elemn.style.position = 'absolute';
        elemn.style.width = `${elemn.offsetWidth}px`;
        const newElement = document.createElement('li');
        newElement.id = 'new';
        tabBar.current.insertBefore(newElement, elemn);
        // call a function whenever the cursor moves:
        tabBar.current.onmousemove = (e: any) => elementDrag(e, e.target, tab);
      }
      // if the cursor is released
      tabBar.current.onmouseup = (e: any) => closeDragElement(e, e.target, tab);
    }
  }

  function elementDrag(e: any, elemn: any, tab: any) {
    // drags the tab only on y axis,
    // alongside with a "ghost tab" that will preview the next position
    // to do: use more virtual dom here
    e = e || window.event;
    // calculate the new cursor position:
    pos1.current = pos3.current - e.clientX;
    pos3.current = e.clientX;
    // set the element's new position:
    const exactPos = elemn.offsetLeft - pos1.current;
    elemn.style.left = `${exactPos}px`;
    const sibling = elemn.nextSibling as HTMLElement;
    const newElement = document.getElementById('new');
    // if the tab is pushing foward
    if (sibling && (sibling.offsetLeft - 80) < exactPos) {
      const sibling = elemn.nextSibling as HTMLElement;
      if (sibling.id !== 'new') {
        sibling.className = 'animated';
      }
      let reordered = tabList;
      const tabIndex = reordered.indexOf(tab);
      const nextIndex = reordered.indexOf(tab) + 1;
      reordered = array_move(reordered, tabIndex, nextIndex);
      console.log(reordered);
      setTabList([...reordered]);
      tabBar.current.insertBefore(newElement, sibling.nextSibling);
    } else {
    // if the tab is pushing backwards
      const sibling = elemn.previousSibling &&
                        elemn.previousSibling.previousSibling as HTMLElement;
      if (sibling && sibling.offsetLeft + 80 > exactPos) {
        if (sibling.id !== 'new') {
          sibling.className = 'deanimated';
        }
        let reordered = tabList;
        const tabIndex = reordered.indexOf(tab);
        const nextIndex = reordered.indexOf(tab) - 1;
        reordered = array_move(reordered, tabIndex, nextIndex);
        setTabList([...reordered]);
        tabBar.current.insertBefore(newElement, sibling);
      }
    }
    elemn.onmouseleave = (e: any) => closeDragElement(e, elemn, tab);
  }

  function closeDragElement(e: any, elemn: any, tab: any) {
    e = e || window.event;
    if (document.getElementById('new')) {
      tabBar.current.removeChild(document.getElementById('new'));
    }
    elemn.style.position = 'relative';
    elemn.style.left = 'auto';
    elemn.style.width = '145px';
    // cancel all previous events
    tabBar.current.onmouseup = null;
    tabBar.current.onmousemove = null;
    tabBar.current.onmouseleave = null;
  }

  // closes elements based on sibling
  const removeTab = (id: string, e: any, tab: any) => {
    e.stopPropagation();
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
    if (!newTab.props.id) {
      const idKey = `${uuid()}tab`;
      newTab = <Tab text={newTab.props.text} id={idKey}>
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
      <ul className="tab__bar" ref={tabBar} >
        {tabList.map((child: any) => {
          return (
            <li
              id={child.props.id}
              key={child.props.id}
              className={checkActive(child.props.id) ? 'active reposition' : ''}
              onMouseDown={e => dragMouseDown(e, child)}
            >
              {child.props.text}
              {props.closeable &&
                <span className="close" onClick={e => removeTab(child.props.id, e, child)}>x</span>
              }
            </li>
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
    </Fragment>
  );
};
export default TabBar;
