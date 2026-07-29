import { Link } from "react-router-dom";
import photo from "../../assets/delivered.png";
import Button from "../Button";

function DeliverySection() {
  return (
    <div
      className="relative mt-[60px] flex h-[50vh] items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${photo})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-[90%] text-center text-lg md:w-[60%]">
        <p className="text-orange-200 font-bold">LOSA Express + PedalDrop</p>

        <h2 className="text-4xl font-bold text-white">
          Your Essentials Delivered To Your Door!
        </h2>

        <p className="my-[10px] text-white">
          From bread and milk to household essentials, order from your local
          store and let us bring it straight to your home.
        </p>

        <Link to={"/menu"}>
          <Button>Shop Now</Button>
        </Link>
      </div>
    </div>
  );
}

export default DeliverySection;
