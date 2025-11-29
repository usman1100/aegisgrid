import type { GeoJSONStoreFeatures } from "terra-draw";
import { create } from "zustand";
import type { DrawMode } from "../shared/types";

type Store = {
  drawMode: DrawMode;
  currentFeature: GeoJSONStoreFeatures | undefined;
  allFeatures: GeoJSONStoreFeatures[];
  modal: "create-event" | undefined;
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  locationSearch: string;
  updateLocationSearch: (search: string) => void;
  initiateCreateEvent: () => void;
  createPoint: (feature: GeoJSONStoreFeatures) => void;
  savePoint: () => void;
  closeCreateEventModal: () => void;
  populateFeatures: (features: GeoJSONStoreFeatures[]) => void;
  moveMap: (longitude: number, latitude: number, zoom?: number) => void;
};
export const useStore = create<Store>((set) => ({
  drawMode: "static",
  currentFeature: undefined,
  modal: undefined,
  allFeatures: [],
  viewState: {
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 5,
  },
  locationSearch: "",
  updateLocationSearch: (search: string) =>
    set((prev) => ({
      ...prev,
      locationSearch: search,
    })),
  initiateCreateEvent: () =>
    set((prev) => ({
      ...prev,
      drawMode: "point",
    })),

  createPoint: (feature: GeoJSONStoreFeatures) =>
    set((prev) => ({
      ...prev,
      currentFeature: feature,
      drawMode: "static",
      modal: "create-event",
    })),

  savePoint: () =>
    set((prev) => ({
      ...prev,
      allFeatures: prev?.currentFeature ? [...prev.allFeatures, prev.currentFeature] : prev.allFeatures,
      currentFeature: undefined,
      modal: undefined,
      drawMode: "static",
    })),

  closeCreateEventModal: () =>
    set((prev) => ({
      ...prev,
      drawMode: "static",
      currentFeature: undefined,
      modal: undefined,
    })),
  populateFeatures: (features: GeoJSONStoreFeatures[]) =>
    set((prev) => ({
      ...prev,
      allFeatures: features,
    })),

  moveMap: (longitude: number, latitude: number, zoom?: number) => {
    set((prev) => ({
      ...prev,
      viewState: {
        ...prev.viewState,
        longitude,
        latitude,
        zoom: zoom ?? prev.viewState.zoom,
      },
    }));
  },
}));
