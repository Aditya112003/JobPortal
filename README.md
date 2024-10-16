# **SimplyHire** (Job Portal Website)

## Overview

**SimplyHire** is a job portal platform built to connect job seekers with recruiters. Users can register as either candidates or recruiters, search and apply for jobs, or post job listings. The platform is designed to provide a seamless experience for both candidates and recruiters, with easy-to-use interfaces and clear workflows.

The project is built using **React** and integrates role-based authentication with features like job filtering, resume uploads, and profile management, simplifying the hiring process for both recruiters and job seekers.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [File Structure](#file-structure)
4. [Installation](#installation)

## Features

- **Role-Based Registration and Authentication**: Users register as either candidates or recruiters, with distinct roles and experiences.
- **Candidate Features**:
  - Browse and apply for job openings.
  - Upload resumes during job applications.
  - Manage profile with details like education, experience, and skills.
  - View applied and saved jobs.
- **Recruiter Features**:
  - Post job openings with detailed descriptions.
  - View and manage all job applications.
  - View candidate resumes.
  - Manage job listings and track applicants.
- **Job Search and Filters**: Users can search and filter jobs based on location, role, and other parameters.
- **Responsive Design**: Fully optimized for both desktop and mobile users.

## Technologies Used

- **Frontend**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **Vite**: A fast build tool for frontend development.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **ShadCN**: For enhancing UI components.
  - **Clerk**: For authentication and role management.
  - **React Router Dom**: For handling routes in the application.
  - **React Hook Form**: For form management and validation.
  - **Embla Carousel**: For carousel functionality with autoplay support.
  - **Lucide Icons**: For using icons in the UI.
  - **React Spinners**: For loading spinners.
  - **Radix UI Components**: Accordion, Dialog, Label, Radio Group, Select, and Slot components from Radix for UI flexibility.

- **Backend**:
  - **Supabase**: A backend-as-a-service providing a Postgres database to store job posts, user profiles, applications, and more.

- **Additional Libraries**:
  - **Zod**: A schema validation library for handling form and API validation.
  - **clsx**: For conditionally applying class names.
  - **Tailwind Merge**: For merging Tailwind classes efficiently.
  - **Country-State-City**: A library for providing geographical location data.
  - **React Markdown Editor (MDE)**: For handling markdown text editing.
  - **Embla Carousel Autoplay**: For adding autoplay functionality to carousels.
  
- **Development Tools**:
  - **ESLint**: For linting and ensuring code quality.
  - **Autoprefixer**: For processing CSS and adding vendor prefixes.
  - **PostCSS**: A tool to transform styles with JavaScript plugins.

## File Structure

The project follows a clean and modular file structure to ensure scalability and maintainability. Below is an overview of the main directories and their contents:

1. **src**
   - **api**: Contains all API call functions (jobs, applications, companies).
   - **components**: Reusable components for various functionalities (JobCard, ApplicationCard, Header, Onboarding, ApplyJobDrawer etc.).
   - **pages**: Pages for different routes like home, jobs, job Applications, onboarding, profile,Job Listing, Saved Jobs and other pages.
   - **hooks (useFetch)**: Simplifies API data fetching with session management for secure communication with the Supabase backend.
   - **utils (supabase)**: A function that creates and returns a Supabase client instance with a custom authorization header.

2. **public**
   - **Assets**: Includes static files like logos and icons.

3. **styles**
   - **Global CSS**: Tailwind configurations and global styles.

## Installation

To get started with **SimplyHire**, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/Aditya112003/JobPortal.git
```

2.**Navigate to the project directory**:

```
cd JobPortal 
```

 3.**Install the dependencies**:

 ```
npm install
 ```

 4. **Set up environment variables**: Create a `.env` file in the root directory and add your Supabase and Clerk environment variables:

```
VITE_SUPABASE_URL= your supabase url 
VITE_SUPABASE_ANON_KEY= your_supabase_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_api_key
```

5. **Run the development server**:

```
npm run dev
```

6. **Open your browser**: Visit [http://localhost:5173](http://localhost:5173) to view the application.
