# Sahiwal Electronics

A multi-vendor electronics marketplace built with the MERN stack.

**Live Demo:** [sahiwal-electronics.vercel.app](https://sahiwal-electronics.vercel.app)

## Overview

Sahiwal Electronics is a full-stack e-commerce platform where multiple sellers can manage their shops, list products, and process orders, while customers can discover products and shop from different sellers.

The platform includes role-based access for buyers, sellers, and administrators.

## Features

### Buyers

- Browse, search, and filter products
- Product ratings and verified-purchase reviews
- Shopping cart, wishlist, and coupons
- Multi-vendor checkout with Cash on Delivery
- Order tracking and refund requests
- Profile and address management
- Messaging with sellers

### Sellers

- Shop registration and email verification
- Dashboard for products, orders, and earnings
- Product, event, and coupon management
- Order and refund management
- Withdrawal requests
- Customer messaging

### Admins

- Platform overview dashboard
- User and seller management
- Product, event, and order management
- Seller withdrawal approvals

### Additional Features

- JWT authentication and Google OAuth
- Email verification and password recovery
- Image uploads with Cloudinary
- Responsive UI with a custom design system

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Redux Toolkit
- **Styling:** Tailwind CSS v4, MUI X DataGrid
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt, Google OAuth
- **Real-time:** Socket.IO
- **Storage:** Cloudinary&#x20;
- **Email:** Nodemailer
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB database
- Cloudinary account
- Google OAuth credentials
- SMTP credentials

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zainWebDeveloper86/sahiwal-electronics.git
   cd sahiwal-electronics
   ```

2. Set up the backend:

   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

   Open `backend/.env` and replace the placeholder values with your own credentials. Set `CLIENT_URL` to `http://localhost:5173`.

3. Start the backend:

   ```bash
   npm run dev
   ```

4. Set up the frontend in a separate terminal from the project root:

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   ```

   Configure `VITE_SERVER_URL` as `http://localhost:8000/` and add your Google OAuth client ID.

5. Start the frontend:

   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) to view the application.

**Note:** Never commit `.env` files containing private credentials. Make sure they are excluded from version control.

For local Google sign-in, add `http://localhost:5173` to the authorized JavaScript origins in Google Cloud Console.

## Known Limitations

- **Payments:** Only Cash on Delivery is currently supported.
- **Real-time messaging:** Socket.IO works with a persistent local backend. The Vercel deployment uses REST-based messaging, so new messages may require a page refresh.

## Author

**Zain** — [GitHub](https://github.com/zainWebDeveloper86)

## License

Built for learning and portfolio purposes.
