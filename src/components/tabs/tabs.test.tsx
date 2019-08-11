import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { act, Simulate } from 'react-dom/test-utils'; // tslint:disable-next-line:import-name
import Tab from './tab';
// tslint:disable-next-line:import-name
import TabBar from './tab-bar';

const component = <h1>Test</h1>;
describe('tab subcomponent', () => {
  it('should render a Tab', () => {
    const result = shallow(
      <Tab id="1" text="firstTab">
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
        <Tab id="1" text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab id="2" text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a tab bar with one tab inside', () => {
    const result = shallow(
      <TabBar>
        <Tab id="1" text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should render a tab bar with multiple tabs inside', () => {
    const result = shallow(
      <TabBar>
        <Tab id="1" text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab id="2" text="firstTab">
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should add new Tab', () => {
    const openNew = () => {
      return <Tab id="newOne" text="new Tab"><h1>New Tab</h1></Tab>;
    };

    const result = shallow(
      <TabBar newTab={openNew}>
        <Tab id="1" text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab id="2" text="firstTab">
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
          <Tab id="movable" text="firstTab">
            <h1>Test</h1>
          </Tab>
          <Tab id="reordered" text="secondTab">
            <h1>Test2</h1>
          </Tab>
        </TabBar>,
      );
    });
    result.find('#movable').first().simulate('mouseDown', { clientX: 500 });
    result.find('.tab__bar').simulate('mouseMove', { clientX: 500 });
    const tabList = result.find('.tab__bar').props().children as React.ReactChildren;
    const firstElelment = React.Children.toArray(tabList)[0] as any;
    const secondElelment = React.Children.toArray(tabList)[1] as any;
    expect(firstElelment.props.id).toEqual('reordered');
    expect(secondElelment.props.id).toEqual('movable');
  });
  it('should close a Tab', () => {

    const result = mount(
      <TabBar closeable>
        <Tab id="closed" text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab id="2" text="secondTab">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    result.find('.close').first().simulate('click');
    expect(result.find('#closed').exists()).toBeFalsy;
  });
});
