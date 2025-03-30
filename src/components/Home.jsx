import DrawerAppBar from "./AppBar";
import ClearWageComponent from "./CompanyFooter.jsx";
import CompanyFooter from "./CompanyFooter.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection";
import Form from "./sections/Form.jsx";
import MainSection from "./sections/MainSection";
import Results from "./sections/Results.jsx";
import ScrollToTop from "./ScrollToTop";

function Home() {
  const isContributed = localStorage.getItem("hasContributed");
  return (
    <>
      <div className={` ${isContributed ? "bg-hexon-result" : "bg-hexon"}`}>
        <div
          className={`${isContributed ? "bg-opacity-result" : "bg-opacity"}`}
        >
          <div className="relative z-10">
            <MainSection>
              <DrawerAppBar />
              {!isContributed && <HeroSection />}
            </MainSection>
          </div>
          {!isContributed && (
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
          )}
          <Form></Form>
        </div>
      </div>

      <Results></Results>
      <div className="bg-white -mt-12 lg:-mt-14">
        <ClearWageComponent />
      </div>
      <ScrollToTop />
    </>
  );
}

export default Home;
