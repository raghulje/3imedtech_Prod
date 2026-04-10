require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const history = require("connect-history-api-fallback");
const status = require("./helpers/response");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-openidconnect");

const app = express();

// CORS must be applied before any other middleware
// More permissive CORS for development
app.use((req, res, next) => {
  // Log all incoming requests for debugging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from origin: ${req.headers.origin || 'no-origin'}`);
  
  // Set CORS headers for all requests
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling preflight request for:', req.url);
    return res.status(200).end();
  }
  
  next();
});

// Additional CORS middleware as backup
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cache-Control', 'Pragma'],
  optionsSuccessStatus: 200
}));

// Middleware to parse incoming JSON data ==================================
app.use(express.json({  }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Routes
app.use("/api/auth", (req, res, next) => {
  console.log(`🔍 [AUTH ROUTER] ${req.method} ${req.path}`);
  next();
}, require("./routes/auth"));
app.use("/auth", require("./routes/auth")); // Keep for backward compatibility
app.use("/api/cms/home", require("./routes/home_cms"));
app.use("/api/cms/about", require("./routes/about_cms"));
app.use("/api/cms/products", require("./routes/products_cms"));
app.use("/api/cms/imaging-accessories", require("./routes/imaging_accessories_cms"));
app.use("/api/cms/portable-xray", require("./routes/portable_xray_cms"));
app.use("/api/cms/radiography", require("./routes/radiography_cms"));
app.use("/api/cms/flat-panel", require("./routes/flat_panel_cms"));
app.use("/api/cms/mammography", require("./routes/mammography_cms"));
app.use("/api/cms/refurbished-mri", require("./routes/refurbished_mri_cms"));
app.use("/api/cms/fpd-carm", require("./routes/fpd_carm_cms"));
app.use("/api/cms/home-page", (req, res, next) => {
  console.log(`🔍 [HOME-PAGE ROUTER] ${req.method} ${req.url}`);
  next();
}, require("./routes/home_page_cms"));
app.use("/api/cms/about-page", require("./routes/about_page_cms"));
app.use("/api/cms/mission-vision", require("./routes/mission_vision_cms"));
app.use("/api/cms/why-choose-us-page", require("./routes/why_choose_us_page_cms"));
app.use("/api/cms/contact-page", require("./routes/contact_page_cms"));
app.use("/api/cms/header-footer", require("./routes/header_footer_cms"));
app.use("/api/cms/search-results", require("./routes/search_results_cms"));
app.use("/api/cms/users", require("./routes/user_management_cms"));
app.use("/api/cms/email-settings", require("./routes/email_settings_cms"));
app.use("/api/contact", require("./routes/contact_form"));
app.use("/api/contact-form", require("./routes/contact_form"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running well",
    timestamp: new Date().toISOString()
  });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Test POST endpoint for CORS
app.post("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "POST CORS is working!",
    body: req.body,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Image upload endpoint - MUST be before the catch-all API route
const uploadImage = require('./middlewares/uploadImage');
app.post('/api/upload/image', uploadImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Return the file path relative to the server
    const imageUrl = `/uploads/images/${req.file.filename}`;
    res.json({ 
      success: true, 
      imageUrl: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Document (PDF) upload endpoint
const uploadDocument = require('./middlewares/uploadDocument');
app.post('/api/upload/document', uploadDocument.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document file provided' });
    }
    
    // Return the file path relative to the server
    const documentUrl = `/uploads/documents/${req.file.filename}`;
    res.json({ 
      success: true, 
      documentUrl: documentUrl,
      imageUrl: documentUrl, // Also return as imageUrl for compatibility
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Serve uploaded files (images and documents)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.all("/api/*", (req, res) => {
  console.log(`❌ [CATCH-ALL] 404 for ${req.method} ${req.url} - Endpoint Not Found`);
  return status.responseStatus(res, 404, "Endpoint Not Found");
});

// ============================================================================
// FRONTEND STATIC FILE SERVING CONFIGURATION
// ============================================================================
// Automatically detect and serve the built React frontend from client/out
// This allows running both API and frontend on a single port
// ============================================================================

const clientOutPath = path.join(__dirname, "../client/out");
const clientOutExists = fs.existsSync(clientOutPath);
const resolvedClientPath = path.resolve(clientOutPath);

// Log detection status
console.log("\n" + "=".repeat(60));
console.log("📦 FRONTEND BUILD DETECTION");
console.log("=".repeat(60));
console.log(`Checking for client build at: ${resolvedClientPath}`);

if (clientOutExists) {
  // Check if index.html exists
  const indexPath = path.join(clientOutPath, "index.html");
  const indexExists = fs.existsSync(indexPath);
  
  if (indexExists) {
    console.log(`✅ Client build detected successfully!`);
    console.log(`   Path: ${resolvedClientPath}`);
    console.log(`   Index file: ${path.join(resolvedClientPath, "index.html")}`);
    console.log(`   Serving static files with caching enabled`);
    console.log(`   React Router configured with history API fallback`);
    console.log("=".repeat(60) + "\n");
    
    // Serve static files (JS, CSS, images, etc.) FIRST
    app.use(express.static(clientOutPath, {
      maxAge: '1d', // Cache static assets for 1 day
      etag: true,
      lastModified: true
    }));
    
    // Configure history API fallback to ignore API routes and handle React Router
    app.use(history({
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      rewrites: [
        // Don't rewrite API routes
        { from: /^\/api\/.*$/, to: function(context) { return context.parsedUrl.pathname; } },
        // Don't rewrite uploads
        { from: /^\/uploads\/.*$/, to: function(context) { return context.parsedUrl.pathname; } },
        // Rewrite everything else to index.html for React Router
        { from: /./, to: '/index.html' }
      ]
    }));
    
    // Catch-all handler: send back React's index.html file for any non-API routes
    app.get("*", (req, res) => {
      // Skip API routes and uploads
      if (req.url.startsWith("/api") || req.url.startsWith("/uploads")) {
        return;
      }
      res.sendFile(path.join(clientOutPath, "index.html"));
    });
  } else {
    console.log(`⚠️  Client build folder exists but index.html not found!`);
    console.log(`   Path: ${resolvedClientPath}`);
    console.log(`   Expected: ${indexPath}`);
    console.log(`   Run 'npm run build' in the client directory.`);
    console.log("=".repeat(60) + "\n");
    
    app.get("*", (req, res) => {
      if (!req.url.startsWith("/api") && !req.url.startsWith("/uploads")) {
        res.status(404).json({ 
          message: "Client build incomplete. Run 'npm run build' in client directory.",
          path: resolvedClientPath,
          note: "In development, you can run 'npm run dev' in client directory separately on port 3000"
        });
      }
    });
  }
} else {
  console.log(`⚠️  Client build not found!`);
  console.log(`   Expected path: ${resolvedClientPath}`);
  console.log(`   Run 'npm run build' in the client directory to build the frontend.`);
  console.log(`   Server will still run, but frontend routes will return 404.`);
  console.log("=".repeat(60) + "\n");
  
  // In development, if client/out doesn't exist, just log a message
  app.get("*", (req, res) => {
    if (!req.url.startsWith("/api") && !req.url.startsWith("/uploads")) {
      res.status(404).json({ 
        message: "Client not built. Run 'npm run build' in client directory.",
        path: resolvedClientPath,
        note: "In development, you can run 'npm run dev' in client directory separately on port 3000"
      });
    }
  });
}

// ============================================================================
// SERVER STARTUP CONFIGURATION
// ============================================================================

// Set port (can be overridden by environment variables)
const PORT = process.env.PORT || process.env.APP_PORT || 5000;

console.log("\n" + "=".repeat(60));
console.log("🔌 DATABASE CONNECTION");
console.log("=".repeat(60));
console.log("Connecting to database...");
console.log(`   Host: ${sequelize.config.host}`);
console.log(`   Port: ${sequelize.config.port}`);
console.log(`   Database: ${sequelize.config.database}`);
console.log(`   Username: ${sequelize.config.username}`);
console.log("   Timeout: 10 seconds");

// Test connection first with timeout
const connectionTimeout = setTimeout(() => {
  console.error("\n❌ Database connection timeout!");
  console.error("   The connection is taking too long (>10 seconds)");
  console.error("\nTroubleshooting:");
  console.error("1. Check if MySQL service is running:");
  console.error("   - Windows: Get-Service MySQL*");
  console.error("   - Or check Services app");
  console.error("2. Verify MySQL is listening on port 3306:");
  console.error("   - netstat -an | findstr 3306");
  console.error("3. Test connection manually:");
  console.error(`   - mysql -u raghul -p -h localhost -P 3306`);
  console.error("4. Check if database exists:");
  console.error(`   - mysql -u raghul -p -e "SHOW DATABASES;"`);
  console.error("=".repeat(60) + "\n");
  process.exit(1);
}, 10000); // 10 second timeout

sequelize
  .authenticate()
  .then(() => {
    clearTimeout(connectionTimeout);
    console.log("✅ Database connection established");
    
    // Check if we should use alter (can be slow with many models)
    // Set SKIP_ALTER=true in .env to skip alter for faster startup
    const useAlter = process.env.SKIP_ALTER !== 'true';
    const syncStartTime = Date.now();
    
    if (useAlter) {
      console.log("   Syncing database models with ALTER (this may take 30-60 seconds)...");
      console.log("   💡 Tip: Set SKIP_ALTER=true in .env for faster startup (skips schema changes)");
    } else {
      console.log("   Syncing database models (schema changes skipped for speed)...");
    }
    
    return sequelize.sync({ alter: useAlter }).then(() => {
      const syncDuration = Date.now() - syncStartTime;
      const seconds = (syncDuration / 1000).toFixed(1);
      console.log(`✅ Database synced successfully (${seconds}s)`);
    });
  })
  .then(async () => {
    
    // Initialize email service
    try {
      const { initializeEmailService } = require('./utils/emailService');
      await initializeEmailService();
      console.log("✅ Email service initialized");
    } catch (emailError) {
      console.warn("⚠️  Email service initialization failed (non-critical):", emailError.message);
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log("\n" + "=".repeat(60));
      console.log("🚀 SERVER STARTED SUCCESSFULLY");
      console.log("=".repeat(60));
      console.log(`📍 Server running on: http://localhost:${PORT}`);
      console.log(`📍 API endpoints: http://localhost:${PORT}/api/*`);
      if (clientOutExists) {
        console.log(`📍 Frontend served from: ${resolvedClientPath}`);
        console.log(`📍 Frontend accessible at: http://localhost:${PORT}`);
        console.log(`📍 React Router configured: All routes will serve index.html`);
      } else {
        console.log(`⚠️  Frontend not built - API only mode`);
        console.log(`   Build frontend with: cd client && npm run build`);
      }
      console.log("=".repeat(60));
      console.log(`\n✅ Ready to accept connections on port ${PORT}\n`);
    });
  })
  .catch((err) => {
    clearTimeout(connectionTimeout);
    console.error("\n" + "=".repeat(60));
    console.error("❌ DATABASE CONNECTION FAILED");
    console.error("=".repeat(60));
    console.error("Error type:", err.name);
    console.error("Error message:", err.message);
    
    // Provide specific error messages
    if (err.name === 'SequelizeConnectionError') {
      console.error("\n🔍 Connection Error - Possible causes:");
      console.error("   • MySQL service is not running");
      console.error("   • Wrong host/port (check: localhost:3306)");
      console.error("   • Firewall blocking connection");
    } else if (err.name === 'SequelizeAccessDeniedError') {
      console.error("\n🔍 Access Denied - Possible causes:");
      console.error("   • Wrong username or password");
      console.error("   • User doesn't have permission to access database");
    } else if (err.name === 'SequelizeDatabaseError') {
      console.error("\n🔍 Database Error - Possible causes:");
      console.error("   • Database '3imedtech_production' doesn't exist");
      console.error("   • User doesn't have permission to access this database");
    }
    
    console.error("\n📋 Quick Checks:");
    console.error("1. Is MySQL running?");
    console.error("   PowerShell: Get-Service MySQL*");
    console.error("   CMD: sc query MySQL*");
    console.error("\n2. Test MySQL connection:");
    console.error(`   mysql -u raghul -p -h localhost -P 3306`);
    console.error("   Password: RefexAdmin@123");
    console.error("\n3. Check if database exists:");
    console.error(`   mysql -u raghul -p -e "SHOW DATABASES;"`);
    console.error("\n4. Create database if missing:");
    console.error(`   mysql -u raghul -p -e "CREATE DATABASE IF NOT EXISTS 3imedtech_production;"`);
    console.error("=".repeat(60) + "\n");
    process.exit(1);
  });

