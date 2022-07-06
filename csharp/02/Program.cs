using System.Text.Json;

var arr = JsonSerializer.Deserialize<string[]>(File.ReadAllText("./input.json"))!;

// part 1
var horizontal = arr
                  .Where(str => str.StartsWith("forward"))
                  .Select(str => Int32.Parse(str.Split(" ")[1]))
                  .Sum();

var depth = arr
              .Where(str => !str.StartsWith("forward"))
              .Select(str => str.Split(" "))
              .Select(tokens => Int32.Parse(tokens[1]) * (tokens[0] == "up" ? -1 : 1))
              .Sum();

Console.WriteLine(depth*horizontal);

// part 2
depth = horizontal = 0;
var aim = 0;

foreach(string str in arr) {
  var tokens = str.Split(" ");
  var value = Int32.Parse(tokens[1]);
  
  if (tokens[0] == "forward") {
    horizontal += value;
    depth += aim * value;
  } else {
    aim += value * (tokens[0] == "up" ? -1 : 1);
  }
}

Console.WriteLine(depth*horizontal);
