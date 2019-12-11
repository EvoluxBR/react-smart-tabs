import React, { ReactElement } from 'react';
import uuid from 'uuid';
import { ITabProps } from '../types';

const Tab = (props: ITabProps) => {
  return (
    <div className="tab-wrapper" key={uuid()}>
      <div>{props.children}</div>
    </div>
  );
};
export default Tab;
