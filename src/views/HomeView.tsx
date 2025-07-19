import SearchForm from '../components/SearchForm'
import Header from '../components/Header'

const HomeView = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
        
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">Comparte tu mundo en un solo enlace</h1>
          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            DevTree te permite centralizar todos tus enlaces importantes en un solo perfil personalizado. Ideal para desarrolladores, creadores de contenido y profesionales.
          </p>

          <div className="w-full max-w-md">
            <SearchForm />
          </div>

          <p className="mt-6 text-sm text-gray-500">Totalmente gratis y fácil de usar</p>
        </main>

        <footer className="text-center py-4 text-gray-400 text-sm">
          © {new Date().getFullYear()} DevTree. Todos los derechos reservados.
        </footer>
      </div>
    </>
  )
}

export default HomeView