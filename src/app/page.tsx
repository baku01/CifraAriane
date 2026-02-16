'use client'

import { useState, useCallback, useMemo } from 'react'

// Types
type TranslationMode = 'symbolToLetter' | 'letterToSymbol'
type KeyboardRow = { name: string; items: { letter: string; symbol: string }[] }

// Tabela de correspondência: símbolo → letra (para decifrar)
const SYMBOL_TO_LETTER: Record<string, string> = {
  // Linha superior (QWERTY)
  '+': 'q', '×': 'w', '÷': 'e', '=': 'r', '/': 't', '_': 'y',
  '<': 'u', '>': 'i', '[': 'o', ']': 'p',
  // Linha do meio (ASDF...)
  '!': 'a', '@': 's', '#': 'd', '$': 'f', '%': 'g', '^': 'h',
  '&': 'j', '*': 'k', '(': 'l', ')': 'ç',
  // Linha inferior (ZXCV...)
  '-': 'z', "'": 'x', '"': 'c', ':': 'v', ';': 'b', ',': 'n', '?': 'm',
  // Pontuação
  '.': '.',
}

// Gera mapeamento reverso: letra → símbolo (para cifrar)
const LETTER_TO_SYMBOL: Record<string, string> = Object.fromEntries(
  Object.entries(SYMBOL_TO_LETTER).flatMap(([symbol, letter]) => [
    [letter, symbol],
    [letter.toLowerCase(), symbol],
    [letter.toUpperCase(), symbol],
  ])
)

// Símbolos organizados como no teclado
const SYMBOL_ROWS: string[][] = [
  ['+', '×', '÷', '=', '/', '_', '<', '>', '[', ']'],
  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ['-', "'", '"', ':', ';', ',', '?', '.', ' '],
]

// Nomes das linhas do teclado
const ROW_NAMES: Record<number, string> = {
  0: 'Linha QWERTY',
  1: 'Linha ASDF',
  2: 'Linha ZXCV',
}

