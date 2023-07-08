import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const mutation = trpc.question.create;

  return (
    <input
      onSubmit={(event) => {
        console.log("value???", event.currentTarget.value);
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
    <div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data[0]?.question}
      </div>
      <QuestionCreator />
    </div>
  );
}
