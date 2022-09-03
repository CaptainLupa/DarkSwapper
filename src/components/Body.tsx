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
  var headers = new Headers();
  headers.append("X-API-Key", key.key);

  let f = new FormData();

  f.append("displayName", "Disgust.jpg");
  f.append("displayNameCode", "8035");

  let r = new Request(
    "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1",
    {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        displayName: "Disgust.jpg",
        displayNameCode: 8035,
      }),
      redirect: "follow",
    }
  );

  const respo = await fetch(r).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP Error!: Status: ${response.status}`);
    }

    console.log(JSON.stringify(response.json()));
  });

  console.log(JSON.stringify(respo));
}

const Body = () => (
  <div className="flex flex-row items-center">
    <div className="flex flex-col justify-center">
      <button onClick={getGjally}>press muh</button>
    </div>
  </div>
);

export default Body;
