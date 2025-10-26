import { Box, Button, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchInput = ({ palette }) => {
  const handleSearch = (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
  };

  return (
    <form
      style={{
        backgroundColor: palette.background.paper,
        display: "flex",
        alignItems: "center",
        borderRadius: "50px",
        padding: "6px 10px",
        justifyContent: "space-between",
        gap: "10px",
        maxWidth: "100%",
        flexBasis: "45%",
        border: `1px solid ${palette.divider}`,
      }}
      onSubmit={(e) => handleSearch(e)}
    >
      <InputBase
        placeholder="What are you searching for?"
        sx={{
          width: "250px",
          pl: "10px",
          fontSize: "14px",
          maxWidth: "100%",
          flex: "1",
        }}
        className="hidePlaceholder"
      />

      <Button
        variant="contained"
        color="secondary"
        sx={{
          boxShadow: "none !important",
          color: "white",
          borderRadius: "50px",
          width: "10px",
        }}
        className="clickable"
      >
        <Search sx={{ fontSize: "15px" }} />
      </Button>
    </form>
  );
};

export default SearchInput;
