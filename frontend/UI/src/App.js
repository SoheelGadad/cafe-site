import React, { useState } from "react";

import Main from "./components/main";
import Book from "./components/book";
import ThankYou from "./components/thankYou";
import Navbar from "./components/navbar";
import Login from "./components/login";

export default (_) => {
  const [page, setPage] = useState(0);

  return (
    //In is we have created page for site
    <div>
      <Navbar setPage={setPage} />
      {page === 0 ? <Main setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 2 ? <ThankYou /> : null}
      {page === 3 ? <Login setPage={setPage} /> : null}
    </div>
  );
};
