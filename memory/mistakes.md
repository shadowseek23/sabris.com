# Chyby a prevence

## 2026-10-27 – Rozsah automatického formátování

- Problém: první běh kořenového formátování zasáhl i převzaté konfigurační soubory a mohl by upravit původní HTML evidence.
- Náprava: konfigurace obnovena z přesných bajtů šablony; původní zrcadlo, instrukce a citlivé konfigurace vyloučeny v .prettierignore.
- Prevence: před prvním format v nově převzaté šabloně zkontrolovat rozsah a vyloučit zdrojové evidence a konfiguraci nástrojů.
