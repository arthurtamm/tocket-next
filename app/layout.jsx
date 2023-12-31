import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
              <Nav />

              <main className='main-container'>
                {children}
              </main>

              <Footer />
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout