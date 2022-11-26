import axios from 'axios';
import React from 'react'
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { dateParserFunction } from "../../pages/Utils"

function GetAllManip(props) {

    let manip = props.manip;
    let filieres = props.filieres;
    let getAllManip = props.getAllManip;

    const deleteManip = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cette manipulation ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/manip/${id}`)
                    .then(resp => {
                        getAllManip();
                        swal(resp.data.message, {
                            icon: "success",
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            {manip && manip.taille > 0 ? (
                manip.data.map((value, i) => {
                    return (
                        <tr key={value.id}>
                            <td>{i + 1}</td>
                            <td>{value.nom}</td>
                            <td>{value.description}</td>
                            <td>
                                {
                                    value.eleves && value.eleves.length > 0 ?
                                        value.eleves.map((eleve, index) => {
                                            return (
                                                <div key={eleve.id}>
                                                    <div className='p-2 mt-1' style={{ border: "1px solid silver", width: "210px" }}><span style={{ fontWeight: "bold" }}>Nom</span>: {eleve.nom} <br />
                                                        <span style={{ fontWeight: "bold" }}> Postnom:</span> {eleve.postnom}
                                                        <br />

                                                        {
                                                            filieres.data && filieres.data.length > 0 &&
                                                            filieres.data.map((val, i) => {
                                                                if (val.id === eleve.filiereId) {
                                                                    return (
                                                                        <div key={i}>
                                                                            <span style={{ fontWeight: "bold" }}>Filière</span> : {val.promotion} {val.nom}
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : "Aucun élève assigné"
                                }
                            </td>
                            <td>{value.cote}</td>

                            <td>{dateParserFunction(value.createdAt)}</td>
                            <td>
                                {dateParserFunction(value.updatedAt)}
                            </td>

                            <td style={{ width: "132px" }}>
                                <button className='me-2'><i className='fa fa-edit'></i></button>
                                <button className='me-2' onClick={() => deleteManip(value.id)}> <i className='fa fa-trash'></i></button>
                                <NavLink to={{ pathname: "attributeManip" }} state={{ val: value }}>
                                    <button>  <i className='fa fa-users'></i></button>
                                </NavLink>
                            </td>
                        </tr>
                    )
                })

            ) :
                <tr>
                    <td colSpan='8px' className='text-center'>
                        <i className='fa fa-spinner fa-pulse fa-2x'></i> Chargement...
                    </td>
                </tr>
            }

        </>
    )
}

export default GetAllManip