import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/pro-solid-svg-icons";
import Card from "../../components/card";
import institution_data from "../../data/institutions";
import { ReactComponent as Logo } from "../../assets/opentrade_logo_white.svg";
import { Ring } from "@uiball/loaders";
import styles from "./Login.module.css";
import globalStyles from "../../Styles.module.css";

const Login = () => {
  const { id } = useParams();
  // getting the query params takes an extra step
  // use local storage instead?
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayMFAInput, setDisplayMFAInput] = useState(false);
  const [MFACode, setMFACode] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const institution = searchParams.get("institution");
  const institution_logo = institution_data[institution]["logo"];
  const institution_name = institution_data[institution]["name"];

  const handleSubmit = (e) => {
    // they removed the prevent default and added a finally
    // TODO: what does prevent default do again?
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (displayMFAInput === false) {
      // don't hardcode urls!!

      fetch(`${import.meta.env.VITE_API_URL}/link_portals/${id}/login`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          // console.log(res);
          // res.json() is also async (returns a promise object)
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          // the backend should be handling all the errors
          // what if the response has detail but it isn't an error?
          if ("detail" in data) {
            throw Error(data["error"]);
          }
          setLoading(false);
          setDisplayMFAInput(true);
          setDeviceToken(data["device_token"]);
        })
        .catch((err) => {
          // for now just do a console.log
          console.log(err.message);
          setLoading(false);
        });
      // add .catch()
    } else {
      formData.append("mfa_code", MFACode);
      formData.append("device_token", deviceToken);
      fetch(`${import.meta.env.VITE_API_URL}/link_portals/${id}/mfa`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          // console.log(res);
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          if ("detail" in data) {
            throw Error(data["error"]);
          }
          navigate(`/link_portals/success/`);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    }
  };

  return (
    <Card>
      <form action="" className={globalStyles.container}>
        <div className={[globalStyles.logoContainer, styles.logoContainer].join(' ')}>
          <Logo className={globalStyles.logo} />
          <FontAwesomeIcon className={globalStyles.arrows} icon={faArrowsLeftRight} />
          <img className={globalStyles.logo} src={institution_logo} alt="" />
        </div>
        <h1 className={[globalStyles.h1, styles.h1].join(' ')}>Log in to {institution_name}</h1>
        <p class={styles.text}>
          By providing your credentials, you're enabling Opentrade to retrieve
          your investment data.
        </p>
        <input
          className={styles.inputField}
          required
          type="email"
          id="email"
          placeholder="Username"
          // name?
          value={email}
          // review onChange
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.inputField}
          required
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {displayMFAInput && (
          <input
            className={styles.inputField}
            required
            type="text"
            id="smsCode"
            placeholder="SMS Code"
            value={MFACode}
            onChange={(e) => setMFACode(e.target.value)}
          />
        )}
        <button className={globalStyles.button} disabled={loading} onClick={handleSubmit}>
          {loading ? <Ring size={32} color="white" /> : "Submit"}
        </button>
        <a href="#" class={styles.footer}>
          Forgot your password?
        </a>
      </form>
    </Card>
  );
};

export default Login;
