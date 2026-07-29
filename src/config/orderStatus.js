import {
  MdPendingActions,
  MdCheckCircle,
  MdOutlineSoupKitchen,
  MdLocalShipping,
  MdHome,
  MdCancel,
} from "react-icons/md";

export const STATUS_FLOW = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];

export const STATUS_META = {
  pending: {
    label: "Pending",
    short: "Order received",
    icon: MdPendingActions,
  },
  confirmed: {
    label: "Confirmed",
    short: "We're on it",
    icon: MdCheckCircle,
  },
  preparing: {
    label: "Preparing",
    short: "Getting it ready",
    icon: MdOutlineSoupKitchen,
  },
  out_for_delivery: {
    label: "Out for delivery",
    short: "On the way to you",
    icon: MdLocalShipping,
  },
  delivered: {
    label: "Delivered",
    short: "Order complete",
    icon: MdHome,
  },
  cancelled: {
    label: "Cancelled",
    short: "This order was cancelled",
    icon: MdCancel,
  },
};

export const statusIndex = (status) => STATUS_FLOW.indexOf(status);
