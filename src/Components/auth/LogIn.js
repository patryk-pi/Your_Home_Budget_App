import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "./Copyright";
import {auth, googleProvider} from '../.././config/firebase';
import {sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { InputAdornment} from "@mui/material";
import SnackbarInfo from "../SnackbarInfo";
import EmailIcon from '@mui/icons-material/Email';
import {Lock} from "@mui/icons-material";
import {NavLink, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppProvider";


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

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openWrongMail, setOpenWrongMail] = useState(false);
    const [openNoMail, setOpenNoMail] = useState(false);
    const [openWrongPassword, setOpenWrongPassword] = useState(false);
    const [openSentPassword, setOpenSentPassword] = useState(false);
    // HANDLER FUNCTION FOR SNACKBAR AND ALERT


    const triggerResetEmail = async (e) => {
e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);

            setOpenSentPassword(true);
        } catch (error) {

            const errorCode = error.code

            if (errorCode === 'auth/missing') {
                setOpenNoMail(true)
            }

            if (errorCode === 'auth/invalid-email') {
                setOpenNoMail(true)
            }
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {

            const errorCode = error.code
            console.log(error.code)

            if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
                setOpenWrongMail(true)
            }

            if (errorCode === 'auth/wrong-password') {
                setOpenWrongPassword(true)
            }
        }
    };

    const handleClickGoogle = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
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
                                        <NavLink onClick={triggerResetEmail} className="form__link" to='/'>
                                        Nie pamiętasz hasła?
                                        </NavLink>
                                    </Grid>
                                    <Grid item>
                                        <NavLink className="form__link" to="/signup">
                                            {"Nie masz konta? Zarejestruj się!"}
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Box>

                        <Copyright sx={{mt: 8, mb: 4}}/>
                    </Container>
                </ThemeProvider>
            </Box>
            <SnackbarInfo severity={'error'} openState={openWrongMail} setOpenState={setOpenWrongMail} message={'Podany adres email jest nieprawidłowy.'} />
            <SnackbarInfo severity={'error'} openState={openNoMail} setOpenState={setOpenNoMail} message={'Podaj adres email.'} />
            <SnackbarInfo severity={'error'} openState={openWrongPassword} setOpenState={setOpenWrongPassword} message={'Nieprawidłowe hasło.'} />
            <SnackbarInfo severity={'success'} openState={openSentPassword} setOpenState={setOpenSentPassword} message={'Wysłano linka do resetowania hasła.'} />

        </Box>
);
}

export default SignIn
