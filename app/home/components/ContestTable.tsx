import Contest, { ContestType } from "@/lib/types/contest";
import React from "react";
import ContestCard from "./ContestCard";
import ContestCardSkeleton from "./ContestCard/ContestCardSkeleton";

interface Props {
  label: string;
  contests: Contest[] | null;
  contestType: ContestType;
  isLoading?: boolean;
  date: Date;
  reload: () => void;
  refetchUser: () => void;
}

function ContestTable(props: Props) {
  const { contests, isLoading, label, contestType, date, reload, refetchUser } = props;

  return (
    <div className="px-5 md:px-12 lg:px-20 pt-5">
      <h3 className="text-xl">{label}</h3>
      {isLoading && (
        <>
          <ContestCardSkeleton />
          <ContestCardSkeleton />
          <ContestCardSkeleton />
        </>
      )}
      {contests?.map((contest) => (
        <ContestCard type={contestType} key={contest.id} contest={contest} date={date} reload={reload} refetchUser={refetchUser} />
      ))}
    </div>
  );
}

export default ContestTable;
