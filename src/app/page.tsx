import { getLatestEnglishArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let articles = [] as Awaited<ReturnType<typeof getLatestEnglishArticles>>;
  let dataError = false;

  try {
    articles = await getLatestEnglishArticles();
  } catch {
    dataError = true;
  }

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="masthead">
            <div>
              <div className="brand">Dainik Jahan</div>
              <div className="edition">English Edition</div>
            </div>
            <div className="edition">Independent News • Mymensingh, Bangladesh</div>
          </div>
          <nav className="nav" aria-label="Primary navigation">
            <a href="/">Home</a><a href="#latest">Latest</a><a href="#bangladesh">Bangladesh</a><a href="#world">World</a><a href="#business">Business</a><a href="#sports">Sports</a><a href="#opinion">Opinion</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="kicker">English Newsroom</div>
          <h1>Independent reporting for readers in Bangladesh and around the world.</h1>
          <hr className="rule" />
        </section>

        <section id="latest" aria-labelledby="latest-heading">
          <div className="kicker" id="latest-heading">Latest News</div>
          {dataError ? (
            <div className="empty">The English newsroom is configured, but its publishing database is not available yet.</div>
          ) : articles.length === 0 ? (
            <div className="empty">No English stories are published yet. The publication is ready for its first verified newsroom feed.</div>
          ) : (
            <div className="grid">
              {articles.map((article) => (
                <article className="card" key={article.id}>
                  <div className="kicker">{article.category ?? "News"}</div>
                  <h2>{article.title}</h2>
                  {article.excerpt ? <p>{article.excerpt}</p> : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Dainik Jahan English. Editorially independent from the Bengali edition.</div>
      </footer>
    </>
  );
}
