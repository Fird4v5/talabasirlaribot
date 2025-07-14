import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!serviceAccountBase64) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_BASE64");
  }

  let serviceAccountJson: string;
  try {
    serviceAccountJson = Buffer.from(serviceAccountBase64, "base64").toString("utf8");
    JSON.parse(serviceAccountJson); // sanity check
  } catch (err) {
    console.error("🔥 Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64:", err);
    throw err;
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
