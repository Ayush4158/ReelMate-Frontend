# Zomato Reel Clone - Frontend

A React-based frontend application for the Zomato Reel Clone, featuring food discovery through short-form video content.

## 🛠️ Tech Stack

- React.js
- Redux Toolkit
- Redux Persist
- React Router DOM
- Axios
- Vite
- TailwindCSS

## 📁 Project Structure

```
src/
├── App.jsx           # Root component
├── main.jsx         # Entry point
├── App.css          # Global styles
├── store.js         # Redux store configuration
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── BottomNav.jsx
│   └── ReelFeed.jsx
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   │   ├── ChooseRegister.jsx
│   │   ├── FoodPartnerLogin.jsx
│   │   ├── FoodPartnerRegister.jsx
│   │   ├── UserLogin.jsx
│   │   └── UserRegister.jsx
│   ├── food-partner/# Food partner pages
│   │   ├── CreateFood.jsx
│   │   └── Profile.jsx
│   └── general/     # General pages
│       ├── Home.jsx
│       └── Saved.jsx
├── routes/          # Route configurations
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
└── slices/          # Redux slices
    └── AuthSlice.js
```

## 🔐 Authentication Flow

The application handles two types of users:
1. Regular Users
2. Food Partners

### Protected Routes
```jsx
// Examples of protected routes
<Route path="/" element={<ProtectedRoute type="both"><Home /></ProtectedRoute>} />
<Route path="/create-food" element={<ProtectedRoute type="partner"><CreateFood /></ProtectedRoute>} />
```

Types of protection:
- `type="user"`: Only authenticated users
- `type="partner"`: Only authenticated food partners
- `type="both"`: Either user or partner

## 🗄️ State Management

Using Redux Toolkit with Redux Persist for state management.

### Auth Slice Structure
```javascript
{
  user: {
    _id: string,
    fullname: string,
    email: string
  } | null,
  partner: {
    _id: string,
    restaurantName: string,
    email: string,
    location: string
  } | null
}
```

### Key Features
- Persistent authentication state
- Automatic token handling
- Session management

## 📱 Components

### BottomNav
Mobile-first bottom navigation bar
- Home feed
- Saved items
- Profile access

### ReelFeed
Vertical scrolling feed of food reels
- Like functionality
- Save for later
- Partner profile link

## 📄 Pages

### Authentication Pages
- User Registration
- User Login
- Food Partner Registration
- Food Partner Login
- Registration Choice Screen

### Food Partner Pages
- Create Food Item
  - Image upload
  - Video upload
  - Food details form
- Partner Profile
  - Restaurant details
  - Food items list

### General Pages
- Home Feed
  - Infinite scroll
  - Food reels
- Saved Items
  - Saved food list
  - Quick access

## 🚀 Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
cp .env.example .env

# Add required variables
VITE_API_URL=http://localhost:8080
```

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🔗 API Integration

The frontend communicates with the backend using Axios.

### API Configuration
```javascript
// Example of API setup
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
```

### Error Handling
- Global error interceptor
- Authentication error redirects
- Loading states for API calls

## 📱 Responsive Design

The application is designed to be mobile-first with responsive layouts for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🧪 Development Tools

- Vite for fast development
- ESLint for code quality
- Prettier for code formatting
- Redux DevTools for state debugging

## ✨ Future Improvements

- [ ] Implement infinite scroll for feed
- [ ] Add search functionality
- [ ] Enhance video player controls
- [ ] Add comments system
- [ ] Implement social sharing
