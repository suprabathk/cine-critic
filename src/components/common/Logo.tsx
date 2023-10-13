import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import commonStyles from "@/styles/common.module.css";

const space_Grotesk = Space_Grotesk({ subsets: ["latin"] });

const Logo = () => {
  return (
    <Link
      href="/"
      className={`${commonStyles.logoText} ${space_Grotesk.className}`}
    >
      CineCritic
    </Link>
  );
};

export default Logo;
