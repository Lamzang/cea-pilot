export default function AdminUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div>{children}</div>
    </div>
  );
}
