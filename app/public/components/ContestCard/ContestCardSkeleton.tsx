import React from "react";

interface Props {}

function ContestCardSkeleton(props: Props) {
  return (
    <section>
      <div className="relative items-center w-full py-3 mx-auto">
        <div className="w-full p-4 mx-auto text-left align-bottom transition-all transform bg-gray-100 sm:align-middle sm:p-8 rounded-2xl">
          <div className="w-full mb-4">
            <div className="w-40 h-5 animate-pulse bg-gray-500 rounded-md" />
          </div>
          <div className="w-full">
            <p className="text-base text-gray-500 animate-pulse">
              {"User Count/ "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContestCardSkeleton;
