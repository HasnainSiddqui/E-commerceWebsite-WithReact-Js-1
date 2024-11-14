import { useEffect, useState } from "react";
import { auth , db } from "../utils/firebase";
import { useContext } from "react";
import { UserIsLogin } from "../context/usecontext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


let Login = () =>{
  let navigate = useNavigate();
  
  let {user , setUser}= useContext(UserIsLogin)


let [email , setEmail] = useState("");
let [password , setPassword] = useState("");




let clickLoginButton = () =>{

  new Promise((resolve, reject) => {
    

  signInWithEmailAndPassword(auth, email, password)
  .then( (userCredential) => {

  resolve(userCredential.user.uid)
    navigate("/")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    reject(errorMessage)
    
  });
})
.then(async (userUid)=>{


  const docRef = doc(db, "userSignup", userUid);                  //Get Docs Function in Firebase
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  
  if (docSnap.exists()) {
    let userData = docSnap.data();
  setUser({isLogin : true , userObj : userData})

  
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

})

}



    return(
        <div className="container px-5 py-24 mx-auto flex">
  <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
    <h2 className="text-blue-600 text-xl mx-auto mb-1 font-medium  font-bold title-font">
      LOGIN
    </h2>
   
    <div className="relative mb-4">
      <label htmlFor="email" className="leading-7 text-sm text-gray-600">
        Email
      </label>
      <input
        type="email"
        id="email"
     
        name="email"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(e)=> setEmail(e.target.value)}
      />
    </div>
    <div className="relative mb-4">
      <label htmlFor="email" className="leading-7 text-sm text-gray-600">
        Password
      </label>
      <input
        type="password"
        id="password"
     
        name="password"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(e)=> setPassword(e.target.value)}
      />
    </div>
   
    <button onClick={clickLoginButton} className="text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      Login
    </button>
    <div className="text-center text-gray-500 mt-5">
    You don't have an account <Link className="text-blue-600 " to={'signup'}>SignUp</Link>
  </div>
  </div>
</div>

    )
}
export default Login