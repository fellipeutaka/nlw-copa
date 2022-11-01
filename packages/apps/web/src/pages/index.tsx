import appPreviewImg from "@nlw-copa/assets/app-preview.png";
import logoImg from "@nlw-copa/assets/logo.svg";
import usersAvatarExampleImg from "@nlw-copa/assets/users-avatar-example.png";
import Image from "next/image";
import { CheckCircle } from "phosphor-react";

export default function Home() {
  return (
    <div className="max-w-6xl min-h-screen mx-auto grid lg:grid-cols-2 gap-28 items-center px-3">
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-16 text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="NLW Copa" quality={100} />
          <strong className="text-zinc-100 font-bold text-xl leading-8">
            <span className="text-green-600">+12.592</span> pessoas já estão
            usando
          </strong>
        </div>
        <form className="mt-10 flex gap-2">
          <input
            type="text"
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-zinc-800 border border-zinc-600 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-amber-300 transition-all hover:bg-amber-500 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none text-zinc-900 px-6 py-4 rounded font-bold text-sm uppercase"
          >
            Criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
        className="lg:order-1 order-first lg:static absolute -z-50 inset-0 lg:brightness-100 brightness-[0.25]"
      />
    </div>
  );
}
