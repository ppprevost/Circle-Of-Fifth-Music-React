import { React } from "./adapters/react";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { DarkModeButton } from "./components/ui/DarkModeButton";
import { CircleOfFifths } from "./components/CircleOfFifths";

const App: React.FC = () => (
  <ThemeProvider>
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        position: "relative"
      }}
    >
      <DarkModeButton />
      <h1 style={{ marginBottom: 0, fontWeight: 700, fontSize: 32, color: "#222" }}>
        Circle of Fifths Playground
      </h1>
      <CircleOfFifths />
    </div>
  </ThemeProvider>
);

export default App;
