import React from "react";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.question.create.useMutation({
    onSuccess: (data) => {
      console.log("did we succeed?", data);
      client.question.getAll.invalidate();

      if (!inputRef.current) {
        return;
      }

      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          console.log("enter!!!", event.currentTarget.value);
          const question = event.currentTarget.value;
          mutate({ question, ownerToken: "" });
          event.currentTarget.value = "";
        }
      }}
    ></input>
  );
};

export default function Home(props: any) {
  const { data, isLoading } = trpc.question.getAll.useQuery();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data.map((question) => {
          return (
            <Link href={`/question/${question.id}`}>
              <div key={question.id} className="my-2">
                {question.question}
              </div>
            </Link>
          );
        })}
      </div>
      <QuestionCreator />
    </div>
  );
}
