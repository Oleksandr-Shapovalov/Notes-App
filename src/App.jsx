import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import NoteItemPage from "./pages/NoteItemPage";
import NoteEditPage from "./pages/NoteEditPage";
import { Confirm } from "./confirmPopUp/Confirm";
import { useDispatch } from "react-redux";
import { toggleConfirmAC } from "./store/notes/notesActions";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.addEventListener("click", closePopUP);

    return () => {
      document.body.removeEventListener(closePopUP);
    };
  }, []);
  const closePopUP = (e) => {
    if (
      !e.target.classList.contains("popup_opener") &&
      !e.target.closest(".popup_opener")
    ) {
      const popups = [...document.querySelectorAll(".popup")];
      popups.forEach((el) => {
        el.classList.remove("active");
      });
    }
    if (
      !e.target.classList.contains("popupConfirm") &&
      !e.target.closest(".popupConfirm")
    ) {
      dispatch(toggleConfirmAC(false));
    }
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Confirm title={"title"} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<NoteItemPage />} />
          <Route path="/note/edit/:id" element={<NoteEditPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
