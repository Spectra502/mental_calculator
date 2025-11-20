export const generateQuestion = (mode, difficulty = 'medium') => {
  let min, max;

  // 1. Define difficulty ranges
  switch (difficulty) {
    case 'easy': min = 1; max = 9; break;
    case 'medium': min = 10; max = 99; break;
    case 'hard': min = 100; max = 999; break;
    default: min = 10; max = 99;
  }

  // 2. Generate random numbers
  // Helper to get random int between min and max
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  let num1 = rand(min, max);
  let num2 = rand(min, max);
  
  let questionText = "";
  let answer = 0;

  // 3. specific logic per mode
  switch (mode) {
    case 'addition':
      questionText = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;

    case 'subtraction':
      // Ensure result is positive by swapping if needed
      const big = Math.max(num1, num2);
      const small = Math.min(num1, num2);
      questionText = `${big} - ${small}`;
      answer = big - small;
      break;

    case 'multiplication':
      // Reduce range for multiplication to prevent impossible mental math (e.g. 99 * 99)
      const limit = difficulty === 'easy' ? 9 : difficulty === 'medium' ? 12 : 20;
      const n1 = rand(2, limit);
      const n2 = rand(2, limit);
      questionText = `${n1} × ${n2}`;
      answer = n1 * n2;
      break;

    case 'division':
      // Division Hack: Multiply first, then ask the reverse.
      // If we want 12 / 4 = 3, we generate 4 * 3 = 12.
      const divLimit = difficulty === 'easy' ? 9 : 12;
      const factor1 = rand(2, divLimit);
      const factor2 = rand(2, divLimit);
      const product = factor1 * factor2;
      
      questionText = `${product} ÷ ${factor1}`;
      answer = factor2;
      break;

    default:
      questionText = "Error";
      answer = 0;
  }

  return { text: questionText, answer: answer };
};