import BreedPage from "../components/BreedPage";

interface BreedPageProps {
  params: {
    productId: string;
  };
}
const Breed: React.FC<BreedPageProps> = ({ params }) => {
  return <BreedPage params={params} />;
};

export default Breed;
