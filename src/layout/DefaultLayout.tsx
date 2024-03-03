import Line from '../atom/Line';
import Footer from './Footer';
import Header from './Header';
import Section from './Section';

export default function DefaultLayout(props: {
  children: React.ReactNode
}) {
  return (
    <div className="w-auto h-screen">
      <Header />
      <Line />
      <Section>
        {props.children}
      </Section>
      <Footer />
    </div>
  );
}
