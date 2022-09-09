import "./index.css";
import React from "react";
import Key from "./key.json";

interface BungieOAuthTokenResponse {
  acess_token: string;
  token_type: string;
  expires_in: number;
  membership_id: string;
}

class App extends React.Component {
  constructor(props: any) {
    super(props);
    if (localStorage.getItem(Key.oauthState) == null) {
      localStorage.setItem(Key.oauthState, crypto.randomUUID());
    }
  }

  async getAuthToken(
    responseCode: string
  ): Promise<BungieOAuthTokenResponse | string> {
    var ydob: { [name: string]: string } = {
      client_id: Key.clientId,
      grant_type: "authorization_code",
      code: responseCode,
    };

    var body = [];

    for (var prop in ydob) {
      var key = encodeURIComponent(prop);
      var value = encodeURIComponent(ydob[prop]);
      body.push(key + "=" + value);
    }

    var requestBody = body.join("&");

    console.log(requestBody);

    const reply = await fetch(
      "https://www.bungie.net/platform/app/oauth/token",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
          "X-API-Key": Key.key,
        }),
        body: requestBody,
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return "There was an error, most likely 400 server error. Jens did a retard moment.";
      }
    });

    return reply;
  }

  goToLink() {
    const state = crypto.randomUUID();
    localStorage.setItem(Key.oauthState, state);

    window.location.href =
      "https://www.bungie.net/en/oauth/authorize?client_id=" +
      Key.clientId +
      "&response_type=code&state=" +
      localStorage.getItem(Key.oauthState);
  }

  render() {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <button onClick={this.goToLink} type="button">
          Link
        </button>
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

          window.location.href = "";
        }
      }
    }
  }
}

export default App;
