import PaginationComponent from "@/components/pagination-component";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full p-4 pt-14">
      <h1 className="text-3xl font-bold tracking-wider leading-6 uppercase text-cyan-900 mb-5">Gallery</h1>
      <PaginationComponent />
    </main>
  );
}
