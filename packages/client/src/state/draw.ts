import { atom } from "jotai";
import type { DrawMode } from "../types";

export const drawModeAtom = atom<DrawMode>("static");
