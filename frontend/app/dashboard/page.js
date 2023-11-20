"use client";

import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tab1");

  const content = {
    tab1: <p>Contenu de l'onglet 1</p>,
    tab2: <p>Contenu de l'onglet 2</p>,
    tab3: <p>Contenu de l'onglet 3</p>,
  };
  return (
    <>
      <main className="flex min-h-screen justify-center p-[60px]">
        <div className="flex w-full gap-20 max-w-[1440px]">
          <div className="flex flex-col w-3/12 bg-gray-900 rounded-[32px] h-[80vh] p-5 gap-8">
            <div className="flex w-full justify-center">
              <h1 className="text-[32px] font-serif font-bold">Make a Task</h1>
            </div>
            <div className="flex flex-col h-full align-center justify-start">
              <button onClick={() => setActiveTab("tab1")}>Dashboard</button>
              <button onClick={() => setActiveTab("tab2")}>Notes</button>
              <button onClick={() => setActiveTab("tab3")}>Paramètres</button>
            </div>
          </div>
          <div className="w-9/12">{content[activeTab]}</div>
        </div>
      </main>
    </>
  );
}
