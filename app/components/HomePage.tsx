"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Breed {
  name?: string;
  bred_for?: string;
  [key: string]: any;
}

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
}

interface Dog {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
}

const HomePage: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // console.log("dogs", dogs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(
            "https://api.thedogapi.com/v1/images/search?limit=20&api_key=live_rnTY11HZc9MyC3e7J3NgVGUahCmv8WJJE0sLcQlvLvLZKG51poMY9FVuRsL2ezwX"
          ),
          fetch(
            "https://api.thecatapi.com/v1/images/search?limit=20&api_key=live_qYr9FjpMAb31JbDcE2Qp1KK3gBWcu5ZOxCSGe4ynQN2SvY4Ha8LFYxaBWOIxc0uP"
          ),
        ]);

        if (!response1.ok || !response2.ok) {
          throw new Error("One or more requests failed");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();

        const filteredData1 = data1.filter((obj: any) => obj.breeds.length > 0);
        const filteredData2 = data2.filter((obj: any) => obj.breeds.length > 0);

        setDogs(filteredData1);
        setCats(filteredData2);
        localStorage.setItem(
          "pets",
          JSON.stringify([...filteredData1, ...filteredData2])
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="">
      <div className="p-5 flex justify-around">
        <div className="  p-4">
          <p className="text-center uppercase">Cats</p>
          <ul className="flex flex-col">
            {cats.map(({ id, url, breeds }) => (
              <li
                key={url}
                className="m-4 p-4 w-96 border rounded hover:bg-gray-100"
              >
                <Link href={`/${id}`}>
                  {breeds &&
                    breeds.length > 0 &&
                    breeds.map((obj, i) => (
                      <p
                        className="uppercase text-center"
                        key={`${obj.name}+${i}`}
                      >
                        {obj.name}
                      </p>
                    ))}
                  <img src={url} alt="photo" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="  p-4">
          <p className="text-center uppercase">Dogs</p>
          <ul className="flex flex-col">
            {dogs.map(({ id, url, breeds }) => (
              <li
                key={url}
                className="m-4 p-4 w-96 border rounded hover:bg-gray-100"
              >
                <Link href={`/${id}`}>
                  {breeds &&
                    breeds.length > 0 &&
                    breeds.map((obj, i) => (
                      <p
                        className="uppercase text-center"
                        key={`${obj.name}+${i}`}
                      >
                        {obj.name}
                      </p>
                    ))}
                  <img src={url} alt="photo" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
