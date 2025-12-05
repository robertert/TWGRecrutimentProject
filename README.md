# 📱 TWGProjekt - YouTube Video Learning App

Aplikacja mobilna do nauki oparta na treściach YouTube, stworzona jako zadanie rekrutacyjne dla TWG. Aplikacja umożliwia przeglądanie, wyszukiwanie i odtwarzanie filmów edukacyjnych z YouTube, a także tworzenie notatek z przypisaniem do konkretnych momentów wideo.

## 🚀 Tech Stack

### Główne technologie

- **React Native 0.81.5** - Framework do budowy aplikacji mobilnych
- **Expo ~54.0.27** - Narzędzie do rozwoju aplikacji React Native z wbudowanymi API
- **Expo Router ~6.0.17** - Routing oparty na systemie plików (file-based routing)
- **TypeScript 5.9.2** - Typowanie statyczne dla lepszej jakości kodu

### State Management & Data Fetching

- **Zustand 5.0.9** - Lekka biblioteka do zarządzania stanem globalnym
  - _Dlaczego Zustand?_ Minimalistyczna, wydajna alternatywa dla Redux, idealna dla średnich projektów. Używana do zarządzania stanem autoryzacji, ustawień, notatek i odtwarzacza wideo.
- **TanStack Query (React Query) 5.90.12** - Biblioteka do zarządzania danymi asynchronicznymi
  - _Dlaczego TanStack Query?_ Automatyczne cachowanie, refetching, infinite queries i optymalizacja zapytań do API. Idealna do pracy z YouTube Data API v3.

### UI & Performance

- **@shopify/flash-list 2.0.2** - Wysokowydajna lista zastępująca FlatList
  - _Dlaczego FlashList?_ Znacznie lepsza wydajność przy długich listach dzięki inteligentnemu renderowaniu tylko widocznych elementów.
- **react-native-video 6.18.0** - Odtwarzacz wideo z natywnymi kontrolkami
  - _Wymaga Development Build_ - Biblioteka wymaga natywnego kodu, nie działa w Expo Go.
- **expo-image ~3.0.11** - Zoptymalizowany komponent Image z cachowaniem
- **@react-navigation/material-top-tabs 7.4.8** - Material Design top tabs dla ekranów szczegółów wideo

### Walidacja & Narzędzia

- **Zod 4.1.13** - Walidacja schematów TypeScript-first
  - Używana do walidacji odpowiedzi z YouTube API, zapewniając type-safety na poziomie runtime.
- **expo-notifications ~0.32.14** - System powiadomień dla przypomnień o nauce
- **@react-native-async-storage/async-storage 2.2.0** - Lokalne przechowywanie danych

## ✅ Features

### 🔐 Autoryzacja

- **Logowanie jako gość** - Prosty system autoryzacji bez wymagania konta użytkownika
- Ekran logowania z linkami do Terms of Conditions i Privacy Policy

### 🏠 Ekran główny (Home)

- **Pasek wyszukiwania** - Szybkie wyszukiwanie filmów z przekierowaniem do ekranu wyników
- **Kategorie edukacyjne** - Predefiniowane kategorie:
  - TypeScript
  - React
  - React Native
  - JavaScript
- **Poziome listy filmów** - Każda kategoria wyświetla listę filmów w formie poziomego scrolla
- **Infinite scrolling** - Automatyczne ładowanie kolejnych filmów przy przewijaniu

### 🔍 Wyszukiwanie (Search)

- **Wyszukiwanie filmów YouTube** - Integracja z YouTube Data API v3
- **Sortowanie wyników** - Opcje sortowania:
  - Most popular (domyślnie)
  - Date
  - Rating
  - Relevance
  - Title
- **Filtrowanie** - Modal z opcjami sortowania
- **Paginacja** - Infinite scrolling z automatycznym ładowaniem kolejnych stron
- **Skeleton loaders** - Placeholdery podczas ładowania danych
- **Obsługa błędów** - Komunikaty błędów z możliwością ponowienia próby
- **Pull-to-refresh** - Odświeżanie wyników przez przeciągnięcie w dół

