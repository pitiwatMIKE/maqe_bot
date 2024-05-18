function runBot(input: string) {
  const directionName = ["North", "East", "South", "West"];
  const direction = ["N", "E", "S", "W"] as const;
  const position = { x: 0, y: 0 };
  let idx = 0;

  for (let i = 0; i < input.length; i++) {
    validateInput(input, i);
    if (input[i] == "R") idx++;
    if (input[i] == "L") idx--;
    if (idx > direction.length - 1) idx = 0;
    if (idx < 0) idx = direction.length - 1;

    if (input[i] == "W") {
      let number = "";

      while (!isNaN(Number(input[i + 1]))) {
        number += input[i + 1];
        i++;
      }

      switch (direction[idx]) {
        case "N":
          position.y += Number(number);
          break;
        case "E":
          position.x += Number(number);
          break;
        case "S":
          position.y -= Number(number);
          break;
        case "W":
          position.x -= Number(number);
          break;
      }
    }
  }

  console.log(
    `X: ${position.x}, Y: ${position.y} Direction: ${directionName[idx]}`
  );
}

function validateInput(input: string, index: number) {
  const str = input[index];
  if (str != "R" && str != "L" && str != "W" && isNaN(Number(str))) {
    console.log(
      "Invalid command. Please use 'R' for right, 'L' for left, or 'W' followed by a number (e.g., W1, W2)."
    );
    console.log("Example: RW1LW2");
    throw "Error";
  }

  const next = Number(input[index + 1]);
  if (str == "W" && isNaN(next)) {
    console.log(
      "Invalid command. 'W' must be followed by a number (e.g., W1, W2)."
    );
    throw "Error";
  }

  const prev = Number(input[index - 1]);
  const current = Number(input[index]);
  if (
    (!isNaN(current) && input[index - 1] == "W") ||
    (!isNaN(current) && isNaN(prev))
  ) {
    console.log(
      "Invalid command. Numbers must directly follow 'W' (e.g., W1, W2)."
    );
    throw "Error";
  }
}

function runCase() {
  const inputList = [
    "RW15RW1",
    "W5RW5RW2RW1R",
    "RRW11RLLW19RRW12LW1",
    "LLW100W50RW200W10",
    "LLLLLW99RRRRRW88LLLRL",
    "W55555RW555555W444444W1",
  ];

  for (const input of inputList) {
    console.log(`input: ${input}`);
    runBot(input);
    console.log("");
  }
}
runCase();

// runBot("RW15RW1");
