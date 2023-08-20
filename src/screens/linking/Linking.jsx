import { useSearchParams, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import { Ring } from "@uiball/loaders";
import styles from "./Linking.module.css";
import globalStyles from "../../Styles.module.css";

const Linking = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lp_id = localStorage.getItem("lp_id");
    const institution = localStorage.getItem("lp_institution");
    const [searchParams, setSearchParams] = useSearchParams();
    let code = searchParams.get("code");
    // code was automatically decoded, so we need to re-encode it
    code = encodeURIComponent(code);

    const return_url = `https://opentrade.herokuapp.com/link_portals/${lp_id}/return/?institution=${institution}&code=${code}`;

    fetch(return_url, {
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if ("detail" in data) {
          throw Error(data["error"]);
        }
        // console.log(data);
        navigate(`/link_portals/success/`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Card>
      <div className={globalStyles.container}>
        <div>
          <Ring size={72} color="#6936F5" />
        </div>
        <h1 className={[globalStyles.h1, styles.h1].join(" ")}>
          Linking Account...
        </h1>
      </div>
    </Card>
  );
};

export default Linking;
