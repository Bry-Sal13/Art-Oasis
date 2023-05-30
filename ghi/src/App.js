import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
