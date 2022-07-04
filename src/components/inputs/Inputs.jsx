import React from "react";
import { useDispatch } from "react-redux";
import { currentDate } from "../../addition/currentDate";
import { useInput } from "../../addition/customHooks";
import { addNoteBD } from "../../store/notes/async";
import style from "./Inputs.module.scss";

export const Inputs = () => {
  const dispatch = useDispatch();
  const title = useInput("");
  const text = useInput("");
  const addNote = (e) => {
    e.preventDefault();
    if (title.value && text.value) {
      dispatch(
        addNoteBD({
          title: title.value,
          text: text.value,
          date: currentDate(),
        })
      );
      title.clear();
      text.clear();
    }
  };

  return (
    <form onSubmit={addNote}>
      <div className={style.input}>
        <input
          autoComplete="off"
          id="title"
          {...title.bind}
          type="text"
          className={`${style.title} ${title.value ? style.filled : ""}`}
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className={style.input}>
        <textarea
          autoComplete="off"
          id="text"
          {...text.bind}
          type="text"
          className={`${style.text} ${text.value ? style.filled : ""}`}
        />
        <label htmlFor="text">Text</label>
      </div>
      <button className={style.submit} type="submit">
        submit
      </button>
    </form>
  );
};
