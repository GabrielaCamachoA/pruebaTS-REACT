import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { getProducts, creatProduct, updateProduct, deleteProduct } from "../api/product"
import { GETProduct } from "../types/GetProducts"

export default function Productos() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<GETProduct>()

  const [products, setProducts] = useState<GETProduct[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("")

  const fetchProducts = async () => {
    const res = await getProducts()
    setProducts(res)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Crear o actualizar
  const onSubmit: SubmitHandler<GETProduct> = async (data) => {
    try {
      if (editingId) {
        await updateProduct(editingId, {
          SKU: data.SKU,
          name_product: data.name_product,
          brand: data.brand,
          quantity: data.quantity,
          price: data.price,
          isActive: data.isActive,
          category: data.category,
          img_url: data.img_url,
          createdAt: data.createdAt
        })
        alert("✅ Producto actualizado!")
      } else {
        await creatProduct(data)
        alert("✅ Producto creado!")
      }
      reset()
      setEditingId(null)
      await fetchProducts()
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert(error.response.data.message)
      } else {
        console.error(error)
        alert("❌ Error al guardar el producto")
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setValue("img_url", imageUrl)
    }
  }

  const startEditing = (product: GETProduct) => {
    setEditingId(product.id)
    setValue("SKU", product.SKU)
    setValue("name_product", product.name_product)
    setValue("brand", product.brand)
    setValue("quantity", product.quantity)
    setValue("price", product.price)
    setValue("isActive", product.isActive)
    setValue("category", product.category)
    setValue("img_url", product.img_url)
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id)
    alert("🗑️ Producto eliminado")
    await fetchProducts()
  }

  // 🔍 Filtro por categoría
  const filteredProducts = filterCategory
    ? products.filter((p) => p.category.toLowerCase() === filterCategory.toLowerCase())
    : products

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editingId ? "Edit product" : "Create product"}
      </h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <label className="w-full border p-2 rounded bg-indigo-600 text-white text-center cursor-pointer hover:bg-indigo-700 transition">
          Enter an image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <input
          {...register("SKU", { required: "SKU is required" })}
          placeholder="SKU"
          className="w-full border p-2 rounded"
        />
        {errors.SKU && <p className="text-red-500 text-sm">{errors.SKU.message}</p>}

        <input
          {...register("name_product", { required: "name is required" })}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        {errors.name_product && <p className="text-red-500 text-sm">{errors.name_product.message}</p>}

        <input
          type="number"
          {...register("quantity", { required: "quantity is required" })}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}

        <input
          {...register("price", { required: "price is required" })}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <input
          {...register("category", { required: "category is required" })}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      {/* SELECTOR DE CATEGORÍA */}
      <div className="mt-6 flex justify-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded w-1/2"
        >
          <option value="">All categories</option>
          <option value="Electrónicos">Electrónicos</option>
          <option value="Ropa">Ropa</option>
          <option value="Hogar">Hogar</option>
        </select>
      </div>

      {/* LISTA FILTRADA */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">List of products</h2>
      <ul className="space-y-2 py-4 px-4">
        {filteredProducts.map((p) => (
          <li
            key={p.id}
            className="flex flex-col md:flex-row justify-between items-center border p-3 rounded gap-4"
          >
            <div>
              <div className="flex gap-4">
                <img
                  src={p.img_url}
                  alt={p.name_product}
                  className="w-32 h-32 object-cover mt-2 mx-auto rounded"
                />
                <div>
                  <h3 className="font-semibold">{p.SKU}</h3>
                  <p className="font-semibold">{p.name_product}</p>
                </div>
              </div>
              <p>{p.quantity} unidad/unidades</p>
              <p>${p.price}</p>
              <p>{p.category}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => startEditing(p)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
