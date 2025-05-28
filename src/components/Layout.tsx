import type { PropsWithChildren } from "react"
import Header from "./ui/Header"

function Layout({ children }:PropsWithChildren) {
  return (
    <div className="bg-gradient-to-br from-background-to-muted " >
        <Header/>
        <main className="min-h-screen container mx-auto px-4 py-8 " >
        {children}
        </main>
        <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60 ">
            <p className="container mx-auto px-4 text-center text-gray-500" >Made by Sanmith</p>
        </footer>
    </div>
  )
}

export default Layout