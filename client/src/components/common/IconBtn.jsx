
import React from "react";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) => {
  // Base styles
  const baseClasses = `
    px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2
    transition-all duration-300 ease-in-out
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `;

  // Filled or outline styles
  const variantClasses = outline
    ? "border border-sky-500 text-sky-700 hover:bg-sky-50"
    : "bg-sky-500 text-white hover:bg-sky-800 shadow-md hover:shadow-lg";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${customClasses}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
