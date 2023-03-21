import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "./Copyright";

import {auth, googleProvider} from '../.././config/firebase';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {Alert, InputAdornment, Snackbar} from "@mui/material";
import SnackbarInfo from "../SnackbarInfo";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {Lock} from "@mui/icons-material";


const theme = createTheme({
    overrides: {
        MuiInputBase: {
            input: {
                border: 'none',
                '&::before': {
                    content: 'none',
                },
            },

        },
    },
    typography: {
        fontSize: 20
    }
});

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openWrongMail, setOpenWrongMail] = useState(false);
    const [openWrongPassword, setOpenWrongPassword] = useState(false);
    // HANDLER FUNCTION FOR SNACKBAR AND ALERT


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {

            const errorCode = error.code
            console.log(error.code)
            if (errorCode === 'auth/invalid-email') {
                setOpenWrongMail(true)
            }

            if (errorCode === 'auth/wrong-password') {
                setOpenWrongPassword(true)
            }
        }
    };

    const handleClickGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error)
        }
    }

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
            alignItems: 'center',
            fontFamily: 'Open Sans'
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
                                marginTop: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                         
                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: 700
                            }}>
                                Zaloguj
                            </h1>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                                mt: 1,
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adres email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleEmailChange}
                                    variant='filled'
                                    className='inputRounded'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                        disableUnderline: true,
                                    }}
                                    InputLabelProps={{
                                        style:{
                                            fontFamily: 'Open Sans',
                                            color: 'rgba(0,55,87,1)'
                                        }
                                    }}

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Hasło"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                    variant='filled'
                                    className='inputRounded'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                        disableUnderline: true,
                                    }}
                                    InputLabelProps={{
                                        style:{
                                            fontFamily: 'Open Sans',
                                            color: 'rgba(0,55,87,1)'
                                        }
                                    }}

                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    InputLabelProps={{
                                        style:{
                                            fontFamily: 'Open Sans',
                                            color: 'rgba(0,55,87,1)'
                                        }
                                    }}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        background: 'linear-gradient(149deg, rgba(0,55,87,1) 0%, rgba(0,96,135,1) 46%, rgba(0,157,189,1) 86%)',
                                        fontFamily: 'Open Sans',

                                }}
                                >
                                    Zaloguj
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ fontFamily: 'Open Sans',mt: 3, mb: 2,  background: 'linear-gradient(149deg, rgba(0,55,87,1) 0%, rgba(0,96,135,1) 46%, rgba(0,157,189,1) 86%)',}}
                                    type='button'
                                    fullWidth

                                    onClick={handleClickGoogle}>Zaloguj przez Google </Button>
                            </Box>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Nie pamiętasz hasła?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Nie masz konta? Zarejestruj się!"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>

                        <Copyright sx={{mt: 8, mb: 4}}/>
                    </Container>
                </ThemeProvider>
            </Box>
            <SnackbarInfo severity={'error'} openState={openWrongMail} setOpenState={setOpenWrongMail} message={'Podany adres email jest nieprawidłowy!'} />
            <SnackbarInfo severity={'error'} openState={openWrongPassword} setOpenState={setOpenWrongPassword} message={'Nieprawidłowe hasło!'} />

        </Box>
);
}

export default SignIn
