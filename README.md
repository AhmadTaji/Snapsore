# 🛍️ SnapStore

SnapStore is a modern e-commerce web application built with Next.js. It includes product listings, product detail pages, a wishlist feature, and a dashboard for managing the store.

---

## 🚀 Features

- 🧾 Product listing and detail pages  
- 💖 Wishlist management (localStorage-based)  
- 📊 Admin dashboard with product stats  
- 🔎 Filtering and search (optional)  
- 📦 API routes for product and review data  
- ⚙️ Built with Next.js App Router & TypeScript  

---

## 🧑‍💻 Tech Stack

- Next.js (App Router)  
- TypeScript  
- Tailwind CSS  
- Local JSON API for mock data  

---

## 📁 Project Structure

```plaintext
app/
├── api/
│   ├── products/
│   └── reviews/
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── products/
├── products/
│   ├── [id]/
│   └── page.tsx
├── wishlist/
└── globals.css

public/
└── images/

utils/
├── products.ts
└── reviews.ts
