export const metadata = {
  title: "Shopping Cart",
  description: "Review and manage items in your West Can Auto Parts cart.",
};

export default function CartLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-100 py-2 md:py-4">
      <section>{children}</section>
    </main>
  );
}
