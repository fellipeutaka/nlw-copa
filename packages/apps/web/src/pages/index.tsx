import { api } from "@nlw-copa/axios-config";
import { Landing } from "@nlw-copa/screens/Landing";
import { GetStaticProps } from "next";
import { SWRConfig } from "swr";

interface HomeProps {
  fallback: {
    "/pools/count": number;
    "/guesses/count": number;
    "/users/count": number;
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
        "/pools/count": poolCountResponse.data.count,
        "/guesses/count": guessCountResponse.data.count,
        "/users/count": userCountResponse.data.count,
      },
    },
    revalidate: 1 * 60, // 1 minute
  };
};
