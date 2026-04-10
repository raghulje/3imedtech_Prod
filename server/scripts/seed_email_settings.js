"use strict";

require("dotenv").config();
const { sequelize, EmailSettings } = require("../models");

async function seedEmailSettings() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established\n");
    
    console.log("📧 Seeding Email Settings...\n");

    // Check if email settings already exist
    const existing = await EmailSettings.findOne({ where: { isActive: true } });
    
    if (existing) {
      console.log("⚠️  Email settings already exist. Updating with new configuration...");
      
      await existing.update({
        smtpHost: process.env.SMTP_HOST || "smtp.zoho.in",
        smtpPort: Number(process.env.SMTP_PORT || 465),
        smtpSecure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
        smtpUser: process.env.SMTP_USER || "",
        smtpPassword: process.env.SMTP_PASS || "",
        fromEmail: process.env.FROM_EMAIL || process.env.SMTP_USER || "",
        fromName: process.env.FROM_NAME || "3i MedTech",
        toEmail: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || "", // Where contact form submissions will be sent
        isActive: true,
      });
      
      console.log("✅ Email settings updated successfully!");
    } else {
      await EmailSettings.create({
        smtpHost: process.env.SMTP_HOST || "smtp.zoho.in",
        smtpPort: Number(process.env.SMTP_PORT || 465),
        smtpSecure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
        smtpUser: process.env.SMTP_USER || "",
        smtpPassword: process.env.SMTP_PASS || "",
        fromEmail: process.env.FROM_EMAIL || process.env.SMTP_USER || "",
        fromName: process.env.FROM_NAME || "3i MedTech",
        toEmail: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || "", // Where contact form submissions will be sent
        isActive: true,
      });
      
      console.log("✅ Email settings created successfully!");
    }

    console.log("\n📋 Email Configuration:");
    console.log(`   SMTP Host: ${process.env.SMTP_HOST || "smtp.zoho.in"}`);
    console.log(`   SMTP Port: ${process.env.SMTP_PORT || 465}`);
    console.log(`   SMTP User: ${process.env.SMTP_USER || "(not set)"}`);
    console.log(`   From Email: ${process.env.FROM_EMAIL || process.env.SMTP_USER || "(not set)"}`);
    console.log(`   To Email: ${process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || "(not set)"}`);
    console.log("\n✅ Email settings seeded successfully!\n");
  } catch (error) {
    console.error("❌ Error seeding email settings:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedEmailSettings()
    .then(() => {
      console.log("✅ Email settings seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Email settings seeding failed:", error);
      process.exit(1);
    });
}

module.exports = seedEmailSettings;

