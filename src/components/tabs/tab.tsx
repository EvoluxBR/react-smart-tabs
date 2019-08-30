import React, { ReactElement } from 'react';
import uuid from 'uuid';

export interface ITabProps {
  resourceData?: object;
  children: any;
  active?: boolean;
  tabHeader?: ReactElement;
  text?: string;
  className?: string;
  classNameActive?: string;
}

const Tab = (props: ITabProps) => {
  return (
    <div className="tab-wrapper" key={uuid()}>
      <div>{props.children}</div>
    </div>
  );
};
export default Tab;
