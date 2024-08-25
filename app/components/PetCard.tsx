import React from "react";
import Link from "next/link";

interface Breed {
  id: string;
  name: string;
  temperament: string;
  bred_for: string;
  life_span: string;
}

export interface Pet {
  breeds?: Breed[];
  height: string;
  id: string;
  url: string;
  width: string;
}

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  return (
    <div className="m-5 max-w-xs">
      {pet && (
        <Link href={`/${pet.id}`}>
          <div className="p-4 w-auto h-auto m-4 max-w-xs mx-auto bg-white shadow-md rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-64 sm:h-48 md:h-64 lg:h-72">
              <img className="w-full h-full object-cover" src={pet.url} alt="pet" />
            </div>
            {pet.breeds && pet.breeds.length > 0 ? (
              pet.breeds.map((obj) => (
                <div key={obj.id} className="flex justify-center">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {obj.name}
                  </h4>
                </div>
              ))
            ) : (
              <h4 className="text-center text-xl font-semibold text-gray-400">
                No info about pet
              </h4>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

export default PetCard;
