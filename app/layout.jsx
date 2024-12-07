import '@/styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Prmoptell',
    description: 'Discover and share prompts to leverage AI '
}

const layout = ({children}) => {
  return (
   <Provider>
        <html lang='en'>
            <body>
                <div className="main">
                    
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </body>
        </html>
   </Provider>
  )
}

export default layout
