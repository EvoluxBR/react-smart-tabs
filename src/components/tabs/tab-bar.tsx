import React, { Fragment, Children, useState, useEffect, useRef } from "react";
import { element } from "prop-types";
export interface TabBarProps { addTab: void, children: any };

const TabBar = (props: TabBarProps) => {
  const [tabId, setTabId] = useState('');
  const tabBar = useRef(null);
  const [movable, setMovable] = useState('');

  useEffect(() => {
    dragElement(document.getElementById("1"));
  }, []);
  const setActive = (tabId: string) => {
    console.log("thi is ");
    setTabId(tabId);
  }
  const checkActive = (currentId: string) => {
    const currentTab = props.children.find((child: any) => {
      return child.props.active && child.props.id === currentId;
    });
    if (currentId === tabId){
      return true
    }
    if (tabId == '' && currentTab) {
      return true
    }
    return false
  }

  function dragElement(elmnt: any) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("1")) {

      /* if present, the header is where you move the DIV from:*/
      document.getElementById("1").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e: any) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      const elemn = document.getElementById("1");
      elemn.style.position = "absolute";
      const sibling = elemn.nextSibling as HTMLElement;
      const newElement = document.createElement("p");
      newElement.textContent = "";
      newElement.id = "new";
      tabBar.current.insertBefore(newElement, elemn);
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      
    }
  
    function elementDrag(e: any) {
      const elemn = document.getElementById("1");
      const width = parseInt(elemn.style.width);
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      const exactPos = elmnt.offsetLeft - pos1;
      elmnt.style.left = exactPos + "px";
      const sibling = elemn.nextSibling as HTMLElement;
      // const previousSibling= elemn.previousSibling as HTMLElement;
      const newElement = document.getElementById('new');
      if (sibling && (sibling.offsetLeft - 30) < exactPos) {
        const sibling = elemn.nextSibling as HTMLElement;
          // sibling.style.order = (order - 1).toString();
          if (sibling.id !== 'new'){
            sibling.className = 'animated';
          }
        // elemn.style.order = order.toString();
        
        tabBar.current.insertBefore(sibling, elemn);
        tabBar.current.insertBefore(newElement, sibling.nextSibling);
      }
      else {
          console.log('o elemento', elemn);
          const sibling = elemn.previousSibling.previousSibling as HTMLElement;
          console.log(sibling.previousSibling);
          if (sibling.offsetLeft + 60 > exactPos) {
            // sibling.style.order = (order + 1).toString();
            if (sibling.id !== 'new'){
              sibling.className = 'deanimated';
            }
          tabBar.current.insertBefore(newElement, sibling);
          tabBar.current.insertBefore(elemn, sibling);
          // elemn.style.order = order.toString();
         }
        }
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.getElementById("1").style.position = "initial";
      document.getElementById("1").style.left = document.getElementById("new").getBoundingClientRect().left + 'px';
      tabBar.current.removeChild(document.getElementById("new"));
      setActive("1");
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  return (
    <Fragment>
      <div className='tab__bar' ref={tabBar} >
        {props.children.map((child: any, index: number) => {
          return (
            <p 
              id={child.props.id}
              className={checkActive(child.props.id) ? 'active' : ''}
              onClick={() => setActive(child.props.id)}
            >
                {child.props.text} <span className="close">x</span>
            </p>
          )
        })
        }
      </div>
      {props.children.map((child: any) => {
        return (
          <div id={`${child.props.id}-panel`} className={`tab-panel ${checkActive(child.props.id) ? "active" : '' }`}>
            {child}
          </div>
        )
      })
      }
      {/* <button onClick={() => props.addTab}>add tab</button> */}
    </Fragment>
  )
};
TabBar.defaultProps = {
  addTab: null,
};
export default TabBar;

