import { FC, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const [year, setYear] = useState<string>("");
  const [params, setParams] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (year.trim()) {
      params.set("year", year);
    } else {
      params.delete("year");
    }

    setParams(params);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="year">Yıl:</label>

      <div className="flex">
        <input
          id="year"
          type="number"
          className="w-26 py-[6px] px-2 rounded-l-[4px] shadow text-black bg-white border-r border-zinc-300"
          placeholder="örn:2023"
          onChange={(e) => setYear(e.target.value)}
          defaultValue={params.get("year") as string}
        />

        <button
          className="bg-white rounded-r px-3 text-blue-500 hover:bg-zinc-300 transition cursor-pointer"
          aria-label="Ara"
        >
          🔎
        </button>
      </div>
    </form>
  );
};

export default Year;
