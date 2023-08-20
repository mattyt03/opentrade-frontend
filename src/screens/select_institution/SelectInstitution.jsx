import { useParams } from "react-router";
import Institution from "../../components/institution";
import institution_data from "../../data/institutions";
import Card from "../../components/card";
import styles from "./SelectInstitution.module.css";
import globalStyles from "../../Styles.module.css";

const SelectInstitution = () => {
  // comment
  const { id: lp_id } = useParams();

  return (
    <Card>
      <h1 className={[globalStyles.h1, styles.h1].join(" ")}>
        Select your trading platform
      </h1>
      <ul className={styles.listContainer}>
        {Object.entries(institution_data).map(([id, institution]) => (
          <li>
            {/* Doesn't make sense to pass down lp_id to each component*/}
            <Institution institution={{ id, ...institution }} lp_id={lp_id} />
          </li>
        ))}
        <footer className={styles.footer}>
          <a href="#">Don't see your institution?</a>
        </footer>
      </ul>
    </Card>
  );
};

export default SelectInstitution;

// should you create a separate page for mfa?
// you're gonna have to create pages for every error (invalid credentials, invalid 2fa, you have already linked this account, etc)
