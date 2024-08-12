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

  const urlDog = "https://api.thedogapi.com/v1/images/search?limit=50";
  const urlCat = "https://api.thecatapi.com/v1/images/search?limit=50&";

  const dogKey =
    "live_rnTY11HZc9MyC3e7J3NgVGUahCmv8WJJE0sLcQlvLvLZKG51poMY9FVuRsL2ezwX";
  const catKey =
    "live_qYr9FjpMAb31JbDcE2Qp1KK3gBWcu5ZOxCSGe4ynQN2SvY4Ha8LFYxaBWOIxc0uP";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(urlDog, {
            method: "GET",
            headers: {
              "x-api-key": dogKey,
            },
          }),
          fetch(urlCat, {
            method: "GET",
            headers: {
              "x-api-key": catKey,
            },
          }),
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
    <main className="p-10 md:flex">
      <div className="max-w-xs mx-auto flex flex-col">
        <h2 className="text-center text-lg font-semibold text-gray-800">
          Cats:
        </h2>
        {cats.map(({ id, url, breeds }) => (
          <div
            key={url}
            className="m-4 max-w-xs mx-auto bg-white shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <Link href={`/${id}`}>
              <img className="p-2 w-64 object-cover" src={url} alt="photo" />
              {breeds &&
                breeds.length > 0 &&
                breeds.map((obj, i) => (
                  <div key={`${obj.name}+${i}`}>
                    <h2 className="text-center text-lg font-semibold text-gray-800">
                      {obj.name}
                    </h2>
                  </div>
                ))}
            </Link>
          </div>
        ))}
      </div>
      <div className="max-w-xs mx-auto flex flex-col">
        <h2 className="text-center text-lg font-semibold text-gray-800">
          Dogs:
        </h2>
        {dogs.map(({ id, url, breeds }) => (
          <div
            key={url}
            className="m-4 max-w-xs mx-auto bg-white shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <Link href={`/${id}`}>
              <img className="p-2 w-64 object-cover" src={url} alt="photo" />
              {breeds &&
                breeds.length > 0 &&
                breeds.map((obj, i) => (
                  <div key={`${obj.name}+${i}`}>
                    <h2 className="text-center text-lg font-semibold text-gray-800">
                      {obj.name}
                    </h2>
                  </div>
                ))}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};
export default HomePage;
