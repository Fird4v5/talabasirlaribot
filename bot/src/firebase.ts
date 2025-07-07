import admin from 'firebase-admin';
import serviceAccount from "../serviceAccount.json"
import dotenv from 'dotenv';
dotenv.config();


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
})


export const db = admin.firestore(); 