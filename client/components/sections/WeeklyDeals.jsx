import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CountDown from "react-countdown";
import ProductCard from "../features/ProductCard";

const WeeklyDeals = ({ palette }) => {
  const [dealType, setDealType] = useState("up to 90%");
  const isNonMobileScreen = useMediaQuery("(min-width: 1050px)");

  const dealsType = [
    "up to 90%",
    "under $1",
    "almost sold out",
    "beauty & health",
    "jewelry & accessories",
    "home & kitchen",
    "men's clothing",
    "sports & outdoors",
  ];

  const expireDate = new Date("2025-12-31T23:59:59");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Deal has ended</span>;
    } else {
      return (
        <Box
          display="flex"
          gap="3px"
          alignItems="center"
          sx={{ userSelect: "none" }}
        >
          <Typography fontSize="13px" mr="4px">
            Limited time only!
          </Typography>

          <Box
            width="35px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#e74c3c"
            fontSize="12px"
          >
            {days}d
          </Box>

          <Box
            width="35px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#e74c3c"
            fontSize="12px"
          >
            {hours}h
          </Box>

          <Box
            width="35px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#e74c3c"
            fontSize="12px"
          >
            {minutes}m
          </Box>

          <Box
            width="35px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#e74c3c"
            fontSize="12px"
          >
            {seconds}s
          </Box>
        </Box>
      );
    }
  };

  const products = [
    {
      id: 1,
      name: "playstation 5",
      image:
        "https://smartkoshk.com/cdn/shop/files/PS5-SLIM-Hero-Box-US-V2.webp?v=1726950753",
      price: 599.0,
      salePercent: 10,
      rates: 4.5,
      rateCount: 113,
    },

    {
      id: 2,
      name: "xbox series x",
      image: "https://m.media-amazon.com/images/I/51ZSGe-MdPL.jpg",
      price: 499.0,
      salePercent: 15,
      rates: 4.7,
      rateCount: 89,
    },
    {
      id: 3,
      name: "nintendo switch",
      image:
        "https://freemans.scene7.com/is/image/OttoUK/600w/Nintendo-Switch-Neon-1.1-Smaller-Box-32GB~84G240FRSP.jpg",
      price: 299.0,
      salePercent: 20,
      rates: 4.8,
      rateCount: 150,
    },

    {
      id: 4,
      name: "Asus Gaming Laptop",
      image:
        "https://png.pngtree.com/png-vector/20250321/ourmid/pngtree-powerful-gaming-laptop-on-a-white-background-png-image_15836491.png",
      price: 1499.0,
      salePercent: 10,
      rates: 5.0,
      rateCount: 75,
    },
  ];

  return (
    <Box bgcolor={palette.primary.main} color="white" py={5}>
      <Box className="container">
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold" fontSize="1.5rem" mb="20px">
            Weekly Best Deals
          </Typography>

          <CountDown date={expireDate} renderer={renderer} />
        </Box>
        <Box
          display="flex"
          justifyContent={isNonMobileScreen ? "center" : "start"}
          gap="8px"
          flexWrap="wrap"
        >
          {dealsType.map((deal, index) => (
            <Typography
              key={index}
              fontSize="12px"
              border="1px solid #304a3cff"
              borderRadius="50px"
              p="4px 15px"
              className="clickable"
              sx={{
                textTransform: "capitalize",
                cursor: "pointer",
                ":hover": { bgcolor: palette.secondary.main },
                bgcolor:
                  deal === dealType ? palette.secondary.main : "transparent",
              }}
              onClick={() => setDealType(deal)}
            >
              {deal}
            </Typography>
          ))}
        </Box>

        <Box
          display="flex"
          justifyContent={isNonMobileScreen ? "start" : "center"}
          gap="8px"
          mt="20px"
          flexWrap="wrap"
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Box>

        <Box
          display={isNonMobileScreen ? "grid" : "flex"}
          flexDirection="column"
          alignItems={!isNonMobileScreen && "center"}
          gridTemplateColumns="repeat(4, 1fr)"
          gap="16px"
          mt="10px"
        >
          <Box
            gridColumn="span 2"
            display="flex"
            alignItems="center"
            gap="10px"
            justifyContent="space-between"
            borderRadius="10px"
            width={isNonMobileScreen ? "100%" : "380px"}
            maxWidth="100%"
            flexDirection={isNonMobileScreen ? "row" : "column"}
            sx={{ background: "linear-gradient(45deg, #bdc3c7, #f1faff)" }}
          >
            <Box p="40px 25px">
              <Box mb="20px">
                <Box display="flex" gap="4px" alignItems="center">
                  <Box
                    width="25px"
                    height="1px"
                    bgcolor={palette.primary.light}
                  />

                  <Typography
                    color={palette.primary.light}
                    fontWeight="bold"
                    fontSize="12px"
                  >
                    Gadget Collection
                  </Typography>
                </Box>

                <Typography
                  color={palette.text.primary}
                  fontWeight="bold"
                  fontSize="25px"
                  textTransform="uppercase"
                  m="2px 0 5px"
                >
                  fitness for smart special offer
                </Typography>

                <Typography color={palette.text.secondary} fontSize="12px">
                  Dining, living, & desk areas serve their purposes
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  bgcolor: palette.primary.light,
                  color: "white",
                  boxShadow: "none",
                  fontSize: "12px",
                  px: "30px",
                  "::before": {
                    borderColor: palette.primary.light,
                  },
                }}
                className="modern"
              >
                Shop Now
              </Button>
            </Box>

            <img
              src="/watches.png"
              alt="Design"
              width="250"
              style={{
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </Box>

          <Box
            gridColumn="span 1"
            bgcolor="#ffeecbff"
            borderRadius="10px"
            display="flex"
            flexDirection="column"
            width={isNonMobileScreen ? "100%" : "380px"}
            maxWidth="100%"
          >
            <Box zIndex="1" p="10px 20px">
              <Box display="flex" gap="4px" alignItems="center">
                <Box
                  width="20px"
                  height="1px"
                  bgcolor={palette.secondary.main}
                />

                <Typography
                  color={palette.secondary.main}
                  fontWeight="bold"
                  fontSize="12px"
                  whiteSpace="nowrap"
                >
                  Men's Fashion
                </Typography>
              </Box>

              <Typography
                color="black"
                whiteSpace="nowrap"
                fontWeight="bold"
                fontSize="25px"
              >
                Men's Fashion
              </Typography>

              <Typography
                color="black"
                fontSize="13px"
                display="flex"
                alignItems="center"
                whiteSpace="nowrap"
                gap="4px"
              >
                offer starts from{" "}
                <Typography
                  color={palette.secondary.main}
                  fontSize="13px"
                  fontWeight="bold"
                >
                  $29.00
                </Typography>
              </Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: palette.secondary.main,
                  color: "white",
                  boxShadow: "none ",
                  fontSize: "12px",
                  px: "23px",
                  mt: "10px",
                  "::before": {
                    borderColor: palette.secondary.main,
                  },
                }}
                className="modern"
              >
                Shop Now
              </Button>
            </Box>

            <img
              src="/yellow-guy.png"
              alt="design"
              style={{
                pointerEvents: "none",
                userSelect: "none",
                objectFit: "cover",
                maxWidth: "100%",
                width: "170px",
                alignSelf: "end",
                marginTop: "-30px",
              }}
            />
          </Box>

          <Box
            gridColumn="span 1"
            bgcolor="#d8eeffff"
            borderRadius="10px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width={isNonMobileScreen ? "100%" : "380px"}
            maxWidth="100%"
          >
            <Box zIndex="1" p="10px 20px">
              <Box display="flex" gap="4px" alignItems="center">
                <Box width="20px" height="1px" bgcolor="#229fffff" />

                <Typography
                  color="#229fffff"
                  fontWeight="bold"
                  fontSize="12px"
                  whiteSpace="nowrap"
                >
                  Home Appliances
                </Typography>
              </Box>

              <Typography
                color="black"
                whiteSpace="nowrap"
                fontWeight="bold"
                fontSize="25px"
              >
                Felly Fan Offer
              </Typography>

              <Typography
                color="black"
                fontSize="13px"
                display="flex"
                alignItems="center"
                whiteSpace="nowrap"
                gap="4px"
              >
                offer starts from{" "}
                <Typography color="#229fffff" fontSize="13px" fontWeight="bold">
                  $29.00
                </Typography>
              </Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#229fffff",
                  color: "white",
                  boxShadow: "none ",
                  fontSize: "12px",
                  px: "23px",
                  mt: "10px",
                  "::before": {
                    borderColor: "#229fffff",
                  },
                }}
                className="modern"
              >
                Shop Now
              </Button>
            </Box>

            <img
              src="/fan.png"
              alt="design"
              style={{
                pointerEvents: "none",
                userSelect: "none",
                objectFit: "cover",
                maxWidth: "100%",
                width: "210px",
                alignSelf: "end",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyDeals;
