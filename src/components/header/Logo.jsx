import { Link } from "react-router-dom";
import logoImage from "../../assets/logo_v1.png";

function Logo({ small }) {
  return (
    <Link to="/">
      <img
        src={logoImage}
        alt="LogoImage"
        className={`${small ? "w-[80px]" : "w-[100px]"}`}
      />
    </Link>
  );
}

export default Logo;
