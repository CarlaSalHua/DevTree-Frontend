import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SocialNetwork } from "../types/User";

type DevTreeLinkProps = {
  link: SocialNetwork;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-white hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md px-5 py-3 flex items-center gap-4 rounded-xl border border-gray-200 cursor-move"
      {...attributes}
      {...listeners}
    >
      <div
        className="w-12 h-12 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <div className="text-left">
        <p className="text-gray-500 text-sm">Visita mi:</p>
        <p className="capitalize font-semibold text-green-700 text-base">
          {link.name}
        </p>
      </div>
    </li>
  );
}
