import { useParams } from "react-router";
import Institution from "../../components/institution";
import institution_data from "../../data/institutions";
import Card from "../../components/card";

const SelectInstitution = () => {
  const { id: lp_id } = useParams();
  const institutionItems = Object.entries(institution_data).map(
    ([id, institution]) => (
      <li>
        <Institution institution={{ id, ...institution }} lp_id={lp_id} />
      </li>
    )
  );

  return (
    <Card>
      <h1 className="select_institution__h1">Select your trading platform</h1>
      <ul className="institutions">
        {institutionItems}
        <footer className="footer">
          <a href="#">Don't see your institution?</a>
        </footer>
      </ul>
    </Card>
  );
};

export default SelectInstitution;

// should you create a separate page for mfa?
// you're gonna have to create pages for every error (invalid credentials, invalid 2fa, you have already linked this account, etc)
