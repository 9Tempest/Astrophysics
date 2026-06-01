import { Suspense, useEffect, useMemo, useState } from "react";
import { AppShell } from "./components";
import { appRegistry, getAppBySlug } from "./appRegistry";

function readSlugFromHash(): string {
  return window.location.hash.replace(/^#\/?/, "") || appRegistry[0].slug;
}

export function App(): JSX.Element {
  const [selectedSlug, setSelectedSlug] = useState(readSlugFromHash);

  useEffect(() => {
    function handleHashChange(): void {
      setSelectedSlug(readSlugFromHash());
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const selectedApp = useMemo(
    () => getAppBySlug(selectedSlug) ?? appRegistry[0],
    [selectedSlug]
  );
  const SelectedComponent = selectedApp.component;

  function handleSelectApp(slug: string): void {
    window.location.hash = `/${slug}`;
    setSelectedSlug(slug);
  }

  return (
    <AppShell
      apps={appRegistry}
      selectedSlug={selectedApp.slug}
      onSelectApp={handleSelectApp}
    >
      <Suspense fallback={<div className="panel loading-panel">Loading app...</div>}>
        <SelectedComponent />
      </Suspense>
    </AppShell>
  );
}
