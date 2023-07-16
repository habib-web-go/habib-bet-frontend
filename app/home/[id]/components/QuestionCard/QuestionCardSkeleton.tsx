import Contest from "@/lib/types/contest";
import React from "react";

interface Props {}

function QuestionCardSkeleton(props: Props) {
  return (
    <section className="pt-5">
      <div className="relative items-center w-full py-3 mx-auto">
        <div className="w-full p-4 mx-auto text-left align-bottom transition-all transform bg-gray-100 sm:align-middle sm:p-8 rounded-2xl">
          <div className="w-full mb-4 animate-pulse">
            <div className="h-3 w-20 bg-gray-300 rounded-sm"></div>
            <div className="flex flex-row my-5 gap-5">
              <div className="w-full h-10 rounded-full bg-slate-400" />
              <div className="w-full h-10 rounded-full bg-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionCardSkeleton;
