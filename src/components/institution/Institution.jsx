import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Institution.module.css";
import globalStyles from "../../Styles.module.css";

const Institution = ({ institution, lp_id }) => {
  const updateInstitution = () => {
    localStorage.setItem("lp_institution", institution.id);
  };

  const InstitutionLink = institution.redirect ? "a" : Link;
  // http://127.0.0.1:8000
  // https://opentrade.herokuapp.com
  const loginUrl = institution.redirect
    ? `https://opentrade.herokuapp.com/link_portals/${lp_id}/redirect?institution=${institution.id}`
    : `/link_portals/${lp_id}/login/?institution=${institution.id}`;

  return (
    <InstitutionLink
      onClick={updateInstitution}
      className={styles.container}
      to={loginUrl}
      href={loginUrl}
    >
      {/* Eventually switch to svg images */}
      <img src={institution.logo} alt="" className={[globalStyles.logo, styles.logo].join(' ')} />
      <div className={styles.body}>
        <h3 className={styles.name}>{institution.name}</h3>
        <p className={styles.link}>{institution.link}</p>
      </div>
      <div className={styles.chevronContainer}>
        <FontAwesomeIcon className={styles.chevron} icon={faChevronRight} />
      </div>
    </InstitutionLink>
  );
};

export default Institution;