### 🎬 Odtwarzacz wideo

- **Natywny odtwarzacz wideo** - Wykorzystanie `react-native-video`
- **Niestandardowe kontrolki** - Własne kontrolki z funkcjami:
  - Play/Pause
  - Przewijanie (seek) z suwakiem
  - Wyświetlanie czasu aktualnego i całkowitego
  - Automatyczne ukrywanie kontrolek po 3 sekundach
- **Informacje o filmie** - Tytuł i informacje o kanale
- **Zakładki (Tabs)**:
  - **Details** - Opis filmu, statystyki (wyświetlenia, polubienia)
  - **Notes** - System notatek z przypisaniem do konkretnych momentów wideo

### 📝 System notatek

- **Notatki z timestampem** - Każda notatka zapisuje aktualny czas odtwarzania
- **Nawigacja do momentu** - Kliknięcie notatki przewija wideo do odpowiedniego momentu
- **Lokalne przechowywanie** - Notatki zapisywane lokalnie w AsyncStorage
- **Notatki per wideo** - Oddzielne notatki dla każdego filmu

### ⚙️ Ustawienia (Settings)

- **Przypomnienia o nauce** - System powiadomień z możliwością:
  - Włączenia/wyłączenia przypomnień
  - Ustawienia czasu przypomnienia (Time Picker)
  - Codziennych powiadomień o nauce
  - ⚠️ **Ograniczenie:** Powiadomienia działają tylko na fizycznym urządzeniu (nie działają w symulatorach/emulatorach)
- **Profil użytkownika** - Wyświetlanie informacji o użytkowniku

## 🛠️ Installation & Setup

### Wymagania wstępne

- Node.js (wersja 18 lub nowsza)
- npm lub yarn
- Expo CLI (zainstalowana globalnie lub używana przez npx)
- iOS Simulator (dla macOS) lub Android Emulator / fizyczne urządzenie
- YouTube Data API v3 Key

### Instalacja zależności

```bash
# Zainstaluj zależności
npm install
# lub
yarn install
```

### Konfiguracja zmiennych środowiskowych

1. Skopiuj plik `.env.example` w głównym katalogu projektu:

```bash
cp .env.example .env
```

```bash
EXPO_PUBLIC_YOUTUBE_API_KEY=twoj_klucz_api_youtube
```

2. **Jak uzyskać YouTube API Key:**
   - Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
   - Utwórz nowy projekt lub wybierz istniejący
   - Włącz YouTube Data API v3
   - Utwórz klucz API w sekcji "Credentials"
   - Skopiuj klucz do pliku `.env`

### ⚠️ Ważne: Development Build wymagany

Aplikacja używa `react-native-video`, która wymaga natywnego kodu. **Nie można uruchomić tej aplikacji w Expo Go**. Musisz użyć Development Build.

### Prebuild (wymagane przed pierwszym uruchomieniem)

Przed pierwszym uruchomieniem aplikacji musisz wykonać prebuild, który wygeneruje natywne pliki dla iOS i Android:

```bash
# Wykonaj prebuild
npx expo prebuild

# Lub z czyszczeniem istniejących plików natywnych
npx expo prebuild --clean
```

**Uwaga:** Prebuild generuje foldery `ios/` i `android/` z natywnym kodem. Te foldery są wymagane dla aplikacji używających natywnych modułów.

### Uruchomienie aplikacji

#### iOS

```bash
# Uruchom Development Build na iOS
npx expo run:ios
```

**Uwagi:**

