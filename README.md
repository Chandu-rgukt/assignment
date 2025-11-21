# 📦 Inventory Management System  
A full-stack Inventory Management Web Application built as part of the Skillwise Full Stack Developer Assignment.

Frontend: React + Tailwind CSS  
Backend: Node.js + Express + SQLite  
Deployment: Vercel (Frontend) + Render (Backend)

---

## 🚀 Live Demo

### **Frontend (Vercel)**  
https://inventory-management-three-silk.vercel.app

### **Backend (Render)**  
https://inventory-management-app-7s8f.onrender.com

---

## 📚 Table of Contents
- Features
- Screenshots
- Tech Stack
- API Endpoints
- Project Structure
- Installation & Setup
- Deployment
- Bonus Features
- CSV Format Info

---

## ✅ Features

### **1. Product Listing**
- Displays all inventory items
- Shows image, name, unit, brand, category, stock, status

### **2. Search**
- Real-time search by product name

### **3. Category Filter**
- Dropdown filter by category

### **4. Add Product**
- Modal form to add new product
- Validates duplicates
- Auto refresh on add

### **5. Inline Editing**
- Edit: name, unit, category, brand, stock
- Save & Cancel buttons
- Auto update backend
- Editing disables row-click

### **6. Import CSV**
- Upload CSV containing products
- Duplicate detection
- Inserts only new items

### **7. Export CSV**
- One-click download of all products in CSV format

### **8. Inventory History Sidebar**
- Opens by clicking a product row
- Shows:
  - Old quantity  
  - New quantity  
  - Timestamp  
  - User info  
- Sorted: newest → oldest

### **9. Stock Status Badge**
- Green: In Stock  
- Red: Out of Stock

### **10. Responsive Tailwind UI**
- Smooth table layout
- Buttons aligned properly
- Mobile-friendly

---

## 🛠 Tech Stack

### **Frontend**
- React.js  
- Tailwind CSS  
- Axios  
- Vercel Hosting  

### **Backend**
- Node.js  
- Express.js  
- SQLite3  
- Multer  
- CSV Parser  
- CORS  
- Render Hosting  

---

## 🗄 API Endpoints

### **Products**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/search?name=` | Search by name |
| POST | `/api/products` | Add new product |
| PUT | `/api/products/:id` | Update product |
| POST | `/api/products/import` | Import CSV |
| GET | `/api/products/export` | Export CSV |

### **History**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/:id/history` | Stock change history |

---

## 📁 Project Structure

```
assignment/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── database.js
│   ├── inventory.db
│   ├── server.js
│   ├── package.json
│   ├── .render-build.sh
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api/
    ├── public/
    ├── tailwind.config.js
    ├── package.json
```

---

## 🧩 Installation & Setup (Local)

### Clone repository
```
git clone <repo-url>
cd assignment
```

### Backend Setup
```
cd backend
npm install
node server.js
```

### Frontend Setup
```
cd frontend
npm install
npm start
```

---

## 🌍 Deployment

### **Backend – Render**
- Root Directory → `backend`
- Build Command → `./.render-build.sh`
- Start Command → `node server.js`
- Environment Variables:
  ```
  PORT=5000
  ```

### **Frontend – Vercel**
- Framework → React
- Root Directory → `frontend`
- Build Command → `npm run build`
- Output Directory → `build`
- Install Command → `npm install`

### **Frontend API Base URL**

```
const API = "https://inventory-management-app-7s8f.onrender.com/api/products";
```

---

## 🎁 Bonus Features Implemented
- Pagination + sorting support (backend)
- Clean Tailwind UI improvements
- Edit-mode safety (stops row-click)
- Duplicate name validation
- History logging for stock updates
- CSV strict formatting
- Better table alignment + fixed columns

---

## 📄 CSV Format

Example for import:

```
name,unit,category,brand,stock,status,image
Sugar,kg,Grocery,BrandX,10,In Stock,
Salt,kg,Grocery,BrandY,0,Out of Stock,
Milk,l,Dairy,BrandZ,12,In Stock,
```

---

## 🧑‍💻 Author
Chandu  
Full Stack Developer  
Skillwise Assignment Project  

---

## ✔ License
This project is created for educational & assignment purposes.
