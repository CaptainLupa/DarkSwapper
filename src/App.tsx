import "./index.css";
import React from "react";
import Key from "./key.json";

import OAuthButton from "./OAuthButton";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    if (localStorage.getItem(Key.oauthState) == null) {
      localStorage.setItem(Key.oauthState, crypto.randomUUID());
    }
  }

  render() {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <OAuthButton />
      </div>
    );
  }

  async componentDidMount() {
    if (
      window.location.href.includes("?code=") &&
      window.location.href.includes("&state=")
    ) {
      var params = window.location.href.split("?")[1].split("=");

      console.log(params);

      var code = params[1].split("&")[0];
      var state = params[2];

      console.log(code);

      if (state !== localStorage.getItem(Key.oauthState)) {
        console.log("Invalid state value, you hacker");
      } else {
        const tokenResponse = await this.getAuthToken(code);

        console.log(tokenResponse);

        if (typeof tokenResponse === "string") {
          console.warn(tokenResponse);
        } else {
          // tokenResponse is a BungieOAuthTokenResponse object
          localStorage.setItem(
            Key.tokenResponseKey,
            JSON.stringify(tokenResponse)
          );

          localStorage.removeItem(Key.oauthState);

          // ALWAYS REDIRECT TO "/" IT WILL LOOK LIKE AN ERROR IF YOU DON'T BECAUSE YOUR CODE IS ASS
          // window.location.href = "/";
        }
      }
    }
  }
}

export default App;
