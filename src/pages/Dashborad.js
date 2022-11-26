import React from 'react'
import ApercuContent from '../components/ApercuContent';
import Leftbar from '../components/Leftbar';
import Navbar from '../components/Navbar';
import "../css/Dashboard.css";
import Graphiques from '../components/Graphiques';

function Dashborad() {
    return (
        <>
            <Navbar />
            <div className='d-flex'>
                <div className='col-sm-2' style={{ marginTop: "66px" }}>
                    <Leftbar />
                </div>
                <div className='col-sm-10'>
                    <ApercuContent />
                    <Graphiques />
                </div>
            </div>
        </>
    )
}

export default Dashborad