import { forwardRef } from "react";

import { Heading, HeadingProps } from "@chakra-ui/react";

interface ITypographyProps extends HeadingProps {
  children: React.ReactNode;
  maxLine: number;
}

const MaxLineTypography = forwardRef<HTMLDivElement, ITypographyProps>(
  ({ maxLine, children, as, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        as={as}
        overflow="hidden"
        textOverflow="ellipsis"
        fontFamily="Roboto, Helvetica, Arial, sans-serif"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: maxLine,
          WebkitBoxOrient: "vertical",
        }}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);

export default MaxLineTypography;
