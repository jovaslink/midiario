import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./diarioSlice";
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';





export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/diario/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;  
        

        // dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
        
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().diario; //renombramos active por note para tener mejor referencia de que es la nota activa

        const noteToFireStore = { ...note };
        delete noteToFireStore.id; //borramos el id para que concuerde con la informacion de firestore
    
        const docRef = doc( FirebaseDB, `${ uid }/diario/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });//instrucciones propias de firestore

        dispatch( updateNote( note ) );

    }
}

 export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
            
        // await fileUpload( files[0] );
        const fileUploadPromises = []; //un array de promesas para ejecutar al mismo tiempo. 
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) ) //la unimos con la funcion helper separada
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ));
        
        
    }
}


export const startDeletingNote = () => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().diario;

        const docRef = doc( FirebaseDB, `${ uid }/diario/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );
        

    }
} 