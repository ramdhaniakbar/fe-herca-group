export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Herca Group</h1>

        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:bg-gray-900 px-4 py-2 rounded">
              Overview
            </a>
          </li>
          <li>
            <a href="/transactions" className="hover:bg-gray-900 px-4 py-2 rounded">
              Transactions
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}