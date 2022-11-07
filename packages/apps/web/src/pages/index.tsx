import { FormEvent, useRef } from "react";

import appPreviewImg from "@nlw-copa/assets/app-preview.png";
import logoImg from "@nlw-copa/assets/logo.svg";
import usersAvatarExampleImg from "@nlw-copa/assets/users-avatar-example.png";
import { api } from "@nlw-copa/axios-config";
import { Button } from "@nlw-copa/components/Button";
import { Input } from "@nlw-copa/components/Input";
import { Toast } from "@nlw-copa/components/Toast";
import { useFetch } from "@nlw-copa/hooks/useFetch";
import { useToast } from "@nlw-copa/hooks/useToast";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { CheckCircle } from "phosphor-react";

type HomeProps = {
  fallback: {
    polls: number;
    guesses: number;
    users: number;
  };
}

type Count = {
  count: number;
}

export default function Home({ fallback }: HomeProps) {
  const pollTitleRef = useRef<HTMLInputElement>(null);
  const { toastRef, showToast } = useToast();

  const poll = useFetch<Count>("/polls/count", {
    fallbackData: {
      count: fallback.polls,
    },
  });
  const guesses = useFetch<Count>("/guesses/count", {
    fallbackData: {
      count: fallback.guesses,
    },
  });
  const users = useFetch<Count>("/users/count", {
    fallbackData: {
      count: fallback.users,
    },
  });

  async function handleCreatePoll(e: FormEvent) {
    e.preventDefault();

    if (!pollTitleRef.current?.value.trim()) {
      pollTitleRef.current?.focus();
      showToast({
        message: "Erro",
        description: "Nome do bolão é obrigatório!",
        category: "error",
      });
      return;
    }

    try {
      const response = await api.post("/polls", {
        title: pollTitleRef.current.value,
      });

      if (poll.data) {
        await poll.mutate({ count: poll.data.count + 1 });
      }

      await navigator.clipboard.writeText(response.data.code);
      showToast({
        message: "Sucesso",
        description:
          "Bolão criado com sucesso, o código foi copiado para a área de transferência!",
        category: "success",
      });

      pollTitleRef.current.value = "";
    } catch (err) {
      console.error(err);
      showToast({
        message: "Erro",
        description: "Falha ao criar o bolão, tente novamente!",
        category: "error",
      });
    }
  }

  return (
    <>
      <div className="max-w-6xl min-h-screen mx-auto grid lg:grid-cols-2 gap-28 items-center px-3">
        <Head>
          <title>NLW Copa</title>
        </Head>
        <main>
          <Image src={logoImg} alt="NLW Copa" />
          <h1 className="mt-16 lg:text-5xl text-4xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg} alt="NLW Copa" quality={100} />
            <strong className="text-zinc-100 font-bold lg:text-xl text-lg leading-8">
              <span className="text-green-600">+{users.data?.count}</span>{" "}
              pessoas já estão usando
            </strong>
          </div>
          <form
            className="mt-10 flex sm:flex-row flex-col gap-2"
            onSubmit={handleCreatePoll}
          >
            <Input placeholder="Qual nome do seu bolão?" ref={pollTitleRef} />
            <Button type="submit">Criar meu bolão</Button>
          </form>
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed sm:text-start text-center">
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>
          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center md:gap-6 gap-2">
              <CheckCircle className="w-10 h-10 text-green-400" />
              <div className="flex flex-col gap-0.5">
                <span className="font-bold md:text-2xl text-xl">
                  +{poll.data?.count}
                </span>
                <span className="sm:text-base text-sm">Bolões criados</span>
              </div>
            </div>
            <div className="w-0.5 self-stretch bg-zinc-600/25" />
            <div className="flex items-center md:gap-6 gap-2">
              <CheckCircle className="w-10 h-10 text-green-400" />
              <div className="flex flex-col gap-0.5">
                <span className="font-bold md:text-2xl text-xl">
                  +{guesses.data?.count}
                </span>
                <span className="sm:text-base text-sm">Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>
        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
          quality={100}
          priority
          className="lg:order-1 order-first lg:static absolute -z-50 inset-0 lg:brightness-100 brightness-[0.25]"
        />
      </div>
      <Toast ref={toastRef} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("/polls/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      fallback: {
        polls: pollCountResponse.data.count,
        guesses: guessCountResponse.data.count,
        users: userCountResponse.data.count,
      },
    },
    revalidate: 1 * 60, // 1 minute
  };
};
