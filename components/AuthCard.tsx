export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-black p-10 shadow-lg">
      <h1 className="mb-6 text-xl font-semibold text-white">{title}</h1>
      {children}
    </div>
  );
}
