import { WarningAmber } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const Warning = ({
  message,
  smallMessage,
  buttonName,
  setIsWarning,
  onDelete,
  id,
}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
      p={2}
    >
      <Box
        bgcolor="rgba(0,0,0,0.5)"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100vh"
        onClick={() => setIsWarning(false)}
      />

      <Box
        bgcolor="white"
        p={4}
        borderRadius="8px"
        width="400px"
        maxWidth="100%"
        zIndex="1"
      >
        <WarningAmber
          sx={{
            p: "7px",
            bgcolor: "#ff000014",
            color: "error.main",
            fontSize: "40px",
            borderRadius: "10px",
          }}
        />

        <Box mt={2}>
          <Typography>{message}</Typography>
          <Typography variant="body2" color="textSecondary">
            {smallMessage}
          </Typography>
        </Box>

        <Box
          mt={3}
          display="flex"
          gap="10px"
          justifyContent="end"
          alignItems="center"
        >
          <Button variant="outlined" onClick={() => setIsWarning(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ boxShadow: "none !important" }}
            onClick={() => {
              onDelete(id);
              setIsWarning(false);
            }}
          >
            {buttonName}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Warning;
