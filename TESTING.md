# 🧪 Testy - Instrukcje

## Instalacja

Po dodaniu zależności testowych, zainstaluj je:

```bash
npm install
```

## Uruchamianie testów

```bash
# Uruchom wszystkie testy
npm test

# Uruchom testy w trybie watch (automatyczne uruchamianie przy zmianach)
npm run test:watch

# Uruchom testy z raportem pokrycia kodu
npm run test:coverage
```

## Struktura testów

Testy znajdują się w folderach `__tests__` obok testowanych plików:

- `utils/__tests__/functions.test.ts` - Testy funkcji pomocniczych (formatTime, formatNumber, mapSortBy, etc.)
- `utils/__tests__/deduplication.test.ts` - Testy logiki deduplikacji wideo
- `store/__tests__/notesStore.test.ts` - Testy store'a notatek
- `store/__tests__/settingsStore.test.ts` - Testy store'a ustawień
- `services/__tests__/youtubeApiService.test.ts` - Testy funkcji mapujących z YouTube API

## Co jest testowane

### ✅ Funkcje utility (`utils/functions.ts`)
- `formatTime` - Formatowanie czasu w sekundach na MM:SS
- `formatTimeDate` - Formatowanie daty na HH:MM
- `formatNumber` - Formatowanie liczb (z sufiksem M dla milionów)
- `mapSortBy` - Mapowanie opcji sortowania
- `formatDateString` - Formatowanie daty w formacie polskim

### ✅ Deduplikacja wideo
- Usuwanie duplikatów na podstawie ID wideo
- Zachowanie pierwszego wystąpienia
- Obsługa wielu duplikatów

### ✅ Store notatek (`store/notesStore.ts`)
- Dodawanie notatek
- Usuwanie notatek
- Pobieranie notatek dla konkretnego videoId
- Dodawanie notatek z postępem wideo
- Resetowanie notatek

### ✅ Store ustawień (`store/settingsStore.ts`)
- Włączanie/wyłączanie przypomnień
- Ustawianie czasu przypomnienia
- Konwersja czasu przypomnienia na Date
- Obsługa błędów

### ✅ Mapowanie YouTube API (`services/youtubeApiService.ts`)
- Mapowanie odpowiedzi wyszukiwania
- Mapowanie szczegółów wideo
- Obsługa brakujących statystyk

## Konfiguracja

- **Jest** - Framework testowy
- **jest-expo** - Preset dla Expo/React Native
- **@testing-library/react** - Narzędzia do testowania React komponentów i hooks
- **@testing-library/jest-native** - Dodatkowe matchery dla React Native

## Uwagi

- Testy dla komponentów UI nie są jeszcze zaimplementowane (opcjonalne)
- Testy integracyjne z YouTube API wymagają mockowania fetch (można dodać później)
- Store'y używają AsyncStorage, które jest mockowane w `jest.setup.js`

