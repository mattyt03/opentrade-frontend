import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// shield check is a premium icon
import { faXmark, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faShieldCheck,
  faArrowsLeftRight,
  faImage,
} from "@fortawesome/pro-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/opentrade_logo.svg";
import styles from "./Welcome.module.css";
import globalStyles from "../../Styles.module.css";

const Welcome = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // you dont need to set this every time it renders, just the first time
  // useEffect!
  // use session storage instead?
  localStorage.setItem("lp_id", id);

  return (
    <div className={globalStyles.card}>
      <nav className={styles.navbar}>
        <FontAwesomeIcon className={globalStyles.navbarIcon} icon={faXmark} />
      </nav>
      <div className={styles.container}>
        <div className={globalStyles.logoContainer}>
          <div className={styles.sampleLogoContainer}>
            <FontAwesomeIcon className={styles.sampleLogo} icon={faImage} />
          </div>
          <FontAwesomeIcon className={globalStyles.arrows} icon={faArrowsLeftRight} />
          <Logo className={styles.opentradeLogo} />
        </div>
        <h1 className={styles.header}>
          This application uses <b className={styles.focus}>opentrade</b> to
          connect to your trading account
        </h1>

        <div className={styles.checklistItem}>
          <FontAwesomeIcon className={styles.checklistIcon} icon={faLink} />
          <div className={styles.checklistBody}>
            <h2 className={styles.subheader}>Connect effortlessly</h2>
            <p>
              Opentrade lets you securely connect your trading accounts in
              seconds
            </p>
          </div>
        </div>

        <div className={styles.checklistItem}>
          <FontAwesomeIcon className={styles.checklistIcon} icon={faShieldCheck} />
          <div className={styles.checklistBody}>
            <h2 className={styles.subheader}>Your data belongs to you</h2>
            <p>
              Opentrade doesn't sell personal info, and will only use it with
              your permission
            </p>
          </div>
        </div>

        <button
          className={globalStyles.button}
          onClick={() => {
            navigate(`/link_portals/${id}/select_institution`);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Welcome;
