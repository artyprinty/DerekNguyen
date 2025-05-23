import { useState, useEffect } from 'react'
import axios from 'axios'

interface ExchangeRates {
  [key: string]: number
}

interface ApiResponse {
  result: string
  base_code: string
  rates: ExchangeRates
  time_last_update_unix: number
}

const CURRENCIES = [
  'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'INR', 'BRL', 'KRW',
  'RUB', 'MXN', 'VND', 'PHP', 'THB', 'IDR', 'MYR', 'SGD', 'NZD', 'ZAR',
  'TRY', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'HUF', 'CZK', 'AED', 'SAR',
  'EGP', 'TWD', 'HKD', 'ILS', 'ARS', 'NGN', 'PKR', 'BDT', 'CLP', 'COP',
  'UAH', 'KZT', 'MAD', 'RON', 'QAR', 'IQD', 'PEN', 'LKR', 'KES', 'JOD'
]

const CURRENCY_NAMES: { [key: string]: string } = {
  EUR: 'European Union',
  GBP: 'United Kingdom',
  JPY: 'Japan',
  CNY: 'China',
  CAD: 'Canada',
  AUD: 'Australia',
  INR: 'India',
  BRL: 'Brazil',
  KRW: 'South Korea',
  RUB: 'Russia',
  MXN: 'Mexico',
  VND: 'Vietnam',
  PHP: 'Philippines',
  THB: 'Thailand',
  IDR: 'Indonesia',
  MYR: 'Malaysia',
  SGD: 'Singapore',
  NZD: 'New Zealand',
  ZAR: 'South Africa',
  TRY: 'Turkey',
  CHF: 'Switzerland',
  SEK: 'Sweden',
  NOK: 'Norway',
  DKK: 'Denmark',
  PLN: 'Poland',
  HUF: 'Hungary',
  CZK: 'Czech Republic',
  AED: 'United Arab Emirates',
  SAR: 'Saudi Arabia',
  EGP: 'Egypt',
  TWD: 'Taiwan',
  HKD: 'Hong Kong',
  ILS: 'Israel',
  ARS: 'Argentina',
  NGN: 'Nigeria',
  PKR: 'Pakistan',
  BDT: 'Bangladesh',
  CLP: 'Chile',
  COP: 'Colombia',
  UAH: 'Ukraine',
  KZT: 'Kazakhstan',
  MAD: 'Morocco',
  RON: 'Romania',
  QAR: 'Qatar',
  IQD: 'Iraq',
  PEN: 'Peru',
  LKR: 'Sri Lanka',
  KES: 'Kenya',
  JOD: 'Jordan'
}

interface CachedRates {
  rates: ExchangeRates
  timestamp: number
}

// Format number with commas and no decimals
const formatNumber = (num: number): string => {
  return Math.round(num).toLocaleString('en-US')
}

// Parse formatted number string back to number
const parseFormattedNumber = (str: string): number => {
  return parseInt(str.replace(/,/g, '')) || 0
}

