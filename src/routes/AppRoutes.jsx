import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from "../pages/Cadastro"
import Login from "../pages/Login"
import ListarUsuarios from "../pages/ListarUsuarios"

function AppRoutes () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Cadastro />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/listar-usuarios' element={<ListarUsuarios />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes