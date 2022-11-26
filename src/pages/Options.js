import { TapAndPlayOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar';
import GetAllOptions from '../components/options/GetAllOptions';
import "../css/Eleves.css"

function Options() {
    const [filieres, setFilieres] = useState([]);
    const [valueSearch, setValueSearch] = useState('');

    const getAllOptions = () => {
        axios.get('http://localhost:5000/api/filieres')
            .then(res => {
                setFilieres(res.data);
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    useEffect(() => {
        getAllOptions();
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
                        <div className="alert alert-success"><h6>Liste d'options
                            {filieres ? filieres.taille > 0 ? <>({filieres.taille})</> : " (0) " : "Données non disponibles"}
                            <TapAndPlayOutlined /></h6></div>
                        <div className="d-flex">
                            <div className="col-sm-5 d-flex">
                                <div className="input-group mb-3 me-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className='fa fa-search' style={{ height: "30px", lineHeight: "30px" }}></i>
                                        </span>
                                    </div>
                                    <input type="search" className="form-control" placeholder="Nom filière..."
                                        aria-label="recherche" aria-describedby="basic-addon1"
                                        onChange={(e) => setValueSearch(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <NavLink to="addOption">
                                    <button style={{ float: "right" }} className="btn btn-primary">
                                        Ajouter une option</button>
                                </NavLink>
                            </div>
                        </div>
                        <table className='table table-striped table-bordered mt-2'>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nom</th>
                                    <th>Promotion</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <GetAllOptions
                                    filieres={filieres}
                                    valueSearch={valueSearch}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Options