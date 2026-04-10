# Product Pages Seed Scripts Instructions

This document explains how to seed product pages individually without affecting your existing CMS content.

## Available Seed Scripts

### Product Pages (Run these individually)

1. **Flat Panel Detectors Products**
   ```bash
   cd server
   node scripts/seed_flat_panel_products.js
   ```

2. **Mammography Systems Products**
   ```bash
   cd server
   node scripts/seed_mammography_products.js
   ```

3. **Refurbished MRI Products**
   ```bash
   cd server
   node scripts/seed_refurbished_mri_products.js
   ```

4. **Imaging Accessories Products**
   ```bash
   cd server
   node scripts/seed_imaging_accessories_products.js
   ```

5. **Portable X-Ray Products**
   ```bash
   cd server
   node scripts/seed_portable_xray_products.js
   ```

6. **Contact Page Data**
   ```bash
   cd server
   node scripts/seed_contact_page.js
   ```

## What Gets Seeded

### Flat Panel Detectors
- Glass-Free Flat Panel Detector
- Retrofit Mammography Panel

### Mammography Systems
- PINKVIEW DR PLUS (Digital Mammography)
- PINKVIEW RT (Analog Mammography)

### Refurbished MRI
- GE Signa HDxt 1.5Tesla
- Philips Achieva 3.0Tesla X-Series

### Imaging Accessories
- DMD D 2000, X-Ray Film Digitizer
- Image Display Monitors
- CT/MR/Mammograph Multi-Modality Workstations
- CD/DVD Publishers
- MedE Drive for Patient Data Storage

### Portable X-Ray
- Mini 90 Point-of-Care X-Ray
- ADONIS HF Mobile DR

### Contact Page
- Hero section (title: "Contact Us")
- 4 Contact Info Cards (Registered Office, Corporate Office, Phone, Email)
- Map section (Google Maps embed URL)
- Contact Form section (title and description)

## Important Notes

⚠️ **These scripts use `findOrCreate`**, so:
- Running them multiple times is safe - they won't create duplicates
- They will only create products if they don't already exist (based on title)
- Your existing CMS content (Home, About, Mission & Vision, Why Choose Us) will NOT be affected

## After Seeding

1. Go to the CMS dashboard
2. Navigate to each product page (e.g., "Flat Panel Detectors", "Mammography Systems", etc.)
3. Click "Edit" on each product
4. Upload product images using the image upload field
5. The images will be saved and displayed on the frontend

## Email Settings

After seeding the contact page, configure email settings:

1. Go to CMS → Contact Page → Email Settings tab
2. Click "Configure Email" or "Edit Settings"
3. Fill in your SMTP details:
   - SMTP Host (e.g., smtp.zoho.in)
   - SMTP Port (587 for TLS, 465 for SSL)
   - SMTP Username (your email)
   - SMTP Password (your email password or app password)
   - From Email (sender email)
   - From Name (sender name)
   - To Email (where contact form submissions go)
4. Click "Send Test" to verify your settings
5. Save the settings

## Contact Form Email Functionality

Once email settings are configured:
- When a visitor fills out the contact form on your website
- The form data will be sent to the "To Email" address you configured
- You'll receive an email with all the form details (name, organization, email, phone, inquiry type, message)

## Troubleshooting

### Email Not Sending
- Verify SMTP settings are correct
- Check if your email provider requires app-specific passwords
- Ensure SMTP port matches your security setting (587 for TLS, 465 for SSL)
- Use the "Send Test" button to verify settings

### Products Not Showing
- Check if products are marked as "Active" in the CMS
- Verify images are uploaded (products will show but without images)
- Check browser console for any errors

