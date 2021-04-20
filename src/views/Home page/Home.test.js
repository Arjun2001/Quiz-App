import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Home from './Home';
import Blog from '../../components/blogs/Blog'
import Subject from '../../components/subject/Subject'

describe('Blog component', () => {
    it('div rendering', () => {
        const wrapper = shallow(<Home />);
        wrapper.find('div.home-main');
        expect(wrapper.containsMatchingElement(<Blog />)).toEqual(true);
        expect(wrapper.containsMatchingElement(<Subject />)).toEqual(true);
    });
    it('class rendering', () => {
        const wrapper = shallow(<Home />);
        wrapper.find('div.left-main');
        wrapper.find('div.right-main');
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});