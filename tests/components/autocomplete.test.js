import React from 'react';
import { shallow } from 'enzyme';
import Autocomplete from 'components/autocomplete/Autocomplete';

describe('Autocomplete', () => {
    describe('basic render', () => {
        it('should render correctly', () => {
            const tree = shallow(<Autocomplete />);

            expect(tree).toMatchSnapshot();
        });
    });

    describe('component handlers', () => {
        describe('onChange', () => {
            it('should call handleOnChange', () => {
                const mockEvent = {
                    target: {
                        value: 'foo',
                    },
                };

                const spy = jest.spyOn(Autocomplete.prototype, 'handleOnChange');
                const tree = shallow(<Autocomplete />);

                tree.find('input').simulate('change', mockEvent);

                expect(spy).toHaveBeenCalled();
            });

            it('should update state correctly', () => {
                const tree = shallow(<Autocomplete />);
                const mockEvent = {
                    target: {
                        value: 'foo',
                    },
                };

                tree.find('input').simulate('change', mockEvent);
                expect(tree.state().inputValue).toEqual(mockEvent.target.value);
            });
        });

        describe('onKeyDown', () => {
            let tree;
            let spy;
            const mockList = [
                { name: 'foo', id: 1 },
                { name: 'bar', id: 2 },
                { name: 'biz', id: 3 },
            ];

            beforeEach(() => {
                spy = jest.spyOn(Autocomplete.prototype, 'handleOnKeyDown');
                tree = shallow(<Autocomplete />);
            });
            it('should call handleOnKeyDown with correct event', () => {
                const mockEvent = { };

                tree.find('input').simulate('keyDown', mockEvent);

                expect(spy).toHaveBeenCalled();
            });

            describe('down arrow', () => {
                it('should not update focused id if list is empty', () => {
                    const mockEvent = {
                        key: 'ArrowDown',
                        preventDefault: jest.fn(),
                    };
                    const { focusedID } = tree.state();

                    tree.find('input').simulate('keyDown', mockEvent);

                    expect(tree.state().focusedID).toEqual(focusedID);
                });

                it('should update focused id if list is not empty', () => {
                    const mockEvent = {
                        key: 'ArrowDown',
                        preventDefault: jest.fn(),
                    };

                    tree.setState({
                        searchResults: mockList,
                    });

                    const { focusedID } = tree.state();

                    tree.find('input').simulate('keyDown', mockEvent);

                    expect(tree.state().focusedID).toEqual(focusedID + 1);
                });
            });

            describe('up arrow', () => {
                it('should not update focusedID', () => {
                    const mockEvent = {
                        key: 'ArrowUp',
                        preventDefault: jest.fn(),
                    };
                    const { focusedID } = tree.state();

                    tree.find('input').simulate('keyDown', mockEvent);

                    expect(tree.state().focusedID).toEqual(focusedID);
                });

                it('should update focusedID correctly', () => {
                    const mockEvent = {
                        key: 'ArrowUp',
                        preventDefault: jest.fn(),
                    };
                    tree.setState({
                        focusedID: 1,
                        searchResults: mockList,
                    });

                    tree.find('input').simulate('keyDown', mockEvent);

                    expect(tree.state().focusedID).toEqual(0);
                });
            });

            describe('Escape key', () => {
                it('should reset focusedID if already set', () => {
                    const mockEvent = {
                        key: 'Escape',
                        preventDefault: jest.fn(),
                    };

                    tree.setState({
                        focusedID: 1,
                    });

                    tree.find('input').simulate('keyDown', mockEvent);

                    expect(tree.state().focusedID).toEqual(-1);
                });
            });
        });
    });
});
