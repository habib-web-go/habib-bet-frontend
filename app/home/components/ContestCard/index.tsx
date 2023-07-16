import Button from "@/app/components/Button";
import { getReward, joinContest } from "@/lib/api";
import { reloadIfEnded, stringifyInterval } from "@/lib/time";
import Contest, { ContestType } from "@/lib/types/contest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  contest: Contest | null;
  type: ContestType;
  date: Date;
  reload: () => void;
  refetchUser: () => void;
}

function ContestCard(props: Props) {
  const { contest, type, date, reload, refetchUser } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const isEligibleForReward = contest?.questions?.every(
    (q) => q.answer === q.user_answer
  );

  const getRewardAsync = async () => {
    if (!contest) return;
    try {
      setLoading(true);
      await getReward(contest?.id);
      reload();
      refetchUser();
    } finally {
      setLoading(false);
    }
  };

  const join = async () => {
    if (!contest) return;
    try {
      setLoading(true);
      await joinContest(contest.id);
      reload();
      refetchUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "COMING") {
      reloadIfEnded(date, new Date(contest?.start ?? ""), reload);
    } else if (type == "ON_GOING") {
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
          <div className="w-full flex flex-row justify-between">
            <p className="text-base text-gray-500">
              {"User Count/ " + (contest?.user_count ?? "-")}
            </p>
            {type === "COMING" ? (
              <p className="text-base text-gray-500">
                {"Time To Start/ " +
                  stringifyInterval(date, new Date(contest?.start ?? ""))}
              </p>
            ) : type == "ON_GOING" ? (
              <p className="text-base text-gray-500">
                {"Time To End/ " +
                  stringifyInterval(date, new Date(contest?.end ?? ""))}
              </p>
            ) : (
              <p className="text-base text-gray-500">
                {"Ended/ " +
                  stringifyInterval(new Date(contest?.end ?? ""), date)}
              </p>
            )}
            {type === "COMING" && !contest?.registered && (
              <Button
                label={loading ? "Loading..." : "/ Join"}
                onClick={join}
                disabled={loading}
              />
            )}
            {type === "COMING" && contest?.registered && <span>/ Joined!</span>}

            {type === "ON_GOING" && (
              <Button
                label={"/ Go To Contest"}
                onClick={() => {
                  router.push(`home/${contest?.id}`);
                }}
                disabled={loading}
              />
            )}
            {type === "ARCHIVED" &&
              !contest?.reward_paid &&
              isEligibleForReward && (
                <Button
                  label={loading ? "LOADING..." : "/ Get Reward"}
                  onClick={() => {
                    getRewardAsync();
                  }}
                  disabled={loading}
                />
              )}
            {type === "ARCHIVED" &&
              contest?.reward_paid &&
              isEligibleForReward && <span>/ Reward has been claimed!</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContestCard;
