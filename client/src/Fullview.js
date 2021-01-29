import React,{ useEffect } from 'react';

import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Fullview.css';

const Fullview = () => {

    const url = new URLSearchParams(window.location.search);

    useEffect( () => {
           Axios.get("https://exceltopdf.herokuapp.com/get/excel/"+url.get('id')).then( res => {
             document.querySelector('.table').innerHTML = JSON.parse(res.data[0].data)
           } )
   });

  const downloadHandler = () => {
    const data = document.querySelector('.table');
    var opt = {
      margin: 1,
      image:{type: 'jpeg',quality: 0.9},
      html2canvas: { scale: 2},
      jsPDF: { unit:'in',format: 'a4',orientation:'landscape'}
    };

    window.html2pdf().from(data).set(opt).save();
}

    return (
        <React.Fragment>
        <header className="header">
            <Link to="/view"><i className="fa fa-arrow-left"></i></Link>
            <Link to="/view" className="view">View All ExcelSheets</Link>
          </header>
            <div className="table__container">
                 <div className="table__download__btn">
                    <button onClick={downloadHandler}><i className="fa fa-download"></i> &nbsp;Download PDF </button>
                 </div>
                 <div className="table"></div>
             </div>
        </React.Fragment>
    );
};

export default Fullview;
