import { ArrowDropDown, CategoryOutlined } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";

const UnderNav = () => {
  return (
    <Box>
      <Box
        className="container"
        display="flex"
        gap="3px"
        alignItems="center"
        mt="10px"
        maxWidth="100%"
        sx={{ userSelect: "none" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="5px 13px"
          gap="5px"
          borderRadius="50px"
          sx={{
            transition: ".3s",
            ":hover": {
              bgcolor: "lightgray",
              color: "green",
            },
          }}
        >
          <CategoryOutlined sx={{ fontSize: "20px" }} />

          <Typography fontSize="13px">Browse Categories</Typography>

          <ArrowDropDown sx={{ fontSize: "20px" }} />
        </Box>

        <Typography
          padding="5px 10px"
          borderRadius="50px"
          sx={{
            cursor: "pointer",
            transition: ".3s",
            boxShadow: "none",
            ":hover": {
              bgcolor: "lightgray",
              color: "green",
            },
          }}
          fontSize="12px"
          className="clickable"
        >
          🔥Special Offer
        </Typography>
      </Box>

      <Divider sx={{ my: "10px" }} />
    </Box>
  );
};

export default UnderNav;
