import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Blog from './Blog';

describe('Blog component', () => {
    it('div rendering', () => {
        const wrapper = shallow(<Blog />);
        const text = wrapper.find('div.blog-title').text();
        expect(text).toEqual('Latest Updates');
    });
    it('component rendering', () => {
        const wrapper = shallow(<Blog />);
        var text = "Contest";
        expect(wrapper.contains(text)).toEqual(true);
        text = "In"
        expect(wrapper.contains(text)).toEqual(true);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<Blog />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});