"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COUNTRIES, Country } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface CountryDropdownProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  error?: boolean;
}

export const CountryDropdown = ({
  selectedCountry,
  onSelect,
  error,
}: CountryDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial.includes(searchQuery),
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center gap-2 px-3 h-14 rounded-xl border-gray-200 bg-white hover:bg-gray-50 focus:ring-0 shadow-none transition-all duration-200",
            error && "border-red-500",
            open && "border-primary ring-1 ring-primary/10",
          )}
        >
          <div className="relative w-6 h-4 shrink-0 overflow-hidden rounded-xs shadow-sm">
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-bold text-primary whitespace-nowrap">
            ({selectedCountry.dial})
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[300px] p-0 bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200"
        align="start"
      >
        <div className="flex items-center border-b border-gray-100 px-3 py-2 bg-gray-50/50 sticky top-0 z-10">
          <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
          <input
            className="flex h-9 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-gray-400"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          {filteredCountries.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500 italic">
              No country found.
            </div>
          ) : (
            filteredCountries.map((country) => (
              <DropdownMenuItem
                key={country.code}
                onSelect={() => {
                  onSelect(country);
                  setOpen(false);
                  setSearchQuery("");
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors border-l-2 border-transparent",
                  selectedCountry.code === country.code
                    ? "bg-primary/5 border-primary"
                    : "hover:bg-gray-50 hover:border-gray-200",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-4 shrink-0 overflow-hidden rounded-xs">
                    <img
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt={country.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      selectedCountry.code === country.code
                        ? "text-primary font-bold"
                        : "text-foreground",
                    )}
                  >
                    {country.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500",
                      selectedCountry.code === country.code &&
                        "bg-primary/10 text-primary",
                    )}
                  >
                    {country.dial}
                  </span>
                  {selectedCountry.code === country.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
