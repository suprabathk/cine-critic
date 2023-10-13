import Link from "next/link";
import commonStyles from "@/styles/common.module.css";

const Logo = () => {
  return (
    <Link href="/" className={commonStyles.logoText}>
      CineCritic
    </Link>
  );
};

export default Logo;
