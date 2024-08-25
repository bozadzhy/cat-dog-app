import React from "react";
import { catKey, dogKey } from "../page";

interface PetPageProps {
  params: {
    id: string;
  };
}

const PetPage = async ({ params }: PetPageProps) => {
  const { id } = params;

  const fetchDogData = async () => {
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/${id}`,
        {
          method: "GET",
          headers: {
            "x-api-key": dogKey,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dog data");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching dog data:", error);
      return null;
    }
  };

  const fetchCatData = async () => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/${id}`,
        {
          method: "GET",
          headers: {
            "x-api-key": catKey,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cat data");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching cat data:", error);
      return null;
    }
  };

  const [dogData, catData] = await Promise.all([
    fetchDogData(),
    fetchCatData(),
  ]);

  const data = dogData || catData;
  // console.log("data",data);
  const breedsIdArr = data.breeds ? data.breeds.map((obj: any) => obj.id) : [];
  const breedsId = breedsIdArr[0];

  const fetchDogBreeds = async () => {
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${breedsId}`,
        {
          method: "GET",
          headers: {
            "x-api-key": dogKey,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dog data");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching dog data:", error);
      return null;
    }
  };

  const fetchCatBreeds = async () => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedsId}`,
        {
          method: "GET",
          headers: {
            "x-api-key": catKey,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cat data");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching cat data:", error);
      return null;
    }
  };

  const [dogBreedData, catBreedData] = await Promise.all([
    fetchDogBreeds(),
    fetchCatBreeds(),
  ]);
  const dataBreeds = dogBreedData || catBreedData;

  if (!data) {
    return <div>Error: No pet data found.</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-center  text-gray-600 mt-2">Pet Details:</h2>
      {data && (
        <div className="p-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img className="w-full object-cover" src={data.url} alt="pet" />
          {data.breeds && data.breeds.length > 0 ? (
            data.breeds.map((obj: any) => (
              <div key={obj.id}>
                {obj.name && (
                  <h4
                    className="text-center text-xl font-semibold text-gray-800"
                    key={obj.temperament}
                  >
                    {obj.name}
                  </h4>
                )}
                {obj.temperament && (
                  <p className="text-center text-gray-600 mt-2">
                    {obj.temperament}
                  </p>
                )}
                {obj.bred_for && (
                  <p className="text-center text-gray-600 mt-2">
                    Bred for:
                    {obj.bred_for}
                  </p>
                )}
                {obj.life_span && (
                  <p className="text-center text-gray-600 mt-2">
                    Life span:
                    {obj.life_span}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center  text-gray-600 mt-2">
              No info about pet :(
            </p>
          )}
        </div>
      )}
      <div className="flex justify-center flex-col">
        {dataBreeds.length > 0 && (
          <p className="text-center  text-gray-900 mt-2 text-xl">
            Similar images:
          </p>
        )}
        <div  className="flex justify-center flex-row flex-wrap">
          {dataBreeds && dataBreeds.length > 0 ? (
            dataBreeds.map((obj: any, i: number) => (
              <div key={i} className="m-4 flex justify-center">
                <img
                  className="w-48 object-cover"
                  key={`${obj.width}+ ${i}`}
                  src={obj.url}
                  alt="pets"
                />
              </div>
            ))
          ) : (
            <p className="text-center  text-gray-600 mt-2">
              No similar images :(
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetPage;
