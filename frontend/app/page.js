import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-1 relative overflow-hidden">
      <h1 className="text-[64px] font-serif font-bold">Make a Task</h1>
      <div className="flex flex-row gap-2 align-center justify-center">
        <Link
          className="px-[30px] py-[15px] border-solid border-2 border-sky-500 bg-sky-500 rounded-lg text-white font-bold hover:bg-transparent hover:text-sky-500 transition-all"
          href="/sign-up"
        >
          Inscription
        </Link>
        <Link
          className="px-[30px] py-[15px] border-solid border-2 border-sky-500 bg-sky-500 rounded-lg text-white font-bold hover:bg-transparent hover:text-sky-500 transition-all"
          href="/login"
        >
          Connexion
        </Link>
      </div>
      <div className="absolute top-[-100px] left-[0px] bg-sky-500 blur-3xl opacity-20 w-[150px] h-[500px] rotate-45 rounded-lg"></div>
      <div className="absolute bottom-[0px] right-[0px] bg-red-500 blur-3xl opacity-10 w-[150px] h-[500px] rotate-12 rounded-lg"></div>
    </main>
  );
}
