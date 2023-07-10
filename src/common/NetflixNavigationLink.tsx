import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

const NetflixNavigationLink = ({
  href,
  children,
  ...props
}: LinkProps) => {
  return (
    <ChakraLink
      as={RouterLink}
      href={href}
      color="#fff"
      textDecoration="none"
      _hover={{
        textDecoration: "none",
      }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default NetflixNavigationLink;
