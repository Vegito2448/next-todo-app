interface Props extends React.PropsWithChildren {
  title: string;
}

export const WidgetItem = ({ children, title }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1" >
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div
          className="flex flex-col items-center justify-center h-full w-full border-dashed border-2 border-gray-200 rounded-xl "
        >
          <h5 className="text-xl text-gray-600 text-center">{title}</h5>
          <div className="mt-2 flex flex-col justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
