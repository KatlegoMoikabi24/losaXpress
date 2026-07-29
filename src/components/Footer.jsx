import { Link } from "react-router-dom";
import { FaWhatsapp, FaBicycle, FaInstagram } from "react-icons/fa";

import Container from "./Container";
import GridContainer from "./GridContainer";

function Footer() {
  return (
    <footer className="mt-[50px] bg-textColor text-center text-white">
      <Container>
        <div className="py-[40px] text-sm">
          <GridContainer>

            <div>
              <h5 className="mb-[5px] text-xl uppercase">LOSA Express</h5>
              <p className="text-lightGray">
                Local Online Shopping & Delivery
              </p>
              <p className="text-lightGray">
                Star Village, New Protea Glen
              </p>
              <p className="text-lightGray">
                Soweto
              </p>
            </div>

            <div>
              <h5 className="mb-[5px] text-xl uppercase">
                Delivery Available
              </h5>
              <p className="text-lightGray">
                 Bicycle delivery
              </p>
              <p className="text-lightGray">
                 Vehicle delivery for larger orders
              </p>
              <p className="text-lightGray">
                Bread • Milk • Eggs • Drinks
              </p>
            </div>

            <div>
              <h5 className="mb-[5px] text-xl uppercase">
                Business Hours
              </h5>
              <p className="text-lightGray">
                Monday – Friday: 7am – 6pm
              </p>
              <p className="text-lightGray">
                Saturday: 8am – 5pm
              </p>
              <p className="text-lightGray">
                Sunday: 9am – 2pm
              </p>
            </div>

            <div>
              <h5 className="mb-[5px] text-xl uppercase">
                Order Now
              </h5>
              <p className="text-lightGray">
                WhatsApp your order
              </p>

              <a
                href="https://wa.me/27664301975"
                target="_blank"
                rel="noreferrer"
                className="mt-[10px] flex items-center justify-center gap-2 text-green-400 hover:text-yellow"
              >
                <FaWhatsapp />
                WhatsApp LOSA Express
              </a>
            </div>

            <div className="flex flex-row items-center justify-center gap-[15px] text-xl md:flex-col md:justify-start">
              <Link
                to="/"
                className="hover:text-yellow"
              >
                <FaBicycle />
              </Link>

              <a
                href="#"
                className="hover:text-yellow"
              >
                <FaInstagram />
              </a>
            </div>

          </GridContainer>
        </div>
      </Container>

      <p className="bg-orange-500 p-[20px] text-textColor">
        Copyright © {new Date().getFullYear()}{" "}
        <span className="font-semibold">
          LOSApps Technologies
        </span>
        . All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;