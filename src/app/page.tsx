import Chart from "@/components/Chart";

export default function Home() {
  return (
    <>
      <header className="bg-gradient-to-bl from-primary to-background to-50% text-right">
        <h1 className="text-2xl">Cordal🪸</h1>
      </header>
      <main className="text-center">
        <Chart />
      </main>
      <footer></footer>
    </>
  );
}
