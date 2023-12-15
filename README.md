
# README

## About

"Apartelle_web" is web application tailored for apartelle booking management. It features a React Vite client side for an engaging and dynamic user interface, and an Express.js server side for dependable server-side processing.

## Prerequisites

Before proceeding with the installation, ensure you have the following tools installed:
- **Git:** Essential for cloning the repository and managing version control.
- **Node.js:** Required to run the application.
- **npm (Node Package Manager):** Utilized for installing and managing dependencies.
- **XAMPP:** Necessary for managing the MySQL database.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yaj-t/Apartelle_web.git
   ```
2. **Install dependencies in both the client and server directories:**
   ```bash
   cd Apartelle_web/client
   npm install
   cd ../server
   npm install
   ```

## Database Setup

- **Start XAMPP** and create a database named `apartelle_development`.
- The database tables will automatically be set up by the program.
- Configuration settings are located in the `configs` folder.

## Usage

To launch the website, navigate to both the client and server directories and execute the following command in each:
   ```bash
   cd Apartelle_web/client
   npm run dev
   cd ../server
   npm run dev
   ```

This command starts the development servers for both the client and server sides of the application, enabling you to access and manage the apartelle web application.
