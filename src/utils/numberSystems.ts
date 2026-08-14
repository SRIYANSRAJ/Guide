import { BaseType, BaseInfo, DivisionStep, MultiplicationFractionStep, BitGroup, ArithmeticColumnStep, SubtractionColumnStep } from '../types';

export const BASES: Record<BaseType, BaseInfo> = {
  2: {
    base: 2,
    name: 'Binary',
    symbol: 'BIN',
    prefix: '0b',
    subscript: '₂',
    digits: ['0', '1'],
    bitsPerDigit: 1,
    color: '#3b82f6',
    lightBg: '#eff6ff',
    borderColor: '#93c5fd',
    description: 'The native binary language of transistors and modern digital computer architectures.',
  },
  8: {
    base: 8,
    name: 'Octal',
    symbol: 'OCT',
    prefix: '0o',
    subscript: '₈',
    digits: ['0', '1', '2', '3', '4', '5', '6', '7'],
    bitsPerDigit: 3,
    color: '#8b5cf6',
    lightBg: '#f5f3ff',
    borderColor: '#c4b5fd',
    description: 'Compact grouping of 3 binary bits, historically used in Unix file permissions and computing systems.',
  },
  10: {
    base: 10,
    name: 'Decimal',
    symbol: 'DEC',
    prefix: '',
    subscript: '₁₀',
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    color: '#10b981',
    lightBg: '#ecfdf5',
    borderColor: '#6ee7b7',
    description: 'The standard denary human counting system based on ten human fingers (digits 0–9).',
  },
  16: {
    base: 16,
    name: 'Hexadecimal',
    symbol: 'HEX',
    prefix: '0x',
    subscript: '₁₆',
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    bitsPerDigit: 4,
    color: '#f59e0b',
    lightBg: '#fffbeb',
    borderColor: '#fcd34d',
    description: 'Compact grouping of 4 binary bits (1 byte = 2 hex digits), universally used in memory addressing & color codes.',
  },
};

export function charToValue(ch: string): number {
  const upper = ch.toUpperCase();
  if (upper >= '0' && upper <= '9') {
    return upper.charCodeAt(0) - 48;
  }
  if (upper >= 'A' && upper <= 'Z') {
    return upper.charCodeAt(0) - 55;
  }
  return -1;
}

export function valueToChar(val: number): string {
  if (val >= 0 && val <= 9) return String(val);
  if (val >= 10 && val <= 35) return String.fromCharCode(55 + val);
  return '?';
}

export function isValidDigit(ch: string, base: BaseType): boolean {
  const v = charToValue(ch);
  return v >= 0 && v < base;
}

export function isValidNumberString(str: string, base: BaseType): boolean {
  if (!str || str.trim() === '') return false;
  const parts = str.trim().split('.');
  if (parts.length > 2) return false;
  
  const intPart = parts[0];
  const fracPart = parts[1] || '';

  if (intPart.length === 0 && fracPart.length === 0) return false;

  for (const ch of intPart) {
    if (!isValidDigit(ch, base)) return false;
  }
  for (const ch of fracPart) {
    if (!isValidDigit(ch, base)) return false;
  }
  return true;
}

export function parseNumberToDecimal(str: string, base: BaseType): number {
  if (!isValidNumberString(str, base)) return 0;
  const parts = str.trim().split('.');
  const intPart = parts[0] || '0';
  const fracPart = parts[1] || '';

  let total = 0;
  for (let i = 0; i < intPart.length; i++) {
    const val = charToValue(intPart[i]);
    const power = intPart.length - 1 - i;
    total += val * Math.pow(base, power);
  }

  for (let i = 0; i < fracPart.length; i++) {
    const val = charToValue(fracPart[i]);
    const power = -(i + 1);
    total += val * Math.pow(base, power);
  }

  return total;
}

