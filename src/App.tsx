import "./index.css";
import React from "react";
import Key from "./key.json";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    if (localStorage.getItem(Key.oauthState) == null) {
      localStorage.setItem(Key.oauthState, crypto.randomUUID());
    }
  }

  async getAuthToken(responseCode: string) {
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
      }
    });

    return reply;
  }

  render() {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <a
          href={
            "https://www.bungie.net/en/oauth/authorize?client_id=" +
            Key.clientId +
            "&response_type=code&state=" +
            localStorage.getItem(Key.oauthState)
          }
        >
          Link
        </a>
      </div>
    );
  }

  async componentDidMount() {
    if (window.location.href.includes("?code=")) {
      var params = window.location.href.split("?")[1].split("=");

      var code = params[1].split("&")[0];
      var state = params[2].split("&")[0];

      if (state !== localStorage.getItem(Key.oauthState)) {
        console.log("AAAAAAA");
      } else {
        const token = await this.getAuthToken(code);

        console.log(token);
      }
    }
  }
}

export default App;
