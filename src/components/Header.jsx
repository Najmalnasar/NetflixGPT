import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LANGUAGES, LOG0 } from "../utils/constants";
import { toggleGptSerachView } from "../utils/gptSlice";
import { channgeLanguage } from "../utils/confgSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe;
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSerachView());
  };

  const handleLanguageChange = (event) => {
    dispatch(channgeLanguage(event.target.value));
    console.log(event.target.value);
  };

  return (
    <div className="absolute w-screen px-10 py-2 bg-gradient-to-b  from-black z-40 flex justify-between">
      <img className="w-44" src={LOG0} alt="logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="mx-2 text-center py-2 px-2 bg-black bg-opacity-50  text-white text-bold rounded-lg border-none"
              onChange={handleLanguageChange}
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang.ideentifier}
                  value={lang.ideentifier}
                  className="bg-slate-500"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className=" px-4 bg-red-700 text-white text-bold rounded-lg"
            onClick={handleGptSearch}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="w-14 h-13 mx-5"
            alt="usericon"
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          ></img>
          <button
            onClick={handleSingOut}
            className=" text-white py-3 px-3  rounded-lg text-bold"
          >
            Sing Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
