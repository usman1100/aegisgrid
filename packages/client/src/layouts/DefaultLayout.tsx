import { Box, Container, type BoxProps, type ContainerProps } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode | Array<ReactNode>;
} & BoxProps;

export const DefaultLayout = ({ children, ...props }: Props) => {
  const containerProps: BoxProps = {
    sx: {
      pt: 5,
      pb: 5,
    },
    ...props,
  };

  if (Array.isArray(children)) return <Box {...props}>{children.map((child) => child)}</Box>;

  return <Box {...props}>{children}</Box>;
};
