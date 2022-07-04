import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  setNoteToRemoveAC,
  toggleConfirmAC,
} from "../../store/notes/notesActions";
import style from "./Notes.module.scss";

export const Note = ({ title, text, date, dispatch, id, edited }) => {
  const popUp = useRef(null);
  const showPopUp = () => {
    popUp.current.classList.add("active");
  };
  const navigate = useNavigate();
  const goToItemNotePage = (e, id) => {
    if (
      !e.target.classList.contains("popup_opener") &&
      !e.target.closest(".popup_opener")
    )
      navigate(`/note/${id}`);
  };
  const goToEditNotePage = (e, id) => {
    e.stopPropagation();
    navigate(`/note/edit/${id}`);
  };
  const removeNote = (e) => {
    e.stopPropagation();
    dispatch(setNoteToRemoveAC({ title, id }));
    dispatch(toggleConfirmAC(true));
  };
  return (
    <div onClick={(e) => goToItemNotePage(e, id)} className={style.noteCard}>
      <div onClick={showPopUp} className={`${style.options} popup_opener`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div ref={popUp} className={`${style.optionsMenu} popup`}>
        <div onClick={(e) => goToEditNotePage(e, id)}>
          <span>Edit</span> <i className="bi bi-pencil-square"></i>
        </div>
        <div onClick={removeNote}>
          <span>Delete</span> <i className="bi bi-trash3"></i>
        </div>
      </div>
      <h3 className={style.noteTitle}>{title}</h3>
      <p className={style.text}>{text}</p>
      <div className={style.hr}></div>
      <div className={style.date}>
        <span>{date}</span>{" "}
        <span> {edited ? `last edited: ${edited}` : ""}</span>
      </div>
    </div>
  );
};
