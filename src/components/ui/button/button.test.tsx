import { Button } from "./button";
import TestRenderer from 'react-test-renderer';
import { Direction } from "../../../types/direction";
import { fireEvent, render, screen } from "@testing-library/react";

describe('Button component test', () => {

  it('Button has a text', () => {
    const button = TestRenderer.create(<Button text={'text'} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button has no text', () => {
    const button = TestRenderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button disabled works correctly', () => {
    const button = TestRenderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button has loading works correctly', () => {
    const button = TestRenderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button with ascending sorting works correctly', () => {
    const button = TestRenderer.create(<Button sorting={Direction.Ascending} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button with descending sorting works correctly', () => {
    const button = TestRenderer.create(<Button sorting={Direction.Descending} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button big size works correctly', () => {
    const button = TestRenderer.create(<Button linkedList={'big'} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  
  it('Button small size works correctly', () => {
    const button = TestRenderer.create(<Button linkedList={'small'} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Checking if the callback is correctly called when the button is clicked', () => {
    const callback = jest.fn();
    render(<Button onClick={callback} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });
})