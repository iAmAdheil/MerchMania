import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from './Card';

async function Main() {
  return (
    <>
      <Navbar role={'anonymous'} />
      <Card />
      <Footer />
    </>
  );
}

export default Main;