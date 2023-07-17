import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { COMMON_TITLES } from "src/constant";
import GridPage from "./GridPage";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import { genreSliceEndpoints } from "src/slices/genre";
import store from "src/store";

const GenreExplore = () => {
  const { genreId } = useParams();
  const [genre, setGenre] = useState<CustomGenre | Genre | undefined>();

  useEffect(() => {
    const fetchGenre = async () => {
      let tempGenre: CustomGenre | Genre | undefined = COMMON_TITLES.find(
        (t) => t.apiString === genreId
      );

      if (!tempGenre) {
        const genres = await store
          .dispatch(genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie))
          .unwrap();
        tempGenre = genres?.find((t) => t.id.toString() === genreId);
      }

      setGenre(tempGenre);
    };

    fetchGenre();
  }, [genreId]);

  if (genre) {
    return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
  }
  return null;
};

export default GenreExplore;
