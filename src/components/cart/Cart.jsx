import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../../firebase";
import { formatCurrency } from "../../utils/helpers";

import {
  clearCart,
  getCart,
  getTotalCartPrise,
} from "../../redux/features/cartSlice";

import Button from "../Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function Cart({ showCart, setShowCart }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(getCart);
  const subtotal = useSelector(getTotalCartPrise);

  const DELIVERY_FEE = 12.5;
  const total = subtotal + DELIVERY_FEE;

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryTime: "",
  });

  const updateCustomer = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createOrder = async () => {
    const order = {
      customer,

      items: cartItems.map((item) => ({
        id: item.id || null,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.qty,
        lineTotal: item.price * item.qty,
      })),

      itemCount: cartItems.length,

      subtotal,

      deliveryFee: DELIVERY_FEE,

      total,

      status: "pending",

      createdAt: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "orders"), order);

    return ref.id;
  };

  const checkout = async () => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.deliveryTime
    ) {
      alert("Please complete delivery details");

      return;
    }

    try {
      const orderId = await createOrder();

      const tracking = `${window.location.origin}/track-order/${orderId}`;

      const items = cartItems
        .map(
          (item, index) =>
            `${index + 1}. ${item.title}
Qty: ${item.qty}
Price: ${formatCurrency(item.price * item.qty)}`,
        )
        .join("\n\n");

      const message = `
*LOSApps Technologies*

NEW ORDER

Customer:
${customer.name}

Phone:
${customer.phone}

Address:
${customer.address}

Delivery:
${customer.deliveryTime}


ITEMS

${items}


Subtotal:
${formatCurrency(subtotal)}

Delivery:
${formatCurrency(DELIVERY_FEE)}

TOTAL:
${formatCurrency(total)}


Track Order:
${tracking}

Thank you.
`;

      const whatsapp = `https://wa.me/27664301975?text=${encodeURIComponent(
        message,
      )}`;

      window.open(whatsapp, "_blank");

      dispatch(clearCart());

      setCheckoutOpen(false);
    } catch (error) {
      console.error(error);

      alert("Order failed");
    }
  };

  return (
    <>
      {/* CART */}

      <div
        className={`
fixed
right-0
top-[60px]
z-50
flex
h-[calc(100vh-60px)]
w-full
flex-col
bg-white
shadow-xl
transition-transform
duration-300

md:w-[420px]

${showCart ? "translate-x-0" : "translate-x-full"}

`}
      >
        {/* HEADER */}

        <div
          className="
          flex
          h-[55px]
          shrink-0
          items-center
          justify-between
          border-b
          px-5
          text-lg
          font-bold
          "
        >
          Shopping Cart
          <MdClose
            className="
cursor-pointer
text-2xl
hover:text-red-500
"
            onClick={() => setShowCart(false)}
          />
        </div>

        {/* BODY */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            "
        >
          {/* ITEMS */}

          <div
            className="
            flex-1
            space-y-3
            overflow-y-auto
            p-4
            "
          >
            {cartItems.length > 0 ? (
              cartItems.map((item) => <CartItem key={item.image} item={item} />)
            ) : (
              <EmptyCart />
            )}
          </div>

          {/* FOOTER */}

          {cartItems.length > 0 && (
            <div
              className="
              bg-gray-50
              shrink-0
              border-t
              p-4
              "
            >
              <div
                className="
                rounded-2xl
                border
                bg-white
                p-4
                shadow-sm
                "
              >
                <div
                  className="
                  text-gray-500
                  flex
                  justify-between
                  text-sm
                  "
                >
                  <span>Subtotal</span>

                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div
                  className="
                  text-gray-500
                  mt-2
                  flex
                  justify-between
                  text-sm
                  "
                >
                  <span>Delivery</span>

                  <span>{formatCurrency(DELIVERY_FEE)}</span>
                </div>

                <hr className="my-3" />

                <div
                  className="
                  flex
                  justify-between
                  text-lg
                  font-bold
                  "
                >
                  <span>Total</span>

                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div
                className="
                mt-4
                flex
                gap-3
                "
              >
                <Button styles="w-full" onClick={() => setCheckoutOpen(true)}>
                  Checkout
                </Button>

                <Button
                  styles="w-full"
                  variation="secondary"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BACKDROP */}

      {showCart && (
        <div
          className="
          fixed
          inset-0
          top-[60px]
          z-40
          bg-black/40
          "
          onClick={() => setShowCart(false)}
        />
      )}

      {/* CHECKOUT MODAL */}

      {checkoutOpen && (
        <div
          className="
          fixed
          inset-0
          z-[70]
          flex
          items-center
          justify-center
          bg-black/50
          p-5
          "
        >
          <div
            className="
            w-full
            max-w-md
            rounded-3xl
            bg-white
            p-6
            shadow-xl
            "
          >
            <div
              className="
              flex
              items-center
              justify-between
              "
            >
              <h2
                className="
                text-xl
                font-bold
                "
              >
                Delivery Details
              </h2>

              <MdClose
                className="cursor-pointer text-xl"
                onClick={() => setCheckoutOpen(false)}
              />

            </div>

            <input
              className="
              mt-5
              w-full
              rounded-xl
              border
              p-3
              "
              placeholder="Your Name"
              name="name"
              value={customer.name}
              onChange={updateCustomer}
            />

            <input
              className="
              mt-3
              w-full
              rounded-xl
              border
              p-3
              "
              placeholder="Phone number"
              name="phone"
              value={customer.phone}
              onChange={updateCustomer}
            />

            <textarea
              className="
              mt-3
              h-24
              w-full
              rounded-xl
              border
              p-3
              "
              placeholder="Delivery address"
              name="address"
              value={customer.address}
              onChange={updateCustomer}
            />

            <input
              className="
              mt-3
              w-full
              rounded-xl
              border
              p-3
              "
              placeholder="Preferred delivery time"
              name="deliveryTime"
              value={customer.deliveryTime}
              onChange={updateCustomer}
            />

            <Button styles="mt-5 w-full" onClick={checkout}>
              Place Order
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
