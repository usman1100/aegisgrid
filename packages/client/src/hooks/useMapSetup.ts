import { useState, useEffect, useRef, useCallback } from "react";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl/maplibre";
import { TerraDraw } from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from "terra-draw-maplibre-gl-adapter";
import type { Location } from "../shared/types";
import { PLACEHOLDER_LOCATIONS, terraDrawModes } from "../shared/constants";
import { useStore } from "../state";

export const useMapSetup = () => {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<TerraDraw | null>(null);
  const { createPoint, drawMode, currentFeature } = useStore();

  const [viewState, setViewState] = useState(() => ({
    longitude: PLACEHOLDER_LOCATIONS.at(0)?.lng,
    latitude: PLACEHOLDER_LOCATIONS.at(0)?.lat,
    zoom: 5,
  }));

  const [search, setSearch] = useState("");

  const filteredLocations = PLACEHOLDER_LOCATIONS.filter((location) =>
    location.text.toLowerCase().includes(search.toLowerCase())
  );

  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    const draw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({
        map: map,
      }),
      modes: terraDrawModes,
    });

    draw.on("finish", (_id, _context) => {
      const feature = draw?.getSnapshot()?.at(0);
      if (feature) {
        createPoint(feature);
      }
    });

    draw.start();
    drawRef.current = draw;
  }, [createPoint]);

  useEffect(() => {
    if (drawRef.current) {
      try {
        drawRef.current.setMode(drawMode);
      } catch (e) {
        console.error("Error setting mode", e);
      }
    }
  }, [drawMode]);

  // This to only show features that are stored in the allFeatures array
  useEffect(() => {
    if (!currentFeature && drawRef.current) {
      drawRef.current.clear();
    }
  }, [currentFeature]);

  const onMapMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  const moveToLocation = (location: Location) => {
    setViewState((prev) => ({
      ...prev,
      longitude: location.lng,
      latitude: location.lat,
      zoom: 6,
    }));
  };

  return {
    mapRef,
    viewState,
    onMapLoad,
    onMapMove,
    moveToLocation,
    filteredLocations,
    search,
    setSearch,
  };
};
