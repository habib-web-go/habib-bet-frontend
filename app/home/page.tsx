"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ContestTable from "./components/ContestTable";
import Contest from "@/lib/types/contest";
import {
  getArchivedContests,
  getComingContests,
  getOnGoingContests,
} from "@/lib/api";
import IncreaseCoin from "./components/IncreaseCoin";
import useUser from "../hook/useUser";

function Home() {
  const [onGoingContests, setOnGoingContests] = useState<Contest[] | null>(
    null
  );
  const [comingContests, setComingContests] = useState<Contest[] | null>(null);
  const [archivedContests, setArchivedContests] = useState<Contest[] | null>(
    null
  );
  var [date, setDate] = useState(new Date())
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()),1000)
    return function cleanup(){
      clearInterval(timer)
    }
  })
  const getOnGoingData = async () => {
    try {
      const data = await getOnGoingContests();
      setOnGoingContests(data.data);
    } catch (error) {}
  };

  const getComingData = async () => {
    try {
      const data = await getComingContests();
      setComingContests(data.data);
    } catch (error) {}
  };

  const getArchivedData = async () => {
    try {
      const data = await getArchivedContests();
      setArchivedContests(data.data);
    } catch (error) {}
  };

  const fetchData = () => {
    getOnGoingData();
    getComingData();
    getArchivedData();
  }

  const { refetchUser } = useUser()

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="w-full">

      <IncreaseCoin />
      <ContestTable
        contestType="ON_GOING"
        isLoading={!onGoingContests}
        label="ON GOING/"
        contests={onGoingContests}
        date={date}
        reload={fetchData}
        refetchUser={refetchUser}
      />
      <ContestTable
        contestType="COMING"
        isLoading={!comingContests}
        label="COMING/"
        contests={comingContests}
        date={date}
        reload={fetchData}
        refetchUser={refetchUser}
      />
      <ContestTable
        contestType="ARCHIVED"
        isLoading={!archivedContests}
        label="ARCHIVED/"
        contests={archivedContests}
        date={date}
        reload={fetchData}
        refetchUser={refetchUser}
      />
    </div>
  );
}

export default Home;
