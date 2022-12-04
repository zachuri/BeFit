import cheerio from 'cheerio';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST']
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: { method: string; body: { userName: any; userDate: any; }; }, res: {
    statusCode: number; json: (arg0: {
      total: any[] | never []; dailyGoal: any[] | never[]; remaining: any[] | never[]; userName?: any; error // Helper method to wait for a middleware to execute before continuing
      // And to throw an error when an error happens in a middleware
      ?: string | undefined;
    }) => any;
  }, fn: {
    (req: Cors.CorsRequest, res: {
      statusCode?: number | undefined; setHeader(key: string, value: string): any; end(): any; // This is to remove the percentage
    }, next: (err?: any) => any): void; (arg0: any, arg1: any, arg2: (result: unknown) => void): void;
  }) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: { method: string; body: { userName: any; userDate: any } },
  res: {
    statusCode: number;
    json: (arg0: {
      total: any[] | never[];
      dailyGoal: any[] | never[];
      remaining: any[] | never[];
      userName?: any;
      error?: string;
    }) => any;
  }
) => {
  await runMiddleware(req, res, cors)
  if (req.method === 'POST') {
    const userName = req.body.userName;
    const date = new Date(req.body.userDate);

    console.log(date);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    try {
      const url = `https://www.myfitnesspal.com/food/diary/${userName}?date=${year}-${
        month + 1
      }-${day}`;

      console.log(url);

      const response = await fetch(url);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);

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

      res.statusCode = 200;
      return res.json({
        total: total,
        dailyGoal: dailyGoal,
        remaining: remaining
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        userName: userName,
        error: `${userName} not found. Tip: Double check the spelling.`,
        total: [],
        dailyGoal: [],
        remaining: []
      });
    }
  }
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
  console.log('FUNCTION Total: ' + total);
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
  console.log('FUNCTION Daily Goal: ' + dailyGoal);
};

const getRemaining = ($: any, remaining: any[]) => {
  $('table.table0')
    .find('tbody')
    .find('tr.remaining')
    .first()
    .find('td')
    .each(function (this: any) {
      remaining.push(
        $(this)
          .text()
          .trim()
          .replace(/(\r\n|\n|\r)/gm, '')
      );
    });
  console.log('FUNCTION Remaining: ' + remaining);
};
