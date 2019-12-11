import { ReactElement } from 'react';

export interface ITabProps {
  resourceData?: object;
  children: any;
  active?: boolean;
  tabHeader?: ReactElement;
  text?: string;
  className?: string;
  classNameActive?: string;
}

export interface ITab {
  tabComponent: ReactElement<ITabProps>;
  id: string;
}
