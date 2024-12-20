import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { MiDiarioLayout } from '../layout/MiDiarioLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/slices';

export const MiDiarioPage = () => {
  const dispatch= useDispatch();
  const {isSaving, active} = useSelector(state => state.diario);

  const onClickNewNote = ()=>{

    dispatch(startNewNote()); //iniciamos una nueva nota en firebase, obtenemos su id
  }



  return (
    <MiDiarioLayout>
      
      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}

     {/* <NothingSelectedView />*/ }

     {
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }

    


      <IconButton
        onClick = {onClickNewNote}
        size='large'
        disabled= {isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </MiDiarioLayout>
  )
}
