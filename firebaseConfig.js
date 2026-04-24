import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfqoPp6garAxG30GXmJLFKX8cWWPhNLEU",
  authDomain: "movieapp-9bb3d.firebaseapp.com",
  projectId: "movieapp-9bb3d",
  storageBucket: "movieapp-9bb3d.firebasestorage.app",
  messagingSenderId: "773187742007",
  appId: "1:773187742007:web:b541d490671283fef812b2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
