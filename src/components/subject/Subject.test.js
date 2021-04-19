import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Subject from './Subject'

describe('Blog component', () => {
    it('div rendering', () => {
        const wrapper = shallow(<Subject />);
        const text = wrapper.find('h3').text();
        expect(text).toEqual('SUBJECTS');
    });

    it('div rendering', () => {
        const wrapper = shallow(<Subject />);
        wrapper.find('form');
    });

    it('matches the snapshot', () => {
        const tree = renderer.create(<Subject />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});