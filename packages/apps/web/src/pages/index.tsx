import type { GetServerSideProps } from "next";

interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <main className="bg-zinc-900 text-white flex flex-col w-full min-h-screen items-center justify-center">
      <h1>Home</h1>
      <h2>Count: {count}</h2>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3333/pools/count");
  const { count } = await res.json();

  return {
    props: {
      count,
    },
  };
};
