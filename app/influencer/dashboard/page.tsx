import Navbar from "@/components/app/navbar/main"
import Header from "@/components/app/pages/influencer-dashboard/header";

import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Eye, 
  Plus,
  BarChart3,
  Users,
  Star,
  Settings
} from "lucide-react";

export default function InfluencerDashBoard() {
	return (
		<div className="w-full border-[0.5px] border-solid border-gray-300">
			<Navbar />
			<Header />
		</div>
	)
}