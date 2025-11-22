import "maplibre-gl/dist/maplibre-gl.css";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  InputBase,
  useTheme,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, Place as PlaceIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import type { Location } from "../types";

type Props = {
  locations: Location[];
  onItemClick: (location: Location) => void;
  search: string;
  setSearch: (search: string) => void;
};

export const MapSidebar = ({ locations, onItemClick, search, setSearch }: Props) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        width: 320,
        height: "100%",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        px: 2,
      }}
    >
      <Box
        width={"full"}
        my={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"} color="primary">
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            AegisGrid
          </Link>
        </Typography>
        <UserButton />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search places"
            inputProps={{ "aria-label": "search places" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {locations.map((item) => (
          <ListItem key={`${item.lat}-${item.lng}`} disablePadding>
            <ListItemButton onClick={() => onItemClick(item)}>
              <ListItemIcon>
                <PlaceIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item.text} secondary={item.secondary} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Map data © OpenStreetMap contributors
        </Typography>
      </Box>
    </Paper>
  );
};
