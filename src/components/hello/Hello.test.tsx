import * as React from "react";
import { shallow } from "enzyme";

import { Hello } from "./Hello";

it("renders the Home Component", () => {
    const result = shallow(<Hello compiler="TypeScript" framework="React" />).contains(
      <h1>Helluser from TypeScript and React!</h1>
    );
    expect(result).toBeTruthy();
});