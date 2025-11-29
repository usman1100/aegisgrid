import Map, { NavigationControl, Source, Layer } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { useTheme } from "@mui/material/styles";
import { useMapSetup } from "../hooks/useMapSetup";
import { MapSidebar } from "../components/MapSidebar";
import { CreateEventButton } from "../components/CreateEvent/CreateEventButton";
import { useStore } from "../state";
import { useApiClient } from "../lib/api/client";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@aegisgrid/shared/validators";
import { useEffect } from "react";
import type { GeoJSONStoreFeatures } from "terra-draw";


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
  } = useMapSetup();

  const { allFeatures, populateFeatures } = useStore();

  const client = useApiClient();
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => client.get<{events: Event[]}>("events"),
  });

  useEffect(() => {
    const events = data?.data?.events;
    if (events) {
      const features: GeoJSONStoreFeatures[] = events.map(
        event => ({
         geometry:{
           coordinates: [event.location.x, event.location.y],
           type: 'Point',
         },
          properties: {},
          type: 'Feature',
          id: event.id,
        })
      )
    populateFeatures(features)
    }
  },   [data?.data, populateFeatures])

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
        <MapSidebar
          locations={filteredLocations}
          onItemClick={moveToLocation}
          search={search}
          setSearch={setSearch}
        />

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
            <Source
              id="saved-features"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: allFeatures,
              }}
            >
              <Layer
                id="saved-features-layer"
                type="circle"
                paint={{
                  "circle-radius": 6,
                  "circle-color": theme.palette.primary.main,
                  "circle-stroke-width": 2,
                  "circle-stroke-color": "#fff",
                }}
              />
            </Source>
          </Map>
        </Box>

        <Box sx={{ position: "absolute", bottom: 50, right: 24 }}>
          <CreateEventButton />
        </Box>
      </Box>
    </DefaultLayout>
  );
}
