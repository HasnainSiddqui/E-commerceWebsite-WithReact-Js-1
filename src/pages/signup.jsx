import { useContext, useState } from "react"
import { auth , db } from "../utils/firebase"
import {createUserWithEmailAndPassword } from "firebase/auth";
import { UserIsLogin } from "../context/usecontext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 



let Signup = () =>{






let navigate = useNavigate() //                      Declear Variable useNavigate  ...
let {user , setUser} = useContext(UserIsLogin)

let obj = {
  userName : userName,
  email : email,
  password : password
}
console.log("obj =>" , obj);

let signupUserButton = ()=>{
  
 new Promise((resolve, reject) => {
  


  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // console.log(user);
      obj.id = user.uid
      console.log(" successfull");
      setUser({isLogin : true , userObj : {...obj}})
     
      resolve(user.uid)
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      reject(error)
    });
  
  })
  .then(async (userId)=>{                              // promises .then & .catch
    console.log("resolve =>" , userId);    
    
    // Add a new document in collection "cities"
await setDoc(doc(db, "userSignup", userId), {
 obj
});   



  navigate('/')       //                         useNavigate Navigate to Home Page ...
  })
  .catch((err)=>{
    console.log("reject =>",err);
    
  })

}


    return(
        <div className="container px-5 py-24 mx-auto flex">
  <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
    <h2 className="text-blue-600 text-xl mx-auto mb-1 font-medium  font-bold title-font">
      SIGN UP
    </h2>
   
    <div className="relative mb-4">
      <label htmlFor="text" className="leading-7 text-sm text-gray-600">
        UserName
      </label>
      <input
        type="text"
        id="name"
        name="textl"

        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
     onChange={(e)=> setUserName(e.target.value)}
     />
    </div>

   
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
      <label htmlFor="password" className="leading-7 text-sm text-gray-600">
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
   
    <button  onClick={signupUserButton} className="text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      SignUp
    </button>
    
  </div>
</div>

    )
}
export default Signup