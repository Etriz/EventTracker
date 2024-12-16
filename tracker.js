const fs = require("fs").promises;
var argv = require("yargs/yargs")(process.argv.slice(2)).argv;
// console.log(argv);

const readFile = async () => {
  try {
    const read = await fs.readFile("data.json", { encoding: "utf-8" });
    const data = await JSON.parse(read);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const findAll = async (item) => {
  const file = await readFile();
  const findResult = await file[item];
  if (findResult) {
    return findResult.join(", ");
  } else {
    //   throw new Error('Item not found');
    throw `${item} not found`;
  }
};

const findLatest = async (item) => {
  const all = await findAll(item);
  if (all) {
    const latest = await all[all.length - 1];
    return latest;
  } else {
    throw "length error";
  }
};
const addEvent = async (item) => {
  const today = new Date(Date.now()).toDateString();
  const findResult = await findAll(item);
  const addItem = await findResult.concat(", ", today);
  console.log(addItem);
  //   await fs.writeFile('data.json', addItem, { flag: 'a' });
  return "Today added to tracker";
};

(async function () {
  let data;
  if (argv.f) {
    data = await findAll(argv.f);
  } else if (argv.l) {
    data = await findLatest(argv.l);
  } else if (argv.a) {
    data = await addEvent(argv.a);
  }
  console.log(data);
})();
