import React from "react";
import ReactDOM from "react-dom";
import { Hello } from "./components/hello/Hello";
import Tab from './components/tabs/tab';
import TabBar from './components/tabs/tab-bar';
const cars = [
  {
    name: 'corsa',
    id: 'cs1'
  },
  {
    name: 'palio',
    id: 'cs2'
  }
];
ReactDOM.render(
  <TabBar>
    <Tab id={'1'} text="first tab" active>
    <select>
  {cars.map((opt)=> {
    return <option key={opt.id} value={opt.id}>{opt.name}</option>
  })}
</select>
    </Tab>
    <Tab id={'2'} text="second tab">
    {/* <TabBar>
      <Tab id={'a1'} text="first tab" active>
        <input />
      </Tab>
      <Tab id={'a2'} text="second tab">
        <h1>second tab</h1>
      </Tab>
      <Tab id={'a3'} text="third tab">
        <h1>third tab</h1>
      </Tab>
    </TabBar> */}
    </Tab>
    <Tab id={'3'} text="third tab">
      <h1>third tab</h1>
    </Tab>
    <Tab id={'4'} text="fourth tab">
      <h1>fourth tab</h1>
    </Tab>
  </TabBar>,
  document.getElementById("example")
);