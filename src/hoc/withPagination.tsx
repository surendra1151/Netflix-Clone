import { ElementType, useCallback, useEffect } from "react";

import LoadingScreen from "src/common/LoadingScreen";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  initiateItem,
  useLazyGetVideosByMediaTypeAndGenreIdQuery,
  useLazyGetVideosByMediaTypeAndCustomGenreQuery,
} from "src/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";

const withPagination = (
  Component: ElementType,
  mediaType: MEDIA_TYPE,
  genre: Genre | CustomGenre
) => {
  return function WithPagination() {
    const dispatch = useAppDispatch();
    const itemKey = genre.id ?? (genre as CustomGenre).apiString;
    const mediaState = useAppSelector((state) => state.discover[mediaType]);
    const pageState = mediaState ? mediaState[itemKey] : undefined;
    const [getVideosByMediaTypeAndGenreId] =
      useLazyGetVideosByMediaTypeAndGenreIdQuery();
    const [getVideosByMediaTypeAndCustomGenre] =
      useLazyGetVideosByMediaTypeAndCustomGenreQuery();

    useEffect(() => {
      if (!mediaState || !pageState) {
        dispatch(initiateItem({ mediaType, itemKey }));
      }
    }, [mediaState, pageState]);

    useEffect(() => {
      if (pageState && pageState.page === 0) {
        handleNext(pageState.page + 1);
      }
    }, [pageState]);

    const handleNext = useCallback((page: number) => {
      if (genre.id) {
        getVideosByMediaTypeAndGenreId({
          mediaType,
          genreId: genre.id,
          page,
        });
      } else {
        getVideosByMediaTypeAndCustomGenre({
          mediaType,
          apiString: (genre as CustomGenre).apiString,
          page,
        });
      }
    }, []);

    if (pageState) {
      return (
        <Component genre={genre} data={pageState} handleNext={handleNext} />
      );
    }
    return <LoadingScreen />;
  };
};

export default withPagination;
