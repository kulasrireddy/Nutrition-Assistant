import Meal from "../models/Meal.js";
import Water from "../models/Water.js";
import Bmi from "../models/Bmi.js";

const getDateKey = (dateValue) => {
  const date = new Date(dateValue);

  return date.toISOString().split("T")[0];
};

const createLastSevenDays = () => {
  const days = [];

  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);

    days.push({
      date,
      dateKey: getDateKey(date),
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      fullDate: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),
    });
  }

  return days;
};

export const getWeeklyAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const days = createLastSevenDays();

    const startDate = new Date(days[0].date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(days[6].date);
    endDate.setHours(23, 59, 59, 999);

    const [meals, waterRecords, bmiRecords] =
      await Promise.all([
        Meal.find({
          user: userId,
          mealDate: {
            $gte: startDate,
            $lte: endDate,
          },
        }).sort({ mealDate: 1 }),

        Water.find({
          user: userId,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        }).sort({ date: 1 }),

        Bmi.find({
          user: userId,
          calculatedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        }).sort({ calculatedAt: 1 }),
      ]);

    const weeklyData = days.map((day) => {
      const dayMeals = meals.filter(
        (meal) =>
          getDateKey(meal.mealDate) === day.dateKey
      );

      const dayWaterRecords = waterRecords.filter(
        (record) =>
          getDateKey(record.date) === day.dateKey
      );

      const dayBmiRecords = bmiRecords.filter(
        (record) =>
          getDateKey(record.calculatedAt) ===
          day.dateKey
      );

      const mealSummary = dayMeals.reduce(
        (totals, meal) => {
          totals.calories += meal.calories || 0;
          totals.protein += meal.protein || 0;
          totals.carbohydrates +=
            meal.carbohydrates || 0;
          totals.fats += meal.fats || 0;

          return totals;
        },
        {
          calories: 0,
          protein: 0,
          carbohydrates: 0,
          fats: 0,
        }
      );

      const totalWater = dayWaterRecords.reduce(
        (total, record) =>
          total + (record.amount || 0),
        0
      );

      const latestDayBmi =
        dayBmiRecords.length > 0
          ? dayBmiRecords[dayBmiRecords.length - 1]
          : null;

      return {
        date: day.dateKey,
        day: day.label,
        fullDate: day.fullDate,
        meals: dayMeals.length,
        calories: Number(
          mealSummary.calories.toFixed(1)
        ),
        protein: Number(
          mealSummary.protein.toFixed(1)
        ),
        carbohydrates: Number(
          mealSummary.carbohydrates.toFixed(1)
        ),
        fats: Number(mealSummary.fats.toFixed(1)),
        water: totalWater,
        bmi: latestDayBmi?.bmi || null,
      };
    });

    const totals = weeklyData.reduce(
      (result, day) => {
        result.meals += day.meals;
        result.calories += day.calories;
        result.protein += day.protein;
        result.carbohydrates += day.carbohydrates;
        result.fats += day.fats;
        result.water += day.water;

        return result;
      },
      {
        meals: 0,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fats: 0,
        water: 0,
      }
    );

    const daysWithBmi = weeklyData.filter(
      (day) => day.bmi !== null
    );

    const latestBmi =
      daysWithBmi.length > 0
        ? daysWithBmi[daysWithBmi.length - 1].bmi
        : null;

    return res.status(200).json({
      success: true,
      period: {
        start: days[0].dateKey,
        end: days[6].dateKey,
      },
      totals: {
        ...totals,
        calories: Number(totals.calories.toFixed(1)),
        protein: Number(totals.protein.toFixed(1)),
        carbohydrates: Number(
          totals.carbohydrates.toFixed(1)
        ),
        fats: Number(totals.fats.toFixed(1)),
      },
      averages: {
        dailyCalories: Number(
          (totals.calories / 7).toFixed(1)
        ),
        dailyWater: Number(
          (totals.water / 7).toFixed(1)
        ),
        dailyMeals: Number(
          (totals.meals / 7).toFixed(1)
        ),
      },
      latestBmi,
      weeklyData,
    });
  } catch (error) {
    console.error("Weekly analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve weekly analytics",
    });
  }
};