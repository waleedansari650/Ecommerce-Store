import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const activateAccount = async () => {
      try {
        if (!activation_token) {
          setError(true);
          setMessage("Activation token is missing.");
          return;
        }
        const response = await axios.post(`${server}/activation/${encodeURIComponent(activation_token)}`);
        if(response.data.success){
         let modifyMessage =  capitalizeFirstLetter(response.data.user.name);
            setMessage(`${modifyMessage} Register Successfuly...!`);
        }
      } catch (error) {
        setError(true);
        setMessage("An error occurred while activating your account.");
      }
    };

    activateAccount();
  }, []);
  function capitalizeFirstLetter(string){
    if(string.length === 0){
      return ""
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? <p>{message}</p> : <p> <b>{message}</b></p>}
    </div>
  );
};

export default ActivationPage;
