type Experience = {
  logo: string
  company: string
  title: string
  start: string
  end: string
  link: string
}

export type Project = {
  name: string
  link: string
  thumbnail: string
  video: string
  description: string
}

export type Use = {
  name: string
  items: {
    title: string
    description?: string
  }[]
}

export const EXPERIENCE: Experience[] = [
  {
    logo: '/assets/experience/tvn.webp',
    company: 'TVN Warner Bros. Discovery',
    title: 'Frontend Developer',
    start: '01/2022',
    end: 'Teraz',
    link: 'https://tvn24.pl',
  },
  {
    logo: '/assets/experience/hookycode.webp',
    company: 'Hooky Code',
    title: 'Full Stack Developer',
    start: '01/2022',
    end: 'Teraz',
    link: 'https://hookycode.pl',
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'Ampa Park',
    link: 'https://ampapark.pl',
    thumbnail: '/assets/projects/ampapark.webp',
    video: '/assets/projects/ampapark.mp4',
    description:
      'Stworzyłem stronę dla parku rozrywki Ampa Park, która ułatwia rodzicom znalezienie atrakcji i szybki zakup biletów online. Strona jest przystosowana do obsługi wielu lokalizacji, co pozwala na łatwe zarządzanie informacjami o każdym oddziale i efektywne przyciąganie klientów, zwiększając ich zaangażowanie.',
  },
  {
    name: 'Klinck',
    link: 'https://klinck.pl',
    thumbnail: '/assets/projects/klinck.webp',
    video: '/assets/projects/klinck.mp4',
    description:
      'Zaprojektowałem nowoczesną i przejrzystą stronę dla Klinck Klimatyzacje, która skutecznie pozyskuje nowych klientów. Dzięki prostemu układowi i wyraźnym informacjom o usługach (w tym o bezpłatnym kosztorysie), strona buduje zaufanie i zachęca do kontaktu, usprawniając proces zdobywania zleceń.',
  },
  {
    name: 'POP-MEDIA',
    link: 'https://pop-media.pl',
    thumbnail: '/assets/projects/popmedia.webp',
    video: '/assets/projects/popmedia.mp4',
    description:
      'Stworzyłem profesjonalną stronę dla POP-MEDIA, skutecznie prezentującą ich usługi produkcji i montażu filmów. Nowoczesny design z ciemnym tłem podkreśla wizualny charakter branży. Strona jasno przedstawia różnorodność oferowanych formatów i jest dostępna w wielu językach, docierając do szerszej grupy klientów.',
  },
  {
    name: 'Izabela Gajek',
    link: 'https://igajek.pl',
    thumbnail: '/assets/projects/igajek.webp',
    video: '/assets/projects/igajek.mp4',
    description:
      'Zaprojektowałem stronę dla Izabeli Gajek, trenerki personalnej i medycznej, skutecznie budując jej markę i zaufanie. Przejrzysta strona zawiera osobistą historię, która pomaga klientom poczuć więź. Jasno przedstawia plany treningowe z cenami i referencje, ułatwiając potencjalnym klientom podjęcie decyzji i umówienie konsultacji.',
  },
]

