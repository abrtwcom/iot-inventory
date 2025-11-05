import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBCCK1X1mTh9g-urZAmZFi4_nSGOhWSPPc",
  authDomain: "iot-logistic-kit.firebaseapp.com",
  databaseURL: "https://iot-logistic-kit-default-rtdb.firebaseio.com",
  projectId: "iot-logistic-kit",
  storageBucket: "iot-logistic-kit.firebasestorage.app",
  messagingSenderId: "319525791741",
  appId: "1:319525791741:web:ac7835491cb6af4d1f1b94",
  measurementId: "G-M08RZMJCCN"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;