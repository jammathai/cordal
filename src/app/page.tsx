import FlexInput from "@/components/FlexInput";

export default function Home() {
  return (
    <>
      <header className="bg-gradient-to-bl from-primary to-background to-50% text-right">
        <h1 className="text-2xl">Cordal🪸</h1>
      </header>
      <main className="text-center">
        <h1 className="text-4xl">
          <FlexInput placeholder="Chart Name" />
        </h1>
      </main>
      <footer></footer>
    </>
  );
}
