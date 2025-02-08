// import Footer from './Footer';
import Header from './Header';
import Section from './Section';
import { LandingFooter } from './landing';

export default function DefaultLayout(props: {
  children: React.ReactNode
}) {
  return (
    <div className="w-auto h-screen">
      <Header />
      <Section>
        {props.children}
      </Section>
      <LandingFooter />
    </div>
  );
}
