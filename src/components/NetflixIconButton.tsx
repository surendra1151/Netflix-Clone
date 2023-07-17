import { forwardRef } from "react";

import { IconButton, IconButtonProps } from "@chakra-ui/react";

const NetflixIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...props }, ref) => {
    return (
      <IconButton
        color="white"
        borderWidth="2px"
        borderStyle="solid"
        borderColor="gray.700"
        _hover={{ borderColor: "gray.200" }}
        _focus={{ borderColor: "gray.200" }}
        ref={ref}
        {...props}
        icon={icon}
      />
    );
  }
);

export default NetflixIconButton;
