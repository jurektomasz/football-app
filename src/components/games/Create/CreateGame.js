import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createGame } from "redux/actions";
import CreateGameForm from "components/forms/CreateGameForm";
import ApiErrors from "components/forms/ApiErrors";

const CreateGame = () => {
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const newGameCreate = (newGameData) => {
    createGame(newGameData)
      .then(() => setShouldRedirect(true))
      .catch((errors) => setErrors(errors));
  };

  return shouldRedirect ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <>
      <div className="row">
        <div className="col-lg-7 mx-auto mt-5">
          <h1 className="heading--primary">Create new Game</h1>
          <CreateGameForm onSubmit={newGameCreate} />
          <ApiErrors errors={errors} />
        </div>
      </div>
    </>
  );
};

export default CreateGame;
