import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery(
    "species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) return <div className="loading">Is Loading...</div>;
  if (isError) return <div>Error!!! {error.message}</div>;
  return (
    <>
      {isFetching && <div className="loading">Is Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((page) => {
          return page.results.map((specie) => {
            return (
              <Species
                key={specie.name}
                name={specie.name}
                language={specie.language}
                averageLifespan={specie.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
