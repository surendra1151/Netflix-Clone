import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import MainHeader from "../common/MainHeader";
import LoadingScreen from "src/common/LoadingScreen";
import DetailModalProvider from "src/providers/DetailModalProviders";
import DetailModal from "src/components/DetailModal";
import PortalProvider from "src/providers/PortalProvider";
import VideoPortalContainer from "src/components/VideoPortalContainer";
import HomePage from "src/components/HomePage";

export default function MainLayout() {
  const location = useLocation();
  const navigation = useNavigate();

  return (
    <Box
    width = "100%"
    minHeight = "100vh"
    bgColor= "#141414"
    >
      <MainHeader />
      <DetailModalProvider>
        <DetailModal />
      <PortalProvider>
          {/* <MainLoadingScreen /> */}
          <Outlet />
          <VideoPortalContainer />
        </PortalProvider>
      </DetailModalProvider>
    </Box>
  );
}
