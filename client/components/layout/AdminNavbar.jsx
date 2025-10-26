import {
  Category,
  Menu,
  Person,
  ShoppingCart,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [pageName, setPageName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dbLinks = ["Users", "Products", "Orders", "Categories"];

  useEffect(() => {
    setPageName(window.location.pathname.split("/")[2]);
  }, []);

  return (
    <Box
      p="3rem 2rem 2rem"
      boxShadow={1}
      bgcolor="primary.main"
      position="fixed"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      height="100vh"
      top={0}
      zIndex={1000}
      color="white"
      width={isOpen ? "200px" : "100px"}
      sx={{ transition: ".3s" }}
    >
      <Box
        position="absolute"
        top="10px"
        left="10px"
        sx={{ cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </Box>

      <Link to="/">
        <img
          src="/logo.png"
          alt="logo"
          width="40"
          style={{
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </Link>

      <Box display="flex" flexDirection="column" gap="5px">
        {dbLinks.map((link) => (
          <Link to={`/admin/${link.toLowerCase()}`} key={link}>
            <Box
              display="flex"
              alignItems="center"
              gap="5px"
              my="5px"
              sx={{
                userSelect: "none",
                transition: "0.3s",
                p: "0.3rem",
                cursor: "pointer",
                color:
                  pageName === link.toLowerCase() ? "secondary.main" : "white",
                "&:hover": {
                  color: "secondary.main",
                },
              }}
            >
              {link === "Users" && <Person />}
              {link === "Products" && <ShoppingCart />}
              {link === "Orders" && <ShoppingCartCheckout />}
              {link === "Categories" && <Category />}

              <Box fontSize="16px" display={isOpen ? "block" : "none"}>
                {link}
              </Box>
            </Box>
          </Link>
        ))}
      </Box>

      <img
        src="/logos.png"
        alt="logos"
        style={{
          width: "100%",
          opacity: ".019",
          objectFit: "cover",
          userSelect: "none",
          pointerEvents: "none",
          height: "100vh",
          position: "fixed",
          inset: "0",
          zIndex: -1,
        }}
      />
    </Box>
  );
};

export default AdminNavbar;
