export default {
  searchTVShow(term: string): string {
    return `/singlesearch/shows?q=${term}`;
  },
  searchSuggestions(term: string): string {
    return `/search/shows?q=${term}`;
  },
  getSeasonsById(id: number): string {
    return `/shows/${id}/seasons`;
  },
  getEpisodes(tvshow: string): string {
    return `/singlesearch/shows?q=${tvshow}&embed=episodes`;
  },
  GetMovieCast(id: number): string {
    return `/shows/${id}?embed=cast`;
  }
};
