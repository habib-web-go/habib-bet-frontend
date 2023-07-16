"use client";

import { getContest } from "@/lib/api";
import Contest from "@/lib/types/contest";
import React, { useEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import QuestionCardSkeleton from "./components/QuestionCard/QuestionCardSkeleton";

interface Props {
  id: string;
}

function ContestPage(props: { params: Props }) {
  const { params } = props;
  const { id } = params;
  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const activeQuestion =
    contest && contest.questions[contest.questions.length - 1];

  const isLoosed =
    (contest?.questions.length ?? 2) > 1 &&
    (contest?.questions?.filter((q) => {
      if (q.id === activeQuestion?.id) return true;
      return q.answer !== q.user_answer;
    }).length ?? 1) > 0;

  const getContestAsync = async () => {
    try {
      setLoading(true);
      const contest = await getContest(Number(id));
      setContest(contest);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContestAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!contest) {
    return (
      <div className="flex flex-col p-5">
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-5">
      {contest?.name}
      <QuestionCard
        question={activeQuestion}
        reload={getContestAsync}
        isFetching={loading}
        isHistory={false}
        isLoosed={isLoosed}
      />
      <div className="h-1 w-full bg-gray-100 rounded-lg my-5" />
      <p>History</p>
      {contest?.questions.slice(0, -1).map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          reload={getContestAsync}
          isFetching={false}
          isHistory={true}
          isLoosed={false}
        />
      ))}
    </div>
  );
}

export default ContestPage;
