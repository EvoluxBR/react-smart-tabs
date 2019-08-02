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
}

// tslint:disable-next-line:variable-name
const TabBar = (props: TabBarProps) => {
  const [tabId, setTabId] = useState('');
  const tabBar = useRef(null);
  const [addedTabs, insertTabs] = useState([]);
  const pos1 = useRef(0);
  const [tabList, setTabList] = useState([]);
  const pos3 = useRef(0);

  useEffect(() => {
    setTabList(React.Children.toArray(props.children).map((item: any) => {
      return { text: item.props.text, id: item.props.id };
    }));
  },        []);
  function dragMouseDown(e: any) {
    if (e.target.id) {
      e = e || window.event;
      // transform this in a util later
      const nodeList = tabBar.current.children;
      for (let i = 0; i < nodeList.length; i += 1) {
        if (nodeList[i].id !== e.target.id) {
          nodeList[i].style.pointerEvents = 'none';
        }
      }
      setActive(e.target.id, e);
      if (props.reorderable === true) {
      // get the mouse cursor position at startup:
        pos3.current =  e.clientX;
        const elemn = e.target;
        elemn.style.left = `${elemn.getBoundingClientRect().left}px`;
        elemn.style.position = 'absolute';
        elemn.style.width = `${elemn.offsetWidth}px`;
        const newElement = document.createElement('li');
        newElement.id = 'new';
        tabBar.current.insertBefore(newElement, elemn);
        // call a function whenever the cursor moves:
        tabBar.current.onmousemove = (e: any) => elementDrag(e, e.target);
      }
      tabBar.current.onmouseup = (e: any) => closeDragElement(e, e.target);
    }
  }

  function elementDrag(e: any, elemn: any) {
    // drags the tab only on y axis,
    // alongside with a "ghost tab" that will preview the next position
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
      tabBar.current.insertBefore(sibling, elemn);
      tabBar.current.insertBefore(newElement, sibling.nextSibling);
    } else {
        // if the tab is pushing backwards
      const sibling = elemn.previousSibling &&
                        elemn.previousSibling.previousSibling as HTMLElement;
      if (sibling && sibling.offsetLeft + 90 > exactPos) {
        if (sibling.id !== 'new') {
          sibling.className = 'deanimated';
        }
        tabBar.current.insertBefore(newElement, sibling);
        tabBar.current.insertBefore(elemn, sibling);
      }
    }
    elemn.onmouseleave = (e: any) => closeDragElement(e, elemn);

  }

  function closeDragElement(e: any, elemn: any) {
    e = e || window.event;
    if (document.getElementById('new')) {
      tabBar.current.removeChild(document.getElementById('new'));
    }
    elemn.style.position = 'relative';
    elemn.style.left = 'auto';
    elemn.style.width = '145px';
    tabBar.current.onmouseup = null;
    tabBar.current.onmousemove = null;
    tabBar.current.onmouseleave = null;
    const nodeList = tabBar.current.children;
    for (let i = 0; i < nodeList.length; i += 1) {
      if (nodeList[i].id !== e.target.id) {
        nodeList[i].style.pointerEvents = 'all';
      }
    }
  }

  // closes elements based on sibling
  const removeTab = (id: string, e: any) => {
    e.stopPropagation();
    const elemn = document.getElementById(id);
    if (checkActive(id)) {
      if (elemn.nextElementSibling) {
        setActive((elemn.nextSibling as HTMLElement).id, e);
      } else if (elemn.previousSibling) {
        setActive((elemn.previousSibling as HTMLElement).id, e);
      }

    }
    tabBar.current.removeChild(document.getElementById(id));
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
    insertTabs([...addedTabs, newTab]);
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
  const test = [...React.Children.map(props.children, item => item), ...addedTabs];
  return (
    <Fragment>
      <div className="bar__wrapper">
      <ul className="tab__bar" ref={tabBar} >
        {test.map((child: any) => {
          return (
            <li
              id={child.props.id}
              key={child.props.id}
              className={checkActive(child.props.id) ? 'active reposition' : ''}
              onMouseDown={dragMouseDown}
            >
              {child.props.text}
              {props.closeable &&
                <span className="close" onClick={e => removeTab(child.props.id, e)}>x</span>
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
      {[...React.Children.toArray(props.children), ...addedTabs].map((child: any) => {
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
