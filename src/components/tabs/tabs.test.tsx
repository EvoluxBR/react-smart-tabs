import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { act, Simulate } from 'react-dom/test-utils'; // tslint:disable-next-line:import-name
import Tab from './tab';
// tslint:disable-next-line:import-name
import TabBar from './tab-bar';

describe('tab subcomponent', () => {
  it('should render a Tab', () => {
    const result = shallow(
      <Tab text="firstTab">
        <h1>Test</h1>
      </Tab>,
    );
    expect(result).toMatchSnapshot();
  });
});

describe('TabBar component', () => {
  it('should render a tab bar with first tab active', () => {
    const result = shallow(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a tab bar with one tab inside', () => {
    const result = shallow(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a tab bar with multiple tabs inside', () => {
    const result = shallow(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should add new Tab', () => {
    const openNew = () => {
      return <Tab text="new Tab"><h1>New Tab</h1></Tab>;
    };

    const result = shallow(
      <TabBar newTab={openNew}>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    result.find('.addButton').simulate('click');
    expect(result.find('#newOne')).toBeTruthy();
  });

  it('should change the position of a tab fowards', () => {
    let result: ReactWrapper;
    act(() => {
      result = mount(
        <TabBar reorderable>
          <Tab text="firstTab">
            <h1>Test</h1>
          </Tab>
          <Tab text="secondTab">
            <h1>Test2</h1>
          </Tab>
        </TabBar>,
      );
    });
    const first = result.find('li').first();
    const second = result.find('li').last();
    result.find('li').first().simulate('mouseDown', { clientX: 500 });
    result.find('.tab__bar').simulate('mouseMove', { clientX: 500 });
    const tabList = result.find('.tab__bar').props().children as React.ReactChildren;
    const firstElelment = result.find('li').first();
    const secondElelment = result.find('li').last();
    expect(firstElelment.props().id).toBe(second.props().id);
    expect(secondElelment.props().id).toBe(first.props().id);
  });

  it('should close a Tab', () => {

    const result = mount(
      <TabBar closeable>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="secondTab">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    result.find('.close').first().simulate('click');
    expect(result.find('#closed').exists()).toBeFalsy;
  });

  it('should render 2 tabs with random ids', () => {
    const result = mount(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    const firstTab = result.find('li').first();
    const secondTab = result.find('li').last();
    expect(firstTab.props().id !== secondTab.props().id).toBeTruthy;
  });
});
