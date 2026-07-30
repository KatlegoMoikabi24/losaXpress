import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  FiSearch,
  FiPhone,
  FiMapPin,
  FiClock,
  FiPackage,
} from "react-icons/fi";

import { firestore as db } from "../firebase.js";
import { formatCurrency } from "../utils/helpers";

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  {
    value: "preparing",
    label: "Preparing",
    color: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },
  {
    value: "out_for_delivery",
    label: "Out for delivery",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
];

function getStatus(status) {
  return (
    STATUS_OPTIONS.find((item) => item.value === status) || STATUS_OPTIONS[0]
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const changeStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), {
      status,
    });
  };

  const filteredOrders = orders.filter((order) => {
    const text = search.toLowerCase();

    return (
      order.id.toLowerCase().includes(text) ||
      order.customer?.name?.toLowerCase().includes(text) ||
      order.customer?.phone?.includes(search) ||
      order.customer?.address?.toLowerCase().includes(text)
    );
  });

  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled",
  ).length;

  return (
    <div
      className="
        bg-gray-100
        min-h-screen
        px-4
        py-8
        md:px-10
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        {/* HEADER */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-widest
                text-orange-500
              "
            >
              LOSApps
            </p>

            <h1
              className="
                text-gray-900
                mt-2
                text-3xl
                font-bold
              "
            >
              Delivery Control
            </h1>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Manage orders and delivery progress.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white
              px-6
              py-4
              shadow-sm
            "
          >
            <p
              className="
                text-gray-500
                text-sm
              "
            >
              Active Orders
            </p>

            <p
              className="
                mt-1
                text-3xl
                font-bold
                text-orange-500
              "
            >
              {activeOrders}
            </p>
          </div>
        </div>

        {/* SEARCH */}

        <div
          className="
            relative
            mb-8
          "
        >
          <FiSearch
            className="
              text-gray-400
              absolute
              left-5
              top-1/2
              -translate-y-1/2
            "
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="
              Search order, customer, phone or address
            "
            className="
              border-gray-200
              w-full
              rounded-3xl
              border
              bg-white
              py-4
              pl-12
              pr-5
              shadow-sm
              outline-none
              focus:border-orange-400
            "
          />
        </div>

        {loading ? (
          <div
            className="
                flex
                h-64
                items-center
                justify-center
              "
          >
            <div
              className="
                  border-gray-200
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-t-orange-500
                "
            />
          </div>
        ) : (
          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >
            {filteredOrders.map((order) => {
              const status = getStatus(order.status);

              return (
                <div
                  key={order.id}
                  className="
                border-gray-200
                rounded-3xl
                border
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
                >
                  {/* TOP */}

                  <div
                    className="
                  flex
                  items-start
                  justify-between
                "
                  >
                    <div>
                      <p
                        className="
                      text-gray-400
                      text-xs
                      uppercase
                    "
                      >
                        Order
                      </p>

                      <p
                        className="
                      text-gray-900
                      mt-1
                      font-mono
                      font-bold
                    "
                      >
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>

                    <div
                      className="
                    flex
                    items-center
                    gap-2
                  "
                    >
                      <span
                        className={`
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-2
                      text-xs
                      font-bold
                      ${status.color}
                    `}
                      >
                        <span
                          className={`
                        h-2
                        w-2
                        rounded-full
                        ${status.dot}
                      `}
                        />

                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* CUSTOMER */}

                  <div
                    className="
                  bg-gray-50
                  mt-5
                  rounded-2xl
                  p-4
                "
                  >
                    <h3
                      className="
                    text-gray-900
                    font-bold
                  "
                    >
                      {order.customer?.name}
                    </h3>

                    <a
                      href={`tel:${order.customer?.phone}`}
                      className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-orange-600
                  "
                    >
                      <FiPhone />

                      {order.customer?.phone}
                    </a>

                    <div
                      className="
                    text-gray-600
                    mt-3
                    flex
                    gap-2
                    text-sm
                  "
                    >
                      <FiMapPin />

                      {order.customer?.address}
                    </div>

                    <div
                      className="
                    text-gray-700
                    mt-3
                    flex
                    gap-2
                    text-sm
                    font-semibold
                  "
                    >
                      <FiClock />

                      {order.customer?.deliveryTime}
                    </div>
                  </div>

                  {/* ITEMS */}

                  <div
                    className="
                  mt-5
                  space-y-2
                "
                  >
                    {order.items?.slice(0, 3).map((item) => (
                      <div
                        key={item.title}
                        className="
                      flex
                      justify-between
                      text-sm
                    "
                      >
                        <span
                          className="
                        text-gray-600
                      "
                        >
                          {item.title} x{item.quantity}
                        </span>

                        <span
                          className="
                        font-semibold
                      "
                        >
                          {formatCurrency(item.lineTotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}

                  <div
                    className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-t
                  pt-4
                "
                  >
                    <div>
                      <p
                        className="
                      text-gray-400
                      text-xs
                    "
                      >
                        Total
                      </p>

                      <p
                        className="
                      text-gray-900
                      text-xl
                      font-bold
                    "
                      >
                        {formatCurrency(order.total)}
                      </p>
                    </div>

                    <select
                      value={order.status}
                      onChange={(e) => changeStatus(order.id, e.target.value)}
                      className="
                    border-gray-200
                    rounded-xl
                    border
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    outline-none
                  "
                    >
                      {STATUS_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
