import React, { useState, useEffect } from "react";

const User = () => {
  const [updated, setupdated] = useState(false);

  useEffect(() => {
    setupdated(true);
    setTimeout(() => {
      setupdated(false);
    }, 2000);
  }, []);

  return <div>User page - {updated && "updated"}</div>;
};

export default User;
