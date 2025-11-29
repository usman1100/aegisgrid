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
import { Search as SearchIcon, Place as PlaceIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useStore } from "../state";
import { memo, useMemo } from "react";

type Props = {
  onItemClick: (coords: [number, number]) => void;
};

const MapSidebarBase = ({ onItemClick }: Props) => {
  const theme = useTheme();
  const locationSearch = useStore((state) => state.locationSearch);
  const updateLocationSearch = useStore((state) => state.updateLocationSearch);
  const allFeatures = useStore((state) => state.allFeatures);

  // Memoize filtered features
  const filteredFeatures = useMemo(() => {
    if (!locationSearch.trim()) return allFeatures;
    const searchLower = locationSearch.toLowerCase();
    return allFeatures.filter((item) => {
      const name = typeof item.properties.name === "string" ? item.properties.name.toLowerCase() : "";
      return name.includes(searchLower);
    });
  }, [allFeatures, locationSearch]);

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
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search places"
            inputProps={{ "aria-label": "search places" }}
            value={locationSearch}
            onChange={(e) => updateLocationSearch(e.target.value)}
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {filteredFeatures.map((item) => {
          const [lng, lat] = item.geometry.coordinates;
          if (typeof lng !== "number" || typeof lat !== "number") {
            return null;
          }

          const name = typeof item.properties.name === "string" ? item.properties.name : "Event";

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => onItemClick([lng, lat])}>
                <ListItemIcon>
                  <PlaceIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
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
export const MapSidebar = memo(MapSidebarBase);
