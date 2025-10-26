import { Box, Button, Typography } from "@mui/material";
 import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

const Verify = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);

      try {
        const data = await api.post(
          `/api/v1/auth/validate-signup`,
          { token }
        );

 
        if (data.status === 200) {
          setIsValid(true);

          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return !loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      position="relative"
    >
      {isValid && (
        <img
          src="/confetti.png"
          alt="confetti"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
            filter: "blur(8px) hue-rotate(120deg)",
            opacity: "0.2",
          }}
          className="lockImage"
        />
      )}

      {isValid ? (
        <Box textAlign="center">
          <img
            src="/valid-mail.png"
            alt="valid-email"
            width="350"
            className="lockImage"
            style={{ maxWidth: "100%" }}
          />

          <Typography fontSize="34px" color="green" fontWeight="bold">
            Congratulations! 🎉
          </Typography>

          <Typography fontSize="17px" color="#333" marginTop="3px">
            Your email has been successfully verified.
          </Typography>

          <Link to="/">
            <Button
              variant="contained"
              className="modern"
              sx={{
                bgcolor: "#0e610eff",
                width: "230px",
                mt: "30px",
                "::before": {
                  borderColor: "#0e610eff",
                },
              }}
            >
              Go To Home Page
            </Button>
          </Link>
        </Box>
      ) : (
        <Box textAlign="center">
          <img
            src="/invalid-mail.png"
            alt="invalid-email"
            width="350"
            className="lockImage"
            style={{ maxWidth: "100%" }}
          />

          <Typography fontSize="34px" color="red" fontWeight="bold">
            Oops! 😢
          </Typography>

          <Typography fontSize="17px" color="#333" marginTop="3px">
            Your email verification link is invalid or has expired.
          </Typography>

          <Button
            variant="contained"
            className="modern"
            sx={{
              bgcolor: "#9e3028ff",
              width: "230px",
              mt: "30px",
              "::before": {
                borderColor: "#9e3028ff",
              },
            }}
          >
            Resend Verification Email
          </Button>
        </Box>
      )}
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <span class="email-loader"></span>
    </Box>
  );
};

export default Verify;
