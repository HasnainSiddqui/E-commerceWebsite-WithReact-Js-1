
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBeVGvar71qroMo2gZILabFUy48zvPIwXU",
  authDomain: "reactloginandsignup.firebaseapp.com",
  projectId: "reactloginandsignup",
  storageBucket: "reactloginandsignup.appspot.com",
  messagingSenderId: "968874931970",
  appId: "1:968874931970:web:8f2fbcb5ba5d96cd49741b",
  measurementId: "G-ZJBGB83PGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore()

export {
    auth,
    app,
    db
}