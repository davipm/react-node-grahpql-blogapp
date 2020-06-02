import React from "react";
import { Container } from "semantic-ui-react";

import Routes from "./routes";
import MenuBar from "./components/MenuBar/MenuBar";

function App() {
  return (
    <div id="app">
      <Container>
        <MenuBar />
        <Routes />
      </Container>
    </div>
  );
}

export default App;