export const USES: Use[] = [
  {
    name: 'Sprzęt',
    items: [
      {
        title: 'MacBook Air M4 13"',
        description: `Specyfikacja:
- Apple M4 (10 rdzeniowy CPU + 10 rdzeniowy GPU)
- 16 GB RAM
- 512 GB SSD`,
      },
      {
        title: 'Synology DS220+',
        description: 'NAS do przechowywania danych',
      },
      {
        title: 'DELL Wyse 5070 (J5005)',
        description: 'Serwer w home labie',
      },
      {
        title: 'Green Cell UPS (600VA/360W)',
        description:
          'UPS do zasilania serwerów w home labie w razie awarii prądu',
      },
      {
        title: 'Monitor Gigabyte 34" G34WQC (3440x1440, 144Hz)',
        description: 'Monitor',
      },
      {
        title: 'Logitech MX Master 3',
        description: 'Mysz bezprzewodowa',
      },
      {
        title: 'Keychron K3 Pro H3',
        description: 'Niskoprofilowa bezprzewodowa klawiatura mechaniczna',
      },
    ],
  },
  {
    name: 'Aplikacje',
    items: [
      {
        title: 'Cursor',
        description: 'Edytor kodu',
      },
      {
        title: 'Google Gemini',
        description:
          'Asystent dzięki któremu mogę dodawać głosowo notatki i planować zadania',
      },
      {
        title: 'Google Tasks',
        description: 'Zarządzanie zadaniami',
      },
      {
        title: 'Google Keep',
        description: 'Szybkie notatki',
      },
      {
        title: 'Obsidian',
        description: 'Baza wiedzy',
      },
      {
        title: 'Raycast',
        description: 'Alternatywa dla Spotlight',
      },
      {
        title: '1Password',
        description:
          'Zarządzanie hasłami i danymi logowania do stron i aplikacji',
      },
      {
        title: 'iTerm2',
        description: 'Terminal',
      },
      {
        title: 'Shottr',
        description: 'Narzędzie do zrzutów ekranu',
      },
      {
        title: 'Stats',
        description: 'Statystyki systemu w pasku menu',
      },
      {
        title: 'Ice',
        description: 'Ukrywanie aplikacji w pasku menu',
      },
      {
        title: 'Rectangle Pro',
        description: 'Zarządzanie oknami',
      },
      {
        title: 'LinearMouse',
        description:
          'Konfiguracja myszy, głównie używana do wyłączenia akceleracji sprzętowej',
      },
      {
        title: 'Synology Drive',
        description: 'Dysk w chmurze z danymi lokalnie',
      },
      {
        title: 'Synology Photos',
        description:
          'Zarządzanie zdjęciami i filmami, backup z telefonów do NAS',
      },
      {
        title: 'RustDesk',
        description: 'Zdalne sterowanie urządzeniami',
      },
      {
        title: 'KDE Connect',
        description: 'Agnostyczna synchronizacja urządzeń',
      },
    ],
  },
  {
    name: 'Terminal',
    items: [
      {
        title: 'Homebrew',
        description: 'Menadżer paczek',
      },
      {
        title: 'Zoxide',
        description: 'Pozwala przeskakiwać pomiędzy ścieżkami',
      },
      {
        title: 'Fish shell',
        description: `Pluginy (fisher):
- franciscolourenco/done
- jorgebucaran/autopair.fish
- jethrokuan/fzf
- meaningful-ooo/sponge
- gazorby/fish-abbreviation-tips
- kidonng/zoxide.fish
- catppuccin/fish
- jhillyerd/plugin-git
- asim-tahir/docker.fish
- asim-tahir/docker-compose.fish
- nickeb96/puffer-fish
- halostatue/fish-brew
- realiserad/fish-ai`,
      },
    ],
  },
  {
    name: 'Self-Hosted',
    items: [
      {
        title: 'Adguard Home',
        description: 'DNS do blokowania reklam i innych niechcianych treści',
      },
      {
        title: 'Traefik',
        description: 'Reverse proxy',
      },
      {
        title: 'Cloudflared',
        description: 'DNS i proxy',
      },
      {
        title: 'Watch Your Lan',
        description: 'Monitorowanie sieci LAN',
      },
      {
        title: 'Watchtower',
        description: 'Monitorowanie kontenerów i automatyczne aktualizacje',
      },
      {
        title: 'Homepage',
        description: 'Dashboard z szybkim dostępem do aplikacji',
      },
      {
        title: 'Paperless-ngx',
        description: 'Zarządzanie dokumentami i skanami',
      },
      {
        title: 'Linkding',
        description: 'Zarządzanie zakładkami',
      },
      {
        title: 'Miniflux',
        description: 'Czytnik RSS',
      },
      {
        title: 'MinIO',
        description: 'Kompatybilny z S3 API',
      },
      {
        title: 'n8n',
        description: 'Automatyzacja zadań',
      },
      {
        title: 'git-sync',
        description: 'Synchronizacja repozytoriów z GitHub',
      },
      {
        title: 'it-tools',
        description: 'Przydatne narzędzia dla developerów',
      },
      {
        title: 'Coolify',
        description: 'Zarządzanie aplikacjami na VPS',
      },
      {
        title: 'Stirling-PDF',
        description: 'Narzędzia do edycji PDF',
      },
    ],
  },
]
