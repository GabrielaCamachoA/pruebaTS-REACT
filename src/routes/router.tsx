import { Route, Routes } from "react-router-dom";
import Productos from "../pages/Dashboard";
import Login from "../pages/Login";
import { ProtectedRoute } from "../components/protectedRoutes";
import { useAuthStore } from "../store/authStore";

export default function AppRouter() {
    const isAuth = useAuthStore(state => state.isAuth)
    return( 
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={
            <ProtectedRoute isAllowed={isAuth}>
                <Productos/>
            </ProtectedRoute>
        }/>
    </Routes>
    );
}