// tslint:disable-next-line:import-name
import React, { Fragment, useState, useRef } from 'react';
// tslint:disable-next-line:import-name
import Tab from './tab';
import uuid from 'uuid';

export interface TabBarProps { addTab: void; children: any; }

// tslint:disable-next-line:variable-name
const TabBar = (props: TabBarProps) => {
  const [tabId, setTabId] = useState('');
  const tabBar = useRef(null);
  const [addedTabs, insertTabs] = useState([]);
  const pos1 = useRef(0);
  const pos3 = useRef(0);

  function dragMouseDown(e: any) {
    e = e || window.event;
      // transform this in a util later
    const nodeList = tabBar.current.children;
    for (let i = 0; i < nodeList.length; i += 1) {
      if (nodeList[i].id !== e.target.id) {
        nodeList[i].style.pointerEvents = 'none';
      }
    }
    setActive(e.target.id, e);
      // get the mouse cursor position at startup:
    pos3.current =  e.clientX;
    const elemn = e.target;
    elemn.style.left = `${elemn.getBoundingClientRect().left}px`;
    elemn.style.position = 'absolute';
    elemn.style.width = `${elemn.offsetWidth}px`;
    const newElement = document.createElement('p');
    newElement.id = 'new';
    tabBar.current.insertBefore(newElement, elemn);
    tabBar.current.onmouseup = (e: any) => closeDragElement(e, e.target);
      // call a function whenever the cursor moves:
    tabBar.current.onmousemove = (e: any) => elementDrag(e, e.target);
  }

  function elementDrag(e: any, elemn: any) {
    // drags the tab only on y axis,
    // alongside with a "ghost tab" that will preview the next position
    e = e || window.event;
    console.log(e.target.id);
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
        // elemn.style.left ='auto';
    elemn.style.width = '145px';
        // setActive(tabId, null);
    tabBar.current.onmouseup = null;
    tabBar.current.onmousemove = null;
    tabBar.current.onmouseleave = null;
        // transform this in a util later
    const nodeList = tabBar.current.children;
    for (let i = 0; i < nodeList.length; i += 1) {
      if (nodeList[i].id !== e.target.id) {
        nodeList[i].style.pointerEvents = 'all';
      }
    }
  }

  // closes elements based on sibling
  const removeTab = (id: string, e: any) => {
    e.preventDefault();
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
    e.preventDefault();
    e.stopPropagation();
    setTabId(tabId);
  };

  const addTab = () => {
    insertTabs([...addedTabs, <Tab id={`${uuid()}tab`} text=" tab"><h1>5th tab</h1></Tab>]);
  };

  const checkActive = (currentId: string) => {
    const currentTab = props.children.find((child: any) => {
      return child.props.active && child.props.id === currentId;
    });
    if (currentId === tabId) {
      return true;
    }
    if (tabId === '' && currentTab) {
      return true;
    }
    return false;
  };
  return (
    <Fragment>
      <div className="bar__wrapper">
      <div className="tab__bar" ref={tabBar} >

        {[...props.children, ...addedTabs].map((child: any, index: number) => {
          return (
            <p
              id={child.props.id}
              key={child.props.id}
              className={checkActive(child.props.id) ? 'active reposition' : ''}
              // onClick={(e) => setActive(child.props.id, e)}
              onMouseDown={dragMouseDown}
            >
              {child.props.text}
              <span className="close" onClick={e => removeTab(child.props.id, e)}>x</span>
            </p>
          );
        })
        }

      </div>
      <span className="addButton" onClick={addTab}>+</span>
      </div>
      {[...props.children, ...addedTabs].map((child: any) => {
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
      {/* <button onClick={() => props.addTab}>add tab</button> */}
    </Fragment>
  );
};
TabBar.defaultProps = {
  addTab: null,
};
export default TabBar;
