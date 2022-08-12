export const flat = (array) => {
    var result = [];
    array.forEach(function (a) {
      result.push(a);
      if (Array.isArray(a.children)) {
        result = result.concat(flat(a.children));
      }
    });
    return result;
  };
  