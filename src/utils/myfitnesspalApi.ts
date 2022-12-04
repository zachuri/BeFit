import axios from 'axios';
import cheerio from 'cheerio';

interface Result {
  total?: string[];
  dailyGoal?: string[];
  remaining?: string[];
}

export const getMyFitnessPalData = async (): Promise<Result> => {
  const url =
    'https://www.myfitnesspal.com/food/diary/aaronjbergman?date=2021-05-02';

  const pageResponse = await axios.get(url);

  const keys = [];
  const result = [];

  const $ = cheerio.load(pageResponse.data);

  const total: any[] | PromiseLike<any[]> = [];
  const dailyGoal: any[] | PromiseLike<any[]> = [];
  const remaining: any[] | PromiseLike<any[]> = [];

  getTotal($, total);
  getDailyGoal($, dailyGoal);
  getRemaining($, remaining);

  for (let i = 2; i <= 4; ++i) {
    // This is to remove the percentage
    // for carbs, fat, protien [2,3,4]

    total[i] = total[i]?.split(' ')[0];
    dailyGoal[i] = dailyGoal[i]?.split(' ')[0];
    remaining[i] = remaining[i]?.split(' ')[0];
  }

  return { total, dailyGoal, remaining };
};

const getTotal = ($: any, total: any[]) => {
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
};

const getDailyGoal = ($: any, dailyGoal: any[]) => {
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
};

const getRemaining = ($: any, dailyGoal: any[]) => {
  $('table.table0')
    .find('tbody')
    .find('tr.remaining')
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
};
