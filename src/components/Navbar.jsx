import { AppBar, Avatar, Badge, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Mail, Notifications, SettingsPower } from "@material-ui/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    tooBar: {
        display: "flex",
        justifyContent: 'space-between',
        backgroundColor: '#0c50a2'
    },
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    icons: {
        display: "flex",
        alignItems: "center"
    },
    badge: {
        marginRight: theme.spacing(2),
    },
    logout: {
        marginLeft: theme.spacing(1),
        cursor: "pointer"
    }
}));

const Navbar = () => {

    const classes = useStyles();
    let navigate = useNavigate();

    const handleDeconncet = () => {
        navigate("/")
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.tooBar}>
                    <Typography variant="h6" component="h2" className={classes.logoLg}>
                        Admin Atélier électrique
                    </Typography>
                    <Typography variant="h6" component="h2" className={classes.logoSm}>
                        Admin Atélier électrique
                    </Typography>
                    <div className={classes.icons}>
                        <Badge badgeContent={4} color="secondary" overlap="rectangular" className={classes.badge}>
                            <Mail />
                        </Badge>
                        <Link to='/annonces'>
                            <Badge badgeContent={"6"} overlap="rectangular"
                                style={{ color: "#fff" }} color="secondary" className={classes.badge}>
                                <Notifications />
                            </Badge>
                        </Link>
                        <Avatar style={{ backgroundColor: "#555" }} src="s" />
                        <SettingsPower className={classes.logout} onClick={handleDeconncet} />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;