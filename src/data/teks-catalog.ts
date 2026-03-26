export interface TeksStandard {
  code: string
  title: string
  description: string
}

export interface TeksStrand {
  id: number
  name: string
  color: string
  colorBorder: string
  standards: TeksStandard[]
}

export const strands: TeksStrand[] = [
  {
    id: 1,
    name: 'Number & Operations',
    color: 'bg-blue-100',
    colorBorder: 'border-blue-300',
    standards: [
      { code: '6.2A', title: 'Classify numbers', description: 'Classify whole numbers, integers, and rational numbers using a Venn diagram' },
      { code: '6.2B', title: 'Opposites & absolute value', description: 'Identify a number, its opposite, and its absolute value' },
      { code: '6.2C', title: 'Order on number line', description: 'Locate, compare, and order integers and rational numbers using a number line' },
      { code: '6.2D', title: 'Order rational numbers', description: 'Order a set of rational numbers from mathematical and real-world contexts' },
      { code: '6.2E', title: 'Fraction as division', description: 'Extend representations for division to include fraction notation (a/b = a ÷ b)' },
      { code: '6.3A', title: 'Reciprocals', description: 'Recognize that dividing by a rational number and multiplying by its reciprocal are equivalent' },
      { code: '6.3B', title: 'Multiply by fractions', description: 'Determine whether a quantity increases or decreases when multiplied by a fraction' },
      { code: '6.3C', title: 'Integer operations (models)', description: 'Represent integer operations with concrete models and connect to algorithms' },
      { code: '6.3D', title: 'Integer arithmetic', description: 'Add, subtract, multiply, and divide integers fluently' },
      { code: '6.3E', title: 'Rational number arithmetic', description: 'Multiply and divide positive rational numbers fluently' },
    ],
  },
  {
    id: 2,
    name: 'Proportionality',
    color: 'bg-green-100',
    colorBorder: 'border-green-300',
    standards: [
      { code: '6.4A', title: 'Additive vs multiplicative', description: 'Compare two rules to differentiate additive and multiplicative relationships (y=ax or y=x+a)' },
      { code: '6.4B', title: 'Ratios & rates', description: 'Apply reasoning to solve prediction and comparison problems involving ratios and rates' },
      { code: '6.4C', title: 'Ratios as comparisons', description: 'Give examples of ratios as multiplicative comparisons of two quantities' },
      { code: '6.4D', title: 'Rates as quotients', description: 'Give examples of rates as comparison by division of two quantities with different attributes' },
      { code: '6.4E', title: 'Represent percents', description: 'Represent ratios and percents with concrete models, fractions, and decimals' },
      { code: '6.4F', title: 'Benchmark percents', description: 'Represent benchmark fractions and percents (1%, 10%, 25%, 33⅓%) using models' },
      { code: '6.4G', title: 'Equivalent forms', description: 'Generate equivalent forms of fractions, decimals, and percents using real-world problems' },
      { code: '6.4H', title: 'Unit conversions', description: 'Convert units within a measurement system using proportions and unit rates' },
      { code: '6.5A', title: 'Proportional relationships', description: 'Represent problems involving ratios/rates using scale factors, tables, graphs, and proportions' },
      { code: '6.5B', title: 'Percent problems', description: 'Find the whole given part and percent, part given whole and percent, or percent given part and whole' },
      { code: '6.5C', title: 'Equivalent fractions/decimals/percents', description: 'Use equivalent fractions, decimals, and percents to show equal parts of the same whole' },
    ],
  },
  {
    id: 3,
    name: 'Expressions, Equations & Relationships',
    color: 'bg-purple-100',
    colorBorder: 'border-purple-300',
    standards: [
      { code: '6.6A', title: 'Independent & dependent quantities', description: 'Identify independent and dependent quantities from tables and graphs' },
      { code: '6.6B', title: 'Write equations from tables', description: 'Write an equation representing the relationship between independent and dependent quantities' },
      { code: '6.6C', title: 'Represent situations', description: 'Represent a situation using verbal descriptions, tables, graphs, and equations (y=kx or y=x+b)' },
      { code: '6.7A', title: 'Order of operations', description: 'Generate equivalent numerical expressions using order of operations, exponents, and prime factorization' },
      { code: '6.7B', title: 'Expressions vs equations', description: 'Distinguish between expressions and equations verbally, numerically, and algebraically' },
      { code: '6.7C', title: 'Equivalent expressions', description: 'Determine if two expressions are equivalent using models and algebraic representations' },
      { code: '6.7D', title: 'Properties of operations', description: 'Generate equivalent expressions using inverse, identity, commutative, associative, and distributive properties' },
      { code: '6.8A', title: 'Triangle properties', description: 'Sum of angles, relationship between sides and angles, triangle inequality' },
      { code: '6.8B', title: 'Area formulas (models)', description: 'Model area formulas for parallelograms, trapezoids, and triangles by decomposing shapes' },
      { code: '6.8C', title: 'Write area/volume equations', description: 'Write equations for area of shapes and volume of right rectangular prisms' },
      { code: '6.8D', title: 'Solve area/volume problems', description: 'Determine solutions for area and volume problems with positive rational number dimensions' },
      { code: '6.9A', title: 'Write equations & inequalities', description: 'Write one-variable, one-step equations and inequalities to represent constraints' },
      { code: '6.9B', title: 'Solutions on number lines', description: 'Represent solutions for one-variable, one-step equations and inequalities on number lines' },
      { code: '6.9C', title: 'Real-world from equations', description: 'Write corresponding real-world problems given one-variable, one-step equations or inequalities' },
      { code: '6.10A', title: 'Solve equations & inequalities', description: 'Model and solve one-variable, one-step equations and inequalities including geometric concepts' },
      { code: '6.10B', title: 'Verify solutions', description: 'Determine if given value(s) make one-variable, one-step equations or inequalities true' },
    ],
  },
  {
    id: 4,
    name: 'Measurement & Data',
    color: 'bg-orange-100',
    colorBorder: 'border-orange-300',
    standards: [
      { code: '6.11', title: 'Coordinate plane', description: 'Graph points in all four quadrants using ordered pairs of rational numbers' },
      { code: '6.12A', title: 'Represent data graphically', description: 'Represent numeric data using dot plots, stem-and-leaf plots, histograms, and box plots' },
      { code: '6.12B', title: 'Describe distributions', description: 'Use graphical representations to describe center, spread, and shape of data' },
      { code: '6.12C', title: 'Numerical summaries', description: 'Summarize data with mean, median (center) and range, IQR (spread)' },
      { code: '6.12D', title: 'Categorical data', description: 'Summarize categorical data with mode, relative frequency, and percent bar graphs' },
      { code: '6.13A', title: 'Interpret data displays', description: 'Interpret numeric data summarized in dot plots, stem-and-leaf plots, histograms, and box plots' },
      { code: '6.13B', title: 'Variability', description: 'Distinguish between situations that yield data with and without variability' },
    ],
  },
  {
    id: 5,
    name: 'Personal Financial Literacy',
    color: 'bg-yellow-100',
    colorBorder: 'border-yellow-300',
    standards: [
      { code: '6.14A', title: 'Checking & debit cards', description: 'Compare features and costs of checking accounts and debit cards from different institutions' },
      { code: '6.14B', title: 'Debit vs credit cards', description: 'Distinguish between debit cards and credit cards' },
      { code: '6.14C', title: 'Check register', description: 'Balance a check register that includes deposits, withdrawals, and transfers' },
      { code: '6.14D', title: 'Credit history', description: 'Explain why it is important to establish a positive credit history' },
      { code: '6.14E', title: 'Credit reports', description: 'Describe the information in a credit report and how long it is retained' },
      { code: '6.14F', title: 'Financial responsibility', description: 'Describe the value of financial responsibility and costs of financial irresponsibility' },
      { code: '6.14G', title: 'Budgets', description: 'Estimate the cost of a two-year and four-year college education' },
      { code: '6.14H', title: 'College savings', description: 'Identify and explain the advantages and disadvantages of various savings options for college' },
    ],
  },
]

export function getStrand(id: number): TeksStrand | undefined {
  return strands.find((s) => s.id === id)
}

export function getStandardByCode(code: string): TeksStandard | undefined {
  for (const s of strands) {
    const found = s.standards.find((st) => st.code === code)
    if (found) return found
  }
  return undefined
}

export function getStrandForCode(code: string): TeksStrand | undefined {
  return strands.find((s) => s.standards.some((st) => st.code === code))
}
