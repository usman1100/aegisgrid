import { atom } from "jotai";
import type { DrawMode } from "../shared/types";

export const drawModeAtom = atom<DrawMode>("static");
