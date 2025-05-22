import { BookModel } from "models/BookModel";
import { SortBy, StateOrAll, TypeOrAll } from "types/FilterTypes";
import { Settings } from "models/Settings";

interface FilterBooksOptions {
  books: BookModel[];
  search: string;
  settings?: Settings | null;
  stateFilter: StateOrAll;
  typeFilter: TypeOrAll;
  sortBy: SortBy;
}

export function filterBooks({
  books,
  search,
  settings,
  stateFilter,
  typeFilter,
  sortBy,
}: FilterBooksOptions): BookModel[] {
  return books
    // 1. Filter by search
    .filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.type.toLowerCase().includes(search.toLowerCase()) ||
        b.state.toLowerCase().includes(search.toLowerCase())
    )
    // 2. Filter NSFW
    .filter((b) => {
      if (settings && !settings.showNSFW && b.nsfw) return false;
      return true;
    })
    // 3. Filter by state
    .filter((b) => (stateFilter === "All" ? true : b.state === stateFilter))
    // 4. Filter by type
    .filter((b) => (typeFilter === "All" ? true : b.type === typeFilter))
    // 5. Sort
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "chapter") return b.chapter - a.chapter;
      if (sortBy === "lastRead") return b.lastRead - a.lastRead;
      return 0;
    });
}
