export type BaseType = 2 | 8 | 10 | 16;

export interface BaseInfo {
  base: BaseType;
  name: string;
  symbol: string;
  prefix: string;
  subscript: string;
  digits: string[];
  bitsPerDigit?: number;
  color: string;
  lightBg: string;
  borderColor: string;
  description: string;
}

export interface ConversionStep {
  stepNumber: number;
  description: string;
  formula?: string;
  currentValue?: string;
  highlight?: boolean;
}

export interface DivisionStep {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  remainderSymbol: string;
}

export interface MultiplicationFractionStep {
  fraction: number;
  multiplier: number;
  product: number;
  integerPart: number;
  integerSymbol: string;
  remainingFraction: number;
}

export interface BitGroup {
  groupBits: string;
  digitSymbol: string;
  decimalValue: number;
  padded?: boolean;
}

export interface ArithmeticColumnStep {
  colIndex: number;
  positionPower: number;
  colName: string;
  digitA: string;
  digitB: string;
  valA: number;
  valB: number;
  carryIn: number;
  rawSum?: number;
  sumDigit?: string;
  carryOut?: number;
  explanation: string;
}

export interface BorrowEvent {
  fromCol: number;
  toCol: number;
  originalVal: number;
  strikethroughVal: number;
  transferredAmount: number;
  description: string;
}

export interface SubtractionColumnStep {
  stepId: number;
  actionType: 'inspect' | 'borrow_find' | 'strike_source' | 'strike_intermediate' | 'transfer_target' | 'subtract' | 'done';
  activeCol: number;
  borrowFromCol?: number;
  borrowToCol?: number;
  strikethroughs: Record<number, { oldVal: string; newVal: string; stage: 'source' | 'path' | 'target' }>;
  intermediateValues: Record<number, string>;
  resultDigits: Record<number, string>;
  explanation: string;
  arrowActive?: { from: number; to: number };
}

export interface QuizQuestion {
  id: string;
  category: 'conversions' | 'addition' | 'subtraction' | 'complements' | 'fractions' | 'conceptual';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  description?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface TopicProgress {
  attempted: number;
  correct: number;
  streak: number;
}
