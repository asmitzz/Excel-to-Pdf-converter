import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Home.css';


const Home = () => {
    const [data, setData] = useState('');
    const [show, setShow] = useState(false);
    const [success,setSuccess] = useState(false);

  const saveHandler = () => {
      const name = prompt("Enter name of the excel");
      Axios.post('https://exceltopdf.herokuapp.com/save/excel',{name:name ,excel:data});

      document.querySelector('.table').innerHTML = "";

      setSuccess(true);
      setShow(false);
      setTimeout( () => {
        setSuccess(false)
      } , 2000 )
  };

  const FileHandler = (e) => {
     const Reader = new FileReader();

     Reader.readAsBinaryString(e.target.files[0]);

     Reader.onload = (e) => {
         let workbook = window.XLSX.read(e.target.result, { type:"binary" });
         
         let htmlFormat = window.XLSX.write(workbook,{sheet:workbook.SheetNames[0],type:"binary",bookType:"html"})
      
         document.querySelector('.table').innerHTML = htmlFormat;

         setData(htmlFormat)

         setShow(true);
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
              <input name="upload" accept=".xls,.xlsx" type="file" onChange = {FileHandler} />
            </div>
          
              <div className="table__container" style={{ display:show ? 'block':'none' }}>
                 { show && <div className="table__download__btn">
                    <button><i className="fa fa-download"></i> &nbsp;Download PDF </button>
                 </div>}
                 <div className="table"></div>
                 { show && <button onClick={saveHandler} className="table__save__btn"> Save </button>}
             </div>
        </div>
    )
}

export default Home
