const dog = {
    name: 'Maxx',
    showMyName() {
      console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
      setTimeout(() => this.showMyName(), 1000);
    }
  };
  
  dog.whatsYourName();
  

const WEEKS = '일월화수목금토' //(: 유사배열객체)

const getWeekName = (weekNo) => `${WEEKS[weekNo]}요일`;

const day = new Date().getDay();
console.log(`오늘은 ${getWeekName(day)}입니다!`);