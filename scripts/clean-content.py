#!/usr/bin/env python3
"""Inspect and conservatively remove invisible Unicode markers from text files.

The script is local-only, standard-library-only, and never sends file contents.
It writes a new output file by default and reports code points, not text values.
"""

from __future__ import annotations

import argparse
import json
import sys
import unicodedata
from collections import Counter
from pathlib import Path


# Conservative candidates. ZWJ/ZWNJ and most bidi controls are reported but
# preserved because they can be meaningful for scripts and emoji rendering.
REMOVABLE = {
    "\u00ad",  # soft hyphen
    "\u034f",  # combining grapheme joiner
    "\u061c",  # Arabic letter mark
    "\u115f",
    "\u1160",
    "\u17b4",
    "\u17b5",
    "\u180e",
    "\u200b",  # zero-width space
    "\u2060",  # word joiner
    "\ufeff",  # zero-width no-break space / BOM in content
}

PROTECTED = {
    "\u200c",  # zero-width non-joiner
    "\u200d",  # zero-width joiner
    "\u200e",
    "\u200f",
    "\u202a",
    "\u202b",
    "\u202c",
    "\u202d",
    "\u202e",
    "\u2066",
    "\u2067",
    "\u2068",
    "\u2069",
}


def is_tag_character(char: str) -> bool:
    codepoint = ord(char)
    return 0xE0000 <= codepoint <= 0xE007F


def describe(char: str) -> dict[str, str]:
    return {
        "codepoint": f"U+{ord(char):04X}",
        "name": unicodedata.name(char, "UNKNOWN"),
    }


def read_text(path: Path) -> tuple[str, bool]:
    raw = path.read_bytes()
    if b"\x00" in raw:
        raise ValueError("fichier probablement binaire ; aucun nettoyage effectué")
    has_bom = raw.startswith(b"\xef\xbb\xbf")
    try:
        return raw.decode("utf-8-sig"), has_bom
    except UnicodeDecodeError as error:
        raise ValueError("encodage UTF-8 non reconnu ; aucun nettoyage effectué") from error


def analyze(text: str, remove: bool) -> tuple[str, dict]:
    removable_counts: Counter[str] = Counter()
    protected_counts: Counter[str] = Counter()
    tag_counts: Counter[str] = Counter()
    result: list[str] = []

    for char in text:
        if char in REMOVABLE:
            removable_counts[char] += 1
            if not remove:
                result.append(char)
        elif char in PROTECTED:
            protected_counts[char] += 1
            result.append(char)
        elif is_tag_character(char):
            tag_counts[char] += 1
            if not remove:
                result.append(char)
        else:
            result.append(char)

    def summarize(counts: Counter[str]) -> list[dict]:
        output = []
        for char, count in sorted(counts.items(), key=lambda item: ord(item[0])):
            item = describe(char)
            item["count"] = count
            output.append(item)
        return output

    report = {
        "changed": bool(removable_counts or tag_counts) and remove,
        "removable": summarize(removable_counts),
        "protected": summarize(protected_counts),
        "tag_characters": summarize(tag_counts),
        "removed_count": sum(removable_counts.values()) + sum(tag_counts.values()) if remove else 0,
        "note": "Les caractères protégés sont signalés mais conservés pour préserver les langues et emojis.",
    }
    return "".join(result), report


def main() -> int:
    parser = argparse.ArgumentParser(description="Inspecter ou nettoyer les marqueurs Unicode invisibles localement.")
    parser.add_argument("input", type=Path, help="fichier texte UTF-8 à inspecter")
    parser.add_argument("-o", "--output", type=Path, help="copie nettoyée ; obligatoire avec --clean")
    parser.add_argument("--clean", action="store_true", help="écrire une copie sans les marqueurs nettoyables")
    args = parser.parse_args()

    try:
        text, has_bom = read_text(args.input)
        if args.clean and not args.output:
            parser.error("--output est obligatoire avec --clean ; le fichier source n'est jamais écrasé")
        if args.output and args.output.resolve() == args.input.resolve():
            parser.error("la sortie doit être différente du fichier source")
        cleaned, report = analyze(text, args.clean)
        if args.clean:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            encoded = ("\ufeff" if has_bom else "") + cleaned
            args.output.write_text(encoded, encoding="utf-8", newline="")
        report.update({"input": str(args.input), "output": str(args.output) if args.clean else None, "mode": "clean" if args.clean else "inspect"})
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 0
    except (OSError, ValueError) as error:
        print(f"Erreur : {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
