import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Contest from './Contest';

describe('Contest component', () => {
    it('div rendering', () => {
        const wrapper = shallow(<Contest />);
        const text = "CREATE CONTEST"
        wrapper.find('button');
        expect(wrapper.contains(text)).toEqual(true);
    });
    it('heading rendering', () => {
        const wrapper = shallow(<Contest />);
        var text = "Present Contests"
        wrapper.find('#title');
        expect(wrapper.contains(text)).toEqual(true);
        text = "Future Contests";
        expect(wrapper.contains(text)).toEqual(true);
        text = "Past Contests"
        expect(wrapper.contains(text)).toEqual(true);
    });

    it('matches the snapshot', () => {
        const tree = renderer.create(<Contest />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});