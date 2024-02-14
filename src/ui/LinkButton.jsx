import { Link, useNavigate } from "react-router-dom";

function LinkButton({ to, children }) {
  const navigate = useNavigate();
  const btnStyles = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={btnStyles}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={btnStyles}>
      {children}
    </Link>
  );
}

export default LinkButton;
