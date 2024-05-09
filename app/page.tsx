import Image from "next/image";
import InputComponent from "./component/inputComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InputComponent />
    </main>
  );
}
