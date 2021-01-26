import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [input,setInput] = useState('');

    return (
        <div>
               <form>
                   <input placeholder="Search excel by name" className="searchInput" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                   <Link className="search" to={"/view?name="+input.toLowerCase()}><i className="fa fa-search"></i></Link>
                 </form>
        </div>
    );
}
;
export default SearchBar;
