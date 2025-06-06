
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/context";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const {loading, isAuthenticated} = UrlState();
  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [loading, isAuthenticated]);

  
  if (isAuthenticated) return children;

}

export default RequireAuth;