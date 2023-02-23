import Head from "next/head";
import { styled } from "@mui/system";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Pokemon app</title>
        <meta
          name="description"
          content="Pokemon app generated with create next app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
}
