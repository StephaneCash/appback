import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Grid, Paper, Typography, Link, Button } from "@material-ui/core"


function Inscription() {

    const paperStyle = { padding: 20, height: 'auto', width: 340, margin: '20px auto', backgroundColor: 'white' }
    const backgroundColorAvatar = {
        width: "50px"
    };
    const styleTextField = { marginBottom: '10px' };

    const [btnState, setBtnState] = useState(false);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [err, setErr] = useState({});
    const [pseudo, setPseudo] = useState('');

    // Is Valids Inputs
    const [isValidEmail, setIsValidEmail] = useState(false);

    const handleEmail = (e) => {
        if (e.target.value === "") {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
            setErr("")
        }
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
    }

    useEffect(() => {
        setErr("")
    }, [])

    let navigate = useNavigate();

    const connecter = () => {
        setBtnState(true);

        const url = 'http://localhost:5000/api/users';

        if (pwd !== "" && email !== "" && pseudo !== "") {
            axios.post(url, { email, password: pwd, nom: pseudo }).then(res => {
                setErr("")
                if (res.data.jeton) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
                navigate('/');
                setBtnState(false);
            }).catch(erreur => {
                console.log(erreur)
                setErr(erreur.response.data ? erreur.response.data : "")
                setBtnState(false);
            })
        } else {
            setErr('Veuillez remplir tous les champs svp !!!');
            setBtnState(false);
        }
    };

    console.log(err)
    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center" style={{ backgroundColor: 'white' }}>
                        <img src="" style={backgroundColorAvatar} alt="avatr" />
                        <h4 className='mt-3'>S'inscrire</h4>
                        <i className='fa fa-user-circle fa-2x'></i>
                    </Grid>

                    <span>
                        {
                            btnState && isValidEmail ? <span className='text-danger'>Veuillez entrer une adresse email svp.</span> : ""
                        }
                    </span>

                    <div className="form-group mt-4">
                        <label className="mt-1">Entrer un Pseudo</label>
                        <input placeholder="Pseudo" required type="text"
                            className='form-control mt-1' onChange={(e) => setPseudo(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label className="mt-1">Entrer une adresse email</label>
                        <input placeholder="Nom d'utilisateur ou email" required type="email"
                            className='form-control mt-1' onChange={(e) => (handleEmail, setEmail(e.target.value))}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label>Votre mot de passe</label>
                        <input className='form-control mt-1' type="password" style={styleTextField}
                            placeholder="Mot de passe" onChange={handlePwd}
                            required />
                    </div>

                    {err.length > 0 && <span className='text-danger text-center'>{err}.</span>}


                    <Button variant="contained" onClick={connecter} className='mt-3' fullWidth style={{ backgroundColor: '#0c50a2', color: "#fff" }}>
                        {btnState ? <i className='fa fa-spinner fa-spin'></i> : "S'inscrire"}
                    </Button>

                    <Typography>
                        <Link href="#">
                            Mot de passe oublié ?
                        </Link>
                    </Typography>


                    <Typography className='mb-2'>
                        Avez-vous déjà un compte ? <br />
                        <NavLink to="/" style={{ textAlign: "center" }}>
                            Connectez-vous
                        </NavLink>
                    </Typography>
                    <br />
                    <br />
                </Paper>
            </Grid>
        </div>
    )
}

export default Inscription