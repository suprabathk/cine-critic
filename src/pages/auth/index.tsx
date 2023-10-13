import authStyles from "@/styles/auth.module.css";
import { Lexend_Deca } from "next/font/google";
import SignInForm from "@/components/auth/SignInForm";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/utils/auth-utils";
import { useRouter } from "next/router";

const lexend_Deca = Lexend_Deca({ subsets: ["latin"] });

const Signin = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    getAuthToken().then((data) => setAuthToken(data));
  }, []);

  return (
    <div className={authStyles.authDiv + " " + lexend_Deca.className}>
      <div className={authStyles.authInfo}>
        <span className={authStyles.featureBubble}>Movies, Shows and more</span>
        <h3 className={authStyles.featureTitle}>
          Delivering movie reviews around the globe.
        </h3>
        <p>Get the live reviews and latest news about Movies, Shows.</p>
      </div>
      <SignInForm authToken={authToken} router={router} />
    </div>
  );
};

export default Signin;
