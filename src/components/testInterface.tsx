import React, { Component, useState } from "react";
import Tab from './tabs/tab';
import TabBar from './tabs/tab-bar';
import uuid from 'uuid';

const TabInterface = () => {
  const [number, setNumber] = useState(0);
  const createNew = () => {
    setNumber(number + 1);
    return <Tab text="New Tab">
            <h1>{number}</h1>
           </Tab>;
  };
  return (
  <TabBar
      closeable={true}
      reorderable={true}
      newTab={createNew}
    >
      <Tab id={'1tab'} text="first tab">
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
    </TabBar>
  )
};
export default TabInterface;
