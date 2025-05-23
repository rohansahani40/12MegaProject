
// import React, {useEffect, useState} from 'react'
// import {useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'

// export default function Protected({children, authentication = true}) {

//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(true)
//     const authStatus = useSelector(state => state.auth.status)

//     useEffect(() => {
//         //TODO: make it more easy to understand

//         // if (authStatus ===true){
//         //     navigate("/")
//         // } else if (authStatus === false) {
//         //     navigate("/login")
//         // }
        
//         //let authValue = authStatus === true ? true : false

//         if(authentication && authStatus !== authentication){
//             navigate("/login")
//         } else if(!authentication && authStatus !== authentication){
//             navigate("/")
//         }
//         setLoader(false)
//     }, [authStatus, navigate, authentication])

//   return loader ? <h1>Loading...</h1> : <>{children}</>
// }

// chat gpt hai eske aage ;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    const shouldRedirect = authentication !== isAuthenticated;

    if (shouldRedirect) {
      navigate(authentication ? "/login" : "/");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, authentication, navigate]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

