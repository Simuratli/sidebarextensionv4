import React, { useState, useEffect } from "react";

const UserSearch = () => {
  const [updated, setupdated] = useState(false);

  useEffect(() => {
    setupdated(true);
    setTimeout(() => {
      setupdated(false);
    }, 2000);
  }, []);
  return (
    <div>UserSearch - {updated && "UPDATEDs"}</div>
  )
}

export default UserSearch