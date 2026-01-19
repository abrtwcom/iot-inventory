import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfn8sXkHx4wl-dfOVTXeNznyu--G4ydDY",
  authDomain: "iot-inventory-87709788-95492.firebaseapp.com",
  projectId: "iot-inventory-87709788-95492",
  storageBucket: "iot-inventory-87709788-95492.firebasestorage.app",
  messagingSenderId: "1076687162237",
  appId: "1:1076687162237:web:aae0d350af69a8d84fda14"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;