using System.Text.Json;

// input parsing
var crabs = JsonSerializer.Deserialize<int[]>(File.ReadAllText("./input.json"))!.ToArray();

// part 1
Array.Sort(crabs);
var median = crabs[crabs.Length / 2];
var totalFuel = crabs.Select(c => Math.Abs(c - median)).Sum();
Console.WriteLine(totalFuel);

// part 2
var minFuel = int.MaxValue; 
for(var i = crabs.Min(); i < crabs.Max(); i++)
{  
  var fuel = crabs.Select(c =>
  {
    var d = Math.Abs(c - i);
    return d * (d + 1) / 2; // sum of values in range 1..n
  }).Sum();
  minFuel = Math.Min(fuel, minFuel);
}

Console.WriteLine(minFuel);