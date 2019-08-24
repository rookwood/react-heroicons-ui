import React, { useRef, useCallback } from "react";
import { css } from "@emotion/core";
import { IconSearch } from "react-heroicons-ui";

import useKeyboardShortcut from "../utils/useKeyboardShortcut";

const themeColor = `rgb(38, 132, 255)`;

const inputContainerCss = css`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const inputWrapperCss = css`
  background: white;
  padding: 0.4rem 0.6rem;
  border-radius: 0.25rem;
  border: 1px solid rgb(204, 204, 204);

  position: relative;

  svg {
    position: absolute;
    height: 1rem;
    width: 1rem;
    top: 50%;
    transform: translateY(-50%);
    fill: rgb(117, 117, 117);
  }

  input {
    margin: 0 0 0 1.4rem;
    display: inline-block;
  }

  &:focus-within {
    border-color: ${themeColor};
  }
`;

const inputCss = css`
  -webkit-appearance: none;
  border: none;
  min-width: 200px;

  &:focus {
    outline: none;
  }
`;

const SearchInput = ({ onChange, value }) => {
  const inputRef = useRef(null);
  const onSlash = useCallback(() => inputRef.current.focus(), [inputRef]);

  useKeyboardShortcut(191, onSlash);

  return (
    <div css={inputContainerCss}>
      <label htmlFor="iconSearch">
        <h2>Search available icons:</h2>
      </label>
      <span css={inputWrapperCss}>
        <IconSearch />
        <input
          value={value}
          id="iconSearch"
          onChange={onChange}
          type="text"
          css={inputCss}
          placeholder={`Press "/" to focus`}
          ref={inputRef}
        />
      </span>
    </div>
  );
};

export default SearchInput;
