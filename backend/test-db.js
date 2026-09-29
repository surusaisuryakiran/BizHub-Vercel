require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  const uri = process.env.MONGO_URI;
  console.log("--------------------------------------------------");
  console.log("Checking MongoDB Atlas Connection...");
  console.log("--------------------------------------------------");

  if (!uri) {
    console.error("❌ ERROR: MONGO_URI is missing in backend/.env");
    process.exit(1);
  }

  if (uri.includes("CLUSTER.mongodb.net")) {
    console.error("❌ ERROR: Your MONGO_URI still contains 'CLUSTER.mongodb.net'.");
    console.error("   Please replace 'CLUSTER' with your real MongoDB Atlas cluster address");
    console.error("   (e.g., cluster0.xxxxxxx.mongodb.net).");
    process.exit(1);
  }

  try {
    console.log("Connecting to:", uri.replace(/:([^:@]+)@/, ":****@"));
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("✅ SUCCESS: Successfully connected to MongoDB Atlas!");
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    await mongoose.disconnect();
    console.log("Connection closed cleanly.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("\n💡 Hint: DNS resolution failed. Check your cluster domain name.");
    } else if (error.message.includes("Authentication failed") || error.message.includes("bad auth")) {
      console.error("\n💡 Hint: Authentication failed. Check your username and password.");
    } else if (error.message.includes("querySrv") || error.message.includes("Server selection timed out")) {
      console.error("\n💡 Hint: Connection timed out. Make sure your IP is whitelisted under Network Access in MongoDB Atlas (or set to 0.0.0.0/0).");
    }
    process.exit(1);
  }
}

testConnection();
