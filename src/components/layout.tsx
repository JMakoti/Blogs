import { Outlet } from "react-router";
import { useRef } from "react";
import NavBar from "./navbar";

export default function Layout() {
  const formRef = useRef<HTMLFormElement | null>(null);
  
  return (
    <div>
      <NavBar formRef={formRef} />
      <Outlet context={{ formRef }} />
    </div>
  );
}