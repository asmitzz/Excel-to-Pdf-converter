import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Home.css';

const Home = () => {
    const [data, setData] = useState(null);
    const [success,setSuccess] = useState(false);

  const saveHandler = () => {
      const name = prompt("Enter name of the excel");
      Axios.post('http://localhost:6000/save/excel',{name:name ,excel:data});
      setData('');
      setSuccess(true);
      setTimeout( () => {
        setSuccess(false)
      } , 2000 )
  };

  const FileHandler = (e) => {
     const Reader = new FileReader();

     Reader.readAsBinaryString(e.target.files[0]);

     Reader.onload = (e) => {
         let workbook = window.XLSX.read(e.target.result, { type:"binary" });
         workbook.SheetNames.forEach( sheet => {

          let rowObject = window.XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          
          setData(rowObject);
          
         });
     }
  }

    return (
        <div>
           <header className="header">
           <Link to="/">Home</Link>
            <Link to="/view" className="view">View All ExcelSheets</Link>
          </header>
            { success && <p className="saved">saved successfully</p>}
            
            <div className="upload__file">
              <label htmlFor="upload"> Select Excel File : &nbsp; </label>
              <input name="upload" type="file" onChange = {FileHandler} />
            </div>
          
            { data && <div className="table__container">
  
              {/* <div className="table__download__btn">
                <button><i className="fa fa-download"></i> &nbsp;Download PDF </button>
              </div> */}
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
               </table>
               <button onClick={saveHandler} className="table__save__btn"> Save </button>
  
            </div>}
        </div>
    )
}

export default Home
