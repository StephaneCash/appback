import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Leftbar from '../Leftbar'
import Navbar from '../Navbar'
import swal from "sweetalert";


function AddEleve() {
    const initialiseValues = { id: "", nom: "", postnom: "", prenom: "", sexe: "", filiereId: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const { id, nom, postnom, prenom, sexe, filiereId, } = formData;

    const [filieres, setFilieres] = useState([]);


    const navigate = useNavigate();
    const location = useLocation();

    const { state } = location;

    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    const getAllFilieres = () => {
        axios.get(`http://localhost:5000/api/filieres`).then(resp => {
            setFilieres(resp.data);
        }).catch(err => {
            console.log(err)
        });
    };

    const submitData = () => {
        if (state) {
            axios.put(`http://localhost:5000/api/eleves/${id}`, {
                nom: nom, postnom: postnom, prenom: prenom, sexe: sexe,
                filiereId: filiereId
            })
                .then(resp => {
                    console.log(resp)
                    swal({ title: "Succès", icon: "success", text: resp.data.message });
                    navigate('/eleves');
                })
                .catch(err => {
                    swal({ title: "Erreur", icon: "error", text: "Pas de modification, une erreur a été soulévée" })
                })
        } else {
            axios.post(`http://localhost:5000/api/eleves`, {
                nom: nom, postnom: postnom, prenom: prenom, sexe: sexe,
                filiereId: filiereId,
            })
                .then(resp => {
                    console.log(resp)
                    swal({ title: "Succès", icon: "success", text: resp.data.message });
                    navigate('/eleves');
                })
                .catch(err => {
                    console.log(err)
                    swal({ title: "Erreur", icon: "error", text: "Pas d'ajout, une erreur a été soulévée" })
                });
        }
    };

    useEffect(() => {
        getAllFilieres();
    }, []);

    useEffect(() => {
        if (state) {
            setFormData(state.val)
        }
    }, [state]);

    return (
        <div>
            <Navbar />
            <div className='d-flex main'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10'>
                    <div className='getAllEleves' style={{ padding: "1rem" }}>
                        <div className='col-sm-8'>
                            <h6>
                                <NavLink to="/eleves">
                                    <i className='fa fa-chevron-left'></i> Retour
                                </NavLink>
                            </h6>
                            <div className="mb-3 mt-4">
                                <div className='alert alert-primary'>
                                    {state ? "Editer" : <h5> Ajouter un élève <i className="fa fa-user"></i></h5>}
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <label>Entrer un nom</label><br />
                                        <input
                                            type="text" id="nom"
                                            className='form-control' placeholder='Un nom'
                                            value={nom}
                                            onChange={changeValue}
                                        />

                                        <label>Entrer un postnom</label><br />
                                        <input
                                            type="text" id="postnom"
                                            className='form-control'
                                            placeholder='Un postnom'
                                            value={postnom}
                                            onChange={changeValue}
                                        />

                                        <label>Entrer un prénom</label><br />
                                        <input
                                            type="text" id="prenom"
                                            className='form-control'
                                            placeholder='Un prénom'
                                            value={prenom}
                                            onChange={changeValue}
                                        />
                                    </div>
                                    <div className='col-sm-6'>
                                        <label>Sélectionner un sexe</label><br />
                                        <select className='form-control' id="sexe" onChange={changeValue}>
                                            {state ?
                                                <>
                                                    <option>{sexe}</option>
                                                    <option>F</option>
                                                    <option>M</option>
                                                </>
                                                :
                                                <><option>---Sexe---</option>
                                                    <option>F</option>
                                                    <option>M</option>
                                                </>
                                            }
                                        </select>
                                        <label>Sélectionner une Option</label><br />
                                        <select className="form-control mt-1" id="filiereId" onChange={changeValue}>

                                            <option>--Filière--</option>
                                            {filieres.data ? filieres.data.map((val, index) => {
                                                return <option key={index} value={val.id}>{val.nom}</option>
                                            }) : 'Aucune donnée.'}

                                        </select>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <button type='button' className="btn btn-success" onClick={submitData}
                                    >
                                        {state ? "Editer" : "Ajouter"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEleve