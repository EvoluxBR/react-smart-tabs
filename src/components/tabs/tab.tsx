// tslint:disable-next-line:import-name
import React from 'react';
import uuid from 'uuid';

export interface TabProps {
  resourceData?: object;
  children: any;
  text: string;
  active?: boolean;
}

// tslint:disable-next-line:variable-name
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
