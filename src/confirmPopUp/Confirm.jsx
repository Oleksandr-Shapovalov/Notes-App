import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { deleteNoteBD } from "../store/notes/async";
import { toggleConfirmAC } from "../store/notes/notesActions";
import style from "./Confirm.module.scss";

export const Confirm = () => {
  const { showConfirmPopUp, noteToRemove } = useSelector(
    (state) => state.notesReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeNote = (e) => {
    dispatch(deleteNoteBD(noteToRemove.id, navigate, e));
    dispatch(toggleConfirmAC(false));
  };
  useEffect(() => {
    showConfirmPopUp
      ? document.body.classList.add("block")
      : document.body.classList.remove("block");
  }, [showConfirmPopUp]);
  return (
    <CSSTransition
      in={showConfirmPopUp}
      timeout={{ enter: 500, exit: 250 }}
      classNames={"popupConfirmAnim"}
      mountOnEnter
      unmountOnExit
    >
      <div className={style.confirmWrap}>
        <div className={`${style.container} popupConfirm`}>
          <h2>Do you want to remove:</h2>
          <p>"{noteToRemove.title}" ?</p>
          <div className={style.buttons}>
            <button onClick={removeNote} className={style.delete}>
              Delete
            </button>
            <button
              onClick={() => dispatch(toggleConfirmAC(false))}
              className={style.cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
