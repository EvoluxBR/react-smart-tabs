# react-smart-tabs
> A simple to use tab system built with react.

[![NPM Version][npm-image]][npm-url][![Downloads Stats][npm-downloads]][npm-url]

This Tab system was inspired by Chrome's tab functionality.
This is a simple to use tab system built to persist each tab's state even when you toggle a different tab. It will only display
<!-- GIF EXAMPLE -->
![](readme-demo.png)


## Installation

```sh
npm install --save react-smart-tabs
```


## Usage example

Here's an example of how to use it:

```sh
import React from 'react';
import { Tab, TabBar } from 'react-smart-tabs';
import 'react-smart-tabs/dist/bundle.css'; //This is our default CSS. Feel free to make your own.

const Component = <h1>New Tab</h1>

const Title = place => <h1>This is the {place} tab content page</h1>

const SecondTabPage = () => (
  <div>
    <Title place="Second"/>
    <TabBar> {/* Notice that passing no props turns them into static tabs */}
      <Tab id='yourSubTabId1'>
        contents of subtab 1
      </Tab>
      <Tab id='yourSubTabId2'>
        contents of subtab 2
      </Tab>
      <Tab id='yourSubTabId3'>
        contents of subtab 3
        <input/>
      </Tab>
    </TabBar>
  </div>
)

const ThirdTabPage = () => (
  <div>
    <Title place="Third"/>
    <form className='frm'>
      <h1>
        Form inside the third tab.
      </h1>
      <h4>
        Notice that it doesn't lose the input content.
      </h4>
      <p>
        Name
      </p>
      <input/>
      <p>
        Surname
      </p>
      <input/>
      <p>
        Adress
      </p>
      <input/>
      <p>
        Telephone
      </p>
      <input/>
    </form>
  </div>
)
function App() {
  return (
    <div className="App">
      <TabBar
        newTab={{ Component, text: 'Brand New Tab' }}
        reorderable // Defines if you can reorder the tabs by drag and drop
        closeable // Defines if you can close tabs
      >
        <Tab
          id='YourTabId1' // An ID so you can more easily identify the tabs
          text="First Tab" // The text that will display in the tab bar
          active // Decides if this tab is the active one when you mount
        >
          <h1>This is the first Tab</h1>
          <h3>It's an active tab with multiple children.</h3>
          <input/>
        </Tab>
        <Tab id='YourTabId2' text="Second Tab">
          <SecondTabPage/>
        </Tab>
        <Tab id='YourTabId3' text="Third Tab">
          <ThirdTabPage/>
        </Tab>
      </TabBar>
    </div>
  );
}

export default App;

```


## Release History

* 0.0.14
    * FIX: Fixed the NPM bundle so it's lighter.


## Want to contribute?
Follow these steps:
0. Check the open issues. Assign one to yourself or create one.
1. Fork the repository (<https://github.com/EvoluxBR/react-smart-tabs/fork>)
2. Create your branch (`git checkout -b feature/fooBar`) within your forked version
3. Make your feature :D
4. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request and wait for feedback.

Distributed under the MIT license. See ``LICENSE`` for more information.

<!--
Markdown link & img dfn's
Use these links to get the badges:
 - https://badge.fury.io/for/js/react-smart-tabs
 - https://shields.io/category/downloads

-->
[npm-image]: https://badge.fury.io/js/react-smart-tabs.svg
[npm-url]: https://www.npmjs.com/package/react-smart-tabs
[npm-downloads]: https://img.shields.io/npm/dt/react-smart-tabs?label=npm%20downloads&style=flat-square
[wiki]: https://github.com/EvoluxBR/react-smart-tabs/wiki
