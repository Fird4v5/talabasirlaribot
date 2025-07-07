// scripts/cleanup.ts
import { db } from "../firebase";
import { Timestamp } from "firebase-admin/firestore";

async function runCleanup() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  // 🧹 Cleanup 1: Old Pending Confessions
  const pendingSnapshot = await db
    .collection("confessions")
    .where("status", "==", "pending")
    .where("createdAt", "<", Timestamp.fromDate(cutoff))
    .get();

  let pendingDeleted = 0;
  for (const doc of pendingSnapshot.docs) {
    await doc.ref.delete();
    pendingDeleted++;
  }

  // 🧹 Cleanup 2: Old Posted Confessions
  const postedSnapshot = await db
    .collection("confessions")
    .where("status", "==", "posted")
    .where("createdAt", "<", Timestamp.fromDate(cutoff))
    .get();

  let postedDeleted = 0;
  for (const doc of postedSnapshot.docs) {
    await doc.ref.delete();
    postedDeleted++;
  }

  console.log("✅ Cleanup completed:");
  console.log(`  🟡 Pending deleted: ${pendingDeleted}`);
  console.log(`  📣 Posted deleted:  ${postedDeleted}`);
}

runCleanup();
