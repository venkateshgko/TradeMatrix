package com.tradematrix.controller;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/markets")
public class MarketController {

    private static final List<Map<String, Object>> STOCKS = List.of(
        stock("RELIANCE", "Reliance Industries", "NSE", 1450.20, 18.50, 1.29, 18_400_000L, 1_960_000_000_000L, "Energy"),
        stock("TCS", "Tata Consultancy Services", "NSE", 3284.65, -22.40, -0.68, 6_200_000L, 1_190_000_000_000L, "Technology"),
        stock("HDFCBANK", "HDFC Bank", "NSE", 1942.30, 14.10, 0.73, 9_100_000L, 1_480_000_000_000L, "Banking"),
        stock("INFY", "Infosys", "NSE", 1682.40, 31.20, 1.89, 7_600_000L, 700_000_000_000L, "Technology"),
        stock("ICICIBANK", "ICICI Bank", "NSE", 1298.10, -5.80, -0.45, 8_400_000L, 910_000_000_000L, "Banking"),
        stock("AAPL", "Apple Inc.", "NASDAQ", 228.70, 2.15, 0.95, 32_000_000L, 3_500_000_000_000L, "Technology"),
        stock("MSFT", "Microsoft", "NASDAQ", 521.40, -1.80, -0.34, 15_000_000L, 3_880_000_000_000L, "Technology"),
        stock("BTC", "Bitcoin", "CRYPTO", 114820.00, 1820.00, 1.61, 42_000_000_000L, 2_280_000_000_000L, "Crypto")
    );

    private static Map<String, Object> stock(
        String symbol, String name, String exchange, double price, double change,
        double changePercent, long volume, long marketCap, String sector
    ) {
        return Map.of(
            "symbol", symbol,
            "name", name,
            "exchange", exchange,
            "price", price,
            "change", change,
            "changePercent", changePercent,
            "volume", volume,
            "marketCap", marketCap,
            "sector", sector
        );
    }

    @GetMapping
    public List<Map<String, Object>> markets() {
        return STOCKS;
    }

    @GetMapping("/{symbol}")
    public Map<String, Object> market(@PathVariable String symbol) {
        String requested = symbol.toUpperCase(Locale.ROOT);

        return STOCKS.stream()
            .filter(stock -> stock.get("symbol").equals(requested))
            .findFirst()
            .orElseThrow(() -> new MarketNotFoundException(requested));
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    private static class MarketNotFoundException extends RuntimeException {
        MarketNotFoundException(String symbol) {
            super("Market instrument not found: " + symbol);
        }
    }
}
