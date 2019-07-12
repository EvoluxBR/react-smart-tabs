import React, { Fragment, Children, useState, useEffect } from "react";
export interface TabBarProps { addTab: void, children: any };

const TabBar = (props: TabBarProps) => {
  const [tabId, setTabId] = useState('');
  const setActive = (tabId: string) => {
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
  return (
    <Fragment>
      <div className='tab__bar'>
        {props.children.map((child: any) => {
          return <p onClick={() => setActive(child.props.id)}>{child.props.text}</p>
        })
        }
      </div>
      {props.children.map((child: any) => {
        return (
          <div className={`tab-panel ${checkActive(child.props.id) ? "active" : '' }`}>
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

