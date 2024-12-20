import {Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { MiDiarioRoutes } from "../midiario/routes/MiDiarioRoutes";
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  
  const status = useCheckAuth();
  console.log(status);

  
  if ( status === 'revisando autenticación' ) {
    return <CheckingAuth />
  }

  
  
  return (
    
    <Routes>


      
        {
          (status === 'autenticado')
           ?  <Route  path="/*" element={<MiDiarioRoutes/>}/>
   
           : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }

        
        <Route path='/*' element={ <Navigate to='/auth/login' />  } />
       
    </Routes>


  )
}
