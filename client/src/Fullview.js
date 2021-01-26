import React,{ useEffect,useState } from 'react';

import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './Fullview.css';

const Fullview = () => {

    const [data,setData] = useState(null);
    const url = new URLSearchParams(window.location.search);

    useEffect( () => {
           Axios.get("https://exceltopdf.herokuapp.com/get/excel/"+url.get('id')).then( res => setData(JSON.parse(res.data[0].data)) )
    },[]);
 
    return (
        <React.Fragment>
        <header className="header">
            <Link to="/view"><i className="fa fa-arrow-left"></i></Link>
            <Link to="/view" className="view">View All ExcelSheets</Link>
          </header>
        <div className="table__container">
             
           {/* <div className="table__download__btn">
             <button><i className="fa fa-download"></i> &nbsp;Download PDF </button>
           </div> */}

           { data &&
            <table>
                    <tbody>
                      <tr>
                       {
                         data[0] && Object.keys( data[0] ).map( column => <th key={uuidv4()}>{column}</th>)
                       }
                     </tr>
  
                      {
                        data.map( row => {
                          return (
                             <tr key={uuidv4()}>
                               {Object.values(row).map( column => <td key={uuidv4()}> {column} </td>)}   
                            </tr>
                           )
                          })
                      }
  
                  </tbody>
               </table>}
        </div>
        </React.Fragment>
    );
};

export default Fullview;
