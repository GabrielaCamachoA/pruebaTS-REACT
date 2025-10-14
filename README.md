
# TechNova — Technology Catalog Management System


## Project Description
TechNova is a web system made with React + TypeScript.
It helps a tech company manage products, users, and orders in one place.

The goal is to replace Excel sheets and manual messages with a digital tool that keeps product data safe, organized, and always updated.
The system avoids duplicate SKUs, helps manage stock, and controls who can access or edit information.

## Technologies Used
- TypeScript → strong typing and safety
- React.js (Hooks + Context API) → component-based UI
- Axios → HTTP requests for the API
- Tailwind CSS → fast and responsive 
design.
- Express

### DataBase
Models
``` bash
export interface Product {
    id: number;
    SKU: string;
    name_product: string;
    brand: string;
    quantity: number;
    price: number;
    isActive: boolean;
    category: string;
    img_url: string;
    createdAt: string;
}
export interface User {
    id: number;
    fullname: string;
    password: string;
    role: string;
    createdAt: string;
}
```
### Main Features
``` bash
✅ User login and authentication
✅ Create, edit, and delete products
✅ Unique SKU validation
✅ Dashboard with reusable Button
✅ Filter by brand or category
✅ Error messages for invalid actions
✅ Success alerts for completed operations
```
### 1. Clone the Repository
```bash
git clone <repository_url>
cd <project_folder>

```
### 2. Install dependices
```bash
npm i

```
### Author

👩‍💻 Gabriela Camacho
``` bash
Clan: Macondo
Email: gabrielacacosta31@gmail.co