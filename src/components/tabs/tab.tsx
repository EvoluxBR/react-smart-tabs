// tslint:disable-next-line:import-name
import React from 'react';
import uuid from 'uuid';

export interface TabProps {
  id?: string;
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
      key={props.id}
    >
      <div>
        {props.children}
      </div>
    </div >
  );
};
Tab.defaultProps = Object.create({}, {
  id: {
    enumerable: true,
    get: () => uuid(),
  },
});
export default Tab;
