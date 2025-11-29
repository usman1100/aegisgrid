import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Home() {

  return (
    <DefaultLayout
      sx={{
        pt: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" color="primary" fontWeight={"bold"}>
        AegisGrid
      </Typography>

      <Typography variant="h5" color="primary" mt={2}>
        Secure your perimeter
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <SignedOut>
          <SignInButton>
            <Button variant="contained">Get Started</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button variant="contained">
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to="/map"
            >
              Your Map
            </Link>
          </Button>
        </SignedIn>
        <Button variant="outlined">Learn More</Button>
      </Stack>
    </DefaultLayout>
  );
}
