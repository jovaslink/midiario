import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { startCreatingUserWithEmailPassword } from '../../store/slices';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';

import { useState,useMemo } from 'react';


const validationForm= {
  email:[(value)=>{return value.includes('@');},'Tiene que ser un email válido.'],
  password:[(value)=>{return value.length >=6},'Tiene que tener mas de 6 caracteres.'],
  displayName:[ value => value.length >= 3 ,'Tiene que tener mas de 3 carácteres.']
}; // UseForm tiene la capacidad de evaluar si el formulario es correcto. Si se desea se puede evaluar cada input del formulario por separado y no usar useForm

const formData={
  email:'',
  password:'',
  displayName: ''
  }

export const RegisterPage = () => {

  const dispatch = useDispatch();
 

  const{statusApp,mensajeError} = useSelector ((state)=> state.auth );
  
  const estaAutenticado=useMemo(()=>{
    return statusApp==='revisando autenticación';
  },[statusApp]);

  const [formSubmitted, setFormSubmitted]= useState(false);

  const {email,
        password,
        onChangeInput,
        displayName,
        inputform,
        displayNameValidate,
        emailValidate,
        passwordValidate,
        isFormValid
        }=useForm(formData, validationForm);

  

   const onSubmit = (e)=>{
    e.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(inputform));

  
   }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                value={displayName}
                name='displayName'
                onChange={onChangeInput}
                error={!!displayNameValidate && formSubmitted }
                helperText={displayNameValidate}
               
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@gmail.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onChangeInput}
                error={!!emailValidate && formSubmitted}
                helperText={emailValidate }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onChangeInput}
                error={!!passwordValidate && formSubmitted}
                helperText={passwordValidate}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid 
            display={ !!mensajeError ? '' : 'none'}
>
              <Alert severity='error'>{mensajeError}</Alert>
              
              </Grid>
              
              <Grid item xs={ 12 }>
                <Button disabled={estaAutenticado} type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
