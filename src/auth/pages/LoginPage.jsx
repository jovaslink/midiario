import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography,Alert } from '@mui/material';
import { Google, Password } from '@mui/icons-material';
import { startLoginWithEmailPassword } from '../../store/slices';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { getAuth, getGoogleSingIn } from '../../store/slices';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

const validationForm= {
  email:[(value)=>{return value.includes('@');},'Tiene que ser un email válido.'],
  password:[(value)=>{return value.length >=6},'Tiene que tener mas de 6 caracteres.']

}; // UseForm tiene la capacidad de evaluar si el formulario es correcto. Si se desea se puede evaluar cada input del formulario por separado y no usar useForm

const dataForm= {
                email:'',
                password:''
  }

export const LoginPage = () => {
  
  const{statusApp, mensajeError} = useSelector ((state)=> state.auth );

  const estaAutenticado=useMemo(()=>{
        return statusApp==='revisando autenticación' || statusApp==='autenticado'  ;
      },[statusApp]);
  
  const dispatch = useDispatch();
  
  const {email,
        password,
        onChangeInput,
        inputform,
        emailValidate,
        passwordValidate,
        isFormValid
  }=useForm(dataForm, validationForm);

  const [formSubmitted, setFormSubmitted] = useState(false);

  

  const onSubmitForm=(event)=>{
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    //dispatch(getAuth(email,password));
    dispatch(startLoginWithEmailPassword(inputform));
    
  }


  const onGoogleSingIn=()=>{
    dispatch(getGoogleSingIn());
  }



  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmitForm} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                onChange={onChangeInput}
                label="Correo" 
                type="email" 
                name='email'
                placeholder='correo@gmail.com' 
                fullWidth
                error={!!emailValidate && formSubmitted }
                helperText={emailValidate}
                
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                onChange={onChangeInput}
                label="Contraseña" 
                type="password" 
                name="password"
                placeholder='Contraseña' 
                fullWidth
                error={!!passwordValidate && formSubmitted}
                helperText={passwordValidate}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }  display={ !!mensajeError ? '' : 'none'}>
               <Alert severity='error'>{mensajeError}</Alert>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={estaAutenticado} type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={estaAutenticado} onClick={onGoogleSingIn} variant='contained' fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}

