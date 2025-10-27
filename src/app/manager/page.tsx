"use client";

import { getUnverifiedProfiles } from "@/utils/sponsor-transaction";
import { useEffect } from "react";

export default function DeveloperProfile() {
  useEffect(() => {
    const getData = async () => {
      const data = await getUnverifiedProfiles(10);
      console.log(data)
    };
    getData();
  }, []);
  return <>ok</>;
}
