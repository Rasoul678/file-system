import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FileSystem } from "./utils/fileSystem";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const fs = new FileSystem();

export const FileSystemContext = createContext<FileSystem>(fs);

root.render(
  <React.StrictMode>
    <FileSystemContext.Provider value={fs}>
      <App />
    </FileSystemContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
