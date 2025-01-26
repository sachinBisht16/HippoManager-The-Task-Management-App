export default function Topbar({ toggleSidebar }) {
  return (
    <header className="flex w-full bg-black sticky top-0 z-10 flex-shrink: 0 p-2">
      <div className="flex flex-col gap-1 my-auto ml-2" onClick={toggleSidebar}>
        <div className="bg-white h-1 w-5"></div>
        <div className="bg-white h-1 w-5"></div>
        <div className="bg-white h-1 w-5"></div>
      </div>
    </header>
  );
}
