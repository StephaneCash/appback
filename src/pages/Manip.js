import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import GetAllManip from '../components/manip/GetAllManip'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import "../css/Eleves.css"

function Manip() {
    const [manip, setManip] = useState([]);
    const [filieres, setFilieres] = useState([]);

    const getAllManip = () => {
        axios.get('http://localhost:5000/api/manip')
            .then(res => {
                setManip(res.data);
            })
            .catch(err => {
                console.log(err.response)
            })
    };
    const getAllFilieres = () => {
        axios.get(`http://localhost:5000/api/filieres`).then(resp => {
            setFilieres(resp.data);
        }).catch(err => {
            console.log(err)
        });
    };

    useEffect(() => {
        getAllManip();
        getAllFilieres();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='d-flex main'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10'>
                    <div className='getAllEleves' style={{ padding: "1rem" }}>
                        <div className="alert alert-success">
                            <h5>Manipulations {manip && manip.taille !== undefined ? `(${manip.taille})` :
                                <span className="text-danger">Données non disponibles</span>} </h5>
                        </div>
                        <div className="d-flex">
                            <div className="col-sm-4">
                                <input type="search" placeholder="Rechercher...." className="form-control" />
                            </div>
                            <div className="col-sm-8">
                                <NavLink to="addManip">
                                    <button style={{ float: "right" }} className="btn btn-primary">Ajouter une nouvelle manipulation</button>
                                </NavLink>
                            </div>
                        </div>
                        <table className='table table-striped table-bordered mt-2'>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Elèves assignés</th>
                                    <th>Cote</th>
                                    <th>Date création</th>
                                    <th>Date Modification</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <GetAllManip manip={manip} filieres={filieres} getAllManip={getAllManip} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manip