function TaskCard({ title, value, icon }) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-6
      flex
      items-center
      justify-between
    "
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h2
          className="
          text-3xl
          font-bold
          mt-2
        "
        >
          {value}
        </h2>
      </div>

      <div
        className="
        text-blue-600
        text-3xl
      "
      >
        {icon}
      </div>
    </div>
  );
}

export default TaskCard;
