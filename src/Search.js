import React from 'react';
import './App.css';

const Search = (props) => {
    return (
        <div>
            <input className="student-add-tag" placeholder="Search by name"
                   type='text' onChange={(e) => props.changeInput(e)}
                   value={props.imputValue}
            />
        </div>
    );
};

export default Search;
