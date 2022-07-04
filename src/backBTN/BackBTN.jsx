import React from "react";
import style from "./../components/notes/Notes.module.scss";
export const BackBTN = ({ navigate }) => {
  return (
    <button className={style.backToAllNotes} onClick={() => navigate(`/`)}>
      <i className="bi bi-arrow-left"></i> <span> All notes</span>
    </button>
  );
};
