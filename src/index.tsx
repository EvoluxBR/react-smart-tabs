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
    <Tab id={'1tab'} text="first tab" active>
      <form className='frm'>
        <p>Name</p>
        <input/>
        <p>Surname</p>
        <input/>
        <p>Adress</p>
        <input/>
        <p>Telephone</p>
        <input/>
      </form>
    </Tab>
    <Tab id={'2tab'} text="second tab">
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
    <form className='frm'>
        <p>Name</p>
        <input/>
        <p>Surname</p>
        <input/>
        <p>Adress</p>
        <input/>
        <p>Telephone</p>
        <input/>
      </form>
    </Tab>
    <Tab id={'3tab'} text="third tab">
    <form className='frm'>
        <p>Name</p>
        <input/>
        <p>Surname</p>
        <input/>
        <p>Adress</p>
        <input/>
        <p>Telephone</p>
        <input/>
      </form>
    </Tab>
    <Tab id={'4tab'} text="fourth tab">
    <form className='frm'>
        <p>Name</p>
        <input/>
        <p>Surname</p>
        <input/>
        <p>Adress</p>
        <input/>
        <p>Telephone</p>
        <input/>
      </form>
    </Tab>
  </TabBar>,
  document.getElementById("example")
);