import { Outlet } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import MainHeader from "../common/MainHeader";
import DetailModalProvider from "src/providers/DetailModalProviders";
import DetailModal from "src/components/DetailModal";
import PortalProvider from "src/providers/PortalProvider";
import VideoPortalContainer from "src/components/VideoPortalContainer";

const MainLayout = () => {
  return (
    <Box width="100%" minHeight="100vh" bgColor="main">
      <MainHeader />
      <DetailModalProvider>
        <DetailModal />
        <PortalProvider>
          <Outlet />
          <VideoPortalContainer />
        </PortalProvider>
      </DetailModalProvider>
    </Box>
  );
};

export default MainLayout;
