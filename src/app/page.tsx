import { Metadata } from "next";
import WorkoutCalendar from "./components/WorkoutCalendar";
import { addDays, subDays } from "date-fns";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <div>
        <WorkoutCalendar
          events={[
            { date: subDays(new Date(), 6), title: "Post video" },
            { date: subDays(new Date(), 1), title: "Edit video" },
            { date: addDays(new Date(), 3), title: "Code" },
          ]}
        />
      </div>
    </div>
  );
}
