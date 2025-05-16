//container banaye , protected conatainer
//yaha pr authemtication ki check ho rhi hai ki user login hai ya nahi

import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //todo make it more easy
    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }
    if (authentication && authStatus !== authentication) {
      setLoading(false);
      navigate("/login");
    } else if (!authentication && authStatus === authentication) {
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [authStatus, navigate, authentication]);

  return setLoading ? (
    <>
      <h2>loading....</h2>
    </>
  ) : (
    <>{children}</>
  );
}
