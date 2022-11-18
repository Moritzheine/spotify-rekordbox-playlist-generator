import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, ReactElement } from "react";
import { getStoreFromContext } from "../helpers";
import useScrollTrigger from '@mui/material/useScrollTrigger';

const HeaderBar: FC = (): ReactElement => {
    const { spotifyStore } = getStoreFromContext()
    return (
        <AppBar position="static" color="inherit">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Hallo {spotifyStore.user?.display_name}!
                </Typography>
                <Button onClick={() => {
                    spotifyStore.authorizeUser()
                }}>Login</Button>
                <Button onClick={() => {
                    window.localStorage.removeItem("token")
                    spotifyStore.authToken = undefined
                    window.location.reload()
                }}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default observer(HeaderBar);