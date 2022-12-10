import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Leftbar from '../Leftbar'
import Navbar from '../Navbar'
import swal from "sweetalert";


function AddManip() {
    const initialiseValues = { id: "", nom: "", cote: "", description: "" };
    const [formData, setFormData] = useState(initialiseValues);

    const { id, nom, description, cote } = formData;

    const navigate = useNavigate();
    const location = useLocation();

    const { state } = location;

    const changeValue = (e) => {
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const submitData = () => {
        if (state) {
            axios.put(`http://localhost:5000/api/manip/${id}`, {
                nom: nom, description: description, cote: cote
            })
                .then(resp => {
                    console.log(resp)
                    swal({ title: "Succès", icon: "success", text: resp.data.message });
                    navigate('/manip');
                })
                .catch(err => {
                    swal({ title: "Erreur", icon: "error", text: "Pas de modification, une erreur a été soulévée" })
                })
        } else {
            axios.post(`http://localhost:5000/api/manip`, {
                nom: nom, description: description, cote: cote
            })
                .then(resp => {
                    console.log(resp)
                    swal({ title: "Succès", icon: "success", text: resp.data.message });
                    navigate('/manip');
                })
                .catch(err => {
                    console.log(err.response)
                    swal({ title: "Erreur", icon: "error", text: "Pas d'ajout, une erreur a été soulévée" })
                });
        }
    };

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
                        <div className='col-sm-6'>
                            <h6>
                                <NavLink to="/manip">
                                    <i className='fa fa-chevron-left'></i> Retour
                                </NavLink>
                            </h6>
                            <div className="mb-3 mt-3">
                                <div className="alert alert-success">
                                    {state ? "Editer" : <h5> Ajouter une nouvelle manipulation</h5>}
                                </div>
                                <div className="card-body">
                                    <label>Entrer un nom</label><br />
                                    <input
                                        type="text" id="nom"
                                        className='form-control' placeholder='Un nom'
                                        value={nom}
                                        onChange={changeValue}
                                    />
                                    <label>Entrer une cotation</label><br />
                                    <input
                                        type="number" id="cote"
                                        className='form-control' placeholder='Une cotation'
                                        value={cote}
                                        onChange={changeValue}
                                    />
                                    <label>Descrition</label>
                                    <br />
                                    <textarea id="description" onChange={changeValue} value={description} className='form-control' 
                                    placeholder="Description d'une manipulation"></textarea>
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
        </div >
    )
}

export default AddManip