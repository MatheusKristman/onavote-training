import { prisma } from "../db/client";

export default function Home(props: any) {
  return (
    <main>
      <p className="text-2xl font-bold">
        Get started by editing&nbsp;
        <code>pages/index.tsx</code>
      </p>

      <code>{props.questions}</code>
    </main>
  );
}

export const getServerSideProps = async () => {
  const questions = await prisma.pollQuestion.findMany();

  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
