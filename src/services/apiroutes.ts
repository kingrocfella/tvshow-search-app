export default {
  searchTVShow(term:string): string { return `/singlesearch/shows?q=${term}` }
}