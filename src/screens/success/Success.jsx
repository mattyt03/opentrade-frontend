import Card from "../../components/card";
import { Checkmark } from "react-checkmark";

const Success = () => {
  return (
    <Card>
      <div className="success">
        {/* putting the checkmark in a div fucks things up */}
        {/* make the color a global variable */}
        <Checkmark size="xLarge" color="#6936F5" />
        <h1 className="success__h1">Success!</h1>
        <p className="success-message">
          Your account has been successfully linked to this application.
        </p>
      </div>
    </Card>
  );
};

export default Success;
