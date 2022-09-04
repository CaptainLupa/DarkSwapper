import "./index.css";
import React, { useCallback, useState } from "react";

interface OauthProps {
  authUrl: string;
  clientId: number;
  redirectUrl: string;
}

const useOauth2 = (props: OauthProps) => {
  const { authUrl, clientId, redirectUrl } = props;

  const [{ loading, error }, setUI] = useState({ loading: false, error: null });

  const getAuth = useCallback(() => {
    setUI({
      loading: true,
      error: null,
    });
  }, []);
};

class App extends React.Component {
  render() {
    return (
      <div className=" flex flex-row justify-center items-center min-h-screen"></div>
    );
  }
}

export default App;
