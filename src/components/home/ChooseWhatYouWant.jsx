import photo from "../../assets/shipper.png";
import SectionFlexContainer from "../SectionFlexContainer";

function ChooseWhatYouWant() {
  return (
    <SectionFlexContainer
      flex={"md:flex-row-reverse"}
      images={photo}
      title={"Choose what you need, we deliver to your door"}
      description={"LOSA Express - New Protea Glen"}
    />
  );
}

export default ChooseWhatYouWant;
