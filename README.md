# PopX Journey

PopX Journey is a React-based web application that provides a seamless user experience through reusable components, efficient routing, and state management. This guide will help you set up, install dependencies, and run the application.

## Features
- Modular component architecture
- React Router for navigation
- Context API for global state management
- Custom hooks for reusable logic
- API integrations for backend communication

## Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later) – [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** (alternative package manager)

## Installation

1. **Clone the Repository**
```sh
git clone https://github.com/your-username/popx-journey.git
cd popx-journey
```

2. **Install Dependencies**
```sh
npm install
# or
yarn install
```

## Running the Application

### Development Mode
To start the application in development mode, run:
```sh
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:3000/` (default port).

### Production Mode
To build and run the application in production mode:
```sh
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

```
📦 popx-journey
├── 📂 src
│   ├── 📂 components    # Reusable UI components
│   ├── 📂 pages         # Application pages
│   ├── 📂 context       # Global state management (Auth, Theme, etc.)
│   ├── 📂 hooks         # Custom hooks
│   ├── 📂 lib           # Utility functions and helpers
│   ├── 📂 services      # API integrations
│   ├── 📜 App.tsx       # Main entry point
├── 📜 package.json      # Project metadata and scripts
├── 📜 README.md         # Project documentation
```

## Environment Variables
To configure the application, create a `.env` file in the root directory and add:
```env
REACT_APP_API_URL=https://your-api-endpoint.com
```
Replace the URL with your actual API endpoint.

## Additional Commands

- **Lint the code**
```sh
npm run lint
# or
yarn lint
```
- **Run tests**
```sh
npm test
# or
yarn test
```
- **Format code using Prettier**
```sh
npm run format
# or
yarn format
```



