// estas importaciones nos permiten majer los formularios y el tipo SubmitHandler, que nos permite tipar correctamente la función de envío.
import { useForm, SubmitHandler } from "react-hook-form"
import { GETUsers } from "../types/GetUsers";

// importamos la función que hará la solicitud al backend para autenticar al usuario
import { loginRequest } from "../api/auth"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // obtenemos la función setToken desde el store global (Zustand)
  // esto nos permite guardar el token una vez que el login sea exitoso
  const setToken= useAuthStore(state => state.setToken)

   // inicializamos el formulario con react-hook-form y lo tipamos con nuestros Inputs
  // register: conecta los inputs con react-hook-form
  // handleSubmit: maneja el evento de envío del formulario
  // errors: guarda los mensajes de error de validación
  const { register, handleSubmit, formState: { errors } } = useForm<GETUsers>()
  const onSubmit: SubmitHandler<GETUsers> = async (data) => {
    try {
      const response = await loginRequest(data.fullname, data.password)

      console.log("Login exitoso:", response.data)

      //guardar el token en Zustand (esto lo persistirá en localStorage automáticamente)
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
