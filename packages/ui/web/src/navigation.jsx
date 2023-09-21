import { useNavigate } from "react-router-dom";

export const useGoTo = () => {
  const navigate = useNavigate();
  return {
    navigate: (pageName) => navigate("/" + pageName),
  };
};
