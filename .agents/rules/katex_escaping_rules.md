# KaTeX Escaping and Formatting Guardrails

- Sempre que injetar fórmulas LaTeX utilizando delimitadores matemáticos `\( ... \)` ou `\[ ... \]` via ferramentas de edição ou scripts:
  - Utilize escape duplo para comandos LaTeX que iniciem com caracteres comuns de controle de string (ex: `\times` deve ser escrito como `\\times` ou raw string para evitar a interpretação de `\t` como Tab).
  - Nunca misture blocos monetários de cifrão (`$`) com fórmulas matemáticas, priorizando delimitadores explícitos `\(` / `\)` para inline e `\[` / `\]` para blocos em display mode.
