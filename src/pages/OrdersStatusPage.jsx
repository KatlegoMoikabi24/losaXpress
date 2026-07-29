import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";

import { firestore as db } from "../firebase.js";
import { formatCurrency } from "../utils/helpers";
import StatusRail from "../components/orders/StatusRail";

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "";

  return timestamp.toDate().toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function OrdersStatusPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const orderRef = doc(db, "orders", orderId);

    const unsubscribe = onSnapshot(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder({
          id: snapshot.id,
          ...snapshot.data(),
        });
      } else {
        setOrder(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [orderId]);

  if (loading) {
    return (
      <div
        className="
        bg-gray-100
        flex
        min-h-screen
        items-center
        justify-center
      "
      >
        <div
          className="
          border-gray-300
          h-10
          w-10
          animate-spin
          rounded-full
          border-4
          border-t-orange-500
        "
        />
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="
        bg-gray-100
        flex
        min-h-screen
        items-center
        justify-center
        px-5
      "
      >
        <div
          className="
          rounded-2xl
          bg-white
          p-8
          text-center
          shadow-sm
        "
        >
          <h1
            className="
            text-xl
            font-bold
          "
          >
            Order not found
          </h1>

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Please check your tracking link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      bg-gray-100
      min-h-screen
      px-4
      py-8
    "
    >
      <div
        className="
        mx-auto
        max-w-md
      "
      >
        {/* COMPACT STATUS */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            border-gray-200
            mb-4
            rounded-2xl
            border
            bg-white
            p-4
            shadow-sm
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
          "
          >
            <div>
              <p
                className="
                text-gray-400
                text-[11px]
                uppercase
                tracking-wide
              "
              >
                Order Reference
              </p>

              <p
                className="
                text-gray-900
                font-mono
                text-sm
                font-bold
              "
              >
                #{order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>

            <span
              className="
              rounded-full
              bg-orange-100
              px-3
              py-1
              text-[11px]
              font-bold
              uppercase
              text-orange-600
            "
            >
              {order.status}
            </span>
          </div>

          <div
            className="
            mt-4
          "
          >
            <StatusRail status={order.status} />
          </div>
        </motion.div>

        {/* RECEIPT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            border-gray-200
            overflow-hidden
            rounded-xl
            border
            bg-white
            shadow-md
          "
        >
          {/* HEADER */}

          <div
            className="
            border-b
            border-dashed
            p-5
            text-center
          "
          >
            <h1
              className="
              text-gray-900
              text-xl
              font-black
            "
            >
              LOSApps Technologies
            </h1>

            <p
              className="
              text-gray-500
              mt-1
              text-sm
            "
            >
              Delivery Receipt
            </p>

            <p
              className="
              text-gray-400
              mt-3
              text-xs
            "
            >
              {formatDate(order.createdAt)}
            </p>
          </div>

          {/* ITEMS */}

          <div
            className="
            p-5
          "
          >
            <div
              className="
              text-gray-400
              mb-3
              flex
              justify-between
              text-[11px]
              font-bold
              uppercase
            "
            >
              <span>Item</span>

              <span>Amount</span>

            </div>

            {order.items?.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="
                    border-gray-100
                    flex
                    justify-between
                    border-b
                    border-dashed
                    py-3
                  "
              >
                <div>
                  <p
                    className="
                      text-gray-800
                      text-sm
                      font-semibold
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      text-gray-500
                      text-xs
                    "
                  >
                    Qty {item.quantity || item.qty}
                    {" × "}
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <span
                  className="
                    text-gray-900
                    text-sm
                    font-bold
                  "
                >
                  {formatCurrency(item.lineTotal)}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL */}

          <div
            className="
            bg-gray-50
            p-5
          "
          >
            <div
              className="
              text-gray-600
              flex
              justify-between
              text-sm
            "
            >
              <span>Subtotal</span>

              <span>{formatCurrency(order.subtotal)}</span>
            </div>

            <div
              className="
              text-gray-600
              mt-2
              flex
              justify-between
              text-sm
            "
            >
              <span>Delivery</span>

              <span>{formatCurrency(order.deliveryFee)}</span>

            </div>

            <div
              className="
              border-gray-200
              text-gray-900
              mt-4
              flex
              justify-between
              border-t
              pt-4
              text-xl
              font-black
            "
            >
              <span>TOTAL</span>

              <span>{formatCurrency(order.total)}</span>

            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
            text-gray-400
            border-t
            border-dashed
            p-5
            text-center
            text-xs
          "
          >
            <p>Thank you for your order ❤️</p>

            <p
              className="
              mt-2
            "
            >
              Keep this receipt for tracking.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OrdersStatusPage;
