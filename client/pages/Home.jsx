import UnderNav from "../components/common/UnderNav";
import Navbar from "../components/layout/Navbar";
import { Box, useTheme } from "@mui/material";
import HeroSection from "../components/sections/HeroSection";
import WeeklyDeals from "../components/sections/WeeklyDeals";

const Home = () => {
  const { palette } = useTheme();

  return (
    <Box>
      <div className="top-glow"></div>

      <Navbar />

      <UnderNav />

      <HeroSection />

      <WeeklyDeals palette={palette} />
    </Box>
  );
};

export default Home;
