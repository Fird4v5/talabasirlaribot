import { db } from "../firebase";
import * as readline from "readline";

async function runAdmin() {
  const totalSnapshot = await db
    .collection("confessions")
    .where("status", "==", "pending")
    .get();

  const total = totalSnapshot.size;
  console.log(`\n📬 Total pending confessions: ${total}\n`);

  const snapshot = await db
    .collection("confessions")
    .where("status", "==", "pending")
    .orderBy("createdAt", "desc")
    .limit(10)
    .get();

  if (snapshot.empty) {
    console.log("✅ No pending confessions.");
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let reviewed = 0;

  for (const doc of snapshot.docs) {
    reviewed++;
    const data = doc.data();

    console.log(`\n📝 Reviewing ${reviewed}/${total}`);
    console.log(`ID: ${doc.id}`);
    console.log(`Type: ${data.type}`);
    console.log("Content:", data.content);
    console.log(`Username: @${data.username || "unknown"}`);
    console.log(`Date: ${data.createdAt?.toDate?.() || "unknown"}`);

    await new Promise<void>((resolve) => {
      rl.question("✅ Approve this one? (y/n): ", async (answer) => {
        if (answer.toLowerCase() === "y") {
          await doc.ref.update({ status: "approved" });
          console.log("✅ Approved!");
        } else {
          await doc.ref.delete();
          console.log("🗑️ Deleted.");
        }
        resolve();
      });
    });
  }

  rl.close();
}

runAdmin();


// Load 10 new confessions (pending only)

// See each one’s content + metadata

// Decide if it should be approved or deleted

// Update your database accordingly