export function convertDecimalToBase(decNum: number, targetBase: BaseType, maxFracDigits = 8): string {
  if (isNaN(decNum) || decNum === 0) return '0';

  const intVal = Math.floor(decNum);
  let fracVal = decNum - intVal;

  let intStr = '';
  if (intVal === 0) {
    intStr = '0';
  } else {
    let n = intVal;
    while (n > 0) {
      const rem = n % targetBase;
      intStr = valueToChar(rem) + intStr;
      n = Math.floor(n / targetBase);
    }
  }

  if (fracVal > 1e-9) {
    let fracStr = '';
    let count = 0;
    while (fracVal > 1e-9 && count < maxFracDigits) {
      fracVal *= targetBase;
      const digit = Math.floor(fracVal);
      fracStr += valueToChar(digit);
      fracVal -= digit;
      count++;
    }
    return `${intStr}.${fracStr}`;
  }

  return intStr;
}

export function convertBetweenBases(inputStr: string, fromBase: BaseType, toBase: BaseType): string {
  if (!isValidNumberString(inputStr, fromBase)) return '0';
  if (fromBase === toBase) return inputStr;

  // Direct bit grouping shortcuts when converting between power-of-2 bases
  if ((fromBase === 2 || fromBase === 8 || fromBase === 16) && (toBase === 2 || toBase === 8 || toBase === 16)) {
    // Convert to binary first
    let binaryStr = '';
    const parts = inputStr.trim().split('.');
    const intPart = parts[0] || '0';
    const fracPart = parts[1] || '';

    // Int part to binary
    if (fromBase === 2) {
      binaryStr = intPart;
    } else if (fromBase === 8) {
      binaryStr = Array.from(intPart).map(c => charToValue(c).toString(2).padStart(3, '0')).join('');
    } else if (fromBase === 16) {
      binaryStr = Array.from(intPart).map(c => charToValue(c).toString(2).padStart(4, '0')).join('');
    }
    // Remove leading zeros from binary int
    binaryStr = binaryStr.replace(/^0+/, '') || '0';

    let fracBinary = '';
    if (fracPart.length > 0) {
      if (fromBase === 2) {
        fracBinary = fracPart;
      } else if (fromBase === 8) {
        fracBinary = Array.from(fracPart).map(c => charToValue(c).toString(2).padStart(3, '0')).join('');
      } else if (fromBase === 16) {
        fracBinary = Array.from(fracPart).map(c => charToValue(c).toString(2).padStart(4, '0')).join('');
      }
    }

    if (toBase === 2) {
      return fracBinary ? `${binaryStr}.${fracBinary}` : binaryStr;
    }

    const groupSize = toBase === 8 ? 3 : 4;
    // Pad int from left
    const padLen = (groupSize - (binaryStr.length % groupSize)) % groupSize;
    const paddedInt = '0'.repeat(padLen) + binaryStr;
    let targetInt = '';
    for (let i = 0; i < paddedInt.length; i += groupSize) {
      const chunk = paddedInt.slice(i, i + groupSize);
      targetInt += valueToChar(parseInt(chunk, 2));
    }
    targetInt = targetInt.replace(/^0+/, '') || '0';

    let targetFrac = '';
    if (fracBinary.length > 0) {
      const padFracLen = (groupSize - (fracBinary.length % groupSize)) % groupSize;
      const paddedFrac = fracBinary + '0'.repeat(padFracLen);
      for (let i = 0; i < paddedFrac.length; i += groupSize) {
        const chunk = paddedFrac.slice(i, i + groupSize);
        targetFrac += valueToChar(parseInt(chunk, 2));
      }
      targetFrac = targetFrac.replace(/0+$/, '');
    }

    return targetFrac ? `${targetInt}.${targetFrac}` : targetInt;
  }

  // General conversion via decimal
  const dec = parseNumberToDecimal(inputStr, fromBase);
  return convertDecimalToBase(dec, toBase);
}

