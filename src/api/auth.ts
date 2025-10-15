import axios from "axios"
// import axios to be able to make HTTP requests to the backend.
// Here it will be used to send login credentials.
export const loginRequest = async (fullname: string, password:string) =>{
    return axios.post("http://localhost:3000/api/login",{
         fullname, 
        password
    }
    )
}