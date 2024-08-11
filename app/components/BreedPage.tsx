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
          console.log("Данные из первого запроса:", response1);
          return response1;
        } else if (isValidData(response2)) {
          console.log("Данные из второго запроса:", response2);
          return response2;
        } else {
          console.error("Оба запроса вернули некорректные данные");
          return null;
        }
      } catch (error) {
        console.error("Ошибка при выполнении запросов:", error);
        return null;
      }
    };

    fetchData(urlDog, urlCat).then((result) => {
      if (result) {
        setSimilarPictures(result);
      }
    });
  }, [breedId]);

  return (
    <div>
      {pet && (
        <div>
          <img src={pet.url} alt="pet" />
          {pet.breeds && pet.breeds.length > 0 ? (
            pet.breeds.map((obj) => (
              <div key={obj.temperament}>
                {obj.name}
                {obj.temperament}
              </div>
            ))
          ) : (
            <p>no info about pet</p>
          )}
        </div>
      )}
      <div>
        {similarPictures &&
          similarPictures.length > 0 &&
          similarPictures.map((obj: any, i) => (
            <img key={`${obj.width}+ ${i}`} src={obj.url} alt="pets" />
          ))}
      </div>
    </div>
  );
};

export default BreedPage;
