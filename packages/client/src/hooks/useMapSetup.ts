import {  useEffect, useRef, useCallback } from "react";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl/maplibre";
import { TerraDraw } from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from "terra-draw-maplibre-gl-adapter";
import type { Location } from "../shared/types";
import { PLACEHOLDER_LOCATIONS, terraDrawModes } from "../shared/constants";
import { useStore } from "../state";

export const useMapSetup = () => {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<TerraDraw | null>(null);
  const { createPoint, drawMode, currentFeature, viewState, locationSearch, updateLocationSearch, moveMap } = useStore();



  const filteredLocations = PLACEHOLDER_LOCATIONS.filter((location) =>
    location.text.toLowerCase().includes(locationSearch.toLowerCase()),
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
    const {longitude, latitude, zoom}=  evt.viewState
    moveMap(longitude, latitude, zoom);
  }, [moveMap]);

  const moveToLocation = (location: Location) => {
    moveMap(location.lng, location.lat, 6);
  };

  return {
    mapRef,
    viewState,
    onMapLoad,
    onMapMove,
    moveToLocation,
    filteredLocations,
  };
};
