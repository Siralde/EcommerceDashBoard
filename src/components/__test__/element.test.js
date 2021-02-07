import React from 'react';
import ReactDOM from 'react-dom';
import { CreateElement } from '../element';

import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CreateElement/>, div);
})

it("renders without Create Element correctly", () => {
    const {getByTestId} = render(<CreateElement setUpdate={() => {}}/>)
    expect(getByTestId("createElement")).toHaveClass("new_element");
})

it("matches snapshot", () => {
    const tree = renderer.create(<CreateElement/>).toJSON();
    expect(tree).toMatchSnapshot();
})