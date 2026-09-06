# Wanderlust 🌍✈️

> A modern, responsive, full-stack Airbnb-inspired property listing and booking web platform built with Node.js, Express, MongoDB, EJS, and Bootstrap 5.

![NodeJS](https://img.shields.io/badge/Node.js-20+-68a063?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-PBKDF2%20Auth-34E27A?style=for-the-badge&logo=passport&logoColor=white)

---

## 📖 Overview

**Wanderlust** is a production-grade property exploration, listing, and reservation platform designed to mirror real-world hospitality marketplaces. Users can browse stays worldwide, filter by travel categories, search destinations, make reservations with automated price calculation, submit reviews, and host their own spaces with strict owner-based authorization.

---

## ✨ Key Features

### 🏠 Property Listings & Host Management (CRUD)
- **Browse & Discover**: Explore diverse accommodations with high-resolution imagery, pricing, and locations.
- **Host Stays**: Authenticated users can publish new properties with custom descriptions, images, categories, and amenities.
- **Edit & Update**: Hosts can modify property rates, details, and photos at any time.
- **Delete with Cascading Cleanup**: Deleting a listing automatically deletes all associated reviews and bookings using Mongoose middleware hooks.

### 🔐 Authentication & Role-Based Authorization
- **Session-Based Authentication**: Secure cookie sessions powered by `express-session` and `passport-local`.
- **Cryptographic Password Hashing**: Passwords salted and hashed with PBKDF2 via `passport-local-mongoose`.
- **Strict Authorization Checks**:
  - Only authenticated users can list properties, reserve stays, or write reviews.
  - Only the verified listing owner can edit or delete a listing.
  - Only the review author can delete their own review.
  - Guests can only view and cancel their own bookings.
- **Post-Login Redirection**: Seamlessly redirects users back to the page they were attempting to access before logging in.

### 📅 Booking & Reservation Engine
- **Interactive Reservation Widget**: Real-time stay duration calculation and total price breakdown including cleaning fees and taxes.
- **Date Validation**: Ensures check-out dates succeed check-in dates and disables historical dates.
- **My Bookings Dashboard**: Dedicated traveler dashboard showing upcoming trips, guest counts, pricing breakdowns, and booking status with cancellation capability.

### 🔍 Search & Category Filtering
- **Destination & Keyword Search**: Multi-field search across titles, locations, descriptions, and countries.
- **Airbnb-Style Category Bar**: Filter listings by *Trending, Beachfront, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Arctic, Luxury, and Rooms*.
- **Live Tax Toggle Switch**: Toggle "+18% GST" on pricing dynamically via interactive DOM updates.

### ⭐ Reviews & Ratings
- **5-Star Rating System**: Submit ratings from 1 to 5 stars alongside detailed review commentary.
- **Review Attributions**: Reviews display author avatars, timestamps, and star icons.

### 🎨 UI/UX & Responsive Design
- Modern Airbnb-inspired aesthetic with clean typography (`Plus Jakarta Sans`), subtle elevation, and responsive flexbox/grid layouts.
- Fully responsive on mobile phones, tablets, laptops, and wide monitors.
- Mobile-friendly navbar with collapsible toggle navigation.
- Accessible error alerts, dismissible flash notifications, and friendly empty states for zero search results or empty bookings.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Node.js, Express.js (v5.x), RESTful Architecture |
| **Database** | MongoDB, Mongoose ODM (v9.x) |
| **Authentication** | Passport.js, Passport-Local, Passport-Local-Mongoose |
| **Session Management** | Express-Session, Connect-Flash |
| **Data Validation** | Joi (server-side validation), Bootstrap HTML5 (client-side) |
| **Frontend / Templating** | EJS, EJS-Mate (boilerplate layouts), Custom CSS |
| **CSS Framework & Icons** | Bootstrap 5.3, Font Awesome 6.5, Google Fonts |

---

## 📂 Project Architecture

```
Wanderlust/
├── controllers/          # Business logic handlers (MVC)
│   ├── listings.js       # Listing CRUD & query filters
│   ├── reviews.js        # Review creation & deletion
│   ├── users.js          # Authentication (signup, login, logout)
│   └── bookings.js       # Reservations & cancellations
├── models/               # Mongoose schemas & data models
│   ├── listing.js        # Listing schema with cascade hooks
│   ├── review.js         # Review schema with user/listing refs
│   ├── user.js           # User schema with Passport plugin
│   └── booking.js        # Booking schema with status & totals
├── routes/               # Modular Express REST routers
│   ├── listing.js        # /listings endpoints
│   ├── review.js         # /listings/:id/reviews endpoints
│   ├── user.js           # /signup, /login, /logout endpoints
│   └── booking.js        # /bookings & /listings/:id/bookings
├── views/                # Server-rendered EJS templates
│   ├── layouts/          # Boilerplate master layout
│   ├── includes/         # Reusable partials (navbar, footer, flash)
│   ├── listings/         # Index, Show, New, Edit views
│   ├── users/            # Login, Signup views
│   ├── bookings/         # My Bookings dashboard view
│   ├── pages/            # Privacy Policy & Terms views
│   └── error.ejs         # Global error presentation page
├── public/               # Static web assets
│   ├── css/style.css     # Design tokens & responsive styles
│   └── js/script.js      # Client-side validation & tax toggle
├── init/                 # Database seeding scripts & sample data
│   ├── data.js           # 30 curated listings with images
│   └── index.js          # DB initialization runner
├── middleware.js         # Auth & validation middleware functions
├── schema.js             # Joi validation schemas
├── app.js                # Main application entry point
├── package.json          # Project metadata & scripts
└── .env.example          # Environment variables template
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally on port `27017` (or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/PreetiJoshi02/Wanderlust.git
cd Wanderlust
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Populate `.env`:
```env
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/Wanderlust
SECRET=your_super_secret_session_key
NODE_ENV=development
```

### 4. Seed the Database
Populate MongoDB with 30 pre-configured sample properties:
```bash
npm run seed
```
*(Creates a default demo host account: `demouser` / `wanderlust123`)*

### 5. Start the Application
```bash
# Start server
npm start

# Or start with live reload (nodemon)
npm run dev
```
Open your browser and navigate to:
```
http://localhost:8080
```

### 6. Run Automated Tests
```bash
npm test
```
Executes comprehensive end-to-end flow tests verifying 22 assertions across authentication, CRUD, authorization, reviews, bookings, and search.

---

## 📡 REST API Route Map

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` | Redirects to `/listings` | Public |
| `GET` | `/listings` | Browse all listings (with search & category filters) | Public |
| `GET` | `/listings/new` | Form to create a new listing | Logged In |
| `POST` | `/listings` | Create a new listing | Logged In |
| `GET` | `/listings/:id` | View listing details & reservation widget | Public |
| `GET` | `/listings/:id/edit` | Form to edit property listing | Listing Owner |
| `PUT` | `/listings/:id` | Update property information | Listing Owner |
| `DELETE`| `/listings/:id` | Delete listing and related data | Listing Owner |
| `POST` | `/listings/:id/reviews` | Submit a review with star rating | Logged In |
| `DELETE`| `/listings/:id/reviews/:reviewId`| Delete a review | Review Author |
| `POST` | `/listings/:id/bookings` | Create a stay reservation | Logged In |
| `GET` | `/bookings` | View user's trip reservations | Logged In |
| `POST` | `/bookings/:id/cancel` | Cancel an active reservation | Booking User |
| `GET` | `/signup` | Registration form | Public |
| `POST` | `/signup` | Register and create new account | Public |
| `GET` | `/login` | Login form | Public |
| `POST` | `/login` | Authenticate and create session | Public |
| `GET` | `/logout` | Destroy session & logout | Logged In |

---

## 🎯 Placement & Technical Interview Highlights

When discussing Wanderlust in placement or technical interviews, here are key architectural and engineering topics to highlight:

1. **MVC Architecture & Separation of Concerns**:
   - Routes act purely as HTTP route definitions, delegating business logic to modular controllers (`controllers/listings.js`, `controllers/bookings.js`), keeping code clean and testable.
2. **Robust Multi-Tier Validation**:
   - Client-side validation using Bootstrap 5 custom classes prevents unnecessary HTTP roundtrips.
   - Server-side validation using **Joi schemas** guarantees data integrity before reaching MongoDB, preventing malformed or malicious payloads.
3. **Session-Based Authentication vs JWT**:
   - Employs HTTP-only cookies with signed sessions to mitigate XSS-based token theft.
   - Leverages Passport's PBKDF2 hashing algorithm with cryptographic salt to protect against rainbow table attacks.
4. **Mongoose Middleware Hooks for Cascading Deletes**:
   - Utilizes Mongoose `findOneAndDelete` post-hook on `ListingSchema` to delete orphaned reviews and bookings automatically when a host removes their property.
5. **Granular Authorization Middleware**:
   - Custom reusable Express middleware (`isOwner`, `isReviewAuthor`, `isLoggedIn`) guards destructive routes at the controller boundary.

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
