# Portfolio Website

A modern, responsive single-page portfolio website built as a full-stack web application.

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend  | Node.js, Express.js |
| Database | MySQL               |
| Hosting  | Render              |
| VCS      | Git & GitHub        |

## Setup

### Prerequisites
- Node.js (v16+)
- MySQL Server

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd portfolio_project
npm install
```

### 2. Database Setup
```bash
mysql -u root -p < schema.sql
```

### 3. Environment Variables
Create a `.env` file in the root:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
PORT=5000
```

### 4. Run
```bash
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

## Project Structure
```
portfolio_project/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── .env
├── .gitignore
├── package.json
├── schema.sql
├── server.js
└── README.md
```

## Features
- Responsive single-page design with dark theme
- Animated hero section with typing effect
- Skill bars with scroll-triggered animations
- Project showcase cards with hover effects
- Contact form connected to MySQL database
- Mobile-friendly hamburger navigation

## Deployment (Render)
1. Push to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repository
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add environment variables in Render dashboard

## License
ISC
