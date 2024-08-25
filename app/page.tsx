import PetCard from "./components/PetCard";

const urlDog = "https://api.thedogapi.com/v1/images/search?limit=20";
const urlCat = "https://api.thecatapi.com/v1/images/search?limit=20";

export const dogKey =
  "live_rnTY11HZc9MyC3e7J3NgVGUahCmv8WJJE0sLcQlvLvLZKG51poMY9FVuRsL2ezwX";
export const catKey =
  "live_qYr9FjpMAb31JbDcE2Qp1KK3gBWcu5ZOxCSGe4ynQN2SvY4Ha8LFYxaBWOIxc0uP";

async function getDogs() {
  const res = await fetch(urlDog, {
    method: "GET",
    headers: {
      "x-api-key": dogKey,
    },
  });
  return res.json();
}

async function getCats() {
  const res = await fetch(urlCat, {
    method: "GET",
    headers: {
      "x-api-key": catKey,
    },
  });
  return res.json();
}

const Page: React.FC = async () => {
  const dogsData = getDogs();
  const catsData = getCats();

  const [dogs, cats] = await Promise.all([dogsData, catsData]);

  return (
    <>
      <div className="p-8 flex justify-center flex-wrap">
        {dogs && dogs.map((dog: any) => <PetCard key={dog.id} pet={dog} />)}
        {cats && cats.map((cat: any) => <PetCard key={cat.id} pet={cat} />)}
      </div>
    </>
  );
};
export default Page;
