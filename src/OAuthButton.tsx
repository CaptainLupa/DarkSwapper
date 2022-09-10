import Key from "./key.json";

import React from "react";

import "./BungieTypes.d.ts";

class OAuthButton extends React.Component {
  render() {
    return (
      <a
        rel="noopener noreferrer"
        //target="_blank"
        href={
          Key.bungieNetBase +
          "/en/oauth/authorize?client_id=" +
          Key.clientId +
          "&response_type=code&state=" +
          localStorage.getItem(Key.oauthState)
        }
      >
        Sign In!
      </a>
    );
  }

  async getToken(responseCode: string): Promise<BungieTokenResponse | string> {
    let ydob: { [name: string]: string } = {
      client_id: Key.clientId,
      grant_type: "authorization_code",
      code: responseCode,
    };

    let body = [];

    for (var prop in ydob) {
      let key = encodeURIComponent(prop);
      let value = encodeURIComponent(ydob[prop]);
      body.push(key + "=" + value);
    }

    const requestBody = body.join("&");

    const reply = await fetch(Key.bungieNetBase + "platform/app/oauth/token/", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "X-API-Key": Key.key,
      }),
      body: requestBody,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return "Error retreiving token!";
      }
    });

    return reply;
  }

  async componentDidMount() {
    if (
      window.location.href.includes("?code=") &&
      window.location.href.includes("&state=")
    ) {
      var params = window.location.href.split("?")[1].split("=");

      var code = params[1].split("&")[0];
      var state = params[2];

      if (state !== localStorage.getItem(Key.oauthState)) {
        // Route to state error page at some point
      } else {
        const response = await this.getToken(code);

        if (typeof response === "string") {
          console.warn(response);
        } else {
          localStorage.setItem(Key.tokenResponseKey, JSON.stringify(response));
        }
      }
    }
  }
}

export default OAuthButton;
