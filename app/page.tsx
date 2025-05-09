import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"; 

export default function Home() {
  return (
    <div className="">		
		<InteractiveHoverButton
			className="text-xs bg-rgba(0, 0, 0, 0.8) text-white py-1.5 px-0 border-gray-600 w-20 rounded-md"
		>
			Sign in
		</InteractiveHoverButton>
	</div>
  );
}
