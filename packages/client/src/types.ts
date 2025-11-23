export type Location = {
  text: string;
  secondary: string;
  lat: number;
  lng: number;
};

export type DrawMode = "static" | "polygon" | "point" | "select";

export type DrawState = {
  state: "WaitingForClick" | "WaitingForPoint";
};
