module.exports = (arox) => {
  arox.functionManager.createFunction({
    name: "$smallNumber",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const [num] = data.inside.splits;

      const text = num
        .replaceAll("1", "¹")
        .replaceAll("2", "²")
        .replaceAll("3", "³")
        .replaceAll("4", "⁴")
        .replaceAll("5", "⁵")
        .replaceAll("6", "⁶")
        .replaceAll("7", "⁷")
        .replaceAll("8", "⁸")
        .replaceAll("9", "⁹")
        .replaceAll("0", "⁰");

      data.result = text;
      
      return { code: d.util.setCode(data) };
    },
  });
};

/*
  ### $smallNumber
  Converts a number into small numbers (subscript).
  
  ### Usage:
  $smallNumber[number]
  
  ### Parameters:
  number | required | The number to convert into small numbers (subscript).
*/
