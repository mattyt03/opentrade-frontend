import { useSearchParams, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import { useEffect } from "react";
import { Ring } from "@uiball/loaders";
import styles from "./Linking.module.css";
import globalStyles from "../../Styles.module.css";
import axios, { CanceledError } from "axios";

const Linking = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const lp_id = localStorage.getItem("lp_id");
    const institution = localStorage.getItem("lp_institution");

    let code = searchParams.get("code");
    // code was automatically decoded, so we need to re-encode it
    code = encodeURIComponent(code);

    const return_url = `${
      import.meta.env.VITE_API_URL
    }/link_portals/${lp_id}/return/?institution=${institution}&code=${code}`;

    const controller = new AbortController();
    axios
      .get(return_url, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        // console.log(data);
        navigate(`/link_portals/success/`);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          navigate(`/link_portals/${id}/already_linked/`);
        }
      });

    return () => controller.abort();
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
