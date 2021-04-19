import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

// describe('App component', () => {
//     it('starts with a count of 0', () => {
//       const wrapper = shallow(<App />);
//       const text = wrapper.find('p').text();
//       expect(text).toEqual('Count: 0');
//     });
// });
it("renders without crashing", () => {
  shallow(<App />);
});



it('div rendering', () => {
  const wrapper = shallow(<App />);
  wrapper.find('.sign-up');
  wrapper.find('.sign-in');
  // expect(text).toEqual('Latest Updates');
});

it('matches the snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});