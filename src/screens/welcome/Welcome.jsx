import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// shield check is a premium icon
import { faXmark, faLink } from "@fortawesome/pro-solid-svg-icons";
import {
  faShieldCheck,
  faArrowsLeftRight,
  faImage,
} from "@fortawesome/pro-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/opentrade_logo.svg";
import styles from "./Welcome.module.css";
import globalStyles from "../../Styles.module.css";
import cardStyles from "../../components/card/Card.module.css"

const Welcome = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // you dont need to set this every time it renders, just the first time
  // useEffect!
  // use session storage instead?
  localStorage.setItem("lp_id", id);

  return (
    <div className={cardStyles.container}>
      <nav className={[cardStyles.navbar, styles.navbar].join(' ')}>
        <FontAwesomeIcon className={cardStyles.icon} icon={faXmark} />
      </nav>
      <div className={globalStyles.container}>
        <div className={[globalStyles.logoContainer, styles.logoContainer].join(' ')}>
          <div className={[globalStyles.logo, styles.sampleLogo].join(' ')}>
            <FontAwesomeIcon className={styles.sampleLogoImage} icon={faImage} />
          </div>
          <FontAwesomeIcon className={globalStyles.arrows} icon={faArrowsLeftRight} />
          <Logo className={globalStyles.logo} />
        </div>
        <h1 className={styles.h1}>
          This application uses <b className={styles.highlight}>opentrade</b> to
          connect to your trading account
        </h1>

        <div className={styles.checklistItem}>
          <FontAwesomeIcon className={styles.checklistIcon} icon={faLink} />
          <div className={styles.checklistBody}>
            <h2 className={styles.h2}>Connect effortlessly</h2>
            <p>
              Opentrade lets you securely connect your trading accounts in
              seconds
            </p>
          </div>
        </div>

        <div className={styles.checklistItem}>
          <FontAwesomeIcon className={styles.checklistIcon} icon={faShieldCheck} />
          <div className={styles.checklistBody}>
            <h2 className={styles.h2}>Your data belongs to you</h2>
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
