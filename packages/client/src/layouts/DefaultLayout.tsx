import { Box, type BoxProps, } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode | Array<ReactNode>;
} & BoxProps;

export const DefaultLayout = ({ children, ...props }: Props) => {

  if (Array.isArray(children)) return <Box {...props}>{children.map((child) => child)}</Box>;

  return <Box {...props}>{children}</Box>;
};
