import { Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";

const Alert = ({ children, setIsOpen, isOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <Box
      position="fixed"
      sx={{ inset: 0 }}
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="1111"
    >
      <Box
        position="absolute"
        sx={{ inset: 0 }}
        bgcolor="#00000075"
        onClick={() => setIsOpen(false)}
      />

      <IconButton
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "#fff",
          cursor: "pointer",
          zIndex: "2",
          bgcolor: "#00000075",
        }}
        onClick={() => setIsOpen(false)}
      >
        <Close />
      </IconButton>

      <Box
        bgcolor="#ffffffff"
        p="30px"
        borderRadius="8px"
        boxShadow="0 2px 10px rgba(0,0,0,0.1)"
        textAlign="center"
        width="500px"
        maxWidth="90%"
        maxHeight="90%"
        overflow="auto"
        zIndex="1"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Alert;
