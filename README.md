# 3i MedTech Production - Setup Guide

Complete setup guide for deploying the 3i MedTech CMS and frontend application in production.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Port Configuration](#port-configuration)
- [Environment Variables](#environment-variables)
- [Building the Frontend](#building-the-frontend)
- [Running the Application](#running-the-application)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is a full-stack application consisting of:
- **Backend**: Node.js/Express server with MySQL database
- **Frontend**: React application built with Vite
- **Architecture**: Single server serves both API and built frontend on one port

**Default Port**: `5000` (configurable)

---

## 📦 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Verify Installation

```bash
node --version    # Should be v16+
npm --version     # Should be v8+
mysql --version   # Should be v5.7+
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd 3imedtech_production
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

---

## 🗄️ Database Setup

### Step 1: Create MySQL Database

1. **Login to MySQL**:
   ```bash
   mysql -u root -p
   ```

2. **Create the database**:
   ```sql
   CREATE DATABASE IF NOT EXISTS 3imedtech_production;
   ```

3. **Create a user** (optional, if not using root):
   ```sql
   CREATE USER 'raghul'@'localhost' IDENTIFIED BY 'RefexAdmin@123';
   GRANT ALL PRIVILEGES ON 3imedtech_production.* TO 'raghul'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Exit MySQL**:
   ```sql
   EXIT;
   ```

### Step 2: Import Database

Import the provided SQL file:

```bash
# From the project root directory
mysql -u raghul -p 3imedtech_production < 3imedtechcmsproduction.sql
```

**Or using MySQL command line**:
```bash
mysql -u raghul -p
```

```sql
USE 3imedtech_production;
SOURCE 3imedtechcmsproduction.sql;
EXIT;
```

### Step 3: Verify Database Configuration

Update `server/config/config.json` with your database credentials:

```json
{
  "development": {
    "username": "raghul",
    "password": "RefexAdmin@123",
    "database": "3imedtech_production",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

**Note**: Update `development`, `test`, and `production` sections as needed.

---

## 🔌 Port Configuration

The default port is **5000**, but you can change it if needed (e.g., to 3004, 3005, etc.).

### Where to Update Port Configuration

#### 1. **Server Port** (Primary Configuration)

**File**: `server/.env` (create this file)

```env
PORT=5000
# OR
APP_PORT=5000
```

**Or** set it when running:
```bash
PORT=3004 npm start
```

**File**: `server/index.js` (line 263)
```javascript
const PORT = process.env.PORT || process.env.APP_PORT || 5000;
```
*This is the fallback - only change if you don't use environment variables*

#### 2. **Client API URL** (For Development)

**File**: `client/.env` (create this file for development)

```env
VITE_API_URL=http://localhost:5000
```

**File**: `client/vite.config.ts` (lines 83, 96)
```typescript
target: process.env.VITE_API_URL || 'http://localhost:5000',
```
*This is only used during development (`npm run dev`)*

#### 3. **Client API Configuration** (For Production Build)

**File**: `client/.env.production` (create this file)

```env
VITE_API_URL=http://localhost:5000
```

**Files that use this**:
- `client/src/services/api.ts` (line 3)
- `client/src/services/adminApi.ts` (line 9)
- `client/src/pages/admin/shared/utils.ts` (lines 3, 8)

**Important**: After changing the port, you **must rebuild** the frontend:
```bash
cd client
npm run build
```

### Port Configuration Summary

| Component | File | Default | How to Change |
|-----------|------|---------|---------------|
| **Server Port** | `server/.env` | 5000 | Set `PORT=3004` or `APP_PORT=3004` |
| **Client Dev API** | `client/.env` | localhost:5000 | Set `VITE_API_URL=http://localhost:3004` |
| **Client Prod API** | `client/.env.production` | localhost:5000 | Set `VITE_API_URL=http://localhost:3004` |

### Example: Changing Port to 3004

1. **Create/Update** `server/.env`:
   ```env
   PORT=3004
   ```

2. **Create/Update** `client/.env.production`:
   ```env
   VITE_API_URL=http://localhost:3004
   ```

3. **Rebuild frontend**:
   ```bash
   cd client
   npm run build
   ```

4. **Start server**:
   ```bash
   cd ../server
   npm start
   ```

The application will now run on port **3004**.

---

## ⚙️ Environment Variables

### Server Environment Variables

Create `server/.env` file (copy from `server/serverenv.sample`):

```env
# Application Environment
NODE_ENV=production

# Server Configuration
# IMPORTANT: This must match the port you're using
APP_PORT=5000

# JWT Authentication Keys
# IMPORTANT: Change these to secure random strings in production!
APP_KEY=your_super_secret_jwt_key_change_in_production
API_KEY=your_refresh_secret_key_change_in_production

# Frontend URL (for CORS and password reset links)
# IMPORTANT: Update with your actual domain/port
FRONT_END_URL=http://localhost:5000

# Default Password (for password reset functionality)
DEFAULT_PASSWORD=Admin@123

# Database Configuration
# Note: Database config is primarily in config/config.json
# These are kept for reference/override if needed
DB_HOST=localhost
DB_PORT=3306
DB_USER=raghul
DB_PASSWORD=RefexAdmin@123
DB_NAME=3imedtech_production

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Admin User Configuration (for seeding/initial setup)
ADMIN_EMAIL=admin@3imedtech.com
ADMIN_PASSWORD=Admin@123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User

# Optional: Skip database schema alterations for faster startup
SKIP_ALTER=false
```

### Client Environment Variables (Production)

Create `client/.env.production`:

```env
VITE_API_URL=http://localhost:5000
```

**Replace `localhost:5000` with your actual server URL/port.**

---

## 🏗️ Building the Frontend

The frontend must be built before the server can serve it.

### Build Command

```bash
cd client
npm run build
```

This creates the `client/out` folder with all production-ready files.

### Verify Build

After building, check that `client/out/index.html` exists:

```bash
ls client/out/index.html  # Linux/Mac
dir client\out\index.html  # Windows
```

---

## ▶️ Running the Application

### Production Mode (Recommended)

1. **Build the frontend** (if not already built):
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**:
   ```bash
   cd ../server
   npm start
   ```

The server will:
- ✅ Detect the built frontend automatically
- ✅ Serve both API and frontend on the configured port
- ✅ Handle all React Router routes correctly

### Development Mode

**Server** (Terminal 1):
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

**Client** (Terminal 2):
```bash
cd client
npm run dev  # Runs on port 3000, proxies API to server
```

---

## 🌐 Production Deployment

### Checklist

- [ ] MySQL is installed and running
- [ ] Database is created and imported (`3imedtechcmsproduction.sql`)
- [ ] Database credentials updated in `server/config/config.json`
- [ ] Server `.env` file created with correct values
- [ ] Client `.env.production` created with correct API URL
- [ ] Frontend is built (`npm run build` in client directory)
- [ ] Port is configured correctly (if not using default 5000)
- [ ] JWT keys are changed to secure values
- [ ] Firewall allows traffic on the configured port

### Using PM2 (Process Manager)

Install PM2:
```bash
npm install -g pm2
```

Start the server:
```bash
cd server
pm2 start index.js --name "3imedtech-server"
```

Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Using Systemd (Linux)

Create `/etc/systemd/system/3imedtech.service`:

```ini
[Unit]
Description=3i MedTech Server
After=network.target mysql.service

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/3imedtech_production/server
Environment=NODE_ENV=production
Environment=PORT=5000
ExecStart=/usr/bin/node index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable 3imedtech
sudo systemctl start 3imedtech
```

---

## 🔍 Troubleshooting

### Database Connection Issues

**Problem**: Server hangs at "Connecting to database..."

**Solutions**:
1. Check if MySQL is running:
   ```bash
   # Windows
   Get-Service MySQL*
   
   # Linux
   sudo systemctl status mysql
   ```

2. Test database connection:
   ```bash
   cd server
   node check-database.js
   ```

3. Verify credentials in `server/config/config.json`

4. Check if database exists:
   ```sql
   SHOW DATABASES;
   ```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
1. Find what's using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Linux/Mac
   lsof -i :5000
   ```

2. Use a different port (see [Port Configuration](#port-configuration))

### Frontend Not Loading

**Problem**: Frontend shows 404 or doesn't load

**Solutions**:
1. Verify frontend is built:
   ```bash
   ls client/out/index.html
   ```

2. Rebuild frontend:
   ```bash
   cd client
   npm run build
   ```

3. Check server logs for frontend detection message

### API Calls Failing

**Problem**: Frontend can't connect to API

**Solutions**:
1. Verify `VITE_API_URL` in `client/.env.production` matches server port
2. Rebuild frontend after changing API URL
3. Check CORS settings in `server/index.js`
4. Verify server is running and accessible

### Database Sync Taking Too Long

**Problem**: Database sync takes 30-60 seconds

**Solution**: This is normal for first run. To skip schema changes:
```env
SKIP_ALTER=true
```
Add this to `server/.env`

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Run `node server/check-database.js` to test database connection
4. Verify all environment variables are set correctly

---

## 📝 Important Notes

1. **Security**: Change JWT keys (`APP_KEY`, `API_KEY`) in production!
2. **Database**: Keep database credentials secure
3. **Ports**: Ensure firewall allows traffic on configured port
4. **Build**: Always rebuild frontend after changing API URL or port
5. **Environment**: Use `NODE_ENV=production` in production
6. **Data attribution**: Contact-form city data uses Countries States Cities Database via `@countrystatecity/countries` (ODbL-1.0). Keep attribution visible when redistributing.

---

## 🎉 Success!

Once everything is set up, you should see:

```
============================================================
🚀 SERVER STARTED SUCCESSFULLY
============================================================
📍 Server running on: http://localhost:5000
📍 API endpoints: http://localhost:5000/api/*
📍 Frontend served from: /path/to/client/out
📍 Frontend accessible at: http://localhost:5000
📍 React Router configured: All routes will serve index.html
============================================================
```

Access your application at: **http://localhost:5000** (or your configured port)

---

**Last Updated**: 2024
**Version**: Production

