import React,{ useEffect,useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';

import './View.css';
import SearchBar from './SearchBar';

const View = (props) => { 

    const [data,setData] = useState(null);
    const url = new URLSearchParams(window.location.search);

    useEffect( () => {
           Axios.get("https://exceltopdf.herokuapp.com/get/excel").then( res => setData(res.data) )
    },[]);

    return (
        <div>
          <header className="header">
             <Link to="/"><i className="fa fa-arrow-left"></i></Link>
               <SearchBar/>
             <Link to="/view" className="view">View All ExcelSheets</Link>
          </header>
           <div className="card__container">
               { data && data.map( excel => {
               if( excel.name.toLowerCase().includes(url.get('name')) || url.get('name') === null ){
                return (
                      <Link to={"/fullview?id="+excel.id} className="card" key={uuidv4()}>{excel.name.toUpperCase()}</Link> 
                    )
               }
                } 
               )}
           </div>
        </div>
    )
};

export default withRouter(View);
