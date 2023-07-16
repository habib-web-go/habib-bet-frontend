interface Question {
  id: number;
  option_a: string;
  option_b: string;
  start: string;
  end: string;
  order: number;
  input: number;
  output: number;
  user_answer: "_" | "A" | "B";
  answer?: "A" | "B";
}

export default Question;
