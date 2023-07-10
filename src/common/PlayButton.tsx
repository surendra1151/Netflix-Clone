import { Button } from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function PlayButton({ ...props }) {
  const navigate = useNavigate();
  return (
    <Button
      color="black"
      variant="solid"
      leftIcon={
        <TriangleUpIcon
          style={{ transform: "rotate(90deg)" }}
          boxSize={["24px", "32px", "40px"]}
        />
      }
      background="white"
      fontSize={["18px", "24px"]}
      px = {["8px", "16px"]}
      py= {["4px", "8px"]}
      display= "flex"
      fontWeight="500"
      whiteSpace="nowrap"
      textTransform="capitalize"
      lineHeight={1.5}
      opacity = {1}
      justifyContent="center"
      borderRadius = "4px"
      onClick={() => navigate(`/${MAIN_PATH.watch}`)}
      _hover={{
        bgcolor: "white",
        opacity: 0.7,
      }}
      {...props}
    >
      Play
    </Button>
  );
}