// Generate successive division steps for converting Decimal Integer to any base
export function getSuccessiveDivisionSteps(decimalInt: number, targetBase: BaseType): DivisionStep[] {
  const steps: DivisionStep[] = [];
  let current = Math.floor(decimalInt);

  if (current === 0) {
    steps.push({
      dividend: 0,
      divisor: targetBase,
      quotient: 0,
      remainder: 0,
      remainderSymbol: '0',
    });
    return steps;
  }

  while (current > 0) {
    const quotient = Math.floor(current / targetBase);
    const remainder = current % targetBase;
    steps.push({
      dividend: current,
      divisor: targetBase,
      quotient,
      remainder,
      remainderSymbol: valueToChar(remainder),
    });
    current = quotient;
  }
  return steps;
}

// Generate successive multiplication steps for converting Decimal Fraction to any base
export function getSuccessiveMultiplicationSteps(fraction: number, targetBase: BaseType, maxSteps = 6): MultiplicationFractionStep[] {
  const steps: MultiplicationFractionStep[] = [];
  let currentFrac = fraction;
  let count = 0;

  while (currentFrac > 1e-9 && count < maxSteps) {
    const product = currentFrac * targetBase;
    const integerPart = Math.floor(product);
    const remainingFraction = +(product - integerPart).toFixed(8);

    steps.push({
      fraction: currentFrac,
      multiplier: targetBase,
      product: +product.toFixed(8),
      integerPart,
      integerSymbol: valueToChar(integerPart),
      remainingFraction,
    });

    currentFrac = remainingFraction;
    count++;
  }
  return steps;
}

// Generate bit grouping breakdown (Binary <-> Octal / Hex)
export function getBitGroupingBreakdown(binaryStr: string, targetBase: 8 | 16): { intGroups: BitGroup[]; fracGroups: BitGroup[] } {
  const groupSize = targetBase === 8 ? 3 : 4;
  const parts = binaryStr.split('.');
  const intPart = parts[0] || '0';
  const fracPart = parts[1] || '';

  const padLen = (groupSize - (intPart.length % groupSize)) % groupSize;
  const paddedInt = '0'.repeat(padLen) + intPart;

  const intGroups: BitGroup[] = [];
  for (let i = 0; i < paddedInt.length; i += groupSize) {
    const chunk = paddedInt.slice(i, i + groupSize);
    const val = parseInt(chunk, 2);
    intGroups.push({
      groupBits: chunk,
      digitSymbol: valueToChar(val),
      decimalValue: val,
      padded: i === 0 && padLen > 0,
    });
  }

  const fracGroups: BitGroup[] = [];
  if (fracPart.length > 0) {
    const padFracLen = (groupSize - (fracPart.length % groupSize)) % groupSize;
    const paddedFrac = fracPart + '0'.repeat(padFracLen);
    for (let i = 0; i < paddedFrac.length; i += groupSize) {
      const chunk = paddedFrac.slice(i, i + groupSize);
      const val = parseInt(chunk, 2);
      fracGroups.push({
        groupBits: chunk,
        digitSymbol: valueToChar(val),
        decimalValue: val,
        padded: i === paddedFrac.length - groupSize && padFracLen > 0,
      });
    }
  }

  return { intGroups, fracGroups };
}

// Power expansion details
export function getPowerExpansionDetails(str: string, base: BaseType) {
  const parts = str.split('.');
  const intPart = parts[0] || '0';
  const fracPart = parts[1] || '';

  const intTerms = Array.from(intPart).map((ch, idx) => {
    const power = intPart.length - 1 - idx;
    const val = charToValue(ch);
    const weight = Math.pow(base, power);
    const termValue = val * weight;
    return {
      char: ch,
      val,
      power,
      weight,
      termValue,
      formula: `${ch} × ${base}^${power}`,
      expanded: `${val} × ${weight} = ${termValue}`,
    };
  });

  const fracTerms = Array.from(fracPart).map((ch, idx) => {
    const power = -(idx + 1);
    const val = charToValue(ch);
    const weight = Math.pow(base, power);
    const termValue = val * weight;
    return {
      char: ch,
      val,
      power,
      weight,
      termValue,
      formula: `${ch} × ${base}^(${power})`,
      expanded: `${val} × ${weight.toFixed(4)} = ${termValue.toFixed(4)}`,
    };
  });

  const total = intTerms.reduce((sum, t) => sum + t.termValue, 0) + fracTerms.reduce((sum, t) => sum + t.termValue, 0);

  return { intTerms, fracTerms, total };
}

