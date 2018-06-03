import React from 'react';
import { shallow } from 'enzyme';
import MyApp from 'pages/_app';

describe('basic snapshot', () => {
    it('should render correctly', () => {
        const tree = shallow(<MyApp />);

        expect(tree).toMatchSnapshot();
    });
});