function RatioCalculator() {
  const [percentage, setPercentage] = useState<string>('');
  const [rowCount, setRowCount] = useState<number>(4);

  useEffect(() => {
    const table = document.getElementById("ratioTable") as HTMLTableElement;
    if (!table) return;

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const row = target.closest('tr');
      if (!row) return;

      const rows = Array.from(table.rows);
      const firstRow = rows[0];
      const seedX = parseFloat((firstRow.cells[0].children[0] as HTMLInputElement).value);
      const seedY = parseFloat((firstRow.cells[1].children[0] as HTMLInputElement).value);

      // Calculate and update percentage
      if (!isNaN(seedX) && !isNaN(seedY) && seedY !== 0) {
        const percent = Math.round((seedX / seedY) * 100);
        setPercentage(`${seedX} / ${seedY} = ${percent}%`);
      } else {
        setPercentage('');
      }

      // Only proceed with ratio calculations if both values in the first row are present
      if (!isNaN(seedX) && !isNaN(seedY) && seedY !== 0) {
        const multiplier = seedY / seedX;
        const inverseMultiplier = seedX / seedY;

        // Find which cell was changed
        const isFirstCell = target === row.cells[0].children[0];
        const currentValue = parseFloat(target.value);
        const otherCell = isFirstCell ? row.cells[1].children[0] as HTMLInputElement : row.cells[0].children[0] as HTMLInputElement;

        if (!isNaN(currentValue)) {
          // Calculate the corresponding value based on which cell was changed
          const calculatedValue = isFirstCell 
            ? (currentValue * multiplier).toFixed(2)
            : (currentValue * inverseMultiplier).toFixed(2);
          otherCell.value = calculatedValue;
        } else {
          otherCell.value = "";
        }
      }
    };

    table.addEventListener("input", handleInput);
    return () => table.removeEventListener("input", handleInput);
  }, []);

  const handleAddRows = () => {
    setRowCount(prev => prev + 5);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Enter values in either column to calculate the corresponding ratio {percentage && `(${percentage})`}
      </h3>

      <table id="ratioTable" className="w-full border-collapse mb-4">
        <tbody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddRows}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add 5 More Rows
      </button>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<'currency' | 'ratio'>('currency');
  const [usdAmount, setUsdAmount] = useState<number>(1)
  const [formattedUsdAmount, setFormattedUsdAmount] = useState<string>('1')
  const [rates, setRates] = useState<ExchangeRates | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [copySuccess, setCopySuccess] = useState<string>('')

  const fetchRates = async () => {
    try {
      console.log('Fetching rates...')
      setLoading(true)
      setError(null)
      const response = await axios.get<ApiResponse>('https://open.er-api.com/v6/latest/USD')
      console.log('Rates received:', response.data)
      
      if (response.data && response.data.rates) {
        const ratesData = response.data.rates
        // Store in localStorage with timestamp
        const cacheData: CachedRates = {
          rates: ratesData,
          timestamp: Date.now()
        }
        localStorage.setItem('exchangeRates', JSON.stringify(cacheData))
        setRates(ratesData)
        setLastUpdated(new Date().toLocaleString())
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching rates:', err)
      setError('Failed to fetch exchange rates. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadRates = async () => {
      // Try to get cached rates
      const cachedData = localStorage.getItem('exchangeRates')
      if (cachedData) {
        const { rates: cachedRates, timestamp } = JSON.parse(cachedData) as CachedRates
        const now = Date.now()
        const oneDay = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        if (now - timestamp < oneDay) {
          // Use cached rates if less than 24 hours old
          console.log('Using cached rates')
          setRates(cachedRates)
          setLastUpdated(new Date(timestamp).toLocaleString())
          setLoading(false)
          return
        }
      }

      // If no cache or cache is old, fetch new rates
      await fetchRates()
    }

    loadRates()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '')
    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value) || 0
      setUsdAmount(numValue)
      setFormattedUsdAmount(formatNumber(numValue))
    }
  }

  const handleCopy = async () => {
    if (!rates) return

    const formattedText = sortedCurrencies
      .map(currency => {
        const amount = formatNumber(usdAmount * (rates[currency] || 0))
        return `${CURRENCY_NAMES[currency]} - ${currency}: ${amount}`
      })
      .join('\n')

    try {
      await navigator.clipboard.writeText(formattedText)
      setCopySuccess('Copied to clipboard!')
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      setCopySuccess('Failed to copy')
      setTimeout(() => setCopySuccess(''), 2000)
    }
  }

  if (loading && !rates) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading exchange rates...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  if (!rates) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">No exchange rates available</div>
      </div>
    )
  }

  // Sort currencies by country name
  const sortedCurrencies = [...CURRENCIES].sort((a, b) => 
    CURRENCY_NAMES[a].localeCompare(CURRENCY_NAMES[b])
  )

  // Split currencies into three columns
  const columnCount = 3
  const itemsPerColumn = Math.ceil(sortedCurrencies.length / columnCount)
  const columns = Array.from({ length: columnCount }, (_, i) => 
    sortedCurrencies.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  )

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Converters</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setActiveTab('currency')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'currency'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Currency Converter
            </button>
            <button
              onClick={() => setActiveTab('ratio')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'ratio'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Live Calculations
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'currency' ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="usd-amount" className="block text-sm font-medium text-gray-700">
                  Enter USD amount
                </label>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {copySuccess ? (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {copySuccess}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy All
                    </span>
                  )}
                </button>
              </div>
              <input
                id="usd-amount"
                type="text"
                value={formattedUsdAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                inputMode="numeric"
                pattern="[0-9,]*"
              />
              {lastUpdated && (
                <p className="mt-2 text-sm text-gray-500">
                  Last updated: {lastUpdated}
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="max-h-[600px] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="border border-gray-200 rounded-lg p-4">
                      <ul className="divide-y divide-gray-200">
                        {column.map((currency) => (
                          <li key={currency} className="py-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">
                                {CURRENCY_NAMES[currency]} - {currency}:
                              </span>
                              <span className="text-lg font-medium text-gray-900">
                                {formatNumber(usdAmount * (rates[currency] || 0))}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <RatioCalculator />
        )}
      </div>
    </div>
  )
}

export default App 