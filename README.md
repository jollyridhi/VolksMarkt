
# 🛒 VolksMarkt

**VolksMarkt** is a full-stack hyperlocal marketplace that allows users to discover nearby stores on a map, browse their products, and place orders—all in one platform. It supports two user roles (Buyers and Sellers) and includes a clean REST API backend, an interactive frontend, and a modular design for scalability.

---

## 🚀 Tech Stack

### 🔹 Frontend
- React.js (Create React App)
- Context API for global user state
- Fetch API for backend communication
- Map-based UI rendering

### 🔹 Backend
- Django
- Django REST Framework (DRF)
- SQLite (dev) / PostgreSQL (production-ready)
- Modular apps: `accounts`, `stores`, `orders`, `products`

---

## 🌐 Features

- 🧭 Map-based store discovery by location
- 🛍️ Seller product listings
- 📦 Order placement and status tracking
- 👤 Buyer & Seller role management
- 🔐 Secure model relationships with Django ORM
- 📡 REST APIs for all core functionalities
- 🖥️ Admin panel for data control (Django built-in)

---

## 📂 Project Structure

```
volksmarkt-backend-main/
├── accounts/         # Buyer/Seller logic
├── Orders/           # Order tracking APIs
├── Products/         # Product data
├── Stores/           # Store location data
├── volksmarkt/       # Django core (settings, URLs, WSGI)
├── manage.py

volksmarkt-frontend-main/
├── src/
│   ├── App.js
│   ├── Map.js
│   ├── userContext.js
│   ├── components/
│   └── getUserData.js
```

---

## 🔗 API Endpoints

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| GET    | `/stores/`       | List all stores             |
| POST   | `/stores/`       | Add new store               |
| GET    | `/products/`     | List products               |
| POST   | `/orders/`       | Create a new order          |
| GET    | `/buyers/`       | List buyers                 |
| GET    | `/sellers/`      | List sellers                |

---

## ⚙️ Setup Instructions

### 🧩 Backend (Django)
```bash
cd volksmarkt-backend-main
pipenv install       # or pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 🌍 Frontend (React)
```bash
cd volksmarkt-frontend-main
npm install
npm start
```

> 💡 You can change the API base URL in the React project using `.env`:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

---

## 🧪 Testing

- Backend APIs tested via **Postman**
- Frontend interactions tested manually with browser + console logs
- Django Admin can be used to verify models

---

## 🧠 Future Improvements

- JWT authentication with `djoser` or `simplejwt`
- Product filters by category and price
- Order history per user
- Seller dashboard with analytics
- Full deployment on Railway + Vercel

---

## 👤 Author

**Ridhi Jolly**  
B.Tech CSE @ Bennett University  
 [Email](mailto:ridhijolly9@gmail.com)

---

