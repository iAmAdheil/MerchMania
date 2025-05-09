import { FiShoppingCart } from 'react-icons/fi';
import { Tooltip } from '../ui/tooltip';
export default function CartIcon() {
    return (
        <Tooltip content="Cart" showArrow>
            <div className="relative flex items-center justify-center p-2 rounded-full hover:opacity-70 transition-all duration-300 active:scale-90">
                <FiShoppingCart className="text-white" size={22} />
                <div className="absolute bottom-5 left-5 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                    <span className="text-[10px] font-bold font-roboto text-black">
                        3
                    </span>
                </div>
            </div>
        </Tooltip>
    );
}
