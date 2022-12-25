import styles from "./styles.module.css";

import { UserContext } from "../../App";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch({ type: "USER", payload: false });
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Wellcome</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Home;
