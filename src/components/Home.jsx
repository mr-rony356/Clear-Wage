import DrawerAppBar from "./AppBar";
import ClearWageComponent from "./CompanyFooter.jsx";
import CompanyFooter from "./CompanyFooter.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection";
import Form from "./sections/Form.jsx";
import MainSection from "./sections/MainSection";
import Results from "./sections/Results.jsx";

function Home() {
  return (
    <>
      <div className="bg-hexon">
        <div className="bg-opacity">
          <div className="relative z-10">
            <MainSection>
              <DrawerAppBar />
              <HeroSection />
            </MainSection>
          </div>
          <div
            style={{
              maxWidth: "1320px",
              margin: "0 auto",
              paddingBottom: "80px",
            }}
          >
            <img
              src="https://dynabritesystems.com/cw/demos/saas/images/hero.png"
              alt="hero-bg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <Form></Form>
        </div>
      </div>

      <Results></Results>
      <div className="bg-white -mt-6 lg:-mt-16">
        <ClearWageComponent />
      </div>
    </>
  );
}

export default Home;
