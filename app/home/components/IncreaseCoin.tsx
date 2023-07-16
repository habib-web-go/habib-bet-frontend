import Button from "@/app/components/Button";
import useUser from "@/app/hook/useUser";
import { increaseCoin } from "@/lib/api";
import React, { useState } from "react";

function IncreaseCoin() {
  const [coinLoading, setCoinLoading] = useState<boolean>(false);
  const { refetchUser, loading: userLoading } = useUser();

  const loading = coinLoading || userLoading;

  return (
    <div className="px-5 pt-5">
      <Button
        label={loading ? "LOADING..." : "Increase Coin/ 10"}
        className="w-full"
        onClick={async () => {
          try {
            setCoinLoading(true);
            await increaseCoin(10);
            refetchUser();
          } catch (error) {
          } finally {
            setCoinLoading(false);
          }
        }}
      />
    </div>
  );
}

export default IncreaseCoin;
