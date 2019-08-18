import React, { useState, useMemo } from "react";
import * as icons from "react-heroicons-ui";
import { css } from "@emotion/core";
import { Helmet } from "react-helmet-async";

import libPackageJson from "../../../lib/package.json";
import Searcher from "../utils/search";

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

  &:focus-within {
    border-color: rgb(38, 132, 255);
  }
`;

const inputCss = css`
  -webkit-appearance: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

const listCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const cardCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    margin-bottom: 1rem;
  }
`;

const IconCard = ({ iconName }) => {
  const Icon = icons[iconName];

  return (
    <div css={cardCss}>
      <Icon height={60} width={60} />
      <div>{iconName}</div>
    </div>
  );
};

const Seo = () => (
  <Helmet htmlAttributes={{ lang: "en-US" }}>
    <title>react-heroicons-ui</title>
    <meta name="description" content={libPackageJson.description} />
  </Helmet>
);

export default () => {
  const allIconNames = Object.keys(icons);

  const searcher = useMemo(() => new Searcher(allIconNames));

  const [searchText, setSearchText] = useState("");

  const [searchResults, setSearchResults] = useState(allIconNames);
  const onInputChange = event => {
    const text = event.target.value;
    setSearchResults(searcher.search(text));

    setSearchText(text);
  };

  return (
    <div>
      <Seo />
      <div css={inputContainerCss}>
        <label htmlFor="iconSearch">
          <h2>Search available icons:</h2>
        </label>
        <span css={inputWrapperCss}>
          <input
            value={searchText}
            id="iconSearch"
            onChange={onInputChange}
            type="text"
            css={inputCss}
          />
        </span>
      </div>
      <ul css={listCss}>
        {searchResults.map(iconName => (
          <li key={iconName}>
            <IconCard iconName={iconName} />
          </li>
        ))}
      </ul>
    </div>
  );
};
