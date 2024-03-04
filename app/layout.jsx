import '@styles/globals.css';
import '@styles/styles.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';
import { AuthProvider } from './Providers';

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body className="w-full">
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