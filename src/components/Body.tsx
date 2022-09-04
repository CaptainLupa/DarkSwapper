import key from "../key.json";
import React from "react";

enum BungieMembershipType {
  None = 0,
  Xbox = 1,
  PSN = 2,
  Steam = 3,
  Blizzard = 4,
  Stadia = 5,
  Epic = 6,
  Demon = 10,
  BungieNext = 254,
  All = -1,
}

class ExactUserRequest {
  displayName: string;
  displayNameCode: number;

  constructor(dn: string, dnc: number) {
    this.displayName = dn;
    this.displayNameCode = dnc;
  }
}

class Body extends React.Component {
  KeyHeader = new Headers({
    "X-API-Key": key.key,
  });

  AuthorizeURL = `https://www.bungie.net/en/Oauth/Authorize?client_id=${
    key.clientId
  }&response_type=code&state=${crypto.randomUUID().replaceAll("-", "")}/`;

  async getGjally() {}

  render() {
    return (
      <div className="flex flex-row items-center">
        <div className="flex flex-col justify-center">
          <button onClick={this.getGjally}>press muh</button>
          <a href={this.AuthorizeURL}>Authorize</a>
        </div>
      </div>
    );
  }
}

export default Body;
