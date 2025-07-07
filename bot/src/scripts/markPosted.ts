// scripts/markPosted.ts
import { db } from "../firebase";
import * as readline from "readline";

async function runMarkPosted() {
  const snapshot = await db
    .collection("confessions")
    .where("status", "==", "approved")
    .orderBy("createdAt", "desc")
    .get();

  if (snapshot.empty) {
    console.log("✅ No approved confessions to mark as posted.");
    return;
  }

  console.log(`\n🟢 Approved Confessions (${snapshot.size} total):`);

  // Show all approved confessions with index numbers
  snapshot.docs.forEach((doc, index) => {
    const data = doc.data();
    const preview = data.content.length > 50
      ? data.content.slice(0, 50) + "..."
      : data.content;

    console.log(
      `\n[${index}] — ID: ${doc.id}\n` +
      `Type: ${data.type}\n` +
      `Content: ${preview}\n` +
      `Date: ${data.createdAt?.toDate?.() || "unknown"}`
    );
  });

  // Ask which one to mark as posted
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\n👉 Enter the index number to mark as POSTED: ", async (input) => {
    const index = parseInt(input);
    if (isNaN(index) || index < 0 || index >= snapshot.docs.length) {
      console.log("❌ Invalid index.");
      rl.close();
      return;
    }

    const docRef = snapshot.docs[index].ref;
    await docRef.update({ status: "posted" });
    console.log(`✅ Confession [${index}] marked as POSTED.`);

    rl.close();
  });
}

runMarkPosted();



// After running admin.ts and approving good ones, run:

// ts-node src/scripts/markPosted.ts


// See a full list of approved confessions with their preview.

// Type the number of the one you want to mark as posted.

// ✅ It will disappear from future runs of this script
// ✅ It will get deleted automatically in 7 days by cleanup.ts