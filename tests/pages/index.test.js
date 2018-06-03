import React from 'react';
import { shallow } from 'enzyme';
import Index from 'pages/';

describe('Index', () => {
    describe('basic render', () => {
        it('should render correctly', () => {
            const tree = shallow(<Index />);

            expect(tree).toMatchSnapshot();
        });
    });
});
