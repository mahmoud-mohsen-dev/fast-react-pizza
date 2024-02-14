import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className=" flex justify-between bg-stone-800 px-4 py-4 uppercase text-slate-200 sm:px-6 sm:text-sm md:text-base">
      <p className=" space-x-4 font-semibold text-slate-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
