import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';

import { login, logout, startLoadingNotes } from '../store/slices';



export const useCheckAuth = () => {
  
    const { statusApp } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user ) return dispatch( logout() );

        const { uid, email, displayName, displayFoto } = user;
        dispatch( login({ uid, email, displayName, displayFoto }) );
        dispatch( startLoadingNotes() );
      

        })
    }, []);

    return statusApp;
}
