import DrawerAppBar from './AppBar'
import Footer from './Footer.jsx'
import HeroSection from './HeroSection'
import Form  from './sections/Form.jsx'
import MainSection from './sections/MainSection'
import Results from './sections/Results.jsx'

function Home() {

    return (
        <>
            <MainSection>
                <DrawerAppBar />
                <HeroSection/>
            </MainSection>

            <Form></Form>
            <Results></Results>
            <Footer></Footer>


        </>

    )
}

export default Home
