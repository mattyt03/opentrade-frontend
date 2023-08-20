import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/pro-solid-svg-icons";
import { ReactComponent as Logo } from "../../assets/opentrade_logo_white.svg";
import { Ring } from "@uiball/loaders";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { CanceledError } from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/card";
import institution_data from "../../data/institutions";
import styles from "./Login.module.css";
import globalStyles from "../../Styles.module.css";

// add zod
// refactor axios requests
// add error handling
// add abort controller

const Login = () => {
  const { id } = useParams();
  // getting the query params takes an extra step
  // use local storage instead?
  const [loading, setLoading] = useState(false);
  const [displayMFA, setDisplayMFA] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const institution = searchParams.get("institution");
  const institution_logo = institution_data[institution]["logo"];
  const institution_name = institution_data[institution]["name"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // e.preventDefault();
    // console.log(data);
    setLoading(true);

    const formData = new FormData();
    formData.append("email", data.username);
    formData.append("password", data.password);

    if (displayMFA === false) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/link_portals/${id}/login`,
          formData
        )
        .then(({ data }) => {
          setDisplayMFA(true);
          setDeviceToken(data["device_token"]);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      formData.append("mfa_code", data.mfaCode);
      formData.append("device_token", deviceToken);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/link_portals/${id}/mfa`,
          formData
        )
        .then(() => {
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
      <form
        className={globalStyles.container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={[globalStyles.logoContainer, styles.logoContainer].join(
            " "
          )}
        >
          <Logo className={globalStyles.logo} />
          <FontAwesomeIcon
            className={globalStyles.arrows}
            icon={faArrowsLeftRight}
          />
          <img className={globalStyles.logo} src={institution_logo} alt="" />
        </div>
        <h1 className={[globalStyles.h1, styles.h1].join(" ")}>
          Log in to {institution_name}
        </h1>
        <p className={styles.text}>
          By providing your credentials, you're enabling Opentrade to retrieve
          your investment data.
        </p>
        <input
          {...register("username")}
          type="text"
          id="username"
          placeholder="Username"
          className={styles.inputField}
          // name?
        />
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Password"
          className={styles.inputField}
        />
        {displayMFA && (
          <input
            {...register("mfaCode")}
            type="text"
            id="mfaCode"
            placeholder="MFA Code"
            className={styles.inputField}
          />
        )}
        <button
          className={globalStyles.button}
          disabled={loading}
          type="submit"
        >
          {loading ? <Ring size={32} color="white" /> : "Submit"}
        </button>
        <a href="#" className={styles.footer}>
          Forgot your password?
        </a>
      </form>
    </Card>
  );
};

export default Login;
