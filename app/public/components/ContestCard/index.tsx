import { reloadIfEnded, stringifyInterval } from "@/lib/time";
import Contest from "@/lib/types/contest";
import React, { useEffect } from "react";

interface Props {
  contest: Contest | null;
  label: string;
  date: Date;
  reload: () => void;
}

function ContestCard(props: Props) {
  const { contest, label, date, reload } = props;
  useEffect(() => {
    if (label === "COMING/") {
      reloadIfEnded(date, new Date(contest?.start ?? ""), reload);
    } else {
      reloadIfEnded(date, new Date(contest?.end ?? ""), reload);
    }
  }, [date]);
  return (
    <section>
      <div className="relative items-center w-full py-3 mx-auto">
        <div className="w-full p-4 mx-auto text-left align-bottom transition-all transform bg-gray-100 sm:align-middle sm:p-8 rounded-2xl">
          <div className="w-full mb-4">
            <span className="text-xl">{contest?.name ?? "Contest name"}</span>
          </div>
          <div className="w-full">
            <p className="text-base text-gray-500">
              {"User Count/ " + (contest?.user_count ?? "-")}
            </p>
            {label === "COMING/" ? (
              <p className="text-base text-gray-500">
                {"Time To Start/ " +
                  stringifyInterval(date, new Date(contest?.start ?? ""))}
              </p>
            ) : (
              <p className="text-base text-gray-500">
                {"Time To End/ " +
                  stringifyInterval(date, new Date(contest?.end ?? ""))}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContestCard;
