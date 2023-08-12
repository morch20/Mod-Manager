import { Logo } from "@/components";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
		<div className="w-full flex items-center justify-center">
			<Logo spin />
		</div>
	)
  }