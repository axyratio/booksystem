import SearchIcon from "@mui/icons-material/Search";
import { Paper, Stack, Typography } from "@mui/material";

const Search = () => {


  return (
    <>
      <Paper
        elevation={2}
        sx={{
          py: 1.2,
          px: 1,
          maxWidth: "auto",
          width: "100%",
          borderRadius: .5,
          backgroundColor: "background.default",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,20%)"

        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          gap={2}
          sx={{ px: 1 }}
        >
          <SearchIcon sx={{ color: "primary.main" }} />
          <Typography 
            variant="body1"
            sx={{ 
                opacity: 0.6 ,
            }}
          >Search
          </Typography>
        </Stack>
      </Paper>
    </>
  );
};

export default Search;
