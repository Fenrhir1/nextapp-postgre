export const dynamic = "force-dynamic";
import InputComponent from "./component/Input";
import { NextUIProvider } from "@nextui-org/react";
import TaskTable from "./component/TaskTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NextUIProvider>
        <main
          className="dark text-foreground bg-background"
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputComponent />
          <TaskTable />
        </main>
      </NextUIProvider>
    </main>
  );
}