// Gera keyboardRows dinamicamente a partir de SYMBOL_ROWS
const generateKeyboardRows = (): KeyboardRow[] => {
  return SYMBOL_ROWS.slice(0, 3).map((row, index) => ({
    name: ROW_NAMES[index] || `Linha ${index + 1}`,
    items: row
      .filter(symbol => symbol !== ' ')
      .map(symbol => ({
        symbol,
        letter: SYMBOL_TO_LETTER[symbol] || symbol,
      })),
  }))
}

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState<TranslationMode>('symbolToLetter')

  const keyboardRows = useMemo(() => generateKeyboardRows(), [])

  const translate = useCallback((text: string, translationMode: TranslationMode) => {
    if (!text) {
      setOutputText('')
      return
    }

    const mapping = translationMode === 'symbolToLetter' ? SYMBOL_TO_LETTER : LETTER_TO_SYMBOL
    const translated = text
      .split('')
      .map(char => char === ' ' ? ' ' : (mapping[char] || char))
      .join('')
    setOutputText(translated)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setInputText(text)
    translate(text, mode)
  }, [mode, translate])

  const handleModeChange = useCallback((newMode: TranslationMode) => {
    setMode(newMode)
    setInputText(outputText)
    translate(outputText, newMode)
  }, [outputText, translate])

  const handleSymbolClick = useCallback((symbol: string) => {
    const newText = inputText + symbol
    setInputText(newText)
    translate(newText, mode)
  }, [inputText, mode, translate])

  const inputLabel = mode === 'symbolToLetter' ? '⌨️ Digite os símbolos:' : '✏️ Digite as letras:'
  const inputPlaceholder = mode === 'symbolToLetter' ? 'Ex: ]÷#=[' : 'Ex: pedro'
  const outputLabel = mode === 'symbolToLetter' ? '📝 Resultado (letras):' : '🔐 Resultado (símbolos):'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-3 sm:p-6 lg:p-8 font-sans text-white">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <header className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#e94560] to-[#f39c12] bg-clip-text text-transparent mb-2">
            🔐 Tradutor de Cifras
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400">
            Converta entre símbolos e letras secretamente!
          </p>
          <div className="mt-3 sm:mt-4 inline-block px-3 py-2 sm:px-4 sm:py-2 bg-[#e94560]/20 rounded-lg">
            <span className="text-xs sm:text-sm text-[#f39c12] font-semibold">
              Exemplo: ]÷#=[ → pedro
            </span>
          </div>
        </header>

        {/* Mode Toggle */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
          <button
            onClick={() => handleModeChange('symbolToLetter')}
            className={`px-4 py-3 sm:px-6 sm:py-3 rounded-xl border-none cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-300 ${
              mode === 'symbolToLetter'
                ? 'bg-gradient-to-br from-[#e94560] to-[#f39c12] shadow-[0_4px_20px_rgba(233,69,96,0.4)]'
                : 'bg-white/10'
            }`}
          >
            🔓 Decifrar (Símbolos → Letras)
          </button>
          <button
            onClick={() => handleModeChange('letterToSymbol')}
            className={`px-4 py-3 sm:px-6 sm:py-3 rounded-xl border-none cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-300 ${
              mode === 'letterToSymbol'
                ? 'bg-gradient-to-br from-[#e94560] to-[#f39c12] shadow-[0_4px_20px_rgba(233,69,96,0.4)]'
                : 'bg-white/10'
            }`}
          >
            🔒 Cifrar (Letras → Símbolos)
          </button>
        </div>

        {/* Translation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          {/* Input */}
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
            <label className="block mb-2 text-xs sm:text-sm text-gray-400 font-medium">
              {inputLabel}
            </label>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              className="w-full h-24 sm:h-28 lg:h-32 bg-black/30 border border-white/20 rounded-xl p-3 sm:p-4 text-base sm:text-lg lg:text-xl font-mono text-white resize-none outline-none focus:border-[#e94560]/50 transition-colors placeholder:text-gray-600"
            />
          </div>

          {/* Output */}
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
            <label className="block mb-2 text-xs sm:text-sm text-gray-400 font-medium">
              {outputLabel}
            </label>
            <div className="w-full h-24 sm:h-28 lg:h-32 bg-black/30 border border-white/20 rounded-xl p-3 sm:p-4 text-base sm:text-lg lg:text-xl font-mono text-[#4ade80] overflow-y-auto break-all whitespace-pre-wrap">
              {outputText || <span className="text-gray-600">...</span>}
            </div>
          </div>
        </div>

        {/* Symbol Keyboard */}
        <div className="bg-white/5 rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10 mb-4 sm:mb-6 lg:mb-8">
          <p className="text-center mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
            💡 Clique nos símbolos para adicionar:
          </p>
          <div className="flex flex-col gap-2 sm:gap-3">
            {SYMBOL_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2 flex-wrap">
                {row.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => handleSymbolClick(symbol)}
                    title={`${symbol} → ${SYMBOL_TO_LETTER[symbol] || '?'}`}
                    className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-[#2d2d44] to-[#1a1a2e] border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base lg:text-lg cursor-pointer transition-all duration-200 flex items-center justify-center hover:from-[#e94560] hover:to-[#f39c12] hover:scale-105 active:scale-95"
                  >
                    {symbol === ' ' ? '␣' : symbol}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Reference Table */}
        <div className="bg-white/5 rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/10">
          <h3 className="text-center mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg text-[#f39c12]">
            📋 Tabela de Referência Completa
          </h3>

          {keyboardRows.map((row) => (
            <div key={row.name} className="mb-4 sm:mb-6 last:mb-0">
              <h4 className="text-[#e94560] text-xs sm:text-sm mb-2 sm:mb-3 uppercase tracking-wider">
                {row.name}
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
                {row.items.map(({ letter, symbol }) => (
                  <div
                    key={letter}
                    onClick={() => handleSymbolClick(symbol)}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-black/20 rounded-lg text-xs sm:text-sm cursor-pointer transition-all duration-200 hover:bg-[#e94560]/30 active:scale-95"
                  >
                    <span className="text-[#e94560] font-bold text-sm sm:text-base">
                      {symbol}
                    </span>
                    <span className="text-gray-600 text-xs hidden sm:inline">→</span>
                    <span className="text-[#4ade80] lowercase font-semibold text-sm sm:text-base">
                      {letter}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-4 sm:mt-6 lg:mt-8 text-gray-500 text-xs sm:text-sm">
          <p>💡 Dica: Clique em qualquer símbolo na tabela para adicioná-lo ao texto!</p>
        </footer>
      </div>
    </div>
  )
}
