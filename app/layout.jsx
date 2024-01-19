import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';
import { AuthProvider } from './Providers';

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <AuthProvider>
              <Nav />

              <main className='main-container'>
                {children}
              </main>

              <Footer />
            </AuthProvider>
        </body>
    </html>
  )
}

export default RootLayout