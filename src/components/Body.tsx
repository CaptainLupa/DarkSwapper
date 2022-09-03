import key from "../key.json";

class ExactUserRequest {
  displayName: string;
  displayNameCode: number;

  constructor(dn: string, dnc: number) {
    this.displayName = dn;
    this.displayNameCode = dnc;
  }
}

async function getGjally() {
  var header = new Headers({
    "X-API-Key": key.key,
  });

  const disgust = new ExactUserRequest("Disgust.jpg", 8035);
  var membershipId;

  const swag = await fetch(
    "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1/",
    {
      method: "POST",
      headers: header,
      redirect: "follow",
      body: JSON.stringify(disgust),
    }
  ).then((response) => {
    return response.json();
  });

  membershipId = swag.Response[0].membershipId;

  console.log(swag.Response);
  console.log(membershipId);
}

const Body = () => (
  <div className="flex flex-row items-center">
    <div className="flex flex-col justify-center">
      <button onClick={getGjally}>press muh</button>
    </div>
  </div>
);

export default Body;
