import { default as React, MouseEvent, ReactElement, RefObject } from 'react';
import ReactSVG from 'react-svg';
import { ITab } from '../types';
import cancelSvg from './cancel.svg';

export interface ITabBarItemProps {
  tab: ITab;
  refItem: RefObject<HTMLLIElement>;
  isActiveTab: (tab: ITab) => boolean;
  onCloseDragElement: (event: MouseEvent<HTMLElement>) => void;
  onRemoveTab: (id: string, event: MouseEvent<HTMLElement>, tab: ITab) => void;
  onDragMouseDown: (event: MouseEvent<HTMLElement>, tab: ITab) => void;
  closeable: boolean;
  closeIcon: ReactElement;
}

const TabBarItem = ({
  tab,
  refItem,
  isActiveTab,
  onDragMouseDown,
  onCloseDragElement,
  onRemoveTab,
  closeable,
  closeIcon,
}: ITabBarItemProps) => {
  const { className, classNameActive } = tab.tabComponent.props;
  return (
    <li
      id={tab.id}
      key={tab.id}
      ref={refItem}
      className={isActiveTab(tab) ? `${classNameActive || 'active'} reposition` : className}
      onMouseDown={event => onDragMouseDown(event, tab)}
      onMouseUp={onCloseDragElement}
    >
      {tab.tabComponent.props.tabHeader || tab.tabComponent.props.text}
      {closeable && (
        <span className="close" onClick={event => onRemoveTab(tab.id, event, tab)}>
          {closeIcon || <ReactSVG className="close-icon" src={cancelSvg.toString()} />}
        </span>
      )}
    </li>
  );
};

export default TabBarItem;
