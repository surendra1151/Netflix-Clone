import { Box, useStyleConfig, useTheme, useBreakpointValue } from "@chakra-ui/react";
import styled from "styled-components";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { MouseEventHandler, ReactNode } from "react";

interface CustomNavigationProps {
  isEnd: boolean;
  arrowWidth: number;
  children: ReactNode;
  activeSlideIndex: number;
  onNext: MouseEventHandler<HTMLDivElement>;
  onPrevious: MouseEventHandler<HTMLDivElement>;
}
export default function CustomNavigation({
    isEnd,
    onNext,
    children,
    onPrevious,
    arrowWidth,
    activeSlideIndex,
  }: CustomNavigationProps) {
    const theme = useTheme();
    const arrowWidthResponsive = useBreakpointValue({ base: arrowWidth / 2, sm: arrowWidth });
  
    const ArrowStyle = ({direction, onClick}: any) => {
      return (
        <Box
          position="absolute"
          top={0}
          bottom={0}
          zIndex={9}
          height="100%"
          opacity={0.48}
          display={{ base: "none", sm: "flex" }}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          color="white"
          transition="opacity 0.2s"
          _hover={{
            opacity: 0.8,
            bg: "#161C24",
          }}
          left={direction === 'left' ? 0 : 'auto'}
          right={direction === 'right' ? 0 : 'auto'}
          onClick={onClick}
        />
      );
    };
  
    return (
      <>
        {activeSlideIndex > 0 && (
          <ArrowStyle
            direction="left"
            onClick={onPrevious}
            width={arrowWidthResponsive}
            borderTopRightRadius="4px"
            borderBottomRightRadius="4px"
          >
            <MdArrowBackIos />
          </ArrowStyle>
        )}
  
        {children}
  
        {!isEnd && (
          <ArrowStyle
            direction="right"
            onClick={onNext}
            width={arrowWidthResponsive}
            borderTopLeftRadius="4px"
            borderBottomLeftRadius="4px"
          >
            <MdArrowForwardIos />
          </ArrowStyle>
        )}
      </>
    );
  }