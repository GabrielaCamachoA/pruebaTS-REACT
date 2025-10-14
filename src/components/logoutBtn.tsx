import { useNavigate } from "react-router-dom";
// esto es un hook de react para redirigir al usuario
import { useAuthStore } from "../store/authStore";
// se importa el store global de autenticación, esta creado con zustand (nos permite guardar el token con persistencia)

function LogoutButton() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  // obtiene la función logout del store, que limpia el token y cambia el estado a "no autenticado"
  return (
    <button
    className="text-indigo-600 hover:underline"
      onClick={() => {
        logout();       // borra el token y isAuth
        navigate("/"); // redirige al login
      }}
    >
     Logout
    </button>
  );
}

export default LogoutButton;
