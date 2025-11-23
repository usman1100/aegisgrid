import { atom } from "jotai";
import type { DrawMode } from "../shared/types";
import type { GeoJSONStoreFeatures } from "terra-draw";

export const drawModeAtom = atom<DrawMode>("static");
export const featuresAtom = atom<GeoJSONStoreFeatures[]>([]);
export const pointFeaturesAtom = atom<GeoJSONStoreFeatures[]>((get) => {
  return get(featuresAtom).filter(
    (feature) => feature.geometry.type === "Point"
  );
});
export const createEventModalOpenAtom = atom<boolean>(false);
