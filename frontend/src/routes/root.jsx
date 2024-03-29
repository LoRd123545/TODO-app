export default function Root() {
  return (
    <>
      <div className="container">
        {/* main header */}
        <h2 className="heading">
          Zorganizuj swój dzień z łatwością:
          <br></br>
          Poznaj nową aplikację do zarządzania zadaniami!
        </h2>
        {/* page description */}
        <div className="panel">
          <p className="panel__paragraph">
            Zaplanuj, realizuj, osiągaj cele! Odkryj naszą nową aplikację do
            zarządzania zadaniami i spraw, aby każdy dzień był pełen sukcesów.
            Proste w użyciu, skuteczne narzędzie do organizacji codziennych
            obowiązków. Daj sobie szansę na efektywne osiąganie celów dzięki
            nowoczesnemu podejściu do planowania!
          </p>
          <br></br>
          {/* sign in button, not working yet */}
          <a className="button panel__button--sign-in" href="/auth">
            Zacznij już teraz!
          </a>
        </div>
        {/* background image */}
        <div className="box">
          <img
            src="../public/images/home-background.png"
            alt="deer next to a tree"
          ></img>
        </div>
        <h3 className="heading heading--secondary">
          Organizuj, Planuj, Realizuj
        </h3>
        <p className="paragraph">
          Czy czujesz się przytłoczony ilością obowiązków? Nasza aplikacja TODO
          pomaga Ci w prosty i skuteczny sposób zapanować nad codziennymi
          zadaniami. Niech nieprzemyślane zadania nie sprawiają Ci kłopotów -
          zacznij zarządzać nimi sprawnie!
        </p>
        {/* app functions */}
        <div className="panel--flex">
          {/* panel on the left */}
          <div className="panel__box--left panel__box--border-right">
            <h3 className="panel__heading">Funkcje Aplikacji:</h3>
            <ol>
              <li>
                <h4>Dodawanie Zadań</h4>
                <p className="panel_paragraph">
                  Prosta i intuicyjna funkcja dodawania zadań pozwala szybko
                  zarejestrować wszystko, co masz do zrobienia. Utwórz zadania w
                  kilku krokach.
                </p>
              </li>
              <li>
                <h4>Sortowanie</h4>
                <p className="panel_paragraph">
                  Sortuj swoje zadania, aby skupić się na najważniejszych
                  obowiązkach. Niech Twoje zadania będą posegregowane według
                  ważności!
                </p>
              </li>
              <li>
                <h4>Terminy</h4>
                <p className="panel_paragraph">
                  Ustawiaj terminy wykonania zadań, aby być zawsze na bieżąco.
                  Nie zapomnisz o ważnych terminach!
                </p>
              </li>
            </ol>
          </div>
          {/* image on the right */}
          <div className="panel__image">
            <img
              src="../public/images/home-checklist.png"
              width="350"
              height="350"
              alt="checklist"
            ></img>
          </div>
        </div>
        {/* quote on the bottom of the page */}
        <h3 className="heading__quote">
          ,,Najlepszym sposobem przewidzenia przyszłości jest stworzenie jej.
          Organizuj swoje zadania, planuj z determinacją, a realizacja stanie
          się Twoim codziennym zwyczajem."
        </h3>
        <h4 className="heading__quoteAuthor">– Peter Drucker</h4>
      </div>
    </>
  );
}
