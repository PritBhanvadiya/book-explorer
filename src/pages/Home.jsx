import FormMain from "../components/FormMain/FormMain";

function Home() {
  return (
    <main role="main">
      <div className="container">
        <section className="full-flx" aria-label="Search Section">
          <FormMain />
        </section>
      </div>
    </main>
  );
}

export default Home;