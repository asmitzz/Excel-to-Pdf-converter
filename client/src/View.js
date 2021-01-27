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
           <ol>
               { data && data.map( excel => {
               if( excel.name.toLowerCase().includes(url.get('name')) || url.get('name') === null ){
                return (
                        <Link to={"/fullview?id="+excel.id} key={uuidv4()}>
                           <li>{excel.name.toUpperCase()}</li> 
                        </Link> 
                    )
                  }else{
                    return ""
                  }
                } 
               )}
           </ol>
        </div>
    )
};

export default withRouter(View);
