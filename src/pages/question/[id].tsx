import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import React from "react";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.question.getById.useQuery({ id });

  if (!isLoading && !data) {
    return <div>Question not found</div>;
  }

  return (
    <div className="p-8 flex flex-col">
      <div className="text-2xl font-bold">{data?.question}</div>

      <div>
        {(data?.options as string[])?.map((option) => (
          <div>{option}</div>
        ))}
      </div>
    </div>
  );
};

export const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }

  return <QuestionPageContent id={id} />;
};

export default QuestionPage;
