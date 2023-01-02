import { Logo } from "../components/logo";

export default function Web() {
  return (
    <div className="grid place-items-center py-8">
      <header className="flex gap-20 text-slate-700 font-medium">
        <a href="/#features">Features</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#download">Download</a>
      </header>

      <main className="my-44">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 -z-10">
          <Logo width={700} height={700} />
        </div>

        <div className="flex flex-col z-50">
          <span className="text-9xl">Your....</span>
          <h1 className="text-9xl">Twitter Buddy</h1>
        </div>
      </main>

      <div className="w-full flex flex-col gap-5 justify-center items-center relative">
        <button className="text-lg bg-slate-700 text-slate-100 h-16 px-8 rounded-full min-w-min max-w-fit shadow-lg z-50">
          Download Chrome Extension
        </button>

        <p className="text-slate-500 text-sm">download your buddy today...</p>

        <div className="absolute top-5 flex flex-col w-full gap-1">
          <hr className="w-full border-slate-100" />
          <hr className="w-full border-slate-200" />
          <hr className="w-full border-slate-300" />

          <hr className="w-full border-slate-400" />

          <hr className="w-full border-slate-300" />
          <hr className="w-full border-slate-200" />
          <hr className="w-full border-slate-100" />
        </div>
      </div>
    </div>
  );
}
