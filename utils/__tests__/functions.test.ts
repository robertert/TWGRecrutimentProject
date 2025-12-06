import {
  formatTime,
  formatTimeDate,
  formatNumber,
  mapSortBy,
  formatDateString,
} from "../functions";

describe("formatTime", () => {
  it("powinien formatować sekundy na format MM:SS", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(30)).toBe("0:30");
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(125)).toBe("2:05");
    expect(formatTime(3661)).toBe("61:01");
  });

  it('powinien zwracać "0:00" dla nieprawidłowych wartości', () => {
    expect(formatTime(NaN)).toBe("0:00");
    expect(formatTime(Infinity)).toBe("0:00");
    expect(formatTime(-Infinity)).toBe("0:00");
    expect(formatTime(null as any)).toBe("0:00");
    expect(formatTime(undefined as any)).toBe("0:00");
  });

  it("powinien zaokrąglać w dół do pełnych sekund", () => {
    expect(formatTime(30.9)).toBe("0:30");
    expect(formatTime(65.7)).toBe("1:05");
  });
});

describe("formatTimeDate", () => {
  it("powinien formatować datę na format HH:MM", () => {
    const date = new Date("2024-01-15T14:30:00");
    expect(formatTimeDate(date)).toBe("14:30");
  });

  it("powinien dodawać zera wiodące dla jednocyfrowych godzin i minut", () => {
    const date = new Date("2024-01-15T09:05:00");
    expect(formatTimeDate(date)).toBe("09:05");
  });

  it("powinien obsługiwać północ", () => {
    const date = new Date("2024-01-15T00:00:00");
    expect(formatTimeDate(date)).toBe("00:00");
  });
});

describe("formatNumber", () => {
  it("powinien formatować liczby mniejsze niż milion", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(100)).toBe("100");
    expect(formatNumber(999999)).toBe("999999");
  });

  it("powinien formatować liczby większe lub równe milionowi z sufiksem M", () => {
    expect(formatNumber(1000000)).toBe("1.0M");
    expect(formatNumber(1500000)).toBe("1.5M");
    expect(formatNumber(2500000)).toBe("2.5M");
    expect(formatNumber(10000000)).toBe("10.0M");
  });

  it("powinien zaokrąglać do jednego miejsca po przecinku", () => {
    expect(formatNumber(1234567)).toBe("1.2M");
    expect(formatNumber(1999999)).toBe("2.0M");
  });
});

describe("mapSortBy", () => {
  it('powinien mapować "Most popular" na "viewCount"', () => {
    expect(mapSortBy("Most popular")).toBe("viewCount");
  });

  it('powinien mapować "Upload date: latest" na "date"', () => {
    expect(mapSortBy("Upload date: latest")).toBe("date");
  });

  it('powinien mapować "Relevance" na "relevance"', () => {
    expect(mapSortBy("Relevance")).toBe("relevance");
  });

  it('powinien zwracać "viewCount" jako domyślną wartość dla nieznanych opcji', () => {
    expect(mapSortBy("Unknown")).toBe("viewCount");
    expect(mapSortBy("")).toBe("viewCount");
  });

  it('powinien zwracać "viewCount" dla undefined', () => {
    expect(mapSortBy(undefined)).toBe("viewCount");
  });
});

describe("formatDateString", () => {
  it("powinien formatować datę w formacie polskim DD.MM.YYYY", () => {
    const dateString = "2024-01-15T10:30:00Z";
    const result = formatDateString(dateString);
    expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/);
  });

  it("powinien poprawnie formatować różne daty", () => {
    const date1 = new Date("2024-01-15").toISOString();
    const result1 = formatDateString(date1);
    expect(result1).toBe("15.01.2024");

    const date2 = new Date("2023-12-31").toISOString();
    const result2 = formatDateString(date2);
    expect(result2).toBe("31.12.2023");
  });
});
