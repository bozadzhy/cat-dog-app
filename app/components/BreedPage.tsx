"use client";
import { useState, useEffect } from "react";

interface Breed {
  id: string;
  name: string;
  temperament: string;
  bred_for: string;
  life_span: string;
  [key: string]: any;
}

interface Pet {
  breeds?: Breed[];
  height: string;
  id: string;
  url: string;
  width: string;
}

interface BreedPageProps {
  params: {
    productId: string;
  };
}

const BreedPage: React.FC<BreedPageProps> = ({ params }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [similarPictures, setSimilarPictures] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const id = params.productId;
  const breedObj = pet?.breeds ? pet.breeds[0] : null;
  const breedId = breedObj?.id;
  console.log(breedId);

  const urlDog = `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=20&api_key=live_rnTY11HZc9MyC3e7J3NgVGUahCmv8WJJE0sLcQlvLvLZKG51poMY9FVuRsL2ezwX`;
  const urlCat = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=20&api_key=live_qYr9FjpMAb31JbDcE2Qp1KK3gBWcu5ZOxCSGe4ynQN2SvY4Ha8LFYxaBWOIxc0uP`;

  useEffect(() => {
    const petsString = localStorage.getItem("pets");
    if (petsString) {
      try {
        const pets: Pet[] = JSON.parse(petsString);
        const findedObj = pets.find((obj) => obj.id === id);
        setPet(findedObj || null);
      } catch (error) {
        console.error("Failed to parse data from localStorage", error);
      }
    }
  }, [id]);

  useEffect(() => {
    setLoading(false);
    const fetchData = async (url1: string, url2: string) => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(url1).then((response) => response.json()),
          fetch(url2).then((response) => response.json()),
        ]);

        const isValidData = (data: any) => {
          if (data.length > 0) {
            return data;
          } else {
            return null;
          }
        };

        if (isValidData(response1)) {
          return response1;
        } else if (isValidData(response2)) {
          return response2;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    };

    fetchData(urlDog, urlCat).then((result) => {
      if (result) {
        setSimilarPictures(result);
        setLoading(true);
      }
    });
  }, [breedId]);

  return (
    <div className="m-20">
      {pet && (
        <div className="p-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img className="w-full object-cover" src={pet.url} alt="pet" />
          {pet.breeds && pet.breeds.length > 0 ? (
            pet.breeds.map((obj) => (
              <div>
                <h4
                  className="text-center text-xl font-semibold text-gray-800"
                  key={obj.temperament}
                >
                  {obj.name}
                </h4>
                <p className="text-center text-gray-600 mt-2">
                  {obj.temperament}
                </p>
              </div>
            ))
          ) : (
            <p>no info about pet</p>
          )}
        </div>
      )}
      <h5 className="text-center text-gray-600 mt-4">Breed images:</h5>
      <div className="flex justify-center items-center flex-wrap">
        {similarPictures && similarPictures.length > 0 ? (
          similarPictures.map((obj: any, i) => (
            <div className="m-4">
              <img
                className="w-24 object-cover"
                key={`${obj.width}+ ${i}`}
                src={obj.url}
                alt="pets"
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BreedPage;
