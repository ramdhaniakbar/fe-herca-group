import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div>
      <Skeleton className="w-[200px] h-[30px] rounded-md mb-8" />
      <Skeleton className="w-full h-[50px] rounded-md mb-4" />
      <Skeleton className="w-full h-[200px] rounded-md mb-4" />
      <center>
        <Skeleton className="w-[300px] h-[30px] rounded-md" />
      </center>
    </div>
  )
}

export default Loading
