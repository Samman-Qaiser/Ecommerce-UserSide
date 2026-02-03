import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // smooth mat rakhna (UX issue hota hai)
    });
  }, [pathname]);

  return null;
};

export default ScrollToTopOnRouteChange;
