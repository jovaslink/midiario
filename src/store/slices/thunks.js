import { singInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { checking, login,logout } from './authSlice';
import { clearNotesLogout } from './diarioSlice';

export const getAuth = ( email, password ) => {
    return async( dispatch, getState ) => {
        dispatch( checking() );
        

       
       
    }
}

export const getGoogleSingIn = () => {
    return async( dispatch, getState ) => {
        dispatch( checking() );
        const result = await singInWithGoogle();
               
        
        if(!result.ok){
            dispatch(logout(result));
            return;
        }
        dispatch( login(result));
        
        
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checking() );

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if ( !result.ok ) return dispatch(logout( result) );

        dispatch( login( result ))
        //console.log(result);

    }

}


export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checking() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ));

    }
}


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( logout() );
        dispatch(clearNotesLogout());
    
    }
}


