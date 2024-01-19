import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { USER_AVATAR } from "../utils/constants";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG } from "../utils/constants";

const Login = () => {
  const [isSignForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSingForm = () => {
    setIsSignInForm(!isSignForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BG_IMG}
          alt="logo"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black text-white  my-28 mx-auto right-0 left-0 bg-opacity-80 "
      >
        <h1 className="font-bold text-3xl px-2 py-2">
          {isSignForm ? "Sign In" : "Sign Up"}
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
