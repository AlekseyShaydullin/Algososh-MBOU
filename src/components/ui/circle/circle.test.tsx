import { Circle } from "./circle";
import TestRenderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";

describe('Circle component test', () => {

  it('Circle without a letter', () => {
    const circle = TestRenderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with letters', () => {
    const circle = TestRenderer.create(<Circle letter={'H'} />).toJSON();
    expect(circle).toMatchSnapshot()
  });
  
  it('Circle with head', () => {
    const circle = TestRenderer.create(<Circle head={'0'} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with a react element in head', () => {
    const circle = TestRenderer.create(<Circle head={<Circle/>} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with tail', () => {
    const circle = TestRenderer.create(<Circle tail={'0'} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with a react element in tail', () => {
    const circle = TestRenderer.create(<Circle tail={<Circle/>} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with index', () => {
    const circle = TestRenderer.create(<Circle index={0} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with props isSmall', () => {
    const circle = TestRenderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with Default state works correctly', () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with Changing state works correctly', () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot()
  });

  it('Circle with Modified state works correctly', () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot()
  });
})