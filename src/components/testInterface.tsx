import React, { useState } from 'react';
import Tab from './tabs/tab';
import TabBar from './tabs/tab-bar';

const TabInterface = () => {
    const [numberTab, setNumber] = useState(0);
    const createNew = () => {
        setNumber(numberTab + 1);
        return (
            <Tab text="New Tab">
                <h1>{numberTab}</h1>
            </Tab>
        );
    };
    
    return (
        <TabBar
            closeable={true}
            reorderable={true}
            newTab={createNew}
        // hiddenPanel
        >
            <Tab text="first tab">
                <form className="frm">
                    <h1>Form 1</h1>
                    <p>Name</p>
                    <input />
                    <p>Surname</p>
                    <input />
                    <p>Address</p>
                    <input />
                    <p>Telephone</p>
                    <input />
                </form>
            </Tab>

            <Tab text="second tab">
                <form className="frm">
                    <h1>Form 2</h1>
                    <p>Name</p>
                    <input />
                    <p>Surname</p>
                    <input />
                    <p>Address</p>
                    <input />
                    <p>Telephone</p>
                    <input />
                </form>
            </Tab>
        </TabBar>
    );
};
export default TabInterface;