// Multi-base column addition steps generator
export function generateAdditionSteps(aStr: string, bStr: string, base: BaseType): ArithmeticColumnStep[] {
  const cleanA = aStr.trim().toUpperCase();
  const cleanB = bStr.trim().toUpperCase();
  const maxLen = Math.max(cleanA.length, cleanB.length);

  const paddedA = cleanA.padStart(maxLen, '0');
  const paddedB = cleanB.padStart(maxLen, '0');

  const steps: ArithmeticColumnStep[] = [];
  let carry = 0;

  for (let i = maxLen - 1; i >= 0; i--) {
    const colIndex = maxLen - 1 - i;
    const digitA = paddedA[i];
    const digitB = paddedB[i];
    const valA = charToValue(digitA);
    const valB = charToValue(digitB);

    const sum = valA + valB + carry;
    const resultVal = sum % base;
    const nextCarry = Math.floor(sum / base);

    let explanation = '';
    if (carry > 0) {
      explanation = `Add digits ${valA} + ${valB} + carry ${carry} = ${sum}. In base ${base}: ${sum} ≥ ${base}, so result is ${resultVal} (${valueToChar(resultVal)}) with Carry ${nextCarry} forward.`;
    } else {
      if (sum >= base) {
        explanation = `Add digits ${valA} + ${valB} = ${sum}. Since ${sum} ≥ base ${base}, output digit is ${resultVal} (${valueToChar(resultVal)}) and Carry ${nextCarry} to next left position.`;
      } else {
        explanation = `Add digits ${valA} + ${valB} = ${sum}. Since ${sum} < base ${base}, no carry is generated. Output digit is ${valueToChar(resultVal)}.`;
      }
    }

    steps.push({
      colIndex,
      positionPower: colIndex,
      colName: `Position ${base}^${colIndex} (${Math.pow(base, colIndex)})`,
      digitA,
      digitB,
      valA,
      valB,
      carryIn: carry,
      rawSum: sum,
      sumDigit: valueToChar(resultVal),
      carryOut: nextCarry,
      explanation,
    });

    carry = nextCarry;
  }

  if (carry > 0) {
    steps.push({
      colIndex: maxLen,
      positionPower: maxLen,
      colName: `Final Overflow Position ${base}^${maxLen}`,
      digitA: '0',
      digitB: '0',
      valA: 0,
      valB: 0,
      carryIn: carry,
      rawSum: carry,
      sumDigit: valueToChar(carry),
      carryOut: 0,
      explanation: `Final leftover carry ${carry} drops down as the most significant digit.`,
    });
  }

  return steps;
}

