import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AboutPage } from "../features/about/components/AboutPage";
import { ContactPage } from "../features/contact/components/ContactPage";
import { ExpertisePage } from "../features/expertise/components/ExpertisePage";
import { Footer } from "../features/footer/components/Footer";
import { HomePage } from "../features/hero/components/HomePage";
import { JourneyPage } from "../features/journey/components/JourneyPage";
import { Navbar } from "../features/navbar/components/Navbar";
import { ProjectsPage } from "../features/projects/components/ProjectsPage";
import { trackPageView } from "../services/analytics";
import type { PageKey } from "../shared/constants/portfolio";

const pageIds: PageKey[] = ["home", "about", "expertise", "projects", "journey", "contact"];

function getPageFromHash(): PageKey {
  const hash = window.location.hash.replace("#", "") as PageKey;
  return pageIds.includes(hash) ? hash : "home";
}

export function App() {
  const [page, setPage] = useState<PageKey>(getPageFromHash);

  useEffect(() => {
    const syncPage = () => {
      const newPage = getPageFromHash();
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      trackPageView(`/${newPage}`);
    };

    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  // Track initial page load
  useEffect(() => {
    trackPageView(`/${page}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar activePage={page} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {page === "home"      && <HomePage />}
            {page === "about"     && <AboutPage />}
            {page === "expertise" && <ExpertisePage />}
            {page === "projects"  && <ProjectsPage />}
            {page === "journey"   && <JourneyPage />}
            {page === "contact"   && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer activePage={page} />
    </>
  );
}
