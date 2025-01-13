import Sidebar from '@/components/shared/Sidebar';

export const metadata = {
  title: 'EventEase Platform',
  description: 'a simplified event management platform for creating and managing events, registering attendees, and providing real-time updates.',
};


export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen my-2">
      <div className="flex justify-between">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%] bg-base-200 rounded-box ml-2">{children}</div>
      </div>
    </div>
  );
}
