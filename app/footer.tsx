import { TextLoop } from '@/components/ui/text-loop'

export function Footer() {
  return (
    <footer className="border-muted mt-24 border-t px-0 py-4">
      <div className="container flex items-center justify-between">
        <a href="https://github.com/kdurek" target="_blank">
          <TextLoop>
            <span>© 2024 HookyCode</span>
            <span>Krzysztof Durek</span>
            <span>Tworzenie stron internetowych</span>
          </TextLoop>
        </a>
      </div>
    </footer>
  )
}
