import { useToastStore } from "../store/toastStore";

export default function ToastModal() {
  const { show, message, type, hideToast, onConfirm } = useToastStore();

  if (!show) return null;

  const handleOk = () => {
    if (type === "confirm" && onConfirm) onConfirm();
    hideToast();
  };

  const handleCancel = () => {
    hideToast();
  };

  // Colors based on type
  let textColor = "text-black"; // default
  if (type === "success") textColor = "text-green-500";
  else if (type === "error") textColor = "text-red-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`p-6 rounded-xl shadow-lg max-w-md w-full bg-white`}>
        <p className={`text-center text-lg font-semibold mb-4 ${type === "confirm" ? "text-black" : textColor}`}>
          {message}
        </p>

        <div className="flex justify-center gap-4">
          {type === "confirm" ? (
            <>
              <button
                onClick={handleOk}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleOk}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
