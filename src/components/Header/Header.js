import SubContainer from "./SubContainer/SubContainer";

import "./header.css";
const Header = ({theme }) => {
  const tableClassName = theme === "" || theme === "bg-dark" ? "dark" : "light";

  return (
    <>
<div className={`header-${tableClassName}`}>
  <SubContainer/>
</div>
    </>
  );
}

export default Header;
