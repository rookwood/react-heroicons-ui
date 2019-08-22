const normalizeText = string => string.replace(/[^A-Za-z]/g, "").toLowerCase();

export default class Searcher {
  constructor(searchTerms) {
    this.searchTerms = {};

    searchTerms.forEach(term => (this.searchTerms[term] = normalizeText(term)));
  }

  search(term) {
    if (typeof term != "string") {
      return [];
    }

    if (term === "") {
      return Object.keys(this.searchTerms);
    }

    const normalized = normalizeText(term);

    return Object.entries(this.searchTerms)
      .filter(([_, term]) => term.indexOf(normalized) > -1)
      .map(([original, _]) => original);
  }
}
