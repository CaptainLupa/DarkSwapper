import key from "../key.json";

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

async function getGjally() {
  const header = new Headers({
    "X-API-Key": key.key,
  });

  const disgust = new ExactUserRequest("Disgust.jpg", 8035);
  const useless = new ExactUserRequest("Useless.jpg", 6804);
  var membershipId;

  var swag = await fetch(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/${BungieMembershipType.All}/`,
    {
      method: "POST",
      headers: header,
      redirect: "follow",
      body: JSON.stringify(useless),
    }
  ).then((response) => {
    return response.json();
  });

  membershipId = swag.Response[0].membershipId;

  console.log(swag.Response);
  console.log(membershipId);

  swag = await fetch(
    `https://www.bungie.net/Platform/Destiny2/${BungieMembershipType.Xbox}/Profile/${membershipId}/?components=100`,
    {
      method: "GET",
      headers: header,
      redirect: "follow",
    }
  ).then((response) => {
    return response.json();
  });

  console.log(swag);
}

const Body = () => (
  <div className="flex flex-row items-center">
    <div className="flex flex-col justify-center">
      <button onClick={getGjally}>press muh</button>
    </div>
  </div>
);

export default Body;
