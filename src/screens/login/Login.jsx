import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/pro-solid-svg-icons";
import { ReactComponent as Logo } from "../../assets/opentrade_logo_white.svg";
import { Ring } from "@uiball/loaders";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { CanceledError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/card";
import institution_data from "../../data/institutions";
import styles from "./Login.module.css";
import globalStyles from "../../Styles.module.css";

// refactor axios requests
// make a custom hook for login
// add error handling (invalid credentials, bad conflict, internal server error)

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Please provide an email." })
    .email({ message: "Email is invalid." }),
  password: z.string().nonempty({ message: "Please provide a password." }),
  mfaCode: z
    .string()
    .length(6, { message: "MFA Code must be a 6-digit number." })
    .optional(),
});

const Login = () => {
  const { id } = useParams();
  // getting the query params takes an extra step
  // add to local storage?
  const [invalidSubmission, setInvalidSubmission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayMFA, setDisplayMFA] = useState(false);
  // add to local storage?
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
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    // e.preventDefault();
    // console.log(data);
    setLoading(true);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (displayMFA === false) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/link_portals/${id}/login?institution=${institution}`,
          formData
        )
        .then(({ data }) => {
          setDisplayMFA(true);
          setDeviceToken(data.device_token);
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
          `${import.meta.env.VITE_API_URL}/link_portals/${id}/mfa?institution=${institution}`,
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
    setInvalidSubmission(false);
  };

  return (
    <Card>
      <form
        className={globalStyles.container}
        onSubmit={handleSubmit(onSubmit, () => setInvalidSubmission(true))}
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
        <p className={[globalStyles.text, styles.text].join(" ")}>
          By providing your credentials, you're enabling Opentrade to retrieve
          your investment data.
        </p>
        <input
          {...register("email")}
          type="text"
          id="email"
          placeholder="Email"
          className={styles.inputField}
          // name?
        />
        {errors.email && invalidSubmission && (
          <p className={[globalStyles.text, styles.errorText].join(" ")}>{errors.email.message}</p>
        )}
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Password"
          className={styles.inputField}
        />
        {errors.password && invalidSubmission && (
          <p className={[globalStyles.text, styles.errorText].join(" ")}>{errors.password.message}</p>
        )}
        {displayMFA && (
          <input
            {...register("mfaCode")}
            type="text"
            id="mfaCode"
            placeholder="MFA Code"
            className={styles.inputField}
          />
        )}
        {errors.mfaCode && invalidSubmission && (
          <p className={[globalStyles.text, styles.errorText].join(" ")}>{errors.mfaCode.message}</p>
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
