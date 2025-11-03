"use client";

import { getUnverifiedProfiles } from "@/utils/sponsor-transaction";
import { useEffect } from "react";

export default function ManagerPage() {
  useEffect(() => {
    const getData = async () => {
      const data = await getUnverifiedProfiles(10);
      // console.log(data)
    };
    getData();
  }, []);
  return <>ok</>;
}
