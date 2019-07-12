import * as React from 'react';
import { shallow } from "enzyme";
import Tab from "./tab";
import TabBar from "./tab-bar";

const component = <h1>Test</h1>;
describe('tab subcomponent', () => {
  it("should render a Tab", () => {
    const result = shallow(
      <Tab id={'1'} text={'firstTab'}>
        <h1>Test</h1>
      </Tab>
    );
    expect(result).toMatchSnapshot();
  });
});

describe('tab subcomponent', () => {
  it("should render a tab bar with one tab inside", () => {
    const result = shallow(
      <TabBar>
        <Tab id={'1'} text={'firstTab'}>
          <h1>Test</h1>
        </Tab>;
      </TabBar>
    );
    expect(result).toMatchSnapshot();
  });
  // it("should only display the active tab") {
  //   const result = shallow(
  //     <TabBar>
  //       <Tab id={'1'} text={'firstTab'} className="active">
  //         <h1>Test</h1>
  //       </Tab>;
  //       <Tab id={'2'} text={'firstTab'} >
  //         <h1>Test</h1>
  //       </Tab>);
  //   </TabBar>
  //   );
  // }
});
