import axios from 'axios';
import React from 'react'
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

const GetAllOptions = (props) => {

    let filieres = props.filieres;
    let getFilieres = props.getFilieres;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const deleteOptions = (id) => {
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
                        getFilieres();
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
            {filieres && filieres.taille > 0 ? (
                filieres.data.filter(value => {
                    let valueConvert = value.nom.toLowerCase()

                    return (
                        valueConvert.includes(valueSearch)
                    )

                }).map((filiere, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{filiere.nom}</td>
                            <td>{filiere.promotion}</td>
                            <td>{filiere.description}</td>

                            <td style={{ width: "271px" }}>
                                <NavLink to={{ pathname: "addOption" }} state={{ val: filiere }}>
                                    <button className='btn btn-success me-1'>
                                        <i className='fa fa-edit'></i> Editer
                                    </button>
                                </NavLink>
                                <button className='btn btn-danger' onClick={() => deleteOptions(filiere.id)}>
                                    <i className='fa fa-trash'></i> Supprimer</button>
                            </td>
                        </tr>
                    )
                })

            ) :
                <tr>
                    <td colSpan='5px' className='text-center'>
                        <i className='fa fa-spinner fa-pulse fa-2x'></i> Chargement...
                    </td>
                </tr>
            }

        </>
    )
}

export default GetAllOptions