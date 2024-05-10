import Image from "next/image";
import InputComponent from "./component/inputComponent";
import { NextUIProvider } from "@nextui-org/react";

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
        </main>
      </NextUIProvider>
    </main>
  );
}
