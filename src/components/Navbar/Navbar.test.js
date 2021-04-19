import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Navbar from './Navbar';

describe('Navbar component', () => {
    it('starts with a count of 0', () => {
    const wrapper = shallow(<Navbar />);
    var text = "Signed in as:"
    expect(wrapper.contains(text));
    // const text = wrapper.find('p').text();
    // expect(text).toEqual('Count: 0');
    });


    it('matches the snapshot', () => {
        const tree = renderer.create(<Navbar />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});