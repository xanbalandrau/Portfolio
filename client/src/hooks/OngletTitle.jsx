import { useEffect } from "react";

const OngletTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Portfolio`;
  }, [title]);
};

export default OngletTitle;
