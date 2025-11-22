import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Place as PlaceIcon,
  Polyline as PolylineIcon,
  TouchApp as TouchAppIcon,
  PanTool as PanToolIcon,
} from "@mui/icons-material";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useMapSetup } from "../hooks/useMapSetup";
import { MapSidebar } from "../components/MapSidebar";

export default function MapPage() {
  const theme = useTheme();
  const {
    mapRef,
    viewState,
    onMapLoad,
    onMapMove,
    filteredLocations,
    moveToLocation,
    search,
    setSearch,
    drawMode,
    handleModeChange,
  } = useMapSetup();

  return (
    <DefaultLayout>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <MapSidebar locations={filteredLocations} onItemClick={moveToLocation} search={search} setSearch={setSearch} />

        <Box sx={{ flex: 1, position: "relative" }}>
          <Map
            ref={mapRef}
            {...viewState}
            onMove={onMapMove}
            onLoad={onMapLoad}
            style={{ width: "100%", height: "100%" }}
            mapStyle="https://demotiles.maplibre.org/style.json"
            mapLib={maplibregl}
          >
            <NavigationControl position="top-right" />
            <ScaleControl />
          </Map>

          {/* Drawing Controls */}
          <Box
            sx={{
              position: "absolute",
              top: 24,
              left: 24,
              zIndex: 10,
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <ToggleButtonGroup
              value={drawMode}
              exclusive
              onChange={handleModeChange}
              aria-label="drawing mode"
              orientation="vertical"
              size="small"
            >
              <ToggleButton value="static" aria-label="pan">
                <PanToolIcon />
              </ToggleButton>
              <ToggleButton value="polygon" aria-label="polygon">
                <PolylineIcon />
              </ToggleButton>
              <ToggleButton value="select" aria-label="select">
                <TouchAppIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
}
