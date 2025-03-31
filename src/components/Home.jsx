import ClearWageComponent from "./CompanyFooter.jsx";
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
            <MainSection>{!isContributed && <HeroSection />}</MainSection>
          </div>
          {!isContributed && (
            <div className="w-[82%] max-w-[1100px] mx-auto pb-[80px]">
              <img
                src="/table.png"
                alt="hero-bg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "15px",
                  border: "1px solid gray",
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
