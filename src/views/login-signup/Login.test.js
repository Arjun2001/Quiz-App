import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Login from './Login_signup';

describe('Blog component', () => {
    it('div rendering', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('div.container-1');
    });
    it('button rendering', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('button.switch-button');
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});