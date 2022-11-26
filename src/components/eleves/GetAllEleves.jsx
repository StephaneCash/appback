import axios from 'axios';
import React from 'react'
import { NavLink } from 'react-router-dom';
import swal from "sweetalert";


function GetAllEleves(props) {

    let eleves = props.eleves;
    let getAllEleves = props.getAllEleves;
    let filiereSearch = props.filiereSearch;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const deleteCours = (id) => {
        swal({
            title: "Avertissement.",
            text: "Etes-vous sûr de vouloir supprimer cet élève ?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/eleves/${id}`)
                    .then(resp => {
                        getAllEleves();
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
            {eleves && eleves.taille > 0 ? (
                eleves.data.filter(value => {
                    let valueConvert = value.nom.toLowerCase();
                    let postnomConvert = value.postnom.toLowerCase();
                    let prenomConvert = value.prenom.toLowerCase();

                    if (valueSearch) {
                        return (
                            valueConvert.includes(valueSearch) || postnomConvert.includes(valueSearch)
                            || prenomConvert.includes(valueSearch)
                        )
                    } else if (filiereSearch) {
                        if (filiereSearch === "--Filière--") {
                            return value
                        } else {
                            return value.filieres.nom.includes(filiereSearch)
                        }
                    } else {
                        return value
                    }

                }).map((eleve, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{eleve.nom}</td>
                            <td>{eleve.postnom}</td>
                            <td>{eleve.prenom}</td>
                            <td>{eleve.sexe}</td>

                            <td>
                                {eleve.filieres && eleve.filieres !== "undefined" && eleve.filieres.nom}
                            </td>
                            <td>
                                {eleve.filieres && eleve.filieres !== "undefined" && eleve.filieres.promotion}
                            </td>

                            <td style={{ width: "271px" }}>
                                <NavLink to={{ pathname: "addEleve" }} state={{ val: eleve }}>
                                    <button className='btn btn-success me-1'>
                                        <i className='fa fa-edit'></i> Editer
                                    </button>
                                </NavLink>
                                <button className='btn btn-danger' onClick={() => deleteCours(eleve.id)}>
                                    <i className='fa fa-trash'></i> Supprimer</button>
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

export default GetAllEleves