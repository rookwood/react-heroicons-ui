import React from "react";
import { css } from "@emotion/core";
import * as icons from "react-heroicons-ui";

const cardCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 0.25rem;

  &:hover {
    background-color: var(--background-hover-color);
  }

  svg {
    margin-bottom: 1rem;
  }
`;

const IconCard = ({ iconName, onClick }) => {
  const Icon = icons[iconName];

  return (
    <div css={cardCss} onClick={onClick}>
      <Icon height={60} width={60} />
      <div>
        <code>{iconName}</code>
      </div>
    </div>
  );
};

export default IconCard;
