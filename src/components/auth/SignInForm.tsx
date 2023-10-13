import { withFormik, FormikProps } from "formik";
import authStyles from "@/styles/auth.module.css";
import { Space_Grotesk } from "next/font/google";
import * as Yup from "yup";
import Link from "next/link";
import { signIn } from "@/utils/auth-utils";
import { NextRouter } from "next/router";

const space_Grotesk = Space_Grotesk({ subsets: ["latin"] });

interface FormValues {
  username: string;
  password: string;
}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  authToken: string;
  router: NextRouter;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <form className={authStyles.authForm} onSubmit={handleSubmit}>
      <h2 className={`${space_Grotesk.className} ${authStyles.authHeading}`}>
        Welcome back to <br />
        <Link href="/" className={authStyles.logoText}>
          CineCritic
        </Link>
      </h2>
      <p className={authStyles.authDescription}>Sign in to your account.</p>
      <div className={authStyles.formInput}>
        <label htmlFor="username" className={authStyles.formLabel}>
          Username
        </label>
        <span className={authStyles.formErrorMessage}>
          {errors.username && touched.username && errors.username}
        </span>
        <input
          type="text"
          id="username"
          name="username"
          className={authStyles.formTextInput}
          placeholder="JohnDoe"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
      </div>
      <div className={authStyles.formInput}>
        <label htmlFor="password" className={authStyles.formLabel}>
          Password
        </label>
        <span className={authStyles.formErrorMessage}>
          {errors.password && touched.password && errors.password}
        </span>

        <span className={authStyles.formErrorMessage}></span>
        <input
          type="password"
          id="password"
          name="password"
          className={authStyles.formTextInput}
          placeholder="•••••••••"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
      </div>
      <button
        className={authStyles.formSubmitButton}
        type="submit"
        disabled={
          isSubmitting ||
          !!(errors.username && touched.username) ||
          !!(errors.password && touched.password)
        }
      >
        Sign in
      </button>
    </form>
  );
};

const SignInForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: () => ({ username: "", password: "" }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),

  async handleSubmit(
    { username, password }: FormValues,
    { props, setSubmitting, setErrors }
  ) {
    setSubmitting(true);
    const data = await signIn({
      username: username,
      password: password,
      request_token: props.authToken,
    });

    data.data.success
      ? (() => {
          localStorage.setItem("authToken", props.authToken);
          props.router.push("/");
        })()
      : setErrors({ username: "Invalid credentials" });
    setSubmitting(false);
  },
})(InnerForm);

export default SignInForm;
