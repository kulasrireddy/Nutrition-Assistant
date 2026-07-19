import Meal from "../models/Meal.js";
import Water from "../models/Water.js";
import Bmi from "../models/Bmi.js";
import User from "../models/User.js";

const createRecommendation = (
  id,
  title,
  message,
  category,
  priority = "medium"
) => {
  return {
    id,
    title,
    message,
    category,
    priority,
  };
};

const generateRecommendations = ({
  user,
  mealTotals,
  totalMeals,
  totalWater,
  latestBmi,
}) => {
  const recommendations = [];

  // Water recommendation
  if (totalWater === 0) {
    recommendations.push(
      createRecommendation(
        "water-start",
        "Start Your Hydration",
        "You have not recorded any water today. Add your first glass and begin working toward your daily hydration goal.",
        "Water",
        "high"
      )
    );
  } else if (totalWater < 1500) {
    recommendations.push(
      createRecommendation(
        "water-low",
        "Increase Water Intake",
        `You have consumed ${totalWater} ml of water today. Drink water regularly throughout the day.`,
        "Water",
        "high"
      )
    );
  } else if (totalWater < 2500) {
    recommendations.push(
      createRecommendation(
        "water-progress",
        "Continue Your Hydration",
        `You need approximately ${
          2500 - totalWater
        } ml more water to complete today's hydration goal.`,
        "Water",
        "medium"
      )
    );
  } else {
    recommendations.push(
      createRecommendation(
        "water-complete",
        "Hydration Goal Completed",
        "You have completed your daily hydration goal. Continue maintaining consistent hydration.",
        "Water",
        "low"
      )
    );
  }

  // Meal recommendation
  if (totalMeals === 0) {
    recommendations.push(
      createRecommendation(
        "meal-empty",
        "Log Your First Meal",
        "No meals have been recorded today. Add your meals to monitor calories and nutrients.",
        "Meals",
        "high"
      )
    );
  } else if (totalMeals < 3) {
    recommendations.push(
      createRecommendation(
        "meal-count",
        "Maintain Regular Meals",
        "You have recorded fewer than three meals today. Avoid skipping meals and maintain a regular meal schedule.",
        "Meals",
        "medium"
      )
    );
  } else {
    recommendations.push(
      createRecommendation(
        "meal-progress",
        "Good Meal Tracking",
        "You are consistently recording your meals. Continue tracking portions and nutrients.",
        "Meals",
        "low"
      )
    );
  }

  // Protein recommendation
  if (totalMeals > 0 && mealTotals.protein < 40) {
    recommendations.push(
      createRecommendation(
        "protein-low",
        "Add a Protein Source",
        "Your recorded protein intake is low. Consider lentils, eggs, milk, curd, paneer, beans or lean meat.",
        "Nutrition",
        "medium"
      )
    );
  }

  // Calorie recommendation
  if (mealTotals.calories > 2200) {
    recommendations.push(
      createRecommendation(
        "calories-high",
        "Choose a Lighter Next Meal",
        "Your recorded calorie intake is above the default daily target. Consider lighter portions and nutrient-rich foods.",
        "Calories",
        "medium"
      )
    );
  } else if (
    mealTotals.calories > 0 &&
    mealTotals.calories < 1000
  ) {
    recommendations.push(
      createRecommendation(
        "calories-low",
        "Review Your Meal Intake",
        "Your recorded calorie intake is currently low. Make sure all meals are logged and portions are balanced.",
        "Calories",
        "medium"
      )
    );
  }

  // BMI recommendation
  if (!latestBmi) {
    recommendations.push(
      createRecommendation(
        "bmi-missing",
        "Calculate Your BMI",
        "You have not calculated your BMI yet. Add your height and weight to view your BMI category.",
        "BMI",
        "medium"
      )
    );
  } else if (latestBmi.category === "Underweight") {
    recommendations.push(
      createRecommendation(
        "bmi-underweight",
        "Focus on Nutrient-Dense Foods",
        "Your latest BMI is below the normal range. Include protein, healthy fats and complex carbohydrates in your meals.",
        "BMI",
        "medium"
      )
    );
  } else if (latestBmi.category === "Normal Weight") {
    recommendations.push(
      createRecommendation(
        "bmi-normal",
        "Maintain Your Healthy Routine",
        "Your latest BMI is within the normal range. Continue balanced eating, hydration and regular physical activity.",
        "BMI",
        "low"
      )
    );
  } else {
    recommendations.push(
      createRecommendation(
        "bmi-above",
        "Build Sustainable Habits",
        "Focus on balanced portions, regular movement and consistent meal tracking. Professional guidance may also help.",
        "BMI",
        "medium"
      )
    );
  }

  // Profession-based recommendation
  switch (user.profession) {
    case "Student":
      recommendations.push(
        createRecommendation(
          "profession-student",
          "Student Wellness Tip",
          "Carry a water bottle, avoid skipping breakfast and keep healthy snacks available during college hours.",
          "Lifestyle",
          "low"
        )
      );
      break;

    case "Software Professional":
      recommendations.push(
        createRecommendation(
          "profession-software",
          "Desk-Work Wellness Tip",
          "Take short movement breaks, maintain good posture and avoid continuously eating while working.",
          "Lifestyle",
          "low"
        )
      );
      break;

    case "Teacher":
      recommendations.push(
        createRecommendation(
          "profession-teacher",
          "Teaching-Day Wellness Tip",
          "Keep water accessible during classes and plan meals to avoid long gaps between meals.",
          "Lifestyle",
          "low"
        )
      );
      break;

    case "Healthcare Professional":
      recommendations.push(
        createRecommendation(
          "profession-healthcare",
          "Shift Wellness Tip",
          "Use short breaks to hydrate and keep simple nutritious meals ready for busy shifts.",
          "Lifestyle",
          "low"
        )
      );
      break;

    case "Business Professional":
      recommendations.push(
        createRecommendation(
          "profession-business",
          "Busy Schedule Wellness Tip",
          "Plan meals before long meetings and avoid depending only on packaged or fast food.",
          "Lifestyle",
          "low"
        )
      );
      break;

    case "Homemaker":
      recommendations.push(
        createRecommendation(
          "profession-homemaker",
          "Daily Routine Wellness Tip",
          "Include your own meal and hydration needs while planning food for your household.",
          "Lifestyle",
          "low"
        )
      );
      break;

    default:
      recommendations.push(
        createRecommendation(
          "profession-general",
          "Daily Wellness Tip",
          "Maintain regular meals, sufficient hydration and consistent physical activity.",
          "Lifestyle",
          "low"
        )
      );
  }

  // Goal-based recommendation
  switch (user.goal) {
    case "Lose Weight":
      recommendations.push(
        createRecommendation(
          "goal-weight-loss",
          "Support Your Weight-Loss Goal",
          "Prioritize vegetables, protein, whole foods and consistent portions instead of extreme restriction.",
          "Goal",
          "medium"
        )
      );
      break;

    case "Gain Weight":
      recommendations.push(
        createRecommendation(
          "goal-weight-gain",
          "Support Healthy Weight Gain",
          "Add nutrient-dense meals and snacks such as nuts, milk, bananas, paneer and whole grains.",
          "Goal",
          "medium"
        )
      );
      break;

    case "Build Muscle":
      recommendations.push(
        createRecommendation(
          "goal-muscle",
          "Support Muscle Development",
          "Combine sufficient protein and calories with regular strength-based physical activity.",
          "Goal",
          "medium"
        )
      );
      break;

    case "Maintain Weight":
      recommendations.push(
        createRecommendation(
          "goal-maintain",
          "Maintain Your Current Progress",
          "Continue consistent meals, hydration and physical activity while monitoring long-term changes.",
          "Goal",
          "low"
        )
      );
      break;

    default:
      recommendations.push(
        createRecommendation(
          "goal-health",
          "Improve Overall Health",
          "Focus on balanced meals, hydration, sleep and regular physical activity.",
          "Goal",
          "low"
        )
      );
  }

  return recommendations.slice(0, 6);
};

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [user, meals, waterRecords, latestBmi] =
      await Promise.all([
        User.findById(userId),

        Meal.find({
          user: userId,
          mealDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        }).sort({
          mealDate: -1,
        }),

        Water.find({
          user: userId,
          date: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        }).sort({
          date: -1,
        }),

        Bmi.findOne({
          user: userId,
        }).sort({
          calculatedAt: -1,
          createdAt: -1,
        }),
      ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const mealTotals = meals.reduce(
      (totals, meal) => {
        totals.calories += Number(meal.calories) || 0;
        totals.protein += Number(meal.protein) || 0;
        totals.carbohydrates +=
          Number(meal.carbohydrates) || 0;
        totals.fats += Number(meal.fats) || 0;

        return totals;
      },
      {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fats: 0,
      }
    );

    const totalWater = waterRecords.reduce(
      (total, record) =>
        total + (Number(record.amount) || 0),
      0
    );

    const calorieGoal = 2000;
    const waterGoal = 2500;

    const calorieProgress = Math.min(
      Math.round(
        (mealTotals.calories / calorieGoal) * 100
      ),
      100
    );

    const waterProgress = Math.min(
      Math.round((totalWater / waterGoal) * 100),
      100
    );

    const recommendations = generateRecommendations({
      user,
      mealTotals,
      totalMeals: meals.length,
      totalWater,
      latestBmi,
    });

    return res.status(200).json({
      success: true,

      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        profession: user.profession,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        activityLevel: user.activityLevel,
        profileImage: user.profileImage,
        role: user.role,
      },

      summary: {
        totalMeals: meals.length,
        totalCalories: mealTotals.calories,
        totalProtein: mealTotals.protein,
        totalCarbohydrates:
          mealTotals.carbohydrates,
        totalFats: mealTotals.fats,
        totalWater,
        calorieGoal,
        waterGoal,
        calorieProgress,
        waterProgress,
      },

      latestBmi,
      recentMeals: meals.slice(0, 5),
      waterRecords: waterRecords.slice(0, 10),
      recommendations,
    });
  } catch (error) {
    console.error(
      "Dashboard summary error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve dashboard summary",
    });
  }
};