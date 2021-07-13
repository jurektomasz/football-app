import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { verifyGameHost } from "redux/actions";
import Spinner from "components/spinner/Spinner";

const withUserCheck = (Component) => (props) => {
  const [guard, setGuard] = useState({ canProceed: false, isChecking: true });
  const { _id } = props.match.params;

  useEffect(() => {
    verifyGameHost(_id)
      .then(() => setGuard({ canProceed: true, isChecking: false }))
      .catch(() => setGuard({ canProceed: false, isChecking: false }));
  }, [_id]);

  const { canProceed, isChecking } = guard;

  if (!isChecking && canProceed) {
    return <Component {...props} />;
  } else if (!isChecking && !canProceed) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <Spinner />;
  }
};

export default withUserCheck;
