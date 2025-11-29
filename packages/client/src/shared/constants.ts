import {
  TerraDrawPointMode,
  TerraDrawPolygonMode,
  TerraDrawSelectMode,
} from "terra-draw";

export const DEFAULT_MAP_STYLE = "https://demotiles.maplibre.org/style.json";

export const terraDrawModes = [
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
];

export const PLACEHOLDER_LOCATIONS = [
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