// SLOW-MOTION CHAIN BORROW SUBTRACTION ENGINE
export function generateChainBorrowSubtractionSteps(
  aStr: string,
  bStr: string,
  base: BaseType
): SubtractionColumnStep[] {
  const cleanA = aStr.trim().toUpperCase();
  const cleanB = bStr.trim().toUpperCase();
  const maxLen = Math.max(cleanA.length, cleanB.length);

  const digitsA = Array.from(cleanA.padStart(maxLen, '0')).map(charToValue);
  const digitsB = Array.from(cleanB.padStart(maxLen, '0')).map(charToValue);

  const steps: SubtractionColumnStep[] = [];
  let stepId = 0;

  const currentStrikethroughs: Record<number, { oldVal: string; newVal: string; stage: 'source' | 'path' | 'target' }> = {};
  const currentIntermediate: Record<number, string> = {};
  const currentResults: Record<number, string> = {};

  // Process right-to-left
  for (let i = maxLen - 1; i >= 0; i--) {
    const colIdx = maxLen - 1 - i;
    const topVal = digitsA[i];
    const bottomVal = digitsB[i];

    // Step 1: Inspect column
    steps.push({
      stepId: stepId++,
      actionType: 'inspect',
      activeCol: colIdx,
      strikethroughs: { ...currentStrikethroughs },
      intermediateValues: { ...currentIntermediate },
      resultDigits: { ...currentResults },
      explanation: `Inspecting column at position ${base}^${colIdx}. Top digit is ${valueToChar(topVal)} (${topVal}), bottom digit is ${valueToChar(bottomVal)} (${bottomVal}).`,
    });

    if (topVal >= bottomVal) {
      // Direct subtraction without borrow
      const diff = topVal - bottomVal;
      currentResults[colIdx] = valueToChar(diff);

      steps.push({
        stepId: stepId++,
        actionType: 'subtract',
        activeCol: colIdx,
        strikethroughs: { ...currentStrikethroughs },
        intermediateValues: { ...currentIntermediate },
        resultDigits: { ...currentResults },
        explanation: `${topVal} ≥ ${bottomVal}: Direct subtraction! ${topVal} − ${bottomVal} = ${diff} (${valueToChar(diff)}). No borrow needed.`,
      });
    } else {
      // Need to borrow! Find first non-zero column to the left
      let sourceColIdx = -1;
      let sourceColArrayIdx = -1;

      for (let k = i - 1; k >= 0; k--) {
        if (digitsA[k] > 0) {
          sourceColArrayIdx = k;
          sourceColIdx = maxLen - 1 - k;
          break;
        }
      }

      steps.push({
        stepId: stepId++,
        actionType: 'borrow_find',
        activeCol: colIdx,
        borrowFromCol: sourceColIdx,
        strikethroughs: { ...currentStrikethroughs },
        intermediateValues: { ...currentIntermediate },
        resultDigits: { ...currentResults },
        explanation: `${topVal} < ${bottomVal}: Top digit is too small! Looking left for nearest non-zero donor column... Found donor at position ${base}^${sourceColIdx} (value ${digitsA[sourceColArrayIdx]}).`,
      });

      if (sourceColArrayIdx !== -1) {
        // Strike through donor
        const oldDonorVal = digitsA[sourceColArrayIdx];
        const newDonorVal = oldDonorVal - 1;
        digitsA[sourceColArrayIdx] = newDonorVal;

        currentStrikethroughs[sourceColIdx] = {
          oldVal: valueToChar(oldDonorVal),
          newVal: valueToChar(newDonorVal),
          stage: 'source',
        };

        steps.push({
          stepId: stepId++,
          actionType: 'strike_source',
          activeCol: colIdx,
          borrowFromCol: sourceColIdx,
          strikethroughs: { ...currentStrikethroughs },
          intermediateValues: { ...currentIntermediate },
          resultDigits: { ...currentResults },
          explanation: `[STRIKE 1] Donor at column ${sourceColIdx} gives up 1. Strike out ${valueToChar(oldDonorVal)} ➔ Reduced to ${valueToChar(newDonorVal)}. Carry is now traveling right!`,
        });

        // Pass through intermediate 0 columns
        for (let mid = sourceColArrayIdx + 1; mid < i; mid++) {
          const midColIdx = maxLen - 1 - mid;
          // Intermediate zero receives base, then gives 1 to the next, becoming base - 1
          digitsA[mid] = base - 1;

          currentStrikethroughs[midColIdx] = {
            oldVal: '0',
            newVal: valueToChar(base - 1),
            stage: 'path',
          };

          steps.push({
            stepId: stepId++,
            actionType: 'strike_intermediate',
            activeCol: colIdx,
            borrowFromCol: midColIdx + 1,
            borrowToCol: midColIdx,
            arrowActive: { from: midColIdx + 1, to: midColIdx },
            strikethroughs: { ...currentStrikethroughs },
            intermediateValues: { ...currentIntermediate },
            resultDigits: { ...currentResults },
            explanation: `[CHAIN BORROW] Column ${midColIdx} was 0. It receives 1 group of base ${base}, turning into ${base}. It immediately lends 1 to the right, so STRIKE 0 ➔ ${valueToChar(base - 1)} (${base - 1}).`,
          });
        }

        // Target column receives 1 full group of base
        const oldTargetVal = digitsA[i];
        const newTargetVal = oldTargetVal + base;
        digitsA[i] = newTargetVal;

        currentStrikethroughs[colIdx] = {
          oldVal: valueToChar(oldTargetVal),
          newVal: `${valueToChar(oldTargetVal)}+${base}=${newTargetVal}`,
          stage: 'target',
        };
        currentIntermediate[colIdx] = `${newTargetVal}`;

        steps.push({
          stepId: stepId++,
          actionType: 'transfer_target',
          activeCol: colIdx,
          borrowFromCol: colIdx + 1,
          borrowToCol: colIdx,
          arrowActive: { from: colIdx + 1, to: colIdx },
          strikethroughs: { ...currentStrikethroughs },
          intermediateValues: { ...currentIntermediate },
          resultDigits: { ...currentResults },
          explanation: `[TARGET ARRIVAL] Column ${colIdx} receives 1 unit from left (= ${base} in base ${base}). Target value becomes ${oldTargetVal} + ${base} = ${newTargetVal} (${valueToChar(newTargetVal)}).`,
        });

        // Now perform subtraction on target column
        const finalDiff = newTargetVal - bottomVal;
        currentResults[colIdx] = valueToChar(finalDiff);

        steps.push({
          stepId: stepId++,
          actionType: 'subtract',
          activeCol: colIdx,
          strikethroughs: { ...currentStrikethroughs },
          intermediateValues: { ...currentIntermediate },
          resultDigits: { ...currentResults },
          explanation: `Perform subtraction: ${newTargetVal} − ${bottomVal} = ${finalDiff} (${valueToChar(finalDiff)}). Column ${colIdx} completed!`,
        });
      }
    }
  }

  // Done step
  steps.push({
    stepId: stepId++,
    actionType: 'done',
    activeCol: -1,
    strikethroughs: { ...currentStrikethroughs },
    intermediateValues: { ...currentIntermediate },
    resultDigits: { ...currentResults },
    explanation: `🎉 Subtraction complete! Final difference in Base ${base} is ${Object.keys(currentResults).sort((a,b) => +b - +a).map(k => currentResults[+k]).join('')}.`,
  });

  return steps;
}

// Generate complement representation and math
export function getComplementDetails(valStr: string, base: BaseType, bitWidth = 8) {
  const clean = valStr.trim().toUpperCase().padStart(bitWidth, '0');
  const maxDigitVal = base - 1;

  // Diminished radix complement (r-1's complement: 1's in base 2, 7's in base 8, 9's in base 10, 15's in base 16)
  let diminishedComplement = '';
  for (const ch of clean) {
    const v = charToValue(ch);
    const inverted = maxDigitVal - v;
    diminishedComplement += valueToChar(inverted);
  }

  // Radix complement (r's complement: 2's in base 2, 8's in base 8, 10's in base 10, 16's in base 16)
  // Radix comp = (r-1)'s comp + 1
  let radixComplement = '';
  let carry = 1;
  for (let i = diminishedComplement.length - 1; i >= 0; i--) {
    const v = charToValue(diminishedComplement[i]);
    const sum = v + carry;
    radixComplement = valueToChar(sum % base) + radixComplement;
    carry = Math.floor(sum / base);
  }

  return {
    original: clean,
    diminishedName: `${maxDigitVal}'s Complement`,
    diminishedValue: diminishedComplement,
    radixName: `${base}'s Complement`,
    radixValue: radixComplement,
  };
}
