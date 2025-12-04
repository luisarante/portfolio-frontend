import React from 'react';

interface TimelineItemProps {
  ano: string;
  titulo: string;
  local: string;
  descricao: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ ano, titulo, local, descricao }) => {
  return (
    <li className="relative mb-10 ml-4">
      <span className="absolute top-1/2 -translate-y-1/2 -left-[1.85rem] flex justify-center items-center w-6 h-6 bg-background rounded-full ring-8 ring-gray-900">
      </span>
      
      <div className="p-4 ml-8 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
        <time className="block text-sm font-normal leading-none text-gray-400 mb-2">
          {ano}
        </time>
        <h3 className="text-xl font-semibold text-white mb-2">
          {titulo}
        </h3>
        <p className="mb-3 text-sm font-normal text-gray-400">
          {local}
        </p>
        <p className="text-base text-white/80">
          {descricao}
        </p>
      </div>
    </li>
  );
};

export default TimelineItem;