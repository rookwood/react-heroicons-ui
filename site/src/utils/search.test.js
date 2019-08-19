import * as icons from "react-heroicons-ui";

import Searcher from "./search";

const allIconNames = Object.keys(icons);

describe("Search", () => {
  let searcher;
  beforeEach(() => {
    searcher = new Searcher(allIconNames);
  });

  it("returns all on an empty string", () => {
    expect(searcher.search("")).toEqual(allIconNames);
  });

  it("can do an exact match", () => {
    expect(searcher.search("IconArchive")).toEqual(["IconArchive"]);
  });

  it("gracefully handles nonsense input", () => {
    expect(searcher.search(123)).toEqual([]);
  });

  it("matches patterns at the end of names", () => {
    const results = new Set(searcher.search("Link"));
    expect(results).toEqual(new Set(["IconLink", "IconExternalLink"]));
  });
});
