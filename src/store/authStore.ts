// estas imporaciones nos vana permitir crear un store y matener la persitencia de la sesión
// aunque se recargue la pagina

import {create} from "zustand"
import {persist} from "zustand/middleware"
type State={
    token:string,
    isAuth: boolean
}

type Actions={
    setToken: (token:string) => void, // guarda un token y activa la sesión
    logout: () => void; // borra el token y redirige al login
}

export const useAuthStore = create(persist<State & Actions>(
    (set)=>({
    token: "",
    isAuth:false,
    setToken: (token:string) => set((state)=>({
        token,
        isAuth: true
    })),
    logout: () => {
        set(() => ({
          token: "",
          isAuth: false,
        }));
        localStorage.removeItem("auth");
      },
    }), {
        // este es el nombre que se refleja en el localsotrage
    name: "auth"
}
))