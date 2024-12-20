import { Navigate, Route, Routes } from "react-router-dom"
import { MiDiarioPage } from "../pages/MiDiarioPage"


export const MiDiarioRoutes = () => {
  return (
        <Routes>
            
            <Route path='/' element={<MiDiarioPage/>} />
            <Route path='/*' element={<Navigate to='/'/>} />
        </Routes>


  )
}
