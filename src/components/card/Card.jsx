import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/opentrade.svg";
import styles from "./Card.module.css";
import globalStyles from "../../Styles.module.css";

const Card = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={globalStyles.card}>
      <nav className={styles.navbar}>
        <button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <FontAwesomeIcon className={globalStyles.navbarIcon} icon={faArrowLeft} />
        </button>
        <Logo className={styles.logo} />
        <button className={styles.iconContainer}>
          <FontAwesomeIcon className={globalStyles.navbarIcon} icon={faXmark} />
        </button>
      </nav>
      {children}
    </div>
  );
};

export default Card;
