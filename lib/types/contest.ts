import Question from "./question";

type ContestType = "ON_GOING" | "COMING" | "ARCHIVED";

interface Contest {
  id: number;
  name: string;
  start: string;
  end: string;
  user_count: number;
  questions: Question[];
  question_count: number;
  registered: boolean;
  reward_paid: boolean;
}

export default Contest;
export { type ContestType };
