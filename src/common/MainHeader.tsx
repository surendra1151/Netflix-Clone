import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useDisclosure,
  useBreakpointValue,
  Button,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import useOffSetTop from "src/hooks/useOffSetTop";
import { APP_BAR_HEIGHT } from "src/constant";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import NetflixNavigationLink from "./NetflixNavigationLink";

const pages = ["My List", "Movies", "Tv Shows"];

const MainHeader = () => {
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);
  const { isOpen: isUserOpen, onToggle: toggleUserMenu } = useDisclosure();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      w="full"
      zIndex="docked"
      bg={isOffset ? "#141414" : "transparent"}
      boxShadow={isOffset ? "md" : "none"}
      px="60px"
      h={APP_BAR_HEIGHT}
    >
      <Stack
        direction="row"
        align="center"
        justifyContent="space-between"
        h="full"
      >
        <Box display="flex">
          <Logo />
          {isWideVersion ? (
            <Stack direction="row" align="center" spacing="4">
              {pages.map((page) => (
                <NetflixNavigationLink to="/" key={page}>
                  {page}
                </NetflixNavigationLink>
              ))}
            </Stack>
          ) : (
            <Menu isLazy>
              <MenuButton
                as={Button}
                size="sm"
                color="#e50914"
                background="none !important"
                rightIcon={<ChevronDownIcon marginLeft="5px" />}
              >
                Browse
              </MenuButton>
              <MenuList>
                {pages.map((page) => (
                  <MenuItem key={page}>{page}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <SearchBox />
          <Menu isOpen={isUserOpen} onClose={toggleUserMenu}>
            <Tooltip label="Open settings" hasArrow>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                onClick={toggleUserMenu}
                variant="unstyled"
                ml="4"
              >
                <Box
                  boxSize="32px"
                  borderRadius="4px"
                  bg="white"
                  overflow="hidden"
                >
                  <Image
                    src="/assets/avatar.png"
                    boxSize="32px"
                    objectFit="cover"
                  />
                </Box>
              </MenuButton>
            </Tooltip>
            <MenuList>
              {["Account", "Logout"].map((setting) => (
                <MenuItem key={setting}>{setting}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
};

export default MainHeader;
