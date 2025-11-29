import type { GeoJSONStoreFeatures } from "terra-draw";
import type { DrawMode } from "../shared/types";

type Store = {
  drawMode: DrawMode;
  currentFeature: GeoJSONStoreFeatures | undefined;
  allFeatures: GeoJSONStoreFeatures[];
  modal: "create-event" | undefined;
  initiateCreateEvent: () => void;
  createPoint: (feature: GeoJSONStoreFeatures) => void;
  savePoint: () => void;
  closeCreateEventModal: () => void;
  populateFeatures: (features: GeoJSONStoreFeatures[]) => void;
};
export const useStore = create<Store>((set) => ({
  drawMode: "static",
  currentFeature: undefined,
  modal: undefined,
  allFeatures: [],

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
      allFeatures: prev?.currentFeature
        ? [...prev.allFeatures, prev.currentFeature]
        : prev.allFeatures,
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
}));
