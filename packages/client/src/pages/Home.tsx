import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useApiClient } from "../lib/api/client";

export default function Home() {
  const client = useApiClient();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    (async () => {
      if (!isSignedIn) return;
      const response = await client.get("/");
      console.log(response.data);
    })().catch((e) => {
      console.error(e);
    });
  }, [isSignedIn, client]);

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
