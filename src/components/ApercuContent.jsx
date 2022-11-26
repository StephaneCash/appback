import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, makeStyles } from "@material-ui/core";
import { Announcement, ApartmentTwoTone, Group, MonetizationOn, PeopleRounded, PostAddTwoTone } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    griddash: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
    },
    stat: {
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
            marginTop: "10px"
        }
    },
    courb: {
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
            marginTop: "10px"
        }
    },
    courbStatist: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        },
    },
}));


function ApercuContent() {
    const classes = useStyles();

    const [manip, setManip] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [eleves, setEleves] = useState([]);

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
        axios.get('http://localhost:5000/api/filieres')
            .then(res => {
                setFilieres(res.data);
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    const getAllEleves = () => {
        axios.get('http://localhost:5000/api/eleves')
            .then(res => {
                setEleves(res.data);
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    useEffect(() => {
        getAllManip();
        getAllFilieres();
        getAllEleves();
    }, [])

    return (
        <div className='contentDashboardEvaluate'>
            <Grid sm={4} xs={4} className={classes.stat} item={true} id="stat">
                <Card>
                    <CardHeader
                        title="Manipulations"
                        avatar={
                            <Group />
                        }
                        subheader="Nombre total de manipulations"
                    />
                    <div className="d-flex">
                        <CardContent>
                            <Typography variant="h5" style={{ color: "#555" }}>
                                {manip && manip.taille !== undefined ? manip.taille : <i className='fa fa-spinner fa-pulse'></i>}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to="/manip" style={{ textDecoration: "none" }}>
                                <Button
                                    className='btn-voir-tout'
                                    variant="contained"
                                    size="small"
                                    style={{
                                        backgroundColor: "#0c50a2",
                                        color: "#fff",
                                    }}>V<span className="span" >oir tout</span></Button>
                            </Link>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
            <Grid sm={4} xs={4} item={true} className={classes.stat} id="stat">
                <Card>
                    <CardHeader
                        title="Options"
                        avatar={
                            <Announcement />
                        }
                        subheader="Nombre total d'options"
                    />
                    <div className="d-flex">
                        <CardContent>
                            <Typography variant="h5" style={{ color: "#555" }}>
                                {filieres && filieres.taille !== undefined ? filieres.taille : <i className='fa fa-spinner fa-pulse'></i>}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to="/options" style={{ textDecoration: "none" }}>
                                <Button
                                    className='btn-voir-tout'
                                    variant="contained"
                                    size="small" style={{ backgroundColor: "#0c50a2", color: "#fff" }}>
                                    V<span className="span">oir tout</span>
                                </Button>
                            </Link>
                        </CardActions>
                    </div>
                </Card>
            </Grid>

            <Grid sm={4} xs={4} item={true} className={classes.stat} id="stat">
                <Card>
                    <CardHeader
                        title="Elèves"
                        avatar={
                            <Group />
                        }
                        subheader="Nombre total des élèves"
                    />
                    <div className="d-flex">
                        <CardContent>
                            <Typography variant="h5" style={{ color: "#555" }}>
                                {eleves && eleves.taille !== undefined ? eleves.taille : <i className='fa fa-spinner fa-pulse'></i>}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to="/eleves" style={{ textDecoration: "none" }}>
                                <Button
                                    className='btn-voir-tout'
                                    variant="contained"
                                    size="small"
                                    style={{ backgroundColor: "#0c50a2", color: "#fff" }}>
                                    V<span className="span" style={{}}>oir tout</span>
                                </Button>
                            </Link>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
        </div>
    )
}

export default ApercuContent