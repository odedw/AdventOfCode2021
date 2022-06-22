using System.Text.Json;

var arr = JsonSerializer.Deserialize<int[]>(File.ReadAllText("./input.json"))!;

// Part 1
var count = arr.Where((number, i) => i > 0 && arr[i-1] < number)
                .Count();
Console.WriteLine(count);

// Part 2
count = arr.Where((number, i) => i > 0 && 
                                 i < arr.Length - 2 && 
                                 arr[i-1] + number + arr[i+1] < number + arr[i+1] + arr[i+2])
            .Count();
Console.WriteLine(count);