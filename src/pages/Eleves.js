import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import GetAllEleves from '../components/eleves/GetAllEleves'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar';
import "../css/Eleves.css"

function Eleves() {
    const [eleves, setEleves] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [filieres, setFilieres] = useState([]);

    const [filiereSearch, setFiliereSearch] = useState("");

    const getAllUsers = () => {
        axios.get('http://localhost:5000/api/eleves')
            .then(res => {
                setEleves(res.data);
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
        getAllUsers();
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
                        <div className="alert alert-success"><h6>Liste des élèves
                            {eleves ? eleves.taille > 0 ? <>({eleves.taille})</> : " (0) " : "Données non disponibles"} <i className='fa fa-users'></i></h6></div>
                        <div className="d-flex">
                            <div className="col-sm-9 d-flex">
                                <div className="input-group mb-3 me-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className='fa fa-search' style={{ height: "30px", lineHeight: "30px" }}></i>
                                        </span>
                                    </div>
                                    <input type="search" className="form-control" placeholder="Nom, Postnom, Prénom"
                                        aria-label="recherche" aria-describedby="basic-addon1"
                                        onChange={(e) => setValueSearch(e.target.value)} />
                                </div>
                                <h6 style={{ lineHeight: "45px" }} className='me-2'>Option: </h6>
                                <select className="form-control" id="filiereId" style={{ height: "45px" }}
                                    onChange={(e) => setFiliereSearch(e.target.value)}
                                >
                                    <option>--Filière--</option>
                                    {filieres.data ? filieres.data.map((val, index) => {
                                        return <option key={index} value={val.nom}>{val.nom}</option>
                                    }) : 'Aucune donnée.'}

                                </select>
                            </div>
                            <div className="col-sm-3">
                                <NavLink to="addEleve">
                                    <button style={{ float: "right" }} className="btn btn-primary">Ajouter un nouvel élève</button>
                                </NavLink>
                            </div>
                        </div>
                        <table className='table table-striped table-bordered mt-2'>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nom</th>
                                    <th>Postnom</th>
                                    <th>Prénom</th>
                                    <th>Sexe</th>
                                    <th>Option</th>
                                    <th>Promotion</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <GetAllEleves
                                    eleves={eleves}
                                    getAllEleves={getAllUsers}
                                    valueSearch={valueSearch}
                                    filiereSearch={filiereSearch}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eleves