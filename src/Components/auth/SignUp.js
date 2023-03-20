import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {auth, googleProvider} from '../.././config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import Copyright from "./Copyright";
import {Alert, Snackbar} from "@mui/material";
import SnackbarInfo from "../SnackbarInfo";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openWrongMail, setOpenWrongMail] = useState(false);
    const [openWeakPassword, setOpenWeakPassword] = useState(false);
    const [mailInUse, setMailInUse] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            const errorCode = error.code
            console.log(error.code)
            if (errorCode === 'auth/invalid-email') {
                setOpenWrongMail(true)
            }

            if (errorCode === 'auth/weak-password') {
                setOpenWeakPassword(true)
            }

            if (errorCode === 'auth/email-already-in-use') {
                setMailInUse(true)
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.log(err)
        }

    }

    const theme = createTheme({
        typography: {
            fontSize: 20
        }
    });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Box sx={{
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{


                border: '1px solid lightgray',
                overflow: 'scroll',
                borderRadius: '20px',
                padding: '4rem',
                background: 'white',
                boxShadow: 2

            }}>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" align='center'>
                                Zarejestruj się w SmartSpend i zacznij oszczędzać już dziś!
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Adres Email"
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleEmailChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Hasło"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            onChange={handlePasswordChange}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onSubmit={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Masz już konto? Zaloguj się!
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Button

                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={signInWithGoogle}
                            >
                                Google
                            </Button>
                        </Box>
                        <Copyright sx={{mt: 5}}/>
                    </Container>
                </ThemeProvider>
                <SnackbarInfo severity={'error'} openState={openWrongMail} setOpenState={setOpenWrongMail} message={'Podany adres email jest nieprawidłowy!'} />
                <SnackbarInfo severity={'error'} openState={openWeakPassword} setOpenState={setOpenWeakPassword} message={'Hasło musi składać się z minimum 6 znaków!'} />
                <SnackbarInfo severity={'warning'} openState={mailInUse} setOpenState={setMailInUse} message={'Podany adres email jest już w użyciu. '} />

            </Box>
        </Box>
    );
}

export default SignUp