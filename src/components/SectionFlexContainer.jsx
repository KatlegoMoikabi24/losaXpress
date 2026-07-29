import { Link } from "react-router-dom";
import Button from "./Button";

function SectionFlexContainer({
  images,
  title,
  description,
  flex = "md:flex-row",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-between gap-[20px] ${flex}`}
    >
      <div className="w-full md:w-[50%]">
        <img src={images} alt={title} />
      </div>

      <div className="w-full text-center text-base font-bold md:w-[50%] md:text-left md:text-lg">
        <p className="uppercase tracking-wide text-orange-500">{description}</p>

        <h1 className="text-4xl text-textColor md:text-3xl">{title}</h1>

        <p className="my-[8px] font-normal text-lightGray">
          Order bread, milk, eggs, vegetables, drinks and household essentials
          from your local area. Fast delivery using bicycle and vehicle options.
        </p>

        <Link to={"/MENU"}>
          <Button>Shop Now</Button>
        </Link>
      </div>
    </div>
  );
}

export default SectionFlexContainer;
