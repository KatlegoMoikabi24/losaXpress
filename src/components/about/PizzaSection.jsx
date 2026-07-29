import photo from "../../assets/pedalDrop.png";
import Button from "../Button";
import { Link } from "react-router-dom";

function PizzaSection() {
  return (
    <div className="mt-[60px] flex flex-col items-center justify-between gap-[30px] md:flex-row">
      <div className="w-full md:w-[25%]">
        <img
          src={photo}
          alt="PedalDrop delivery service"
          className="w-full object-cover"
        />
      </div>

      <div className="w-full text-center md:w-[50%] md:text-left">
        <p className="text-yellow">Our Delivery Partner</p>

        <h2 className="text-4xl font-bold">PedalDrop</h2>

        <p className="my-[8px] font-normal text-lightGray">
          Fast and reliable neighbourhood delivery powered by bicycles and local
          riders. PedalDrop helps bring LOSA Express orders from your local
          store straight to your door.{" "}
        </p>

        <Link to={"/menu"}>
          <Button>Go to PedalDrop</Button>
        </Link>
      </div>
    </div>
  );
}

export default PizzaSection;
