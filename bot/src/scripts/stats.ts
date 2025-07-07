// scripts/stats.ts
import { db } from "../firebase";

async function runStats() {
  const totalSnapshot = await db
  .collection("confessions")
  .get();

  const pendingSnapshot = await db
    .collection("confessions")
    .where("status", "==", "pending")
    .get();
  const approvedSnapshot = await db
    .collection("confessions")
    .where("status", "==", "approved")
    .get();
  const postedSnapshot = await db
    .collection("confessions")
    .where("status", "==", "posted")
    .get();

  console.log("📊 Confession Stats:");
  console.log("-----------------------------");
  console.log(`📦 Total:    ${totalSnapshot.size}`);
  console.log(`🟡 Pending:  ${pendingSnapshot.size}`);
  console.log(`🟢 Approved: ${approvedSnapshot.size}`);
  console.log(`📣 Posted:   ${postedSnapshot.size}`);
  console.log("-----------------------------");
}

runStats();




// Tells you how many confessions you’ve received	

// Helps track backlog of pending/approved

// Keeps posting and approval balanced

// Can be run daily or anytime manually
