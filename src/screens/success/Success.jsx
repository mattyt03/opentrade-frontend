import Card from "../../components/card";
import { Checkmark } from "react-checkmark";
import styles from "./Success.module.css";
import globalStyles from "../../Styles.module.css";

const Success = () => {
  return (
    <Card>
      <div className={styles.container}>
        {/* putting the checkmark in a div fucks things up */}
        {/* make the color a global variable */}
        <Checkmark size="xLarge" color="#6936F5"/>
        <h1 className={globalStyles.h1}>Success!</h1>
        <p className={styles.text}>
          Your account has been successfully linked to this application.
        </p>
      </div>
    </Card>
  );
};

export default Success;
