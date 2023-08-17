import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/opentrade.svg";
import styles from "./Card.module.css";

const Card = ({ children }) => {
  const navigate = useNavigate();

  return (
    // TODO: make index.css a module
    <div className="card">
      <nav className={styles.navbar}>
        <button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} />
        </button>
        <Logo className={styles.logo} />
        <button className={styles.iconContainer}>
          <FontAwesomeIcon className={styles.icon} icon={faXmark} />
        </button>
      </nav>
      {children}
    </div>
  );
};

export default Card;