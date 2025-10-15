// These imports will allow us to create a store and maintain session persistence
// even if the page is reloaded.

import {create} from "zustand"
import {persist} from "zustand/middleware"
type State={
    token:string,
    isAuth: boolean
}

type Actions={
    setToken: (token:string) => void, // save a token and activate the session
    logout: () => void; // Delete the token and redirect to login
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
        // this is the name reflected in the localsotrage
    name: "auth"
}
))