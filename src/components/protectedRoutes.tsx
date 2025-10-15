import { Navigate } from "react-router-dom"

interface Props{
    isAllowed: boolean // Indicates whether the user has permission to enter the path
    children: React.ReactNode // This represents what will be shown to the user when they confirm their login.
            // used to describe everything React can render on screen
}

export const ProtectedRoute = ({isAllowed,children}: Props)=>{
    // if the user does not have permission, redirect them to the login page (“/”)
    if (!isAllowed) return <Navigate to="/"/> 
    // if you have permission, it will show the user the product view
    return children 
}