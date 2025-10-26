import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  StarOutlined,
  StarBorderOutlined,
  FavoriteBorder,
} from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const { palette } = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1050px)");

  return (
    <Box
      key={product.id}
      p="10px"
      position="relative"
      bgcolor={palette.background.default}
      borderRadius="4px"
      color="black"
      overflow="hidden"
      sx={{
        cursor: "pointer",
        ":hover": {
          ".addToCartButton": {
            bottom: "0",
          },

          ".addToFavButton": {
            right: "8px",
          },
        },
      }}
    >
      {product.salePercent && (
        <Typography
          bgcolor="#e74c3c"
          color="white"
          p="2px 12px"
          borderRadius="4px"
          fontSize="9px"
          position="absolute"
          top="8px"
          left="8px"
          sx={{
            userSelect: "none",
          }}
        >
          Sale
        </Typography>
      )}

      <img
        src={product.image}
        alt={product.name}
        style={{
          maxWidth: "100%",
          borderRadius: "4px",
          width: isNonMobileScreen ? "200px" : "360px",
          height: isNonMobileScreen ? "200px" : "360px",
          objectFit: "cover",
        }}
      />

      <Typography fontSize="13px" mt="8px">
        {product.name}
      </Typography>

      <Box display="flex" alignItems="center" gap="6px" mt="4px">
        <Typography fontSize="13px" color="black" fontWeight="bold">
          $
          {product.salePercent
            ? (
                product.price -
                (product.price * product.salePercent) / 100
              ).toFixed()
            : product.price}
        </Typography>

        {product.salePercent && (
          <Typography
            fontSize="13px"
            color="#777"
            sx={{ textDecoration: "line-through" }}
          >
            ${product.price}
          </Typography>
        )}
      </Box>

      <Box display="flex" alignItems="center" gap="4px" mt="3px">
        <Box display="flex" alignItems="center">
          {Math.floor(product.rates) <= 5 &&
            Array.from({ length: Math.floor(product.rates) }, (_, index) => (
              <StarOutlined
                key={index}
                fontSize="10px"
                sx={{ color: "#f1c40f" }}
              />
            ))}

          {Math.floor(product.rates) <= 5 &&
            Array.from(
              {
                length:
                  Math.floor(product.rates) !== 5
                    ? 5 - Math.floor(product.rates)
                    : 0,
              },
              (_, index) => (
                <StarBorderOutlined
                  key={index}
                  fontSize="10px"
                  sx={{ color: "gray" }}
                />
              )
            )}
        </Box>

        <Typography fontSize="12px" color="#777">
          ({product.rateCount})
        </Typography>
      </Box>

      <Box
        className="addToCartButton"
        sx={{
          position: "absolute",
          bottom: "-100%",
          left: 0,
          transition: "0.2s",
          textAlign: "center",
          bgcolor: palette.background.default,
          width: "100%",
          p: "12px",
          boxShadow: "0px -9px 10px rgb(0 0 0 / 4%)",
        }}
      >
        <Button
          fullWidth
          fontSize="12px"
          color="#777"
          sx={{
            borderRadius: "50px",
            bgcolor: palette.primary.main,
            color: "white",
            fontSize: "12px",
            transition: "0.2s",
          }}
          className="clickable"
        >
          Add to cart
        </Button>
      </Box>

      <FavoriteBorder
        className="addToFavButton clickable"
        sx={{
          position: "absolute",
          top: "8px",
          right: "-100%",
          transition: "0.2s",
          borderRadius: "50%",
          bgcolor: palette.background.default,
          p: "4px",
          fontSize: "25px",
        }}
      />
    </Box>
  );
};

export default ProductCard;
