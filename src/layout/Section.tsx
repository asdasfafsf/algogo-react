export default function Section(props: { children: React.ReactNode }) {
  return (
    <section className="flex justify-center items-center w-screen px-4">
      <div className="container">
        {props.children}
      </div>
    </section>
  );
}
