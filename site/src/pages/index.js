import React, { useState, useMemo } from "react";
import * as icons from "react-heroicons-ui";
import { css } from "@emotion/core";
import { Helmet } from "react-helmet-async";

import libPackageJson from "../../../lib/package.json";
import Searcher from "../utils/search";
import IconCard from "../components/IconCard";
import SearchInput from "../components/SearchInput";
import { IconDetails } from "../components/IconDetails";

const allIconNames = Object.keys(icons);
const themeColor = `rgb(38, 132, 255)`;

const topColorStripeCss = css`
  width: 100%;
  height: 2px;

  background: ${themeColor};
`;

const pageContainerStyles = css`
  padding: 2rem;
`;

const listCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Seo = () => (
  <Helmet htmlAttributes={{ lang: "en-US" }}>
    <title>react-heroicons-ui</title>
    <meta name="description" content={libPackageJson.description} />
  </Helmet>
);

export default () => {
  const searcher = useMemo(() => new Searcher(allIconNames));

  const [activeIcon, setActiveIcon] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(allIconNames);

  const onInputChange = event => {
    const text = event.target.value;

    setSearchResults(searcher.search(text));
    setSearchText(text);
  };

  return (
    <>
      <Seo />
      {activeIcon != null && <Helmet bodyAttributes={{ class: "no-scroll" }} />}
      <div css={topColorStripeCss} />
      <div css={pageContainerStyles}>
        <SearchInput value={searchText} onChange={onInputChange} />
        <ul css={listCss}>
          {searchResults.map(iconName => (
            <li key={iconName}>
              <IconCard
                iconName={iconName}
                onClick={() => setActiveIcon(iconName)}
              />
            </li>
          ))}
        </ul>
      </div>
      <IconDetails
        iconName={activeIcon}
        closeIcon={() => setActiveIcon(null)}
        visible={activeIcon != null}
      />
    </>
  );
};
