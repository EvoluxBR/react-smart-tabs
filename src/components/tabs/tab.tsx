import React, { ReactElement } from 'react';
import uuid from 'uuid';

export interface TabProps {
  resourceData?: object;
  children: any;
  active?: boolean;
  tabHeader?: ReactElement;
  text?: string;
  className?: string;
  classNameActive?: string;
}

const Tab = (props: TabProps) => {
  return (
    <div
      className="tab-wrapper"
      key={uuid()}
    >
      <div>
        {props.children}
      </div>
    </div >
  );
};
export default Tab;
