import React, { useRef } from "react";
import './tab.scss';

export interface TabProps {
  id: string,
  resourceData: object,
  children: any,
  text: string,
  active: boolean,
};

const Tab = (props: TabProps) => {
  const tab = useRef(null);
  return (
    <div
      className="tab-wrapper"
      key={props.id}
    >
      <div>
        {props.children}
      </div>
    </div >
  )
}
Tab.defaultProps = {
  resourceData: {},
  active: false,
};
export default Tab;
