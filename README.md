# Cafe Table Booking Application

This is a cafe table booking application that allows users to book tables for their family and friends. The project was created using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User registration and authentication
- Table availability and booking management
- User-friendly interface for easy table selection and booking
- Confirmation notifications for successful bookings
- Admin dashboard for managing tables and bookings

## Technologies Used

- **MongoDB**: A NoSQL database used for storing table and user information.
- **Express.js**: A web application framework for creating the server-side API.
- **React.js**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime environment for server-side development.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bootstrap**: A popular CSS framework for responsive and mobile-first design.

## Installation

To run this application on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/SoheelG/adadcafe-table-booking.git`
2. Change to the project directory: `cd cafe-table-booking`
3. Install the dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     - `DB_URL` - MongoDB connection URL
     - `JWT_SECRET` - Secret key for JWT token generation
   - Save the file.
5. Start the development server: `npm run dev`

## Usage

Once the development server is running, you can access the application by visiting `http://localhost:3000` in your web browser. From there, you can navigate the application and book tables for your family and friends.

## License

This project is licensed under the [MIT License](LICENSE.md).
