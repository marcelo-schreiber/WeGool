import { useState, useEffect, useCallback } from "react";

const useInnerDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    // remember function to prevent re-render and thus, not removing the eventListener
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    handleResize();
    // mounted
    window.addEventListener("resize", handleResize);

    return () => {
      // unmounted
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
};

export default useInnerDimensions;
