import { Box, Typography, useMediaQuery } from "@mui/material";
import SignupForm from "../components/forms/SignupForm";

const Signup = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1050px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="30px"
      justifyContent="space-between"
      height="100vh"
      className="container"
    >
      <SignupForm />

      {isNonMobileScreen && (
        <img
          src="/login-image.png"
          alt="login-image"
          width="45%"
          height="97%"
          style={{
            maxWidth: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      )}
    </Box>
  );
};

export default Signup;
