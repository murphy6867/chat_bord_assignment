# Bord Application - Full Stack Developer Assignment (Next.js + NestJS)

## Project Overview
This project is a web-based forum where users can ask questions, post topics, and add comments. It is built using Next.js for the frontend and NestJS for the backend. The main features include user authentication, creating topics, posting comments, and managing topics and comments via CRUD operations.

# Application Architecture
## The project consists of two main components:
- Frontend: Built with Next.js to handle the client-side rendering and interactions.
- Backend: Developed using NestJS to provide a RESTful API for managing users, posts, and comments.
The frontend communicates with the backend to fetch and manipulate data, ensuring a responsive user experience.

# Installation Instructions
## Prerequisites
Ensure you have the following installed:
- Node.js (v18.3.1 or later)
- npm (v10.8.2 or later)
- PostgreSQL

# Step-by-Step Setup
1. Clone the repository to your local machine:
2. Environment Variables:
    - Create a .env file in the apps/api/ directory and add the following keys:
        - DATABASE_URL="postgresql://data_wow_db_owner:D9IiVPW2lSNT@ep-sparkling-glade-a1k3xd3p.ap-southeast-1.aws.neon.tech/data_wow_db?sslmode=require"
        - PORT=8000
        - JWT_SECRET=BU+M6Z2+VxccG//VEPdpnWhQ8lBOQLp7LxmyTRndzro=
        - JWT_EXPIRES_IN=60s
        - REFRESH_JWT_SECRET=I44EL1t608/zQki02uDel/v7rgKt7Jt7kcnssfB6bWQ=
        - REFRESH_JWT_EXPIRES_IN=7d
    - Create another .env file in the apps/web/ directory and add the following keys:
        - BACKEND_URL=http://localhost:8000
        - SESSION_SECRET_KEY=ItGsQw+HHf0r5dAapNiEBeH1ZyDxO7Pxvjec1VjxsGs=
3. Set Up Prisma
    - Navigate to the apps/api/ directory
    - Run the following command to generate the Prisma client: [npx prisma generate]
    - **Optional Run the Prisma migrations to set up your database schema: [npx prisma migrate dev]
4. Install Dependencies at root directory
5. Run the Project at root directory
6. Access the App:
    - rontend: The frontend app will be available at http://localhost:3000.
    - Backend: The API server will be available at http://localhost:8000.

# Libraries and Packages
## Frontend Dependencies:
- @emotion/react: CSS-in-JS styling library for writing styles scoped to components.
- @emotion/styled: A styled component library built on top of @emotion/react.
- @headlessui/react: UI components designed to work seamlessly with React.
- @radix-ui/react-dialog: A component for building accessible dialogs in React.
- @radix-ui/react-icons: A set of icons for use with Radix UI components.
- @repo/ui: Custom UI components for the project.
- Tailwind CSS: Utility-first CSS framework for styling the UI.
- Next.js: React-based framework for server-side rendering and static site generation.

# Backend Dependencies:
## NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- Prisma: ORM for handling database operations.
- Argon2: Library used for password hashing.
- passport: Middleware for handling authentication.
- JWT: For implementing user authentication with JSON Web Tokens.
- Zod: A schema declaration and validation library for TypeScript.

# Additional Features
- User authentication with JWT and refresh tokens.
- Real-time updates for posts and comments
- Responsive design with support for mobile, tablet, and desktop views.

# Feedback
## I kindly request feedback on this assignment, especially in the following areas:
- Code structure and readability.
- Implementation of required features and any areas for improvement.
- Handling of error cases and user experience.
- If possible, I would appreciate any suggestions or insights on how to improve the project. Thank you for taking the time to review my work!