export default function Section(props: { children: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center px-4 bg-blue-gray-50">
      <div className="container">
        {props.children}
      </div>
    </section>
  );
}
