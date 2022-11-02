import { api } from "@nlw-copa/axios-config";
import { Landing } from "@nlw-copa/screens/Landing";
import type { GetStaticProps } from "next";
import { SWRConfig } from "swr";

interface Data {
  data: {
    count: number;
  };
}

interface HomeProps {
  fallback: {
    "/pools/count": Data;
    "/guesses/count": Data;
    "/users/count": Data;
  };
}

export default function Home({ fallback }: HomeProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <Landing />
    </SWRConfig>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("/pools/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      fallback: {
        "/pools/count": poolCountResponse,
        "/guesses/count": guessCountResponse,
        "/users/count": userCountResponse,
      },
    },
  };
};
