import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import axios from "axios";
import swal from "sweetalert";
import Navbar from '../Navbar';
import Leftbar from '../Leftbar';

function AttributeManip() {

    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({});
    const [cours, setCours] = useState([]);
    const [coursAttribues, setCoursAttribues] = useState([]);

    const { id, nom } = formData;

    const getAllCours = () => {
        axios.get(`http://localhost:5000/api/eleves`)
            .then(resp => {
                setCours(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const attributionFunction = (val) => {
        const idCours = val.id;
        let arrayArrange = [...coursAttribues, val.nom]
        setCoursAttribues([...new Set(arrayArrange)]);

        axios.put(`http://localhost:5000/api/eleves/${idCours}`, { manipulationId: id })
            .then(resp => {
                swal({
                    title: "Succès",
                    icon: "success",
                    text: "Cours attribué avec succès"
                });
            })
            .catch(err => {
                console.log(err.response);
                swal({
                    title: "Echec",
                    icon: "error",
                    text: "Aucune manipulation n'a été attribué"
                });
            });
    };

    useEffect(() => {
        if (state) {
            setFormData(state.val)
        }
        getAllCours();
    }, [state]);

    const styleBtn = {
        border: "1px solid silver", padding: '6px', borderRadius: "4px", boxShadow: "1px 1px 10px silver", marginRight: "5px",
        marginBottom: '5px'
    };
    const styleCoursAtt = { marginRight: '10px', marginTop: "0px" }

    return (

        <>
            <Navbar />
            <div className='d-flex main'>
                <div className='col-sm-2'>
                    <Leftbar />
                </div>
                <div className='col-sm-10'>
                    <div className='getAllEleves' style={{ padding: "1rem" }}>
                        <label> Attribuer des élèves </label> <br /><br />
                        <h6>
                            <NavLink to="/manip"><i className='fa fa-angle-left'></i> Retour</NavLink>
                        </h6><br />
                        <div className="col-sm-10">
                            <div className="alert alert-success">

                                Manipulation :   {nom} <br />
                                Elèves déjà attribués : {state.val.eleves ? state.val.eleves.map((val, index) => {
                                    return <button className='alert alert-success' style={styleCoursAtt} key={index}>{val.nom} {val.postnom}</button>
                                }) : "Aucun cours déjà attrbué."}

                            </div>
                            <div className="alert alert-primary mt-2">
                                Elèves attribués :  <br />
                                {
                                    coursAttribues.length > 0 ? coursAttribues.map((val, index) => {
                                        return <button className='alert alert-dark' style={styleCoursAtt} key={index}>{val}</button>
                                    }) : <span style={{ fontWeight: "bold" }}>Aucun élève.</span>
                                }
                            </div>

                            <div className="col-sm-12">
                                <p>Cliquer sur un élève pour lui affecter à une manipulation</p>
                                {
                                    cours.data ?
                                        cours.data.map((val, index) => {

                                            return <button style={styleBtn} key={index} onClick={() => attributionFunction(val)}>
                                                <i className="fa fa-plus"></i> {val.nom}</button>

                                        }) : 'Aucun cours trouvé.'
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AttributeManip