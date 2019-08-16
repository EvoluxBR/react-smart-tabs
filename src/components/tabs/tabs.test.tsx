import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import Tab from './tab';
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

  it('should render a tab bar with second tab active', () => {
    const result = mount(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab" active>
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    const firstActive = result.find('.active').first();
    const secondTab = result.find('li').last();
    expect(firstActive.props().id).toBe(secondTab.props().id);
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
    const result = mount(
        <TabBar reorderable>
          <Tab text="firstTab">
            <h1>Test</h1>
          </Tab>
          <Tab text="secondTab">
            <h1>Test2</h1>
          </Tab>
        </TabBar>,
    );
    const first = result.find('li').first();
    const second = result.find('li').last();
    result.find('li').first().simulate('mouseDown', { clientX: 500 });
    result.find('.tab__bar').simulate('mouseMove', { clientX: 500 });
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
    expect(result.find('#closed').exists()).toBeFalsy();
  });

  it('should close the active second tab', () => {
    const result = mount(
      <TabBar closeable>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="secondTab" active>
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    result.find('.close').last().simulate('click');
    expect(result.find('li').at(1).exists()).toBeFalsy();
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

  it('should change the position of a tab backwards', () => {
    const result = mount(
        <TabBar reorderable>
          <Tab text="firstTabw">
            <h1>Test1</h1>
          </Tab>
          <Tab text="secondTabw">
            <h1>Test3</h1>
          </Tab>
        </TabBar>,
      );
    const first = result.find('li').first();
    const second = result.find('li').last();
    result.find('li').last().simulate('mouseDown', { clientX: 0 });
    result.find('.tab__bar').simulate('mouseMove', { clientX: -200 });
    const firstElelment = result.find('li').first();
    const secondElelment = result.find('li').last();
    expect(firstElelment.props().id).toBe(second.props().id);
    expect(secondElelment.props().id).toBe(first.props().id);
  });

  it('should change the position of a tab backwards with three elements', () => {
    const result = mount(
        <TabBar reorderable>
          <Tab text="firstTab">
            <h1>Test1</h1>
          </Tab>
          <Tab text="secondTab">
            <h1>Test2</h1>
          </Tab>
          <Tab text="thirdTab">
            <h1>Test3</h1>
          </Tab>
        </TabBar>,
      );
    const first = result.find('li').first();
    const second = result.find('li').at(1);
    second.simulate('mouseDown', { clientX: 0 });
    result.find('.tab__bar').simulate('mouseMove', { clientX: -200 });
    second.simulate('mouseUp', { clientX: -200 });
    const firstElelment = result.find('li').first();
    const secondElelment = result.find('li').at(1);
    expect(firstElelment.props().id).toBe(second.props().id);
    expect(secondElelment.props().id).toBe(first.props().id);
  });

  it('should change the position of a tab foward with three elements', () => {
    const result = mount(
        <TabBar reorderable>
          <Tab text="firstTab">
            <h1>Test1</h1>
          </Tab>
          <Tab text="secondTab">
            <h1>Test2</h1>
          </Tab>
          <Tab text="thirdTab">
            <h1>Test3</h1>
          </Tab>
        </TabBar>,
      );
    const third = result.find('li').at(2);
    const second = result.find('li').at(1);
    second.simulate('mouseDown', { clientX: 0 });
    result.find('.tab__bar').simulate('mouseMove', { clientX: 100 });
    second.simulate('mouseUp', { clientX: 100 });
    const thirdElelment = result.find('li').at(2);
    const secondElelment = result.find('li').at(1);
    expect(thirdElelment.props().id).toBe(second.props().id);
    expect(secondElelment.props().id).toBe(third.props().id);
  });

  it('should show the clicked a tab', () => {
    const result = mount(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    const tab = result.find('li').last();
    tab.simulate('mouseDown');
    tab.simulate('mouseUp');
    const tabPanel = result.find('.active').last();
    expect(tabPanel.props().id).toBe(`${tab.props().id}-panel`);
  });

  it('try to drag an element without reorderable prop', () => {
    const result = mount(
      <TabBar>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="firstTab">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    const first = result.find('li').first();
    const second = result.find('li').at(1);
    first.simulate('mouseDown');
    result.find('.tab__bar').simulate('mouseMove', { clientX: 100 });
    const firstElelment = result.find('li').first();
    const secondElelment = result.find('li').at(1);
    expect(firstElelment.props().id).toBe(first.props().id);
    expect(secondElelment.props().id).toBe(second.props().id);
  });

  it('should call the onTabsChange function', () => {
    const changed = jest.fn();
    const result = mount(
      <TabBar closeable onTabsChange={changed}>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="secondTab active">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    result.find('.close').last().simulate('click');
    expect(changed).toHaveBeenCalled();
  });

  it('should call the onTabClick function', () => {
    const click = jest.fn();
    const result = mount(
      <TabBar closeable onTabClick={click}>
        <Tab text="firstTab">
          <h1>Test</h1>
        </Tab>
        <Tab text="secondTab active">
          <h1>Test2</h1>
        </Tab>
      </TabBar>,
    );
    result.find('li').last().simulate('mouseDown');
    expect(click).toHaveBeenCalled();
  });
});
