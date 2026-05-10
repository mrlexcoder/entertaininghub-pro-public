import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
