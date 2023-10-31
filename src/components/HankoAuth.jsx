import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { register, Hanko } from "@teamhanko/hanko-elements";
import './hankoauth.css';

const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
export default function HankoAuth() {
  const navigate = useNavigate();
  const hanko = useMemo(() => new Hanko(hankoApi), []);

  const redirectAfterLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(
    () =>
      hanko.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      
    });
  }, []);

  return <hanko-auth />;
}
