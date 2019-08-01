import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Hello } from "./components/hello/Hello";
import Tab from './components/tabs/tab';
import TabBar from './components/tabs/tab-bar';

const component = <h1>new Tab</h1>;

ReactDOM.render(
  <TabBar 
    closable={true}
    reordable={true}
    newTab={{ component, text: 'New Tab' }}
  >
    <Tab id={'1tab'} text="first tab" active>
      <form className='frm'>
        <h1>Form 1</h1>
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
    <TabBar>
      <Tab id={'a1'} text="first sub tab" active>
      <form className='frm'>
      <h1>subForm 1</h1>
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
      <Tab id={'a2'} text="second sub tab">
      <form className='frm'>
      <h1>subForm 2</h1>
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
      <Tab id={'a3'} text="third sub tab">
      <form className='frm'>
      <h1>subForm 3</h1>
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
    </TabBar>
    </Tab>
    <Tab id={'3tab'} text="third tab">
    <form className='frm'>
      <h1>Form 2</h1>
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
    <h1>Form 3</h1>
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