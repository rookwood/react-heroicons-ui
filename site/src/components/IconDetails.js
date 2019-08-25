import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import useKeyboardShortcut from "../utils/useKeyboardShortcut";

const FixedContainer = styled.div(
  ({ visible }) => css`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? "initial" : "none"};

    justify-content: center;
    padding: 2rem;
  `
);

const fixedInnerCss = css`
  max-width: 45rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  overflow-y: scroll;
`;

const IconDetails = ({ visible, iconName, closeIcon }) => {
  useKeyboardShortcut(27, closeIcon);

  return (
    <FixedContainer visible={visible}>
      <div css={fixedInnerCss}>
        <h2>{iconName}</h2>
      </div>
    </FixedContainer>
  );
};

export { IconDetails };
