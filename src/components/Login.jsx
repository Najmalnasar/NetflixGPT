import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignForm, setisSignForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch;

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current,
            // photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // const { uid, email, displayName } = auth.currentUser;
              // dispatch(
              //   addUser({
              //     uid: uid,
              //     email: email,
              //     displayName: displayName,
              //   })
              // );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSingForm = () => {
    setisSignForm(!isSignForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/6682a693-0607-40fe-8513-56b73731d000/AE-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="absolute p-12 bg-black text-white w-3/12 my-28 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-3xl px-2 py-2">
          {isSignForm ? "Sing In" : "Sing Up"}
        </h1>
        {!isSignForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 w-full bg-gray-500 rounded-sm"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 m-2 w-full bg-gray-500 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 w-full bg-gray-500 rounded-sm"
        />
        <p className="text-red-500 px-2 font-semibold">{errorMessage}</p>
        <button
          className="w-full py-2 m-2 my-5 bg-red-600 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignForm ? "Sing In" : "Sing Up"}
        </button>

        <p className="py-2 p-6 cursor-pointer" onClick={toggleSingForm}>
          {isSignForm ? "New to Netflix click here " : "Back to Sing in"}
        </p>
      </form>
    </div>
  );
};

export default Login;
