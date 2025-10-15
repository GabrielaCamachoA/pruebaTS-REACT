import { useNavigate } from "react-router-dom";
// this is a React hook to redirect the user
import { useAuthStore } from "../store/authStore";
// Import the global authentication store, created with Zustand (allows us to persistently store the token).

function LogoutButton() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  // gets the logout function from the store, which clears the token and changes the state to “not authenticated”
  return (
    <button
    className="text-indigo-600 hover:underline"
      onClick={() => {
        logout();       // deletes the token and isAuth
        navigate("/"); // redirect to login
      }}
    >
     Logout
    </button>
  );
}

export default LogoutButton;
