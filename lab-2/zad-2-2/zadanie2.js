function sum_strings(x) {
  if (Array.isArray(x)) {
    return x
      .map((el) => parseInt(el))
      .filter((el) => !isNaN(el))
      .reduce((acc, curr) => acc + parseInt(curr), 0);
  }
   return x.split("")
      .map((el) => parseInt(el))
      .filter((el) => !isNaN(el))
      .reduce((acc, curr) => acc + parseInt(curr), 0);

}
const digits = (s) => {
  return s.split("")
    .map((el) => parseInt(el))
    .filter((el) => !isNaN(el))
    .reduce((acc, curr,ind)=> {
        ind%2==0?acc[0]+=curr:acc[1]+=curr
        return acc
    },[0,0]);//[even,odd]

};
const letters = (s) => {
  return s
  .split("")
  .reduce((acc, curr)=> {
    curr.match(/[A-Z]/g)!=null?acc[0] += 1: (curr.match(/[a-z]/g)!=null?acc[1]+=1:0)
    return acc
  },[0,0]);//[lower, upper]
};

export { sum_strings, digits, letters };
