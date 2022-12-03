import axios from 'axios';
import cheerio from 'cheerio';

const url =
  'https://www.myfitnesspal.com/food/diary/aaronjbergman?date=2021-05-02';

export const MyFitnessPalApi = () => {
  const macros = {
    dailyGoal: new Map(),
    dailyRemaining: new Map(),
    dailyTotal: new Map()
  };

  axios
    .get(url)
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);

      getTotal($, macros);
      getDailyTotal($, macros);
      getRemaining($, macros);
    })
    .catch(error => {
      console.log(error);
    });
};

// -------------------------------------------------------------------------------------
// Get Total
const getTotal = (
  $: any,
  macros: {
    dailyGoal?: Map<any, any>;
    dailyRemaining?: Map<any, any>;
    dailyTotal: any;
  }
) => {
  const total: string | string[] = [];

  $('table.table0')
    .find('tbody')
    .find('tr.total')
    .first()
    .find('td')
    .each(function (this: any) {
      total.push(
        $(this)
          .text()
          .trim()
          .replace(/(\r\n|\n|\r)/gm, '')
      );
    });

  macros.dailyTotal
    .set('calories', total[1])
    .set('carbs', total[2]?.split(' ')[0]) // FYI [0]-> total carbs  && [1] percentage
    .set('fat', total[3]?.split(' ')[0])
    .set('protien', total[4]?.split(' ')[0])
    .set('sodium', total[5]?.split(' ')[0])
    .set('sugar', total[6]?.split(' ')[0]);

  console.log('total: ' + total);
  console.log(macros.dailyTotal);
};

// -------------------------------------------------------------------------------------
//Get Daily
const getDailyTotal = (
  $: any,
  macros: {
    dailyGoal: Map<any, any>;
    dailyRemaining: Map<any, any>;
    dailyTotal: any;
  }
) => {
  const dailyGoal: string | string[] = [];

  $('table.table0')
    .find('tbody')
    .find('tr.alt')
    .first()
    .find('td')
    .each(function (this: any) {
      dailyGoal.push(
        $(this)
          .text()
          .trim()
          .replace(/(\r\n|\n|\r)/gm, '')
      );
    });

  macros.dailyGoal
    .set('calories', dailyGoal[1])
    .set('carbs', dailyGoal[2]?.split(' ')[0]) // FYI [0]-> total carbs  && [1] percentage
    .set('fat', dailyGoal[3]?.split(' ')[0])
    .set('protien', dailyGoal[4]?.split(' ')[0])
    .set('sodium', dailyGoal[5]?.split(' ')[0])
    .set('sugar', dailyGoal[6]?.split(' ')[0]);

  console.log('Daily Goal: ' + dailyGoal);
  console.log(macros.dailyTotal);
};

// -------------------------------------------------------------------------------------
// Get Remaining
const getRemaining = (
  $: any,
  macros: {
    dailyGoal: Map<any, any>;
    dailyRemaining: Map<any, any>;
    dailyTotal: any;
  }
) => {
  const totalRemaining: string | string[] = [];

  $('table.table0')
    .find('tbody')
    .find('tr.remaining')
    .first()
    .find('td')
    .each(function (this: any) {
      totalRemaining.push(
        $(this)
          .text()
          .trim()
          .replace(/(\r\n|\n|\r)/gm, '')
      );
    });

  macros.dailyRemaining
    .set('calories', totalRemaining[1])
    .set('carbs', totalRemaining[2]?.split(' ')[0]) // FYI [0]-> total carbs  && [1] percentage
    .set('fat', totalRemaining[3]?.split(' ')[0])
    .set('protien', totalRemaining[4]?.split(' ')[0])
    .set('sodium', totalRemaining[5]?.split(' ')[0])
    .set('sugar', totalRemaining[6]?.split(' ')[0]);

  console.log('totalRemaining: ' + totalRemaining);
  console.log(macros.dailyTotal);
};
