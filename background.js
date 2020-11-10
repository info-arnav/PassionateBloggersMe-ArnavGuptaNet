prototypeFunction = () => {
  that = this;
  return {
    named: that.name,
    functioner: () => {
      return that.age;
    },
  };
};

object = {
  functioner: () => {
    const that = this;
    func = () => {
      that.name = "changed";
    };
    func();
  },
};

const classMaker = (age, name) => {
  returner = Object.create(object);
  returner.name = name;
  returner.age = age;
  return returner;
};

objected = classMaker(10, "arnav"); //type 2 prototyping ig

const classenMaker = (age, name) => {
  returner = Object.create(prototypeFunction);
  returner.name = name;
  returner.age = age;
  return returner;
};

objected = classenMaker(10, "arnav"); //type 1 prototyping ig
