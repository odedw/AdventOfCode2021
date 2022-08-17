using System.Text.Json;

#region input parsing
IEnumerable<Line> lines = JsonSerializer.Deserialize<string[]>(File.ReadAllText("./input.json"))!
  .Select(
    str => str.Split(',')
    .Select(token => int.Parse(token)).ToArray())
    .Select(arr => new Line(new Point(arr[0], arr[1]), new Point(arr[2], arr[3])));
#endregion

List<Point> GetAllPointsInLine(Line l)
{
  var points = new List<Point>();
  if (l.start.x == l.end.x || l.start.y == l.end.y) // straight line
  {
    for (var x = Math.Min(l.start.x, l.end.x); x <= Math.Max(l.start.x, l.end.x); x++)
      for (var y = Math.Min(l.start.y, l.end.y); y <= Math.Max(l.start.y, l.end.y); y++)
      {
        points.Add(new Point(x, y));
      }
  }
  else
  { // diagonal line
    var x = l.start.x;
    var y = l.start.y;
    do
    {
      points.Add(new Point(x, y));
      x += x < l.end.x ? 1 : -1;
      y += y < l.end.y ? 1 : -1;
    } while (x != l.end.x && y != l.end.y);
    points.Add(new Point(x, y));
  }
  return points;
}

var result = lines
  .SelectMany(lines => GetAllPointsInLine(lines))
  .GroupBy(p => p)
  .Where(g => g.Count() > 1)
  .Count();

Console.WriteLine(result);

struct Point
{
  public int x, y;
  public Point(int x_, int y_) { x = x_; y = y_; }
  public override string ToString() { return $"{x},{y}"; }
}

struct Line
{
  public Point start, end;
  public Line(Point start_, Point end_) { start = start_; end = end_; }
}