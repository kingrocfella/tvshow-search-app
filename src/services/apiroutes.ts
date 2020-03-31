export default {
  searchTVShow(term:string): string { return `/singlesearch/shows?q=${term}` },
  getEpisodes(tvshow:string): string { return `/singlesearch/shows?q=${tvshow}&embed=episodes` }
}