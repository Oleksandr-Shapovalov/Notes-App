import React from "react";
import { Loader } from "../components/loader/Loader";
import Note from "../components/notes/Note";
import style from "./../components/notes/Notes.module.scss";
import BackBTN from "../backBTN/BackBTN";
import { NoteHOC } from "../components/HOC/NoteHOC";

const NoteItemPage = ({ navigate, isLoading, dispatch, chosenNote }) => {
  return (
    <div className={style.noteCardPage}>
      <BackBTN navigate={navigate} />
      {isLoading ? (
        <Loader toHeight={60} />
      ) : (
        <Note dispatch={dispatch} {...chosenNote} cb={navigate} />
      )}
    </div>
  );
};
export default NoteHOC(NoteItemPage);
