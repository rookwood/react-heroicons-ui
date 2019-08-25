import React, { useCallback, useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import { css } from "@emotion/core";
import { CSSTransition } from "react-transition-group";
import { Helmet } from "react-helmet-async";

import useKeyboardShortcut from "../utils/useKeyboardShortcut";
import useClickOutside from "../utils/useClickOutside";
import { IconX } from "react-heroicons-ui";

const fadeTransitionName = "fade";
const fadeTransitionDuration = 300;

const modalOuterCss = css`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  justify-content: center;
  padding: 2rem;

  &.${fadeTransitionName} {
    &-enter {
      opacity: 0;
    }

    &-enter-active {
      opacity: 1;
      transition: opacity ${fadeTransitionDuration}ms;
    }

    &-exit {
      opacity: 1;
    }

    &-exit-active {
      opacity: 0;
      transition: opacity ${fadeTransitionDuration}ms;
    }
  }
`;

const modalInnerCss = css`
  max-width: 45rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  overflow-y: scroll;
  position: relative;
`;

const closeButtonCss = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`;

const Modal = ({ onClose, children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    let timeout = null;

    if (!open) {
      timeout = setTimeout(onClose, fadeTransitionDuration);
    }

    return () => {
      if (timeout != null) {
        clearTimeout(timeout);
      }
    };
  }, [open]);

  const beginClosing = useCallback(() => {
    setOpen(false);
  });

  useKeyboardShortcut(27, beginClosing);

  const innerContainerRef = useRef(null);
  useClickOutside(innerContainerRef, beginClosing);

  return ReactDOM.createPortal(
    <>
      <Helmet bodyAttributes={{ class: "no-scroll" }} />
      <CSSTransition
        in={open}
        mountOnEnter
        unmountOnExit
        classNames={fadeTransitionName}
        timeout={fadeTransitionDuration}
      >
        <div css={modalOuterCss}>
          <div css={modalInnerCss} ref={innerContainerRef}>
            <IconX css={closeButtonCss} onClick={beginClosing} />
            {children}
          </div>
        </div>
      </CSSTransition>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
