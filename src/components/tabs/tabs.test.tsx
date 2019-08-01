import * as React from 'react';
import { shallow } from 'enzyme';
// tslint:disable-next-line:import-name
import Tab from './tab';
// tslint:disable-next-line:import-name
import TabBar from './tab-bar';

const component = <h1>Test</h1>;
describe('tab subcomponent', () => {
  it('should render a Tab', () => {
    const result = shallow(
      <Tab id={'1'} text={'firstTab'}>
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
        <Tab id={'1'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
        <Tab id={'2'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });
  it('should render a tab bar with one tab inside', () => {
    const result = shallow(
      <TabBar>
        <Tab id={'1'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });
  it('should render a tab bar with multiple tabs inside', () => {
    const result = shallow(
      <TabBar>
        <Tab id={'1'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
        <Tab id={'2'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });
  it('should add new Tab', () => {
    const result = shallow(
      <TabBar>
        <Tab id={'1'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
        <Tab id={'2'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>
      </TabBar>,
    );
    expect(result).toMatchSnapshot();
  });
});
