import { useState } from "react";
import {
  Box,
  Input,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBox() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Box>
      {!showSearch ? (
        <IconButton
          icon={<SearchIcon />}
          colorScheme="red"
          onClick={() => setShowSearch(!showSearch)}
          aria-label="search"
          background="none"
          _hover={{
            background: "none",
          }}
        />
      ) : (
        <InputGroup maxW="md">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="#fff" />
          </InputLeftElement>
          <Input
            placeholder="Titles, people, genres"
            onBlur={(e) => {
              if (
                e.relatedTarget === null ||
                !(e.relatedTarget as Element).classList.contains("search-icon")
              ) {
                setShowSearch(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowSearch(false);
              }
            }}
            autoFocus
            border="1px solid"
            borderColor="#fff !important"
          />
        </InputGroup>
      )}
    </Box>
  );
}
