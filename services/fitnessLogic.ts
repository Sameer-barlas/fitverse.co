import { User, WorkoutPlan, Exercise, BMIData } from '../types';

export const calculateBMI = (weight: number, height: number): BMIData => {
  if (height === 0) return { value: 0, category: 'Unknown', color: '#gray-500' };
  
  const bmi = parseFloat((weight / (height * height)).toFixed(1));
  
  let category = '';
  let color = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = '#3b82f6'; // blue
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal';
    color = '#10b981'; // green
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
    color = '#f59e0b'; // orange
  } else {
    category = 'Obese';
    color = '#ef4444'; // red
  }
  
  return { value: bmi, category, color };
};

const EXERCISE_LIBRARY: Record<string, Exercise> = {
  pushups: { id: '1', title: 'Push-ups', reps: '12', sets: 3, category: 'strength', intensity: 'high', imageUrl: 'https://images.unsplash.com/photo-1598971639058-3429500c6e61?w=400&q=80', description: 'Standard push-ups for chest and triceps.' },
  wallPushups: { id: '1b', title: 'Wall Push-ups', reps: '10', sets: 3, category: 'strength', intensity: 'low', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80', description: 'Low impact push-ups against a wall.' },
  squats: { id: '2', title: 'Bodyweight Squats', reps: '12', sets: 3, category: 'strength', intensity: 'medium', imageUrl: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?w=400&q=80', description: 'Fundamental leg exercise.' },
  plank: { id: '3', title: 'Plank', reps: '30 sec', sets: 3, category: 'strength', intensity: 'medium', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80', description: 'Core stability hold.' },
  jumpingJacks: { id: '4', title: 'Jumping Jacks', reps: '20', sets: 3, category: 'cardio', intensity: 'high', imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80', description: 'Full body cardio warmup.' },
  burpees: { id: '5', title: 'Burpees', reps: '10', sets: 3, category: 'cardio', intensity: 'high', imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80', description: 'Intense full body metabolic conditioning.' },
  stepUps: { id: '6', title: 'Step-Ups', reps: '10', sets: 3, category: 'cardio', intensity: 'low', imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699ded?w=400&q=80', description: 'Low impact cardio using a step or chair.' },
  walking: { id: '7', title: 'Brisk Walking', reps: '15 min', sets: 1, category: 'cardio', intensity: 'low', imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80', description: 'Steady state cardio.' },
  swimming: { id: '8', title: 'Swimming', reps: '20 min', sets: 1, category: 'cardio', intensity: 'medium', imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80', description: 'Full body low impact resistance.' },
  lunges: { id: '9', title: 'Walking Lunges', reps: '10', sets: 3, category: 'strength', intensity: 'medium', imageUrl: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&q=80', description: 'Leg strengthener.' },
  dumbbellPress: { id: '10', title: 'Dumbbell Press', reps: '10', sets: 3, category: 'strength', intensity: 'medium', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80', description: 'Chest press (can use water bottles).' },
  russianTwist: { id: '11', title: 'Russian Twist', reps: '20', sets: 3, category: 'strength', intensity: 'medium', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80', description: 'Rotational core exercise.' },
  breathing: { id: '12', title: 'Deep Breathing', reps: '60 sec', sets: 3, category: 'flexibility', intensity: 'low', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80', description: 'Relaxation and recovery.' },
};

export const generateWorkoutPlan = (user: User): WorkoutPlan => {
  const { value: bmi, category } = calculateBMI(user.weight, user.height);
  const { age, medical } = user;

  let selectedExercises: Exercise[] = [];
  let planDescription = '';
  let advice: string[] = [];

  // 1. Base Selection based on BMI
  if (category === 'Underweight') {
    planDescription = 'Muscle Gain Plan';
    selectedExercises = [
      EXERCISE_LIBRARY.pushups,
      EXERCISE_LIBRARY.dumbbellPress,
      EXERCISE_LIBRARY.squats,
      EXERCISE_LIBRARY.plank
    ];
    advice.push("Focus on caloric surplus and protein intake.");
  } else if (category === 'Normal') {
    planDescription = 'Full Body Fitness Plan';
    selectedExercises = [
      EXERCISE_LIBRARY.jumpingJacks,
      EXERCISE_LIBRARY.squats,
      EXERCISE_LIBRARY.lunges,
      EXERCISE_LIBRARY.pushups,
      EXERCISE_LIBRARY.plank
    ];
    advice.push("Maintain consistency to keep your healthy BMI.");
  } else if (category === 'Overweight') {
    planDescription = 'Fat Burn Plan';
    selectedExercises = [
      EXERCISE_LIBRARY.burpees,
      EXERCISE_LIBRARY.walking, // Replaced high knees with walking for better general fit, tweaked later
      EXERCISE_LIBRARY.plank,
      EXERCISE_LIBRARY.russianTwist
    ];
    advice.push("Combine this with a slight caloric deficit.");
  } else { // Obese
    planDescription = 'Safe Fat Reduction Plan';
    selectedExercises = [
      EXERCISE_LIBRARY.walking,
      EXERCISE_LIBRARY.stepUps,
      EXERCISE_LIBRARY.wallPushups,
      EXERCISE_LIBRARY.breathing
    ];
    advice.push("Low impact is key. Protect your joints while moving.");
  }

  // 2. Age Adjustments
  if (age < 18) {
    planDescription += ' (Junior Modified)';
    advice.push("Since you are under 18, reps are reduced by 30% to ensure safety.");
    selectedExercises = selectedExercises.map(ex => ({
      ...ex,
      reps: typeof ex.reps === 'string' && ex.reps.includes('sec') 
            ? ex.reps 
            : Math.ceil(parseInt(ex.reps) * 0.7).toString() // Reduce reps
    }));
  }

  if (age > 40) {
    planDescription += ' (Senior Friendly)';
    advice.push("Exercises modified for joint health.");
    // Replace high impact
    selectedExercises = selectedExercises.map(ex => {
      if (ex.id === '5') return EXERCISE_LIBRARY.stepUps; // No Burpees
      if (ex.id === '4') return EXERCISE_LIBRARY.walking; // No Jumping Jacks
      if (ex.id === '1') return EXERCISE_LIBRARY.wallPushups; // Easier pushups
      return ex;
    });
    
    // Add Swimming for healthy seniors if not obese
    if (category === 'Normal' || category === 'Overweight') {
        selectedExercises.push(EXERCISE_LIBRARY.swimming);
    }
  }

  // 3. Medical Restrictions
  if (medical.heartIssue) {
    advice.push("Heart Condition Detected: High intensity exercises removed.");
    selectedExercises = selectedExercises.filter(ex => ex.intensity !== 'high');
    if (selectedExercises.length < 3) selectedExercises.push(EXERCISE_LIBRARY.walking);
  }

  if (medical.asthma) {
    advice.push("Asthma Detected: Long duration cardio reduced.");
    selectedExercises = selectedExercises.map(ex => {
        if(ex.category === 'cardio' && ex.intensity === 'high') return EXERCISE_LIBRARY.breathing;
        return ex;
    });
  }

  if (medical.injury) {
    advice.push("Injury Detected: Only low impact exercises included.");
    selectedExercises = selectedExercises.filter(ex => ex.intensity === 'low');
    selectedExercises.push(EXERCISE_LIBRARY.swimming); // Good for injuries usually
  }
  
  if (medical.diabetes) {
      advice.push("Diabetes Management: Regular walking added to regulate blood sugar.");
      if (!selectedExercises.find(ex => ex.id === '7')) {
          selectedExercises.unshift(EXERCISE_LIBRARY.walking);
      }
  }

  // Deduplicate by ID
  selectedExercises = Array.from(new Map(selectedExercises.map(item => [item.id, item])).values());

  return {
    id: Date.now().toString(),
    bmiCategory: category,
    bmiValue: bmi,
    description: planDescription,
    exercises: selectedExercises,
    advice
  };
};