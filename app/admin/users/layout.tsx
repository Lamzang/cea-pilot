export default function AdminUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="border">
        <div>Manage User</div>
        <div className="flex justify-center gap-28">
          <div>
            <div>Total User Number</div>
            <div>122</div>
          </div>
          <div>
            <div>New User for month</div>
            <div>22</div>
          </div>
          <div>
            <div>Activate User for month</div>
            <div>36</div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
