function WarningMessage({ track, onClickChange }) {
  return (
    <>
      {track === true && (
        <p className="bg-red-100 text-red-700 rounded px-4 py-2 flex items-center gap-2 mt-2 text-center">
          Enter the valid details...
          <button
            onClick={onClickChange}
            className="ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </p>
      )}
    </>
  );
}
export default WarningMessage;
