// These imports allow us to use the forms and the SubmitHandler type, which allows us to correctly type the submission function.
import { useForm, SubmitHandler } from "react-hook-form"
import { GETUsers } from "../types/GetUsers";

// import the function that will make the request to the backend to authenticate the user
import { loginRequest } from "../api/auth"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // we get the setToken function from the global store (state)
  // this allows us to save the token once the login is successful
  const setToken= useAuthStore(state => state.setToken)

   // initialize the form with react-hook-form and type it with our inputs
  // register: connect the inputs with react-hook-form
  // handleSubmit: handle the form submission event
  // errors: save the validation error messages
  const { register, handleSubmit, formState: { errors } } = useForm<GETUsers>()
  const onSubmit: SubmitHandler<GETUsers> = async (data) => {
    try {
      const response = await loginRequest(data.fullname, data.password)

      console.log("Login exitoso:", response.data)

      //save the token in Zustand (this will automatically persist it in localStorage)
      setToken(response.data.token)

      navigate("/dashboard")
    } catch (error: any) {
      console.error("Error en el login:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Credenciales incorrectas")
    }
  }
  

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="name"
          {...register("fullname", { required: "Name is required" })}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button 
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Login
      </button>
     
      
    </form>
  )
}
