import { RiGithubFill } from './assets/icons'
export const Footer = () => {
  return (
    <footer className="absolute bottom-4">
      <a href="https://github.com/AaaRynt/react-todo" target="_blank" className="flex hover:underline">
        <RiGithubFill className="mr-4 h-6" />
        <span>github.com/AaaRynt/react-todo</span>
      </a>
    </footer>
  )
}
