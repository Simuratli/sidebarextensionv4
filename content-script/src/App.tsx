/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import React, { useState } from "react";
import { DoubleNextIcon, CloseIconBigger, LogoIcon } from "./assets";
import { useStore } from "./store";
import { usePaging } from "./hooks/usePaging";
import { Loader } from "./components";

function App() {
  const { setSidebarOpen, sidebarOpen, loading } = useStore();
  const { CurrentPage, updated } = usePaging();

  return (
    <div id="udsextension" className={`${sidebarOpen && "open"}`}>
      <button
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
        className={`linkedinSidePanelOpenClose`}
      >
        <span>
          <DoubleNextIcon />
        </span>
      </button>
      <div id="linkedin-side-panel" className="linkedinSidePanel main">
        {updated && (
          <>
            <div className="closeIconLinkedin">
              <span
                onClick={() => {
                  setSidebarOpen(false);
                }}
              >
                <CloseIconBigger />
              </span>
            </div>
            {CurrentPage()}
            {loading && <Loader />}
            <div className="main__footer">
              <LogoIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
