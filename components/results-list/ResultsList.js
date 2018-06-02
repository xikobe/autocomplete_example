import React from 'react';
import PropTypes from 'prop-types';

const ResultsList = ({ list, focusedID }) => (
    <div>
        <style jsx>{ `
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .isActive {
              border: 1px solid black;
          }
        ` }
        </style>
        {
            list.length ?
                <ul >

                    {
                        list.map((item, i) =>
                            (
                                <li
                                    key={ item.id }
                                    value={ item.name }
                                    id={ `item_${i}` }
                                    className={ focusedID === i && 'isActive' }
                                >
                                    { item.name }
                                </li>
                            ))
                    }
                </ul> :
                <p>Sorry but we have no results</p>
        }
    </div>
);

ResultsList.propTypes = {
    list: PropTypes.array,
    focusedID: PropTypes.number,
};

export default ResultsList;
