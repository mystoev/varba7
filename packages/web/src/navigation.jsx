import { useNavigate } from "react-router-dom";

export const useSharedNavigation = () => {
  const navigate = useNavigate();
  return {
    navigate: (pageName) => navigate("/" + pageName),
  };
};
