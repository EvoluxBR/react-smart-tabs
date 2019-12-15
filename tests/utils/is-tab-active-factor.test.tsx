import * as React from 'react';
import isTabActiveFactor from '../../src/utils/is-tab-active-factor';
import Tab from '../../src/components/tabs/tab';

describe('isTabActiveFactor', () => {
  it('should check active tab when tabId is defined', () => {
    const component = (
      <>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </>
    );
    const childrenAsArray = React.Children.toArray(component.props.children);
    const tabList = [
      {
        id: '123',
        tabComponent: childrenAsArray[0],
      },
      {
        id: '456',
        tabComponent: childrenAsArray[1],
      },
    ];

    const tabId = '456';

    const isActive = isTabActiveFactor(childrenAsArray, tabId);

    expect(isActive(tabList[0])).toBe(false);
    expect(isActive(tabList[1])).toBe(true);
  });

  it('should check active tab when tabId is not defined but has active default prop', () => {
    const component = (
      <>
        <Tab>1</Tab>
        <Tab active>2</Tab>
      </>
    );
    const childrenAsArray = React.Children.toArray(component.props.children);
    const tabList = [
      {
        id: '123',
        tabComponent: childrenAsArray[0],
      },
      {
        id: '456',
        tabComponent: childrenAsArray[1],
      },
    ];

    const tabId = '';
    const isActive = isTabActiveFactor(childrenAsArray, tabId);

    expect(isActive(tabList[0])).toBe(false);
    expect(isActive(tabList[1])).toBe(true);
  });

  it('should mark the first tab as active if there is no tabId or active default prop', () => {
    const component = (
      <>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </>
    );
    const childrenAsArray = React.Children.toArray(component.props.children);
    const tabList = [
      {
        id: '123',
        tabComponent: childrenAsArray[0],
      },
      {
        id: '456',
        tabComponent: childrenAsArray[1],
      },
    ];

    const tabId = '';
    const isActive = isTabActiveFactor(childrenAsArray, tabId);

    expect(isActive(tabList[0])).toBe(true);
    expect(isActive(tabList[1])).toBe(false);
  });

  it('should prioritize tabId than active prop', () => {
    const component = (
      <>
        <Tab active>1</Tab>
        <Tab>2</Tab>
      </>
    );
    const childrenAsArray = React.Children.toArray(component.props.children);
    const tabList = [
      {
        id: '123',
        tabComponent: childrenAsArray[0],
      },
      {
        id: '456',
        tabComponent: childrenAsArray[1],
      },
    ];

    const tabId = '456';
    const isActive = isTabActiveFactor(childrenAsArray, tabId);

    expect(isActive(tabList[0])).toBe(false);
    expect(isActive(tabList[1])).toBe(true);
  });
});
