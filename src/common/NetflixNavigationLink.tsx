import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

const NetflixNavigationLink = ({
  to,
  children,
  ...props
}: LinkProps & RouterLinkProps) => {
  return (
    <ChakraLink
      as={RouterLink}
      to={to}
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
