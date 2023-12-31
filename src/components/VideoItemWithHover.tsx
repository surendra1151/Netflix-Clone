import { useEffect, useState, useRef } from "react";

import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useGetConfigurationQuery } from "src/slices/configuration";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";

interface VideoItemWithHoverProps {
  video: Movie;
}

const VideoItemWithHover = ({ video }: VideoItemWithHoverProps) => {
  const setPortal = usePortal();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { data: configuration } = useGetConfigurationQuery(undefined);

  useEffect(() => {
    if (isHovered) {
      setPortal(elementRef.current, video);
    }
  }, [isHovered]);

  return (
    <VideoItemWithHoverPure
      ref={elementRef}
      handleHover={setIsHovered}
      src={`${configuration?.images.base_url}w300${video.backdrop_path}`}
    />
  );
}

export default VideoItemWithHover;
