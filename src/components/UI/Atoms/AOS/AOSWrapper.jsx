import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AOSWrapper({ children }) {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 700,
    });
  }, []);

  return <>{children}</>;
}
