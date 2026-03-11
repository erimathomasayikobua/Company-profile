# Revo Technologies Uganda - Company Website

A modern, responsive company website built with React and Express.js, featuring a comprehensive admin dashboard for content management.

## Features

### Public Website
- **Home Page**: Hero section, features showcase, statistics, and call-to-action
- **Products/Services**: Filterable product catalog with search functionality
- **About Us**: Company story, mission, vision, team, and achievements
- **Contact**: Contact form with validation and company information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Dashboard
- **Authentication**: Secure login system with JWT tokens
- **Product Management**: Add, edit, delete, and view products
- **Analytics**: Basic website statistics and contact submissions
- **Settings**: Site configuration management
- **Responsive Admin Interface**: Mobile-friendly admin panel

## Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **CSS3** - Modern styling with CSS variables and responsive design
- **Vite** - Fast build tool and development server

### Backend
- **Express.js** - Node.js web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Company-profile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   This will start both the frontend (Vite) and backend (Express) servers.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## Usage

### Public Website
- Visit `http://localhost:5173` to view the website
- Navigate through different sections using the header navigation
- Use the contact form to send inquiries
- Browse products with filtering and search functionality

### Admin Access
- Go to `http://localhost:5173/admin/login`
- **Default credentials:**
  - Username: `admin`
  - Password: `admin123`

### Admin Dashboard Features
- **Products Management**: Add, edit, and delete products
- **Analytics**: View website statistics and contact submissions
- **Settings**: Manage site configuration (placeholder for future features)

## API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Add new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/contacts` - Get contact submissions
- `GET /api/admin/analytics` - Get analytics data

## Project Structure

```
src/
├── components/
│   └── Admin/
│       ├── AdminLogin.jsx
│       ├── AdminLogin.css
│       ├── AdminDashboard.jsx
│       └── AdminDashboard.css
├── Home.jsx
├── Home.css
├── Products.jsx
├── Products.css
├── AboutUs.jsx
├── AboutUs.css
├── Contact.jsx
├── Contact.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Customization

### Adding New Products
1. Login to admin dashboard
2. Navigate to "Add Product" tab
3. Fill in product details
4. Save the product

### Modifying Content
- **Home Page**: Edit `src/Home.jsx`
- **About Us**: Edit `src/AboutUs.jsx`
- **Contact Info**: Edit `src/Contact.jsx`
- **Styling**: Modify respective CSS files

### Changing Colors and Theme
- Update CSS variables in `src/index.css`
- Modify gradient colors in component CSS files

## Security Considerations

- Change default admin credentials in production
- Use environment variables for sensitive data
- Implement proper JWT secret management
- Add rate limiting for API endpoints
- Use HTTPS in production

## Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your web server to serve the React app

### Backend Deployment
1. Deploy `server.js` to your Node.js hosting service
2. Set up environment variables
3. Configure database connection (if using external database)
4. Set up SSL certificates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: info@revotechnologies.ug
- Phone: +256 700 123 456

## Changelog

### Version 1.0.0
- Initial release
- Complete website with admin dashboard
- Product management system
- Contact form functionality
- Responsive design
- Authentication system