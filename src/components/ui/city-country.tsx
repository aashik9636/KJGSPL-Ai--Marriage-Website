"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { ALL_GLOBAL_LOCATIONS, LocationItem } from "@/data/locations.data";

// Simple module-level cache so we build the index once
let LOCATION_INDEX_CACHE: LocationItem[] | null = null;
let LOCATION_INDEX_READY = false;

interface CityCountryProps {
  city?: string;
  country?: string;
  value?: string;
  onCityChange?: (city: string) => void;
  onCountryChange?: (country: string) => void;
  onChange?: (fullLocation: string) => void;
  labels?: { location?: string };
  placeholder?: string;
  className?: string;
  hasError?: boolean;
}

export const CityCountry: React.FC<CityCountryProps> = ({
  city = "",
  country = "",
  value = "",
  onCityChange,
  onCountryChange,
  onChange,
  labels = { location: "Current City / Location" },
  placeholder = "e.g. Mumbai, India or Dubai, UAE",
  className = "",
  hasError = false,
}) => {
  // We compute a unified string for display
  const initialDisplay = value || [city, country].filter(Boolean).join(", ");
  const [inputValue, setInputValue] = useState(initialDisplay);
  const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Sync internal state when external value changes
  useEffect(() => {
    const newDisplay = value || [city, country].filter(Boolean).join(", ");
    if (newDisplay !== inputValue && newDisplay !== "") {
      setInputValue(newDisplay);
    }
  }, [city, country, value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Build location index (once globally)
  useEffect(() => {
    if (LOCATION_INDEX_READY && LOCATION_INDEX_CACHE) return;
    
    const buildIndex = () => {
      try {
        LOCATION_INDEX_CACHE = ALL_GLOBAL_LOCATIONS;
        LOCATION_INDEX_READY = true;
      } catch (e) {
        console.error("Failed to build location index", e);
        LOCATION_INDEX_CACHE = [];
        LOCATION_INDEX_READY = false;
      }
    };

    const timeout = setTimeout(buildIndex, 50);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const triggerParentChange = (selectedCity: string, selectedCountry: string, fullDisplay: string) => {
    if (onCityChange) onCityChange(selectedCity);
    if (onCountryChange) onCountryChange(selectedCountry);
    if (onChange) onChange(fullDisplay);
  };

  const searchLocations = (query: string) => {
    if (!query || query.length < 2 || !LOCATION_INDEX_READY || !Array.isArray(LOCATION_INDEX_CACHE)) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const results: LocationItem[] = [];

    for (let i = 0; i < LOCATION_INDEX_CACHE.length; i += 1) {
      const loc = LOCATION_INDEX_CACHE[i];
      if (loc.searchText.includes(q)) {
        results.push(loc);
        if (results.length >= 40) break;
      }
    }

    // Sort results: prioritize exact prefix matches
    const sorted = results
      .sort((a, b) => {
        const aStarts = a.searchText.startsWith(q);
        const bStarts = b.searchText.startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.searchText.localeCompare(b.searchText);
      })
      .slice(0, 15);

    setSuggestions(sorted);
  };

  const handleInputChange = (val: string) => {
    const cleanedValue = val.replace(/[0-9]/g, "");
    setInputValue(cleanedValue);

    if (!cleanedValue || cleanedValue.trim().length < 2) {
      setSuggestions([]);
      if (!cleanedValue) triggerParentChange("", "", "");
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchLocations(cleanedValue);
    }, 250);

    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (s: LocationItem) => {
    setInputValue(s.displayText);
    triggerParentChange(s.city, s.country, s.displayText);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className={`city-country-field ${className}`} ref={inputRef}>
      <div className="relative" style={{ position: "relative" }}>
        <div className={`input-with-icon ${hasError ? "has-error" : ""}`}>
          <MapPin size={16} className="field-icon text-neutral-400" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              if (inputValue.trim().length >= 2) {
                searchLocations(inputValue);
                setShowSuggestions(true);
              }
            }}
            placeholder={placeholder}
            className="form-input"
            autoComplete="off"
          />
        </div>

        {showSuggestions && (inputValue?.length || 0) >= 2 && (
          <div
            className="location-suggestions-dropdown location-suggestions-dropup"
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 9999,
              background: "#ffffff",
              border: "1.5px solid #ebdcd5",
              borderRadius: "14px",
              boxShadow: "0 -10px 30px rgba(65, 28, 43, 0.14), 0 4px 12px rgba(0, 0, 0, 0.04)",
              maxHeight: "260px",
              overflowY: "auto",
              padding: "4px 0",
            }}
          >
            {!LOCATION_INDEX_READY ? (
              <div style={{ padding: "14px", textAlign: "center", color: "#8a737a", fontStyle: "italic", fontSize: "13px" }}>
                Initializing location database...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((s, idx) => (
                <div
                  key={`${s.displayText}-${idx}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionSelect(s);
                  }}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    borderBottom: idx < suggestions.length - 1 ? "1px solid #f5ede8" : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#faf4f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <MapPin size={15} style={{ color: "#be185d", marginTop: "2px", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#411c2b", lineHeight: 1.2 }}>
                      {s.isCountryOnly ? s.country : s.city}
                    </div>
                    {!s.isCountryOnly && (
                      <div style={{ fontSize: "11px", color: "#8a737a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "2px" }}>
                        {s.country}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "16px", textAlign: "center", color: "#8a737a" }}>
                <MapPin size={20} style={{ margin: "0 auto 6px", color: "#be185d", opacity: 0.6 }} />
                <p style={{ margin: 0, fontSize: "13px" }}>No locations matching &ldquo;{inputValue}&rdquo; found</p>
                <small style={{ fontSize: "11px", color: "#a8959c", display: "block", marginTop: "4px" }}>
                  You can type your custom city name directly.
                </small>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityCountry;
