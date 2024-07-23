import Link from "next/link";
import { MdSupervisedUserCircle } from "react-icons/md";

function Card({ total, link, count, oldCount }) {
  const percentageChange = calculatePercentageChange(oldCount, count);
  const formattedPercentage = percentageChange.toFixed(0); // تحويل النسبة المئوية إلى عدد صحيح
  
  return (
    <Link href={link} className='bg-[#182237] hover:bg-[#182237]/50 cursor-pointer p-5 flex gap-x-3 rounded-xl w-full'>
        <MdSupervisedUserCircle size={25}/>
        <div className='flex flex-col gap-y-4'>
          <h5>{total}</h5>
          <p className='text-xl'>{count}</p>
          <p className='capitalize text-left text-xs'>
            <span className={`text-teal-300 ${percentageChange > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {percentageChange > 0 ? `+${formattedPercentage}` : formattedPercentage}%
            </span>
            {percentageChange > 0 ? ' more than previous week' : ' less than previous week'}
          </p>
        </div>
    </Link>
  );
}

// استخدم الدالة calculatePercentageChange
function calculatePercentageChange(oldCount, newCount) {
  if (oldCount === 0) return 0;
  return ((newCount - oldCount) / oldCount) * 100;
}

export default Card;