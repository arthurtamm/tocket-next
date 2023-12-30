import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <main className='mt-5'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout