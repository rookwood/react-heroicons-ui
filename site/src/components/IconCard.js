import React from "react";
import { css } from "@emotion/core";
import * as icons from "react-heroicons-ui";

const cardCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;

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
