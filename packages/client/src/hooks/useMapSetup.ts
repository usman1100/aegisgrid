import { useState, useEffect, useRef, useCallback } from "react";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  TerraDraw,
  TerraDrawPointMode,
  TerraDrawPolygonMode,
  TerraDrawSelectMode,
} from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from "terra-draw-maplibre-gl-adapter";
import type { DrawMode, Location } from "../types";
import { useAtom } from "jotai";
import { drawModeAtom } from "../state";

const locations = [
  {
    text: "Grand Canyon",
    secondary: "Arizona, USA",
    lat: 36.1069,
    lng: -112.1129,
  },
  {
    text: "Red Square",
    secondary: "Moscow, Russia",
    lat: 55.7539,
    lng: 37.6208,
  },
  {
    text: "Great Wall of China",
    secondary: "Beijing, China",
    lat: 40.4319,
    lng: 116.5704,
  },
  {
    text: "Eiffel Tower",
    secondary: "Paris, France",
    lat: 48.8584,
    lng: 2.2945,
  },
  {
    text: "Machu Picchu",
    secondary: "Cusco Region, Peru",
    lat: -13.1631,
    lng: -72.545,
  },
  {
    text: "Sydney Opera House",
    secondary: "Sydney, Australia",
    lat: -33.8568,
    lng: 151.2153,
  },
  {
    text: "Pyramids of Giza",
    secondary: "Cairo, Egypt",
    lat: 29.9792,
    lng: 31.1342,
  },
  {
    text: "Christ the Redeemer",
    secondary: "Rio de Janeiro, Brazil",
    lat: -22.9519,
    lng: -43.2105,
  },
  {
    text: "Taj Mahal",
    secondary: "Agra, India",
    lat: 27.1751,
    lng: 78.0421,
  },
  {
    text: "Mount Kilimanjaro",
    secondary: "Tanzania",
    lat: -3.0674,
    lng: 37.3556,
  },
];

export const useMapSetup = () => {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<TerraDraw | null>(null);
  const [drawMode, setDrawMode] = useAtom(drawModeAtom);
  const [polygons, setPolygons] = useState<any[]>([]);

  const [viewState, setViewState] = useState(() => ({
    longitude: locations.at(0)?.lng,
    latitude: locations.at(0)?.lat,
    zoom: 5,
  }));

  const [search, setSearch] = useState("");

  const filteredLocations = locations.filter((location) =>
    location.text.toLowerCase().includes(search.toLowerCase())
  );

  const onMapLoad = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    const draw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({
        map: map,
      }),
      modes: [
        new TerraDrawPolygonMode(),
        new TerraDrawPointMode(),
        new TerraDrawSelectMode({
          flags: {
            polygon: {
              feature: {
                draggable: true,
                rotateable: true,
                scaleable: true,
                coordinates: {
                  midpoints: true,
                  draggable: true,
                  deletable: true,
                },
              },
            },
          },
        }),
      ],
    });

    draw.on("change", () => {
      const snapshot = draw.getSnapshot();
      setPolygons(snapshot);
      console.log("Drawn polygons:", snapshot);
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
