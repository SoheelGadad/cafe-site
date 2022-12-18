import React, { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Book from "./components/book";
import ThankYou from "./components/thankYou";

import Login from "./components/pages/login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/userdashbord/Dashboard";

export default (_) => {
  const [page, setPage] = useState(0);

  return (
    //In is we have created page for site
    <div>
      <Navbar setPage={setPage} />
      {page === 0 ? <Home setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 2 ? <ThankYou /> : null}
      {page === 3 ? <Login setPage={setPage} /> : null}
      {page === 4 ? <Register setPage={setPage} /> : null}
      {page === 5 ? <Dashboard setPage={setPage} /> : null}
    </div>
  );
};
