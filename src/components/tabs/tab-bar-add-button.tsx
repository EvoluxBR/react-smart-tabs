import React, { ReactElement } from 'react';

interface ITabBarAddButton {
  newTab: () => ReactElement;
  onAddTab: () => void;
}

const TabBarAddButton = ({ newTab, onAddTab }: ITabBarAddButton) => {
  if (!newTab) null;

  return (
    <span className="addButton" onClick={onAddTab}>
      +
    </span>
  );
};

export default TabBarAddButton;
