import { useState, useEffect, useRef, useCallback } from "react";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl/maplibre";
import { TerraDraw } from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from "terra-draw-maplibre-gl-adapter";
import type { DrawMode, Location } from "../shared/types";
import { useAtom, useSetAtom } from "jotai";
import { createEventModalOpenAtom, drawModeAtom, featuresAtom } from "../state";
import { PLACEHOLDER_LOCATIONS, terraDrawModes } from "../shared/constants";

export const useMapSetup = () => {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<TerraDraw | null>(null);
  const [drawMode, setDrawMode] = useAtom(drawModeAtom);
  const [features, setFeatures] = useAtom(featuresAtom);
  const setCreateEventModalOpenAtom = useSetAtom(createEventModalOpenAtom);

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

    draw.on("finish", (_id, context) => {
      const feature = draw?.getSnapshot()?.at(0);
      if (feature) {
        setFeatures((prev) => [...prev, feature]);
        setDrawMode("static");
        if (context.mode === "point") {
          setCreateEventModalOpenAtom(true);
        }
      }
    });

    draw.start();
    drawRef.current = draw;
  }, []);

  useEffect(() => {
    if (drawRef.current) {
      try {
        drawRef.current.setMode(drawMode);
      } catch (e) {
        console.error("Error setting mode", e);
      }
    }
  }, [drawMode]);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: DrawMode | null
  ) => {
    if (newMode !== null) {
      setDrawMode(newMode);
    }
  };

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
    drawMode,
    handleModeChange,
  };
};
