# 📊 COMPREHENSIVE PROJECT RAPPORT - Alinéa (Book Management Application)

**Generated on:** March 29, 2026  
**Project Structure:** Full-Stack Express.js + React Application  
**Status:** Active Development

---

## 📋 TABLE OF CONTENTS
1. [Project Overview](#project-overview)
2. [Technology Stack & Dependencies](#technology-stack--dependencies)
3. [Database Models](#database-models)
4. [Authentication & Security](#authentication--security)
5. [API Endpoints & Features](#api-endpoints--features)
6. [Middleware Architecture](#middleware-architecture)
7. [Views & Frontend](#views--frontend)
8. [Services](#services)
9. [Security Features](#security-features)
10. [Deployment & Configuration](#deployment--configuration)

---

## 🎯 PROJECT OVERVIEW

### Project Name
**Alinéa** - "Where Stories Travel"

### Description
A comprehensive book management and social community application that enables users to register, manage their profiles, upload books with covers, and explore a shared library. The platform emphasizes user verification, data security, and community engagement around books.

### Core Purpose
- User registration and authentication
- Book management and cataloging
- User profile management
- Admin control panel for managing users
- Email verification system
- Secure file uploads for book covers

---

## 🛠️ TECHNOLOGY STACK & DEPENDENCIES

### **Backend Framework & Server**
- **Express.js** (`^5.2.1`) - Modern Node.js web framework
- **Node.js** - JavaScript runtime with ES6 modules support
- **Nodemon** (`^3.1.14`) - Development server with automatic restart

### **Database**
- **MongoDB** - NoSQL document database
- **Mongoose** (`^9.3.2`) - MongoDB object modeling and validation

### **Authentication & Authorization**
- **Passport.js** (`^0.7.0`) - Authentication middleware
  - `passport-local` (`^1.0.0`) - Local strategy for email/password login
  - `passport-jwt` (`^4.0.1`) - JWT token verification
- **JWT (jsonwebtoken)** (`^9.0.3`) - Token generation and verification
- **bcrypt** (`^6.0.0`) - Password hashing and security

### **Security & Protection**
- **Helmet.js** (`^8.1.0`) - HTTP headers security
- **csrf-csrf** (`^4.0.3`) - Double CSRF token protection
- **express-rate-limit** (`^8.3.1`) - Rate limiting for brute-force protection
- **cookie-parser** (`^1.4.7`) - Secure cookie parsing
- **express-session** (`^1.19.0`) - Session management

### **Data Validation & Input Handling**
- **express-validator** (`^7.3.1`) - Request validation and sanitization
- **body-parser** (`^2.2.2`) - HTTP body parsing middleware

### **File Upload & Management**
- **Multer** (`^2.1.1`) - File upload middleware
  - Handles image uploads with validation
  - File size limiting (5MB max)
  - MIME type filtering

### **Email Service**
- **Nodemailer** (`^8.0.4`) - Email sending capability
  - Integration with Mailtrap sandbox SMTP
  - HTML email templates
  - Non-blocking email operations

### **Flash Messages & Sessions**
- **connect-flash** (`^0.1.1`) - Flash message middleware
- **express-flash** (`^0.0.2`) - Alternative flash implementation

### **View Engine**
- **EJS** (`^5.0.1`) - Embedded JavaScript templating
- **express-ejs-layouts** (`^2.5.1`) - Layout support for EJS templates

### **HTTP Method Override**
- **method-override** (`^3.0.0`) - Allows PUT/DELETE methods in forms

### **Frontend Libraries**
- **React** (`^19.2.4`) - UI library
- **React Router DOM** (`^7.13.1`) - Client-side routing
- **Axios** (`^1.13.6`) - HTTP client for API requests
- **Lucide React** (`^0.577.0`) - Icon library
- **React DOM** (`^19.2.4`) - React rendering engine

### **Frontend Build Tools**
- **Vite** (`^8.0.0`) - Modern build tool and dev server
- **React Scripts** (`^5.0.1`) - Create React App build scripts
- **@vitejs/plugin-react** (`^6.0.0`) - React support for Vite

### **Styling & CSS**
- **Tailwind CSS** (`@tailwindcss/postcss` `^4.2.1`) - Utility-first CSS framework
- **PostCSS** (`^8.5.8`) - CSS transformation tool
- **Autoprefixer** (`^10.4.27`) - Vendor prefix support

### **Development & Linting**
- **ESLint** (`^9.39.4`) - JavaScript linting
  - `@eslint/js` - ESLint core rules
  - `eslint-plugin-react-hooks` - React hooks linting
  - `eslint-plugin-react-refresh` - React refresh optimization
- **dotenv** (`^17.3.1`) - Environment variable management
- **Globals** (`^17.4.0`) - Global variable definitions

### **Type Checking (Development)**
- `@types/react` (`^19.2.14`) - Type definitions for React
- `@types/react-dom` (`^19.2.3`) - Type definitions for React DOM

---

## 💾 DATABASE MODELS

### **1. User Model** (`models/user.model.js`)

```
┌─ User Schema ─────────────────────────────────┐
│                                                │
│ • name (String)                                │
│   - Required, 2-32 characters                  │
│   - Trimmed input                              │
│                                                │
│ • username (String)                            │
│   - Required, unique, 2-32 characters          │
│   - Trimmed input                              │
│                                                │
│ • email (String)                               │
│   - Required, unique, lowercase                │
│   - Email format validation                    │
│   - Trimmed input                              │
│                                                │
│ • password (String)                            │
│   - Required, 8-128 characters                 │
│   - NOT returned by default (select: false)    │
│   - Complex validation:                        │
│     ✓ Must contain uppercase letter            │
│     ✓ Must contain lowercase letter            │
│     ✓ Must contain at least one number         │
│   - Auto-hashed with bcrypt (10 salt rounds)   │
│                                                │
│ • pdp (String - Profile Picture)               │
│   - Default: 'public/uploads/pdp/default.png'  │
│                                                │
│ • isVerified (Boolean)                         │
│   - Default: false                             │
│   - Tracks email verification status           │
│                                                │
│ • timestamps (Auto)                            │
│   - createdAt, updatedAt                       │
│                                                │
└────────────────────────────────────────────────┘

Methods:
• comparePassword(inputPassword) - Bcrypt comparison
```

### **2. Book Model** (`models/book.model.js`)

```
┌─ Book Schema ────────────────────────────────────┐
│                                                  │
│ • title (String)                                 │
│   - Required, 2-100 characters                   │
│   - Trimmed input                                │
│                                                  │
│ • genre (String)                                 │
│   - Required, enum validation                    │
│   - Options: Classic Fiction, Coming of Age,     │
│     Dystopian, Fantasy, Historical Fiction,      │
│     Mystery, Romance, Science Fiction, Others    │
│                                                  │
│ • customGenre (String)                           │
│   - Optional, 2-50 characters                    │
│   - Required if genre === 'Others'               │
│   - Allows custom genre specification            │
│                                                  │
│ • author (String)                                │
│   - Required, 2-50 characters                    │
│   - Trimmed input                                │
│                                                  │
│ • cover (String)                                 │
│   - Default: '/public/uploads/covers/default.png'│
│   - Stores path to uploaded book cover image     │
│                                                  │
│ • timestamps (Auto)                              │
│   - createdAt, updatedAt                         │
│   - Sort by createdAt for listing                │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🔐 AUTHENTICATION & SECURITY

### **Authentication Strategies**

#### **1. Local Strategy (Email/Password)**
- **Location:** `passport.js`
- **Usage:** User login via email and password
- **Process:**
  - Email lookup in database (with `.select('+password')`)
  - Password comparison using bcrypt
  - Returns user object (password excluded)
- **Protection:** Password hashing with 10 salt rounds

#### **2. JWT Strategy (Token-Based)**
- **Location:** `passport.js`
- **Type:** Stateless authentication
- **Token Extraction:** From cookies (`accessToken`)
- **Verification Process:**
  - Extracts token from `req.cookies.accessToken`
  - Decodes and verifies with `JWT_ACCESS_SECRET`
  - Looks up user in database to confirm still exists
  - Attaches user to `req.user`

### **Token System**

#### **Access Token**
- **Expiry:** 15 minutes
- **Purpose:** Short-lived request authentication
- **Payload:** `{ userId, email }`
- **Storage:** HttpOnly secure cookie
- **Auto-refresh:** Via `/api/auth/refresh-token` endpoint

#### **Refresh Token**
- **Expiry:** 7 days
- **Purpose:** Extended session management
- **Payload:** `{ userId, email }`
- **Storage:** HttpOnly secure cookie
- **Mechanism:** Can request new access token without re-login

#### **Email Verification Token**
- **Expiry:** 1 hour
- **Purpose:** Verify email ownership during registration
- **Payload:** `{ email }`
- **Secret:** `JWT_EMAIL_SECRET`
- **Usage:** Included in verification link sent via email

### **Password Requirements**
- **Minimum length:** 8 characters
- **Must contain:**
  - ✓ At least one UPPERCASE letter
  - ✓ At least one lowercase letter
  - ✓ At least one NUMBER
- **Regex:** `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/`
- **Hashing:** bcrypt with 10 iterations

### **Cookie Security Configuration**
```javascript
// Access Token Cookie
{
  httpOnly: true,           // Not accessible via JavaScript
  secure: (production),     // Only sent over HTTPS in production
  sameSite: 'strict',       // CSRF protection
  maxAge: 15 * 60 * 1000    // 15 minutes
}

// Refresh Token Cookie
{
  httpOnly: true,
  secure: (production),
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
}

// CSRF Token Cookie
{
  httpOnly: true,
  sameSite: 'strict',
  secure: (production)
}
```

---

## 📡 API ENDPOINTS & FEATURES

### **1. AUTHENTICATION ENDPOINTS** (`/api/auth`)

#### **POST /register**
- **Purpose:** User registration
- **Validation:** Comprehensive input validation
- **Fields Required:**
  - `name` (string, required)
  - `username` (string, required, unique)
  - `email` (string, required, valid email, unique)
  - `password` (string, min 8 chars, complex)
  - `passwordConfirm` (must match password)
- **Duplicate Check:** Prevents duplicate email/username
- **Process:**
  1. Validate input fields
  2. Check for existing email/username
  3. Hash password with bcrypt
  4. Create user in MongoDB
  5. Generate JWT email verification token (1 hour expiry)
  6. Send verification email (non-blocking)
  7. Return success with user data
- **Response Code:** 201 (Created)
- **Error Handling:** Specific error messages for duplicates
- **Security:** Non-blocking email, no sensitive data exposed

#### **POST /login**
- **Purpose:** User authentication
- **Method:** Passport Local Strategy
- **Credentials:** Email and password
- **Process:**
  1. Authenticate with passport local
  2. Generate 15-minute accessToken
  3. Generate 7-day refreshToken
  4. Set HttpOnly secure cookies
  5. Return user data and success message
- **Response Code:** 200 (Success) or 401 (Unauthorized)
- **Rate Limited:** Max 5 attempts per 15 minutes
- **Error Messages:** Generic for security (no user enumeration)

#### **POST /verify-email**
- **Purpose:** Email account verification
- **Required:** Email verification token (from email link)
- **Validation:**
  - Token presence check
  - JWT signature verification
  - Token expiration check
  - User existence check
- **Process:**
  1. Decode JWT token with `JWT_EMAIL_SECRET`
  2. Extract email from payload
  3. Verify user exists and not already verified
  4. Set `isVerified: true` in database
  5. Return success message
- **Error Codes:**
  - `MISSING_TOKEN` - Token not provided
  - `TOKEN_EXPIRED` - Token exceeded 1 hour validity
  - `USER_NOT_FOUND` - User doesn't exist
  - `ALREADY_VERIFIED` - Account already verified
- **Security:** Token expires after 1 hour to prevent abuse

#### **POST /refresh-token**
- **Purpose:** Generate new access token
- **Required:** Valid refresh token in cookie
- **Process:**
  1. Extract refreshToken from cookies
  2. Verify with `JWT_REFRESH_SECRET`
  3. If valid, generate new access token
  4. Update access token cookie
  5. Return success message
- **On Failure:**
  - Clear both access and refresh cookies
  - Return 403 Forbidden
  - Error code: `SESSION_EXPIRED`
- **Allows:** Seamless session extension without re-login

#### **POST /logout**
- **Purpose:** User logout (session termination)
- **Process:**
  1. Clear `accessToken` cookie
  2. Clear `refreshToken` cookie
  3. Return success message
- **Security:** Cookies removed from client side
- **Status Code:** 200 (Success)

### **2. USER ENDPOINTS** (`/api/users`)

#### **GET /profile**
- **Purpose:** Get current authenticated user's profile
- **Authentication:** Required (accessToken)
- **Process:**
  1. Extract user from `req.user` (attached by JWT middleware)
  2. Return user ID and email
- **No Database Query:** Uses token payload
- **Response:** User ID and email only

#### **GET /profile/:userId**
- **Purpose:** Get specific user's public profile
- **Authentication:** Required
- **Authorization:** Token owner must match `:userId`
- **Process:**
  1. Verify authentication
  2. Check authorization (user can only view own profile)
  3. Query database for user
  4. Return user data (password excluded)
- **Protection:** Prevents viewing other users' profiles
- **Error Codes:**
  - `NOT_AUTHENTICATED` - No token provided
  - `FORBIDDEN_RESOURCE` - Trying to access other user's data
  - `USER_NOT_FOUND` - User doesn't exist

#### **PUT /profile/:userId**
- **Purpose:** Update user's own profile
- **Authentication:** Required
- **Authorization:** User can only update own profile
- **CSRF Protection:** Required
- **Updatable Fields:**
  - `name` (optional)
  - `email` (optional, unique check)
  - `username` (optional, unique check)
- **Validation:**
  - Mongoose schema validation
  - Duplicate email check
  - Duplicate username check
  - Field length validation
- **Process:**
  1. Verify authentication and ownership
  2. Check CSRF token
  3. Verify email/username uniqueness if changed
  4. Update user document
  5. Return updated user data
- **Error Codes:**
  - `EMAIL_IN_USE` - Email already exists
  - `USERNAME_IN_USE` - Username already exists
  - `VALIDATION_ERROR` - Schema validation failed
  - `UPDATE_PROFILE_ERROR` - Database error

#### **DELETE /profile/:userId**
- **Purpose:** Delete user's own account
- **Authentication:** Required
- **Authorization:** User can only delete own account
- **CSRF Protection:** Required
- **Process:**
  1. Verify authentication and ownership
  2. Check CSRF token
  3. Delete user document from database
  4. Clear all authentication cookies
  5. Return success message
- **Consequences:**
  - Account permanently deleted
  - All cookies cleared
  - Session terminated
- **Error Code:** `ACCOUNT_DELETED` on success

### **3. ADMIN ENDPOINTS** (`/api/admin`)

#### **GET /users**
- **Purpose:** List all registered users
- **Authentication:** Required
- **Authorization:** Admin access (currently: any authenticated user)
- **Process:**
  1. Query database for all users
  2. Exclude passwords from results
  3. Return user count and array
- **Response:** Full user list (excluding passwords)

#### **DELETE /profile/:userId**
- **Purpose:** Admin delete any user
- **Authentication:** Required
- **Authorization:** Admin privilege
- **Validation:** User ID must be provided
- **Process:**
  1. Verify admin authentication
  2. Validate user ID
  3. Delete user from database
  4. Return deleted user info (ID and email)
- **Error Codes:**
  - `MISSING_USER_ID` - No user ID provided
  - `USER_NOT_FOUND` - User doesn't exist
  - `DELETE_USER_ERROR` - Database error

### **4. BOOK ENDPOINTS** (`/api/books`)

#### **POST / - Add Book**
- **Purpose:** Create new book entry
- **Authentication:** Not required (currently open)
- **File Upload:** Book cover image (optional)
- **Required Fields:**
  - `title` (2-100 characters)
  - `author` (2-50 characters)
  - `genre` (enum: see book model)
  - `customGenre` (required if genre === 'Others')
- **Optional Fields:**
  - `description` (text/summary)
  - `image` (file upload for cover)
- **Upload Limitations:**
  - **Max Size:** 5 MB
  - **Types Allowed:** image/* (JPEG, PNG, GIF, WebP, etc.)
  - **Storage:** `public/uploads/covers/`
  - **Filename:** Unique timestamp-based
- **Process:**
  1. Validate input data
  2. Process file upload (if provided)
  3. Create book document in MongoDB
  4. Attach file path to response
  5. Return created book data
- **Error Handling:** Returns validation errors or file errors
- **Response Code:** 201 (Created) or 400 (Bad Request)

#### **GET /list**
- **Purpose:** Retrieve all books with sorting
- **Authentication:** Not required (public access)
- **Sorting:** By creation date (newest first)
- **Response:** Array of all books
- **Process:**
  1. Query all books from database
  2. Sort by `createdAt: -1` (descending)
  3. Return books array
- **Rendering:** Can be rendered as HTML via EJS template

### **5. VIEW ROUTES** (Server-rendered)

#### **GET /add-book**
- **Purpose:** Display book addition form
- **Renders:** `add-book.ejs` template
- **Form Features:**
  - File upload for book cover
  - Genre selection (predefined + custom)
  - Title and author fields
  - Description textarea
  - Dynamic genre selection (shows custom field only for 'Others')

#### **GET /book-list**
- **Purpose:** Display all books
- **Renders:** `book-list.ejs` template
- **Data:** Fetches all books from MongoDB
- **Display:**
  - Book grid layout
  - Book cover (or placeholder)
  - Title, author, genre
  - Genre badge styling

#### **GET /register**
- **Purpose:** Display user registration form
- **Renders:** `register.ejs` template
- **Fields:**
  - Full name
  - Username
  - Email
  - Password
  - Profile picture (optional)

---

## 🔧 MIDDLEWARE ARCHITECTURE

### **1. Authentication Middleware** (`middleware/auth.middleware.js`)

#### **authenticateToken**
- **Purpose:** Verify JWT access token
- **Extracts Token From:** `req.cookies.accessToken`
- **Verification Secret:** `JWT_ACCESS_SECRET`
- **Process:**
  1. Check for token existence
  2. Verify JWT signature
  3. Decode payload
  4. Attach to `req.user` object
  5. Pass control to next middleware
- **Error Responses:**
  - `NO_TOKEN` (401) - No token provided
  - `TOKEN_EXPIRED` (403) - Token validity exceeded
  - `INVALID_TOKEN` (403) - Signature invalid

#### **authorizeOwner**
- **Purpose:** Verify user owns requested resource
- **Checks:** Token user ID matches `:userId` parameter
- **Process:**
  1. Verify authentication first
  2. Extract requested user ID from params/body
  3. Compare with token's userId
  4. Allow only if IDs match
- **Error Responses:**
  - `NOT_AUTHENTICATED` (401) - Not logged in
  - `MISSING_USER_ID` (400) - No user ID in request
  - `FORBIDDEN_RESOURCE` (403) - User access denied

#### **CSRF Protection (doubleCsrf)**
- **Library:** `csrf-csrf`
- **Pattern:** Double-submit CSRF tokens
- **Configuration:**
  - Cookie Name: `x-csrf-token`
  - Cookie Security: HttpOnly, SameSite strict
  - Token Size: 64 bytes
  - Ignored Methods: GET, HEAD, OPTIONS
- **Token Source:** `X-CSRF-Token` header
- **Process:**
  1. Generate token and store in cookie
  2. Client sends token in header
  3. Server verifies token matches
  4. Validated on state-changing operations

#### **Middleware Combinations**
```
protectUserRoute = [authenticateToken, authorizeOwner]
protectMutation = [authenticateToken, csrfCheck]
protectUserMutation = [authenticateToken, authorizeOwner, csrfCheck]
```

### **2. Rate Limiting Middleware** (`middleware/rateLimiter.middleware.js`)

#### **Global Rate Limiter**
- **Scope:** Applied to all `/api` routes
- **Window:** 15 minutes
- **Limit:** 100 requests per IP
- **Response:** 429 Too Many Requests
- **Type:** IP-based throttling
- **Use Case:** General API protection

#### **Auth Rate Limiter**
- **Scope:** Applied to `/api/auth` routes
- **Window:** 15 minutes
- **Limit:** 5 login attempts per IP
- **Response:** 429 Too Many Requests
- **Severity:** Strict limit to prevent brute-force attacks
- **Protection:** Against password guessing

### **3. File Upload Middleware** (`middleware/upload.middleware.js`)

#### **uploadCover (Multer Configuration)**
- **Library:** Multer
- **Storage Type:** Disk storage
- **Destination:** `public/uploads/covers`
- **Filename Pattern:** `${timestamp}-${randomHash}.${extension}`
  - Example: `1711782536843-547839293.jpg`
- **File Validation:**
  - **Type Filter:** Only `image/*` MIME types
  - **Size Limit:** 5 MB maximum
  - **Rejection:** Non-image files return error
- **Error Message:** "Le fichier n'est pas une image !"
- **Usage:** `uploadCover.single('image')`
- **Integration:** Applied to `POST /api/books`

---

## 👁️ VIEWS & FRONTEND

### **1. EJS Templating System**
- **Engine:** EJS (Embedded JavaScript)
- **Layout Support:** express-ejs-layouts
- **View Directory:** `./views`
- **Rendering:** Server-side templating

### **2. Register Form** (`views/register.ejs`)

**Purpose:** User account creation interface

**Fields:**
- Full name (text input, required)
- Username (text input, required)
- Email (email input, required)
- Password (password input, required)
- Profile picture (file input, optional, images only)

**Styling:**
- Responsive max-width 500px
- Centered layout
- Form groups with consistent spacing
- Professional button styling (#2c3e50)

**Form Submission:**
- Method: POST
- Action: `/api/auth`
- Encoding: multipart/form-data (for file upload)

### **3. Add Book Form** (`views/add-book.ejs`)

**Purpose:** Book entry creation interface

**Fields:**
- Title (text input, required)
- Author (text input, required)
- Genre (select dropdown, required)
  - Options: Classic Fiction, Coming of Age, Dystopian, Fantasy, Historical Fiction, Mystery, Romance, Science Fiction, Others
- Custom Genre (text input, conditional)
  - Shows only when "Others" is selected
  - Allows user-defined genre
- Description (textarea, optional)
- Book Cover (file input, optional, images only)

**Form Features:**
- Dynamic genre selection (JavaScript)
- Hidden/shown custom genre field based on selection
- Multipart form for file upload
- Professional styling

**Form Submission:**
- Method: POST
- Action: `/api/books`
- Encoding: multipart/form-data

### **4. Book List Display** (`views/book-list.ejs`)

**Purpose:** Browse and view all added books

**Features:**
- Grid layout with flexible wrapping
- Book cards (250px width)
- Card contents:
  - Book cover image (350px height, fitted)
  - Title (h3)
  - Author name (gray text)
  - Genre badge (blue background, rounded)
  - Special handling for custom genres (shows customGenre if "Others")

**Styling:**
- CSS Grid with gap (20px)
- White cards with shadow
- Responsive design
- Centered layout

**Data Binding:**
- EJS loop: `<% books.forEach(...) %>`
- Conditional rendering: No books message if empty
- Image fallback: Gray placeholder if no cover

**Dynamic Content:**
- Title: `<%= book.title %>`
- Author: `<%= book.author %>`
- Genre/Custom Genre: Ternary for "Others"
- Cover: Conditional image or placeholder

---

## 📧 SERVICES

### **Email Service** (`services/email.service.js`)

#### **Configuration**
- **Provider:** Mailtrap (Sandbox SMTP)
- **Host:** sandbox.smtp.mailtrap.io
- **Port:** 2525 (Submission port)
- **Credentials:** Stored in environment variables

#### **Transport Configuration**
```javascript
{
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}
```

#### **sendEmail Function**
- **Purpose:** Generic email sending utility
- **Parameters:**
  - `options.email` - Recipient email
  - `options.subject` - Email subject
  - `options.message` - Email body (text)
- **Outputs:**
  - Plain text version
  - HTML-formatted version
  - Styled HTML wrapper
- **HTML Template:**
  ```html
  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
    <h2>${subject}</h2>
    <p>${message}</p>
  </div>
  ```
- **Error Handling:** Console logging on failure, throws error
- **Response:** MessageID from Mailtrap
- **Execution:** Non-blocking (async/await)

#### **Usage Cases**
1. **Welcome Email** (Registration)
   - Sent after user creation
   - Subject: "Alinéa, where stories travel"
   - Contains: Welcome message + verification link
   - Link: `${FRONTEND_URL}/verify-email?token=${verificationToken}`
   - Token Validity: 1 hour

2. **Error Handling:**
   - Non-blocking: `.catch()` on the promise
   - Won't fail registration if email fails
   - Console logs error for debugging

---

## 🔒 SECURITY FEATURES

### **1. Password Security**
- ✅ Bcrypt hashing (10 salt rounds)
- ✅ Complex password requirements (uppercase, lowercase, number)
- ✅ Minimum 8 characters
- ✅ Password excluded from queries by default (`select: false`)
- ✅ Password comparison using bcrypt

### **2. Session Security**
- ✅ HttpOnly cookies (prevents XSS token theft)
- ✅ Secure flag (HTTPS-only in production)
- ✅ SameSite strict (CSRF prevention)
- ✅ Token expiration (short-lived access tokens)
- ✅ Refresh token rotation (7-day extended session)

### **3. Data Protection**
- ✅ Passwords never returned in responses
- ✅ Email validation and uniqueness
- ✅ Username uniqueness
- ✅ Mongoose schema validation
- ✅ Type coercion prevention

### **4. Request Security**
- ✅ CSRF protection (double-token pattern)
- ✅ Rate limiting (brute-force protection)
- ✅ Helmet.js (HTTP headers security)
- ✅ Input validation (express-validator)
- ✅ Input sanitization

### **5. File Security**
- ✅ File type validation (images only)
- ✅ File size limiting (5 MB max)
- ✅ Unique filename generation
- ✅ Stored outside web root (then served via static)
- ✅ MIME type checking

### **6. API Security**
- ✅ Error messages don't leak system details
- ✅ Production mode hides sensitive errors
- ✅ Database errors sanitized
- ✅ No user enumeration (generic errors)
- ✅ Admin endpoints protection (future: role-based)

### **7. Email Security**
- ✅ Non-blocking email operations (no DoS vector)
- ✅ Token-based verification (not magic links)
- ✅ Token expiration (1 hour)
- ✅ User existence verification

---

## 🚀 DEPLOYMENT & CONFIGURATION

### **Environment Variables Required**
```
# MongoDB Connection
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# Server Configuration
PORT=3000
NODE_ENV=development|production

# JWT Secrets (Min 32 chars recommended)
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EMAIL_SECRET=your_email_verification_secret_here

# CSRF Protection
CSRF_SECRET=your_csrf_protection_secret_here

# Cookie Security
COOKIE_SECRET=your_cookie_encryption_secret_here

# Frontend URLs
FRONTEND_URL=http://localhost:3000

# Email Configuration (Mailtrap)
EMAIL_USER=your_mailtrap_user_id
EMAIL_PASS=your_mailtrap_password
EMAIL_FROM=noreply@alinea.com
```

### **Production Checklist**
- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique secrets (32+ characters)
- [ ] Enable HTTPS (secure cookie flag)
- [ ] Configure proper CORS if frontend separate
- [ ] Set up MongoDB authentication
- [ ] Configure real email service (not Mailtrap)
- [ ] Enable rate limiting
- [ ] Configure helmet.js defaults
- [ ] Set up error logging service
- [ ] Use environment variable management
- [ ] Enable HTTPS enforcement
- [ ] Set up database backups
- [ ] Configure session store (production: MongoDB store)

### **Development Startup**
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Run linting
npm run lint

# Build frontend
npm run build
```

### **Folder Structure Summary**
```
pp_project/
├── app.js                      # Express app setup
├── passport.js                 # Authentication strategies
├── package.json                # Dependencies
├── eslint.config.js            # ESLint configuration
├── config/                     # Configuration files
├── models/                     # Mongoose schemas
│   ├── user.model.js          # User data model
│   └── book.model.js          # Book data model
├── controllers/                # Route handlers
│   ├── auth.controllers.js    # Auth logic
│   ├── user.controllers.js    # User logic
│   └── admin.controllers.js   # Admin logic
├── routes/                     # API routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── admin.routes.js
│   └── book.routes.js
├── middleware/                 # Express middleware
│   ├── auth.middleware.js     # JWT & CSRF
│   ├── rateLimiter.middleware.js
│   └── upload.middleware.js   # File upload
├── services/                   # Business logic
│   └── email.service.js
├── views/                      # EJS templates
│   ├── add-book.ejs
│   ├── book-list.ejs
│   └── register.ejs
└── public/                     # Static files
    └── uploads/
        ├── covers/            # Book cover images
        └── pdp/               # Profile pictures
```

---

## 📊 API SUMMARY TABLE

| Method | Endpoint | Auth | CSRF | Rate Limited | Purpose |
|--------|----------|------|------|--------------|---------|
| POST | `/api/auth/register` | ❌ | ❌ | ✅ (Global) | User registration |
| POST | `/api/auth/login` | ❌ | ❌ | ✅ (Auth: 5/15min) | User login |
| POST | `/api/auth/verify-email` | ❌ | ❌ | ✅ (Global) | Email verification |
| POST | `/api/auth/refresh-token` | ❌ | ❌ | ✅ (Global) | Refresh access token |
| POST | `/api/auth/logout` | ✅ | ❌ | ✅ (Global) | User logout |
| GET | `/api/users/profile` | ✅ | ❌ | ✅ (Global) | Current user profile |
| GET | `/api/users/profile/:userId` | ✅ | ❌ | ✅ (Global) | User profile (auth + owner) |
| PUT | `/api/users/profile/:userId` | ✅ | ✅ | ✅ (Global) | Update profile (owner only) |
| DELETE | `/api/users/profile/:userId` | ✅ | ✅ | ✅ (Global) | Delete account (owner only) |
| GET | `/api/admin/users` | ✅ | ❌ | ✅ (Global) | List all users (admin) |
| DELETE | `/api/admin/profile/:userId` | ✅ | ❌ | ✅ (Global) | Delete user (admin) |
| POST | `/api/books` | ❌ | ❌ | ✅ (Global) | Add book |
| GET | `/api/books/list` | ❌ | ❌ | ✅ (Global) | List books |
| GET | `/add-book` | ❌ | ❌ | ✅ (Global) | Book form page |
| GET | `/book-list` | ❌ | ❌ | ✅ (Global) | Book list page |
| GET | `/register` | ❌ | ❌ | ✅ (Global) | Registration form page |

---

## 🎯 KEY FEATURES IMPLEMENTED

### **User Management**
- ✅ User registration with validation
- ✅ Email verification system
- ✅ Profile management (view, update, delete)
- ✅ Unique username and email enforcement
- ✅ Password strength requirements
- ✅ Profile picture upload placeholder

### **Authentication & Security**
- ✅ Multi-strategy authentication (Local + JWT)
- ✅ Token-based session management
- ✅ CSRF protection (double-token)
- ✅ Rate limiting (global + auth-specific)
- ✅ Password hashing (bcrypt)
- ✅ HttpOnly secure cookies
- ✅ Email verification tokens

### **Book Management**
- ✅ Book creation with metadata
- ✅ Genre selection (predefined + custom)
- ✅ Book cover image upload
- ✅ Book listing with sorting
- ✅ Cover image display
- ✅ File size and type validation

### **Admin Features**
- ✅ User list viewing
- ✅ User deletion capabilities
- ✅ Admin endpoints structure

### **Template & Views**
- ✅ Server-rendered EJS templates
- ✅ Registration form UI
- ✅ Book addition form UI
- ✅ Book list display with grid layout
- ✅ Dynamic form behavior (custom genre)

### **Email Service**
- ✅ Email sending integration (Mailtrap)
- ✅ Welcome emails
- ✅ Verification links
- ✅ HTML email templates
- ✅ Non-blocking email operations

### **Error Handling**
- ✅ Global error middleware
- ✅ Specific error codes
- ✅ Validation error messages
- ✅ Production vs development error modes
- ✅ CSRF error handling

### **Code Quality**
- ✅ ESLint configuration
- ✅ Code linting setup
- ✅ Module imports (ES6)
- ✅ Consistent error handling patterns
- ✅ Comprehensive logging

---

## 📝 SUMMARY

This is a **full-featured book management and community platform** built with modern backend technologies (Express.js, MongoDB, Passport.js) and frontend capabilities (React, Vite). The application prioritizes **security**, **data validation**, and **user experience**, with comprehensive authentication, CSRF protection, rate limiting, and file management capabilities. The architecture follows MVC patterns with clear separation of concerns across models, controllers, routes, and middleware layers.

---

**Last Updated:** March 29, 2026  
**Project Type:** Full-Stack Node.js + React Application  
**Status:** Development Phase  
**Next Steps:** Production deployment configuration, role-based admin system, advanced search features
