import { motion } from "framer-motion";
import {
  STATUS_FLOW,
  STATUS_META,
  statusIndex,
} from "../../config/orderStatus";

function StatusRail({ status }) {
  const cancelled = status === "cancelled";
  const currentIndex = statusIndex(status);

  const progress =
    currentIndex <= 0 ? 0 : (currentIndex / (STATUS_FLOW.length - 1)) * 100;

  if (cancelled) {
    const { icon: Icon, label, short } = STATUS_META.cancelled;

    return (
      <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.6 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500"
        >
          <Icon className="text-xl" />
        </motion.div>

        <div>
          <h4 className="font-semibold text-red-600">{label}</h4>
          <p className="text-gray-500 text-sm">{short}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between text-sm">
        <span className="text-gray-500 font-medium">Delivery progress</span>

        <span className="font-bold text-orange-500">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="bg-gray-200 relative h-2 overflow-hidden rounded-full">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
        />

        {status !== "delivered" && (
          <motion.div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-orange-500 shadow-lg"
            animate={{ left: `calc(${progress}% - 8px)` }}
            transition={{ duration: 0.8 }}
          />
        )}
      </div>

      <div className="mt-6 flex justify-between">
        {STATUS_FLOW.map((step, index) => {
          const meta = STATUS_META[step];
          const Icon = meta.icon;

          const completed = index <= currentIndex;
          const active = index === currentIndex;

          return (
            <div
              key={step}
              className="flex w-16 flex-col items-center text-center"
            >
              <motion.div
                animate={active ? { scale: [1, 1.08, 1] } : {}}
                transition={
                  active
                    ? {
                        duration: 1.5,
                        repeat: Infinity,
                      }
                    : {}
                }
                className={`
                  flex h-12 w-12 items-center justify-center rounded-full border-2 transition
                  ${
                    completed
                      ? active
                        ? "border-orange-500 bg-orange-50 text-orange-500 shadow-md"
                        : "border-green-400 bg-green-50 text-green-500"
                      : "border-gray-200 bg-gray-50 text-gray-400"
                  }
                `}
              >
                <Icon className="text-lg" />
              </motion.div>

              <span
                className={`mt-2 text-[11px] font-medium ${
                  completed ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {status === "delivered" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center font-semibold text-green-600"
        >
          🎉 Your order has been delivered!
        </motion.div>
      )}
    </div>
  );
}

export default StatusRail;
