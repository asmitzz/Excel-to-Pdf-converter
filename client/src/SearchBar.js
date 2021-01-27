import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';

const SearchBar = (props) => {
    const [input,setInput] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.replace("/view?name="+input.toLowerCase())
    }
    return (
        <div>
                <form onSubmit={submitHandler}>
                   <input placeholder="Search excel by name" className="searchInput" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                   <button className="search" ><i className="fa fa-search"></i></button>
                 </form>
        </div>
    );
}
;
export default withRouter(SearchBar);
