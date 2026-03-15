import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
    return (
        <>
            <Header/>
            <main className="px-4">{children}</main>
            <Footer/>
        </>
    )
}

export default Layout