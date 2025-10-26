import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import SearchInput from "../common/SearchInput";
import {
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  AdminPanelSettingsTwoTone,
} from "@mui/icons-material";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../states";
import { useSelector } from "react-redux";
import api from "../../api";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const { palette } = useTheme();
  const IsNonMobileScreen = useMediaQuery("(min-width: 900px)");

  const handleLogout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await api.post(`/api/v1/auth/logout`);
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error("Logout failed:", error);
      }
    } finally {
      dispatch(setLogout());
      navigate("/login");
    }
  };

  return (
    <Box>
      <Box
        p="10px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={IsNonMobileScreen ? "row" : "column"}
        gap="10px"
        className="container"
        maxWidth="100%"
      >
        <img
          src="/logo.png"
          alt="Logo"
          width="50"
          style={{ userSelect: "none", boxShadow: "none" }}
          className="clickable"
        />

        <SearchInput palette={palette} />

        <Box display="flex" gap="5px">
          <Box
            p="5px"
            bgcolor={palette.background.paper}
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={`1px solid ${palette.divider}`}
            className="clickable"
          >
            <FavoriteBorder sx={{ color: palette.text.secondary }} />
          </Box>

          <Box
            p="5px"
            bgcolor={palette.background.paper}
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={`1px solid ${palette.divider}`}
            className="clickable"
          >
            <ShoppingBagOutlined sx={{ color: palette.text.secondary }} />
          </Box>

          {user && user.role === "admin" && (
            <Link to="/admin">
              <Box
                p="5px"
                bgcolor={palette.background.paper}
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={`1px solid ${palette.divider}`}
                className="clickable"
              >
                <AdminPanelSettingsTwoTone
                  sx={{ color: palette.text.secondary }}
                />
              </Box>
            </Link>
          )}

          <Box position="relative">
            <Box
              p="5px"
              bgcolor={palette.background.paper}
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={`1px solid ${palette.divider}`}
              className="clickable"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              ref={btnRef}
            >
              <PersonOutline sx={{ color: palette.text.secondary }} />
            </Box>

            {isProfileMenuOpen && (
              <Box
                position="absolute"
                top="45px"
                right="0"
                bgcolor={palette.background.paper}
                zIndex="111"
                width="200px"
                boxShadow="2"
                ref={menuRef}
                border={`1px solid ${palette.divider}`}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10.4px",
                    right: "8px",
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: `10px solid ${palette.divider}`,
                  }}
                />

                <Box
                  p="10px"
                  sx={{
                    cursor: "pointer",
                    ":hover": { bgcolor: palette.action.hover },
                  }}
                >
                  Profile
                </Box>

                <Divider />

                <Box
                  p="10px"
                  sx={{
                    cursor: "pointer",
                    ":hover": { bgcolor: palette.action.hover },
                  }}
                  onClick={handleLogout}
                >
                  {user ? "Logout" : "Login"}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: "5px" }} />
    </Box>
  );
};

export default Navbar;
