import { STATUS_COLORS } from "../../utils/constants";

export default function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || "badge-default";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {status}
    </span>
  );
}
