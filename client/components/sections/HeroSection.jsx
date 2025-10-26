import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroSection = () => {
  const IsNonMobileScreen = useMediaQuery("(min-width: 900px)");

  const slides = [
    {
      id: 1,
      title: "Best Furniture Collection",
      description: "Discover the finest selection of furniture for your home.",
      image: "/armchair-hero.png",
      bgcolor: "#faeacaff",
      textColor: "#554b39ff",
    },
    {
      id: 2,
      title: "Smart Gadgets & Devices",
      description: "Upgrade your life with innovative devices.",
      image: "/gadgets.png",
      bgcolor: "#c0d9e0",
      textColor: "#3f5d6b",
    },
    {
      id: 3,
      title: "Fresh Summer Collection",
      description: "Lightweight outfits perfect for the sunny days ahead.",
      image: "/summer-clothes.png",
      bgcolor: "#f7f3e8ff",
      textColor: "#6c502bff",
    },
    {
      id: 4,
      title: "Stylish Men's Fashion",
      description:
        "Trendy outfits for every season with modern cuts and fabrics.",
      image: "/model-hero.png",
      bgcolor: "#e1e1e1ff",
      textColor: "#383838ff",
    },
    {
      id: 5,
      title: "Cozy Home Decor",
      description: "Warm and inviting pieces to elevate your living space.",
      image: "/woody-house.png",
      bgcolor: "#f5e8e1",
      textColor: "#5a4636",
    },
  ];

  return (
    <Box
      display={IsNonMobileScreen ? "grid" : "flex"}
      gridTemplateColumns="repeat(4, 1fr)"
      flexDirection="column"
      gap="8px"
      width="100%"
      my="20px"
      maxWidth="100%"
      sx={{ userSelect: "none" }}
      className="container"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{
          gridColumn: "span 3",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="10px"
              position="relative"
              flexDirection={IsNonMobileScreen ? "row" : "column"}
              height="100%"
              sx={{ boxSizing: "border-box" }}
            >
              <Box
                position="absolute"
                zIndex="-1"
                height="75%"
                sx={{
                  inset: "0",
                  background: `linear-gradient(to bottom, ${slide.bgcolor}, transparent)`,
                }}
              />

              <Box
                flex="1"
                zIndex="1"
                p="30px"
                textAlign={IsNonMobileScreen ? "left" : "center"}
              >
                <Typography
                  fontSize="37px"
                  color={slide.textColor}
                  fontWeight="bold"
                  lineHeight="1.1"
                  my="10px"
                >
                  {slide.title}
                </Typography>

                <Typography fontSize="13px" color={slide.textColor}>
                  {slide.description}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: slide.textColor,
                    color: "white",
                    mt: "25px",
                    borderRadius: "50px",
                    boxShadow: "none",
                    fontSize: "12px",
                    px: "30px",
                    "::before": {
                      borderColor: slide.textColor,
                    },
                  }}
                  className="modern"
                >
                  Shop Now
                </Button>
              </Box>

              <Box flex="1" display="flex" justifyContent="center">
                <img
                  src={slide.image}
                  alt="Design"
                  width="330"
                  height="330"
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        display="flex"
        justifyContent="space-between"
        gap="10px"
        bgcolor="#d4cac0"
        gridColumn="span 1"
        gridRow="span 2"
        borderRadius="10px"
        flexDirection="column"
      >
        <Box p="30px" zIndex="1">
          <Typography
            fontSize="14px"
            color="#7f776f"
            fontWeight="bold"
            textAlign="center"
            width="fit-content"
          >
            Super Sale
            <Typography
              color="white"
              fontSize="20px"
              fontWeight="bold"
              display="inline-block"
              ml="3px"
            >
              50%
            </Typography>
          </Typography>

          <Typography
            fontSize="37px"
            color="#7f776f"
            fontWeight="bold"
            lineHeight="1.1"
            mb="5px"
          >
            Stylish Looks For Any Season
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#ba9886",
              color: "white",
              mt: "16px",
              borderRadius: "50px",
              boxShadow: "none",
              fontSize: "12px",
              px: "30px",
              "::before": {
                borderColor: "#ba9886",
              },
            }}
            className="modern"
          >
            Shop Now
          </Button>
        </Box>

        <img
          src="/huawei-watch-fit-3-sku-6-removebg-preview.png"
          alt="Design"
          width="300"
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
      </Box>

      {/* ------------------------------------- */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        bgcolor="#e4eaf1"
        gridColumn="span 2"
        gridRow="span 1"
        borderRadius="10px"
        flexDirection="column"
        position="relative"
        overflow="hidden"
      >
        <Box alignSelf="start" p="30px" zIndex="1">
          <Typography
            fontSize="14px"
            color="#657180ff"
            fontWeight="bold"
            textAlign="center"
            width="fit-content"
          >
            Super Sale
            <Typography
              color="#474747ff"
              fontSize="20px"
              fontWeight="bold"
              display="inline-block"
              ml="3px"
            >
              50%
            </Typography>
          </Typography>

          <Typography
            fontSize="40px"
            color="#657180ff"
            fontWeight="bold"
            lineHeight="1.1"
            mb="5px"
          >
            Stylish Men's <br /> Fashion
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#808fa1ff",
              color: "white",
              mt: "16px",
              borderRadius: "50px",
              boxShadow: "none",
              fontSize: "12px",
              px: "30px",
              "::before": {
                borderColor: "#808fa1ff",
              },
            }}
            className="modern"
          >
            Shop Now
          </Button>
        </Box>

        <img
          src="\istockphoto-512888421-612x612-removebg-preview.png"
          alt="Design"
          width="290"
          style={{
            pointerEvents: "none",
            userSelect: "none",
            flex: "1",
            transform: "rotateY(180deg)",
            alignSelf: "end",
            marginTop: "-60px",
            objectFit: "contain",
            zIndex: "1",
          }}
        />

        <img
          src="/scribble.png"
          alt=""
          style={{
            pointerEvents: "none",
            userSelect: "none",
            position: "absolute",
            top: "0",
            left: "0px",
            opacity: "0.06",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* ------------------------------------- */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        bgcolor="rgb(254 240 240)"
        gridColumn="span 1"
        gridRow="span 1"
        borderRadius="10px"
        flexDirection="column"
        position="relative"
        overflow="hidden"
      >
        <Box
          textAlign="center"
          alignSelf="end"
          p="15px 30px 0"
          display="flex"
          alignItems="center"
          zIndex="1"
        >
          <img
            src="/807e02f8-b815-4d7e-85bc-cd8dab314255-removebg-preview.png"
            alt="Design"
            width="100"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        </Box>

        <img
          src=" \istockphoto-524161848-612x612-removebg-preview.png"
          alt="Design"
          width="215"
          style={{
            pointerEvents: "none",
            userSelect: "none",
            flex: "1",
            alignSelf: "start",
            objectFit: "contain",
            zIndex: "1",
            maxWidth: "100%",
          }}
        />

        <img
          src="/flowers.png"
          alt="Design"
          style={{
            pointerEvents: "none",
            userSelect: "none",
            maxWidth: "100%",
            position: "absolute",
            bottom: "0",
            left: "-70px",
            opacity: "0.3",
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
