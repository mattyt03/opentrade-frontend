import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import styles from "./AlreadyLinked.module.css";
import globalStyles from "../../Styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/sharp-solid-svg-icons";

const AlreadyLinked = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Card>
      <div className={globalStyles.container}>
        <div className={styles.messageContainer}>
          <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
          <h1 className={[globalStyles.h1, styles.h1].join(" ")}>
            You have already linked this account.
          </h1>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={globalStyles.button}
            onClick={() => {
              navigate(`/link_portals/${id}/select_institution`);
            }}
          >
            Try a different account
          </button>
        </div>
      </div>
    </Card>
  );
};

export default AlreadyLinked;
