import axios from "axios"
// importamos axios para poder hacer solicitudes HTTP al backend.
// aca se usará para enviar las credenciales de login.
export const loginRequest = async (fullname: string, password:string) =>{
    return axios.post("http://localhost:3000/api/login",{
         fullname, 
        password
    }
    )
}