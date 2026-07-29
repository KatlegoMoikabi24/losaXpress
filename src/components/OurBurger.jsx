import SectionFlexContainer from "./SectionFlexContainer";
import photo from "../assets/logo_v1.png";

function OurBurger({ flex }) {
  return (
    <SectionFlexContainer
      flex={flex}
      images={photo}
      title={"Buy now, Without Leaving Your Home!!"}
      description={"About LOSA Express - Star Village"}
    />
  );
}

export default OurBurger;
