interface BmiValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    if (bmi < 16) {
      return "Underweight (Severe thinness)";
    } else if (bmi < 17) {
      return "Underweight (Moderate thinness)";
    } else {
      return "Underweight (Mild thinness)";
    }
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  }

  if (bmi >= 25) {
    if (bmi < 30) {
      return "Overweight (Pre-obese)";
    }
    if (bmi >= 30 && bmi < 35) {
      return "Obese (Class I)";
    }
    if (bmi >= 35 && bmi < 40) {
      return "Obese (Class II)";
    } else {
      return "Obese (Class III)";
    }
  }
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
