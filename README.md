# MERN Tutorial - Full Stack Web Application

A comprehensive full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js 13+ App Router. This project demonstrates modern web development practices including authentication, role-based access control, and beautiful UI animations.

## 🚀 Features

### ✨ User Interface
- **Modern Design**: Dark theme with glassmorphism effects
- **Animated Headings**: GSAP-powered SplitText animations for page titles
- **Particle Backgrounds**: Dynamic particle systems with different color schemes per page
- **Responsive Layout**: Mobile-first design with responsive navigation
- **Gooey Navigation**: Smooth animated navigation component

### 🔐 Authentication & Authorization
- **NextAuth.js Integration**: Secure authentication with multiple providers
- **Role-Based Access Control**: User and admin roles with protected routes
- **Password Reset System**: Complete forgot password flow with email tokens
- **Session Management**: Secure session handling with JWT tokens

### 👥 User Management
- **User Registration**: Complete registration system with role assignment
- **Admin Dashboard**: User management interface for administrators
- **Role Management**: Toggle user roles between 'user' and 'admin'
- **User Deletion**: Admin can delete users from the system

### 🛡️ Security Features
- **Password Hashing**: bcrypt encryption for secure password storage
- **Protected API Routes**: Server-side session validation
- **Middleware Protection**: Route-level access control
- **Environment Variables**: Secure configuration management

## 🛠️ Technologies Used

### Frontend
- **Next.js 13+**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Professional animation library
- **Framer Motion**: React animation library
- **NextAuth.js**: Authentication for Next.js

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **bcrypt**: Password hashing
- **Nodemailer**: Email functionality

### UI Components
- **shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icons
- **Custom Components**: GooeyNav, Particles, SplitText

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** (recommended)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd modern-layout
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/mern-tutorial
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-tutorial

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (for password reset)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create a database named `mern-tutorial`

#### Option B: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

### 5. Run the Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👤 User Management

### Creating an Admin User

1. **Register a new user** through the registration page
2. **Access MongoDB** (using MongoDB Compass or command line)
3. **Find your user** in the `users` collection
4. **Update the role** from `"user"` to `"admin"`:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Default Test Users

The system includes some hardcoded test users for development:

- **Admin User**: `admin@test.com` / `admin123`
- **Regular User**: `user@test.com` / `user123`

## 📁 Project Structure

```
modern-layout/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth configuration
│   │   ├── admin/                # Admin API endpoints
│   │   ├── register/             # User registration
│   │   ├── forgot-password/      # Password reset
│   │   └── reset-password/       # Password reset validation
│   ├── admin/                    # Admin pages
│   │   ├── page.tsx             # Admin dashboard
│   │   └── users/               # User management
│   ├── dashboard/                # User dashboard
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── forgot-password/          # Forgot password page
│   ├── reset-password/           # Reset password page
│   ├── about/                    # About page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── gooey-nav.tsx           # Animated navigation
│   ├── particles-background.tsx # Particle effects
│   ├── SplitText.tsx           # GSAP text animations
│   └── enhanced-footer.tsx     # Footer component
├── lib/                         # Utility functions
├── hooks/                       # Custom React hooks
├── styles/                      # Additional styles
└── public/                      # Static assets
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking

# Database
pnpm db:seed      # Seed database with test data (if available)
```

## 🌟 Key Features Explained

### SplitText Animations
The project uses GSAP SplitText for animated page headings. Each page has a unique animation style:
- **Home**: "Welcome to" and "MERN Tutorial" animate separately
- **About**: "About This Project" animates as one phrase
- **Dashboard**: "Welcome to Your Dashboard" with subtitle
- **Admin**: "Admin Dashboard" with management subtitle

### Particle Backgrounds
Each page features a unique particle system:
- **Home**: Multi-colored particles (blue, green, orange, red, purple)
- **About**: Cyan-themed particles
- **Dashboard**: Orange/gold particles
- **Admin**: Red-themed particles

### Authentication Flow
1. **Registration**: Users can register with email/password
2. **Login**: Supports both registered users and hardcoded test users
3. **Password Reset**: Complete flow with email tokens
4. **Role-Based Access**: Different features for users vs admins

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env.local`
   - Ensure database exists

2. **NextAuth Configuration Error**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your development URL

3. **GSAP Animation Issues**
   - Ensure GSAP is properly installed
   - Check browser console for errors
   - Verify SplitText plugin is registered

4. **Email Not Working**
   - Check email server configuration
   - Verify app passwords for Gmail
   - Test SMTP settings

### Development Tips

- Use **pnpm** for faster dependency installation
- Enable **TypeScript strict mode** for better type safety
- Use **MongoDB Compass** for database management
- Check **browser console** for client-side errors
- Monitor **terminal** for server-side errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **GSAP** for the powerful animation capabilities
- **NextAuth.js** for secure authentication
- **Tailwind CSS** for the utility-first styling approach

---

**Happy Coding! 🚀** 