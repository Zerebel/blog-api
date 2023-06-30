export default function Header() {
  return (
    <>
      <header>
        <nav>
          <ul className="flex gap-4 py-4 px-8 font-Roboto">
            <li className="uppercase font-bold">Blog API</li>
            <div className="outline outline-1 outline-slate-600"></div>
            <li>View on Github</li>
            <div className="outline outline-1 outline-slate-600"></div>
            <li>Issues</li>
          </ul>
          <hr className="mb-4" />
        </nav>
      </header>
    </>
  );
}
