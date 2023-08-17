import { useSearchParams, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import { Ring } from "@uiball/loaders";

const Linking = () => {
  const navigate = useNavigate();
  //   this should be part of a useEffect hook
  const lp_id = localStorage.getItem("lp_id");
  const institution = localStorage.getItem("lp_institution");
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams.get("code");
  // code was automatically decoded, so we need to re-encode it
  code = encodeURIComponent(code);

  const return_url = `http://127.0.0.1:8000/link_portals/${lp_id}/return/?institution=${institution}&code=${code}`;

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

  return (
    <Card>
      <div className="linking">
        <div className="loader">
          <Ring size={72} color="#6936F5" />
        </div>
        <h1 className="success__h1">Linking Account...</h1>
      </div>
    </Card>
  );
};

export default Linking;
