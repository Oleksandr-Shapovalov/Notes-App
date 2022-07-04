import React, { useEffect, useRef, useState } from "react";
import { currentDate } from "../addition/currentDate";
import { useInput } from "../addition/customHooks";
import { BackBTN } from "../backBTN/BackBTN";
import { NoteHOC } from "../hocNote/NoteHOC";
import { Loader } from "../loader/Loader";
import { updateNoteBD } from "../store/notes/async";
import style from "./../components/notes/Notes.module.scss";

const NoteEditPage = ({
  navigate,
  isLoading,
  dispatch,
  chosenNote: { title, text, id, date },
}) => {
  const titleUI = useInput();
  const textUI = useInput();
  const titleEL = useRef(null);
  const textEL = useRef(null);
  const [titleHeight, setTitleHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    titleUI.set(title);
  }, [title]);
  useEffect(() => {
    textUI.set(text);
  }, [text]);
  useEffect(() => {
    setTitleHeight(
      titleEL.current ? titleEL.current.scrollHeight : titleHeight
    );
    setTextHeight(textEL.current ? textEL.current.scrollHeight : textHeight);
  });

  const updateNoteClick = (e) =>
    dispatch(
      updateNoteBD(
        {
          title: titleUI.value,
          text: textUI.value,
          id,
          edited: currentDate(),
          date,
        },
        e
      )
    );
  console.log(titleHeight);
  return (
    <div className={style.noteCardPage}>
      <BackBTN navigate={navigate} />
      {isLoading ? (
        <Loader toHeight={60} />
      ) : (
        <form onSubmit={updateNoteClick} className={style.editing}>
          <textarea
            ref={titleEL}
            spellCheck
            style={{
              height: titleHeight,
            }}
            id="title"
            {...titleUI.bind}
          ></textarea>
          <textarea
            ref={textEL}
            style={{ height: textHeight }}
            id="text"
            {...textUI.bind}
          ></textarea>{" "}
          <button type="submit">
            <i className="bi bi-clipboard2-check-fill"></i>
          </button>
        </form>
      )}
    </div>
  );
};
export default NoteHOC(NoteEditPage);