- Aby zbudować aplikację na fizycznym urządzeniu iOS, musisz skonfigurować code signing w Xcode. Szczegółowe instrukcje znajdziesz w [dokumentacji Expo o konfiguracji code signing](https://github.com/expo/fyi/blob/main/setup-xcode-signing.md).

- ⚠️ **Powiadomienia działają tylko na fizycznym urządzeniu** - nie działają w iOS Simulator. Aby przetestować funkcjonalność powiadomień, musisz zbudować aplikację na fizycznym urządzeniu iOS.

#### Android

```bash
# Uruchom Development Build na Android
npx expo run:android
```

**Uwaga:** ⚠️ **Powiadomienia działają tylko na fizycznym urządzeniu** - nie działają w Android Emulator. Aby przetestować funkcjonalność powiadomień, musisz zbudować aplikację na fizycznym urządzeniu Android.

### Pierwsze uruchomienie

1. Po pierwszym uruchomieniu, aplikacja wyświetli ekran logowania
2. Kliknij "Log in as guest" aby kontynuować
3. Zostaniesz przekierowany do ekranu głównego z kategoriami

## 📂 Project Structure

```
TWGProjekt/
├── app/                          # Expo Router - file-based routing
│   ├── _layout.tsx              # Główny layout z QueryClientProvider
│   ├── index.tsx                # Entry point
│   ├── (auth)/                  # Grupa routingu dla autoryzacji
│   │   ├── _layout.tsx
│   │   └── sign-in.tsx          # Ekran logowania
│   └── (app)/                   # Grupa routingu dla aplikacji
│       └── (stack)/
│           ├── (tabs)/          # Bottom tabs navigation
│           │   ├── home.tsx     # Ekran główny
│           │   └── search.tsx   # Ekran wyszukiwania
│           ├── settings.tsx     # Ekran ustawień
│           └── video/
│               └── [id]/        # Dynamiczny routing dla wideo
│                   ├── index.tsx    # Odtwarzacz wideo
│                   ├── details.tsx  # Szczegóły filmu
│                   └── notes.tsx    # Notatki do filmu
│
├── components/                   # Komponenty wielokrotnego użytku
│   ├── CategoryItem.tsx         # Komponent kategorii z listą filmów
│   ├── SearchBar.tsx            # Pasek wyszukiwania
│   ├── MovieItem.tsx            # Element listy filmów
│   ├── SearchResultItem.tsx     # Element wyniku wyszukiwania
│   ├── Controls.tsx             # Kontrolki odtwarzacza wideo
│   ├── VideoTabs.tsx            # Zakładki w odtwarzaczu
│   ├── FilterModal.tsx          # Modal z opcjami sortowania
│   ├── ProfileInfo.tsx          # Informacje o profilu
│   ├── AnimatedSwitch.tsx       # Przełącznik animowany
│   ├── TimePickerModal.tsx      # Wybór czasu przypomnienia
│   └── skeletons/               # Skeleton loaders
│       ├── CategoryItemSkeleton.tsx
│       ├── MovieItemSkeleton.tsx
│       ├── SearchResultItemSkeleton.tsx
│       ├── MovieDetailsSkeleton.tsx
│       └── UserSkeleton.tsx
│
├── constants/                    # Stałe aplikacji
│   ├── colors.ts                # Paleta kolorów
│   ├── categories.ts            # Predefiniowane kategorie
│   └── flags.ts                 # Flagi (jeśli używane)
│
├── hooks/                        # Custom hooks
│   ├── useVideoSearch.ts        # Hook do wyszukiwania filmów
│   ├── useVideoSearchDetails.ts # Hook do szczegółów filmu
│   ├── useVideoPlayer.ts        # Hook do zarządzania odtwarzaczem
│   ├── useVideoControls.ts      # Hook do kontrolek wideo
│   └── useNotifiactions.ts      # Hook do powiadomień
│
├── services/                     # Warstwa serwisów API
│   └── youtubeApiService.ts     # Integracja z YouTube Data API v3
│
├── store/                        # Zustand stores
│   ├── authStore.ts             # Stan autoryzacji
│   ├── videoStore.ts            # Stan odtwarzacza wideo
│   ├── notesStore.ts            # Stan notatek
│   └── settingsStore.ts         # Stan ustawień
│
├── types/                        # Definicje typów TypeScript
│   └── types.ts                 # Wspólne typy
│
├── utils/                        # Funkcje pomocnicze
│   └── functions.ts             # Funkcje utility
│
├── assets/                       # Zasoby statyczne
│   ├── fonts/                   # Czcionki Poppins
│   ├── icons/                   # Ikony SVG
│   └── video/                   # Lokalne pliki wideo (dla testów)
│
├── app.json                      # Konfiguracja Expo
├── package.json                  # Zależności projektu
└── tsconfig.json                 # Konfiguracja TypeScript
```

## 💡 Key Decisions / Trade-offs

### 1. **TanStack Query - Strategia cachowania**

Aplikacja wykorzystuje inteligentne strategie cachowania w TanStack Query:

- **Dla kategorii:** `staleTime: 1 godzina` - Kategorie mają filtr mostPopular, więc raczej nie powinny się za często zmieniać
- **Dla wyszukiwań:** `staleTime: 5 minut` - Wyniki wyszukiwania się mogą zmieniać, więc krótszy czas cache
- **Dla video details:** `staleTime: 1 minuta` - Wyświetlenia się czesto zmieniają, więc któtki cache

```typescript
// Przykład z useVideoSearch.ts
staleTime: categories.some((category) => category.name === query)
  ? 1000 * 60 * 60 * 1 // 1 godzina dla kategorii
  : 1000 * 60 * 5; // 5 minut dla wyszukiwań
```

**Dlaczego?** Zmniejsza zużycie quota YouTube API i poprawia wydajność aplikacji.

### 2. **FlashList dla wydajności**

Zamiast standardowego `FlatList`, aplikacja używa `@shopify/flash-list`:

- **Lepsza wydajność** - Renderuje tylko widoczne elementy
- **Mniejsze zużycie pamięci** - Idealne dla długich list wyników wyszukiwania
- **Szybsze przewijanie** - Płynniejsze animacje przy dużej liczbie elementów

**Używane w:**

- Listach wyników wyszukiwania (Search)
- Poziome listy filmów w kategoriach (CategoryItem)

### 3. **Zustand zamiast Redux**

Wybór Zustand zamiast Redux dla prostoty:

- **Mniej boilerplate** - Prostsza składnia
- **Lżejszy** - Mniejszy bundle size
- **Wystarczający** - Dla potrzeb tego projektu (auth, video, notes, settings)

### 4. **Zod dla walidacji runtime**

Walidacja odpowiedzi z YouTube API przy użyciu Zod:

- **Type-safety w runtime** - Walidacja danych z API przed użyciem
- **Lepsze error handling** - Łatwiejsze debugowanie problemów z API
- **Type inference** - Automatyczne generowanie typów TypeScript

### 5. **Expo Router - File-based routing**

Wykorzystanie Expo Router zamiast React Navigation:

- **Intuicyjna struktura** - Routing oparty na strukturze folderów
- **Type-safe navigation** - Automatyczne typowanie ścieżek
- **Zagnieżdżone routing** - Grupy routingu `(auth)` i `(app)` dla lepszej organizacji

### 6. **Niestandardowe kontrolki wideo**

Zamiast domyślnych kontrolek `react-native-video`, aplikacja implementuje własne:

- **Lepsza kontrola UX** - Dostosowanie do designu aplikacji
- **Funkcjonalność timestampów** - Integracja z systemem notatek
- **Automatyczne ukrywanie** - Lepsze doświadczenie użytkownika

### 7. **Infinite Queries z deduplikacją**

Implementacja deduplikacji wyników w `useVideoSearch`:

```typescript
const seen = new Set();
return allVideos.filter((video) => {
  if (seen.has(video.id)) return false;
  seen.add(video.id);
  return true;
});
```

**Dlaczego?** YouTube API czasami zwraca duplikaty przy paginacji. Deduplikacja zapewnia unikalność wyników.

## 📝 Uwagi dla deweloperów

- Aplikacja wymaga **Development Build** - nie działa w Expo Go
- Wymagany jest **YouTube Data API Key** w zmiennych środowiskowych
- Notatki są przechowywane lokalnie w AsyncStorage
- Powiadomienia wymagają uprawnień na urządzeniu
- ⚠️ **Powiadomienia działają tylko na fizycznym urządzeniu** - nie działają w iOS Simulator ani Android Emulator
- Aplikacja używa czcionki Poppins (dołączone w `assets/fonts/`)

## 📄 Licencja

Projekt stworzony jako zadanie rekrutacyjne dla TWG.
