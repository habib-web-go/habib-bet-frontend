"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContestTable from "./components/ContestTable";
import Contest from "@/lib/types/contest";
import {
  getPublicComingContests,
  getPublicOnGoingContests,
} from "@/lib/api";

function Public() {
  const [onGoingContests, setOnGoingContests] = useState<Contest[] | null>(
    null
  );
  const [comingContests, setComingContests] = useState<Contest[] | null>(null);
  var [date, setDate] = useState(new Date())
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()),1000)
    return function cleanup(){
      clearInterval(timer)
    }
  })
  const getOnGoingData = async () => {
    try {
      const data = await getPublicOnGoingContests();
      setOnGoingContests(data.data);
    } catch (error) {}
  };

  const getComingData = async () => {
    try {
      const data = await getPublicComingContests();
      setComingContests(data.data);
    } catch (error) {}
  };

  const fetchData = () => {
    getOnGoingData()
    getComingData()
  }

  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div className="w-full">
      <Navbar />
      <ContestTable
        isLoading={!onGoingContests}
        label="ON GOING/"
        contests={onGoingContests}
        date={date}
        reload={fetchData}
      />
      <ContestTable
        isLoading={!comingContests}
        label="COMING/"
        contests={comingContests}
        date={date}
        reload={fetchData}
      />
    </div>
  );
}

export default Public;
