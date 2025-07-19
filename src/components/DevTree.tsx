import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import NavigationTabs from "./NavigationTabs";

import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";
import CountUp from "react-countup";
import type { SocialNetwork, User } from "../types/User";
import { useViews } from "../context/useViews";

type DevTreeProps = {
  data: User;
};

export default function DevTree({ data }: DevTreeProps) {
  const { views } = useViews();
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data]);

  const queryClient = useQueryClient();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);
      setEnabledLinks(order);

      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (item: SocialNetwork) => !item.enabled
      );
      const links = order.concat(disabledLinks);
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <>
      <Header />

      <div className="bg-gradient-to-b from-green-100 via-white to-green-50 min-h-screen py-12">
        <main className="mx-auto max-w-6xl px-6">
          <NavigationTabs />

          <div className="flex justify-end mt-8">
            <Link
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold shadow transition"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              🌐 Ver Perfil Público
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-12">
            {/* Área de contenido */}
            <section className="flex-1 bg-white rounded-2xl shadow-xl p-8">
              <Outlet />
            </section>

            {/* Tarjeta de perfil */}
            <aside className="w-full md:w-[400px] bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              {/* Círculo decorativo verde */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-green-200 rounded-full opacity-30"></div>

              <div className="relative z-10 text-center">
                <p className="text-green-700 text-3xl font-extrabold tracking-tight">
                  @{data.handle}
                </p>

                {data.image && (
                  <div className="mt-6 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full ring-4 ring-green-400 overflow-hidden shadow-lg">
                      <img
                        src={data.image}
                        alt="Imagen de perfil"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {data.description && (
                  <p className="mt-4 text-gray-600 text-base italic max-w-xs mx-auto">
                    {data.description}
                  </p>
                )}
              </div>

              {/* Aquí las vistas 👇 */}
              <p className="text-sm text-gray-500 text-center">
                👁️ <CountUp end={data.views} duration={1} />{" "}
                {data.views > 1 ? "visitas" : "visita"}
              </p>

              {/* Enlaces */}
              <div className="mt-10 space-y-5">
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </aside>
          </div>
        </main>

        <Toaster position="top-right" />
      </div>
    </>
  );
}
