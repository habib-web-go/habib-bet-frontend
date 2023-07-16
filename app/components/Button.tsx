import classNames from "classnames";
import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  className?: string;
  disabled?: boolean;
}

function Button(props: Props) {
  const { onClick, label, className, disabled } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2  active:bg-gray-800 active:text-white focus-visible:outline-black ",
        className,
        { "hover:bg-gray-700": !disabled }
      )}
    >
      {label}
    </button>
  );
}

export default Button;
