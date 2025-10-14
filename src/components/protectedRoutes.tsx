import { Navigate } from "react-router-dom"

interface Props{
    isAllowed: boolean // Indica si el usuario tiene permiso para entrar a la ruta
    children: React.ReactNode // este representa lo que se le mostrará al usuario al confirmar su ingreso
            // sirve para describir todo lo que React puede renderizar en pantalla
}

export const ProtectedRoute = ({isAllowed,children}: Props)=>{
    // si el usuario no tiene permiso, lo redirige al login ("/")
    if (!isAllowed) return <Navigate to="/"/> 
    // si tiene permisom le mostrará al usuario la vista de los productos
    return children 
}