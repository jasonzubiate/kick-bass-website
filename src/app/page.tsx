import Hero from "@/components/page/Hero";

export default function Home() {
  return (
    <main>
      <div className="padding-container">
        <div className="content-container">
          <Hero />
        </div>
      </div>

      {/* <section className="section section--small--margin mx-auto">
        <div className="padding-container">
          <div className="content-container">
            <PackagesList packages={packages.docs.toReversed()} />
          </div>
        </div>
      </section> */}
    </main>
  );
}
