interface Props {
  error: any;
}

function Warning(props: Props) {
  const { error } = props;
  return (
    <div
      className={
        Boolean(error)
          ? "bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          : "hidden"
      }
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{String(error.error !== undefined ? error.error : error)}</p>
    </div>
  );
}

export default Warning;
