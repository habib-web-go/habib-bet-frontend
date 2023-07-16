const BASE_URL = "/api";

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: "POST" | "GET";
  body?: any;
  json?: boolean;
}) => {
  const res = await fetch(BASE_URL + url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (400 <= res.status && res.status < 500) {
    throw new Error((await res.json()).error);
  }
  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = (user: { username: string; password: string }) => {
  return fetcher({ url: "/user/signup", method: "POST", body: user });
};

export const login = (user: { username: string; password: string }) => {
  return fetcher({ url: "/user/login", method: "POST", body: user });
};

export const me = () => {
  return fetcher({ url: "/user/me", method: "GET" });
};

export const getPublicOnGoingContests = () => {
  return fetcher({ url: "/public/ongoing", method: "GET" });
};

export const getPublicComingContests = () => {
  return fetcher({ url: "/public/coming", method: "GET" });
};

export const getOnGoingContests = () => {
  return fetcher({ url: "/contest/ongoing", method: "GET" });
};

export const getComingContests = () => {
  return fetcher({ url: "/contest/coming", method: "GET" });
};

export const getArchivedContests = () => {
  return fetcher({ url: "/contest/archive", method: "GET" });
};

export const increaseCoin = (amount: number) => {
  return fetcher({
    url: "/user/increase-coins",
    method: "POST",
    body: {
      amount: amount,
    },
  });
};

export const joinContest = (id: number) => {
  return fetcher({ url: `/contest/${id}/register`, method: "POST" });
};

export const getContest = (id: number) => {
  return fetcher({ url: `/contest/${id}`, method: "GET" });
};

export const getReward = (id: number) => {
  return fetcher({ url: `/contest/${id}/reward`, method: "POST" });
};

export const submitAnswer = (id: number, option: "A" | "B") => {
  return fetcher({
    url: `/question/${id}`,
    method: "POST",
    body: {
      option: option,
    },
  });
};
