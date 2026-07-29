import { MdClose } from "react-icons/md";
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

    const DELIVERY_FEE = 12.50;

    const total = subtotal + DELIVERY_FEE;


    const buildWhatsAppMessage = (orderId) => {

        const items = cartItems
            .map(
                (item, index) =>
                    `${index + 1}. ${item.title}
Quantity: ${item.qty}
Unit Price: ${formatCurrency(item.price)}
Line Total: ${formatCurrency(item.price * item.qty)}`
            )
            .join("\n\n");


        return `
*LOSApps Technologies*

*NEW ORDER REQUEST*

Good day Makhi,

I would like to place the following order.

Order Reference:
${orderId}

━━━━━━━━━━━━━━━━━━

${items}

━━━━━━━━━━━━━━━━━━

*ORDER SUMMARY*

Items:
${cartItems.length}

Subtotal:
${formatCurrency(subtotal)}

Delivery:
${formatCurrency(DELIVERY_FEE)}

Total:
${formatCurrency(total)}

Thank you.
`;
    };


    const saveOrderToFirestore = async () => {

        const order = {

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


        const orderRef = await addDoc(
            collection(db, "orders"),
            order
        );


        return orderRef.id;
    };



    const sendToWhatsApp = async () => {

        if (!cartItems.length) return;


        try {

            const orderId = await saveOrderToFirestore();


            const message = buildWhatsAppMessage(orderId);


            const phone = "27664301975";


            const whatsappUrl =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappUrl,
                "_blank"
            );


            dispatch(clearCart());


        } catch(error) {

            console.error(
                "Order creation failed:",
                error
            );


            alert(
                "Unable to create order. Please try again."
            );

        }

    };



    return (
        <>

            <div
                className={`
                    fixed
                    top-[60px]
                    right-0
                    z-50
                    h-[calc(100vh-60px)]
                    w-full
                    bg-white
                    border-l
                    shadow-xl
                    transition-all
                    duration-300
                    ease-in-out

                    md:w-[420px]

                    ${
                    showCart
                        ? "translate-x-0"
                        : "translate-x-full"
                }
                `}
            >


                {/* Header */}

                <div
                    className="
                        flex
                        h-[55px]
                        items-center
                        justify-between
                        border-b
                        px-5
                        font-bold
                        text-lg
                    "
                >

                    <span>
                        Shopping Cart
                    </span>


                    <MdClose
                        className="
                            cursor-pointer
                            text-2xl
                            hover:text-red-500
                        "
                        onClick={() => setShowCart(false)}
                    />

                </div>




                <div
                    className="
                        flex
                        h-[calc(100%-55px)]
                        flex-col
                        justify-between
                    "
                >


                    {/* Cart Items */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            overflow-y-auto
                            p-4
                        "
                    >

                        {
                            cartItems.length > 0
                                ?
                                cartItems.map(item => (
                                    <CartItem
                                        item={item}
                                        key={item.image}
                                    />
                                ))
                                :
                                <EmptyCart />
                        }


                    </div>





                    {/* Bottom Section */}

                    {
                        cartItems.length > 0 && (

                            <div
                                className="
                                    border-t
                                    bg-gray-50
                                    p-4
                                "
                            >



                                {/* Price Summary */}

                                <div
                                    className="
                                        rounded-xl
                                        bg-white
                                        p-4
                                        shadow-sm
                                        border
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        <span>
                                            Subtotal
                                        </span>

                                        <span>
                                            {formatCurrency(subtotal)}
                                        </span>

                                    </div>



                                    <div
                                        className="
                                            mt-2
                                            flex
                                            justify-between
                                            text-sm
                                            text-gray-500
                                        "
                                    >

                                        <span>
                                            Delivery
                                        </span>

                                        <span>
                                            {formatCurrency(DELIVERY_FEE)}
                                        </span>

                                    </div>



                                    <div
                                        className="
                                            my-3
                                            border-t
                                        "
                                    />



                                    <div
                                        className="
                                            flex
                                            justify-between
                                            text-lg
                                            font-bold
                                        "
                                    >

                                        <span>
                                            Total
                                        </span>


                                        <span>
                                            {formatCurrency(total)}
                                        </span>

                                    </div>


                                </div>





                                {/* Buttons */}

                                <div
                                    className="
                                        mt-4
                                        flex
                                        gap-3
                                    "
                                >

                                    <Button
                                        styles="w-full"
                                        onClick={sendToWhatsApp}
                                    >
                                        Checkout
                                    </Button>



                                    <Button

                                        styles="w-full"

                                        variation="secondary"

                                        onClick={() =>
                                            dispatch(clearCart())
                                        }

                                    >
                                        Clear
                                    </Button>


                                </div>


                            </div>

                        )
                    }


                </div>


            </div>




            {/* Overlay */}

            {
                showCart && (

                    <div
                        className="
                            fixed
                            inset-0
                            top-[60px]
                            z-40
                            bg-black/50
                        "

                        onClick={() =>
                            setShowCart(false)
                        }

                    />

                )
            }


        </>
    );

}


export default Cart;