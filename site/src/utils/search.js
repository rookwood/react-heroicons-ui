import Fuse from "fuse.js";

export default class Searcher {
  constructor(searchTerms) {
    this.searchTerms = searchTerms;

    const fuseOptions = {
      threshold: 0.1,
      tokenize: true
    };
    this.fuse = new Fuse(searchTerms, fuseOptions);
  }

  search(term) {
    const resultIndices = new Set(this.fuse.search(term));
    return this.searchTerms.filter((_, index) => resultIndices.has(index));
  }
}
